const ProtoBuf = require('protobufjs');
const fs = require('fs-extra');
const path = require('path');
const mustache = require('mustache');
const babylon = require('babylon');
const generate = require('babel-generator').default;

/**
 * Directory to load templates from
 */
const templateDir = path.format({
    dir: __dirname,
    base: 'templates'
});

/**
 *
 * Built in primitive types
 */
const types = {
    double: 'number',
    float: 'number',
    int64: 'number',
    uint64: 'number',
    int32: 'number',
    fixed64: 'number',
    fixed32: 'number',
    bool: 'boolean',
    string: 'string',
    bytes: 'ByteBuffer',
    uint32: 'number',
    sfixed32: 'number',
    sfixed64: 'number',
    sint32: 'number',
    sint64: 'number'
};

class Namespace {

    /**
     *
     * @param name - package name
     * @param parent - parent Namespace or undefined if this is a root Namespace
     */
    constructor(name, parent) {
        this.name = name || '';
        this.type = this.name.split('.').pop();
        this.parent = parent;
        this.children = [];

        if (this.parent) {
            this.parent.children.push(this);
            this.depth = this.parent.depth + 1;
        } else {
            this.depth = 0;
        }

        this.messages = [];
        this.enums = [];
        this.options = {};
        this.services = [];

        this.result = undefined;

    }

    /**
     * Merges Proto AST data into local structures, this allows you to deal with messages defined in same package
     * Across multiple files
     *
     * @param packageData
     * @returns {Namespace}
     */
    update(packageData) {
        if (packageData.messages) {
            this.messages = this.messages.concat(packageData.messages);
            for (const message of this.messages) {
                const name = this.name + '.' + message.name;
                Namespace.spaces[name] = new Namespace(name, this).update(message);
            }
        }
        if (packageData.enums) {
            this.enums = this.enums.concat(packageData.enums);
        }
        if (packageData.services) {
            this.services = this.services.concat(packageData.services);
        }
        if (packageData.options) {
            this.options = Object.assign(this.options, packageData.options);
        }

        return this;
    }

    /**
     * Returns or creates Namespace for given package name
     *
     * @param name
     * @returns {Namespace}
     */
    static getNamespace(name) {
        Namespace.spaces = Namespace.spaces || {
            '': new Namespace()
        };

        if (Namespace.spaces[name]) {
            return Namespace.spaces[name];
        }

        const nameParts = name.split('.');
        const parent = Namespace.getNamespace(nameParts.splice(0, nameParts.length - 1).join('.'));

        return Namespace.spaces[name] = new Namespace(name, parent);
    }

    /**
     * Resets the Namespace cache
     */
    static reset() {
        delete Namespace.spaces;
    }

    /**
     * Generates flowtype definitions for this Namespace and rescursivly upwards to root
     *
     * @param moduleTemplate - mustache template to use for module
     * @param rootTemplate - mustache template to use for root
     * @returns {Object} - code per packagename as key
     */
    generate(jsonDescriptor, moduleTemplate, rootTemplate) {
        if (this.result) {
            return this.result;
        }

        const result = this.result = {};

        if (!this.parent) {
            const code = rootTemplate.render({
                jsonDescriptor: jsonDescriptor
            });
            result[''] = clean(code);
            return result;
        }

        this.children.forEach(child => child.generate(jsonDescriptor, moduleTemplate, rootTemplate));

        const imports = {
            types: [],
            clazz: []
        };
        const localTypes = {};


        const enums = this.enums.map(e => {
            localTypes[e.name] = 'enum';
            return {
                name: e.name,
                values: e.values,
                valueList: e.values.map(value => value.id).join('|')
            };
        });

        // Prepare the messages data
        const messages = this.messages.map(message => {

            const fqMessageName = this.name + '.' + message.name;

            localTypes[message.name] = 'message';
            const typeCache = {};
            return {
                name: message.name,
                fields: message.fields.map(field => {
                    const fieldTypes = Namespace.getNamespace(fqMessageName)
                        .resolveType(field.type, localTypes, imports, field.rule === 'repeated');
                    typeCache[field.id] = fieldTypes;
                    return {
                        name: field.name,
                        upperName: camelCase(field.name, true),
                        type: fieldTypes,
                        optional: field.rule === 'optional',
                        voidable: field.rule === 'optional'
                    };
                }),
                oneOfs: Object.keys(message.oneofs).map(name => new Object({
                    'name': name,
                    'typeName': message.name + '$' + name,
                    'fieldTypes': message.oneofs[name]
                        .map(value => typeCache[value].builder)
                        .filter((item, pos, arr) => arr.indexOf(item) === pos)
                        .join('|')
                }))
            };
        });

        // TODO: services

        const data = {};
        if (messages.length > 0 || enums.length > 0) {
            data.package = {
                dollar: this.name.replace(/\./g, '$'),
                dots: this.name,
                messages: messages,
                enums: enums,
                imports: imports
            };
        }

        const code = moduleTemplate.render(data);


        result[this.name.replace(/\./g, '/')] = clean(code);

        return Object.assign(this.parent.generate(jsonDescriptor, moduleTemplate, rootTemplate), result);
    }

    /**
     *
     * @param type {string} - type name to resolve
     * @param localTypes {array} - types known about in this package
     * @param imports {array} - type imports that need to be made into the package, we mutate this rather than read
     *                          from it
     * @param repeated {boolean} - is this a repeated type i.e. Array
     * @returns {{interface: string, builder: string}}
     */
    resolveType(type, localTypes, imports, repeated) {
        /**
         * Builds the typedef needed for the template
         *
         * @param t - base type name
         * @param primative - is it a built in type - i.e. leave it alone
         * @returns {{interface: string, builder: string}}
         */
        function buildType(t, typeClassification) {
            let typeDef;
            switch (typeClassification) {
                case 'primative':
                    typeDef = {
                        interface: t,
                        builder: t
                    };
                    break;
                case 'message':
                    typeDef = {
                        interface: '$Subtype<' + t + 'Interface>',
                        builder: t + 'Builder'
                    };
                    break;
                case 'enum':
                    typeDef = {
                        interface: t + 'Values',
                        builder: t + 'Values'
                    };
                    break;
                default:
                    throw new Error('Unhandled classification case :: ' + typeClassification);
            }
            if (repeated) {
                for (const key in typeDef) {
                    typeDef[key] = 'Array<' + typeDef[key] + '>';
                }
            }
            return typeDef;
        }

        if (Object.keys(types).indexOf(type) > -1) {
            // This deals with primative types
            return buildType(types[type], 'primative');
        }

        if (localTypes[type]) {
            // This deals with complex types in same package

            return buildType(type, localTypes[type]);
        }

        const namespace = this.findNamespace(type);
        const name = type.split('.').slice(-1)[0];

        const absoluteType = namespace.name + '.' + name;

        const prefix = Array(this.depth - 1).fill('..').join('/');
        const alias = absoluteType.replace(/\./g, '$');

        const typeClassification = namespace.getTypeClassification(name);

        switch (typeClassification) {
            case 'message':

                if (imports.types.filter(imp => imp.names[0].alias === (alias + 'Interface')).length > 0) {
                    break;
                }

                imports.types.push({
                    names: [{
                        name: name + 'Interface',
                        alias: alias + 'Interface'
                    }], location: prefix + '/' + namespace.name.replace(/\./g, '/')
                });

                imports.clazz.push({
                    names: [{
                        name: name + 'Builder',
                        alias: alias + 'Builder'
                    }], location: prefix + '/' + namespace.name.replace(/\./g, '/')
                });

                break;
            case 'enum':

                if (imports.types.filter(imp => imp.names[0].alias === (alias + 'Values')).length > 0) {
                    break;
                }

                imports.types.push({
                    names: [{
                        name: name + 'Values',
                        alias: alias + 'Values'
                    }], location: prefix + '/' + namespace.name.replace(/\./g, '/')
                });
                break;
            default:
                throw new Error('Unhandled classification case :: ' + typeClassification);

        }

        return buildType(alias, typeClassification);
    }

    /**
     * Given the current namespace, finds which namespace this type name macthes to given resolving rules
     * @param type {string} type used in protobuf definition
     */
    findNamespace(type) {
        const typeParts = type.split('.');

        let namespace = this;
        let lookup;
        while (lookup = namespace.findName(typeParts.shift(), !typeParts.length)) {
            if (!(lookup instanceof Namespace)) {
                return namespace;
            }
            namespace = lookup;
        }

        if (this.parent) {
            return this.parent.findNamespace(type);
        }

        throw new Error('Failed to locate type -' + type);
    }

    /**
     * Given a type name (last part) returns message, enum or namespace that matches
     *
     * @param name {string} - singular name i.e. no package names like com.lyst.MyType
     * @param isLeaf {boolean} - is this a message|enum type, instead of a namespace
     * @returns {T|*}
     */
    findName(name, isLeaf) {
        return isLeaf && (this.messages.filter(message => message.name === name)[0] ||
            this.enums.filter(e => e.name === name)[0]) ||
            this.children.filter(child => child.type === name)[0];
    }

    /**
     * Return type classification of name - message / enum / namespace
     *
     * @param name
     * @returns {boolean|string|string|string|string}
     */
    getTypeClassification(name) {
        return (this.messages.filter(message => message.name === name).length > 0 && 'message') ||
            (this.enums.filter(e => e.name === name).length > 0 && 'enum') ||
            (this.children.filter(child => child.type === name).length > 0 && 'namespace') ||
            'unknown';
    }

}

/**
 * Strips location information out of babel ast, so we can regen clean code from the ast
 * @param obj - babylon ast
 * @returns ast
 */
function strip(obj) {

    if (!obj || ! obj instanceof Object || typeof obj === 'string') {
        return undefined;
    }

    if (obj instanceof Array) {
        for (const value of obj) {
            strip(value);
        }
    } else {

        delete obj['loc'];
        delete obj['start'];
        delete obj['end'];

        Object.keys(obj).forEach(key => strip(obj[key]));
    }

    return obj;
}

/**
 * Takes JS code as string, parses it to AST, strips out formating information
 * And regenerates clean code as a result
 *
 * @param code
 * @returns code
 */
function clean(code) {

    try {
        const ast = babylon.parse(code, {
            // parse in strict mode and allow module declarations
            sourceType: 'module',
            plugins: [
                // enable jsx and flow syntax
                'jsx',
                'flow'
            ]
        });

        const cleanAst = strip(ast).program;

        const resultCode = generate(cleanAst, {}).code;

        return resultCode.replace(/(\/\*\$ | \#\*\/)/g, '');

    } catch (e) {
        console.log(code);
        throw e;
    }
}

/**
 * Converts foo_bar -> fooBar
 * @param str
 * @param next
 * @returns {string}
 */
function camelCase(str, next) {
    let output = '';
    for (const c of str) {
        if (c === '_') {
            next = true;
            continue;
        }
        output += next ? c.toUpperCase() : c;
        next = false;
    }
    return output;
}


/**
 * Parses protofile recursively, resolving all imports
 *
 * To create Nampespace that can be used for generation
 *
 * @param protoFile
 * @returns {Namespace}
 */
function processProto(protoFile, root) {
    const protPath = path.format({
        dir: root,
        base: protoFile
    });
    const parser = new ProtoBuf.DotProto.Parser(fs.readFileSync(protPath));
    const protoAst = parser.parse();

    protoAst.imports.forEach(file => processProto(file, root));

    return Namespace.getNamespace(protoAst.package).update(protoAst);
}


/**
 * Exported function from this module
 *
 * Given the proto input will generate the modules with flowtype bindings in outputDir
 *
 * @param outputDir - Directory to output files
 * @param inputProto - Root proto file
 * @param protoDir - directory to load proto files from - can be ommited and absolute path used in inputProto if imports
 *                   are relative to the directory of inputProto
 */
function generateFromProto(outputDir, inputProto, protoDir) {
    try {
        fs.accessSync(path.format({
            dir: protoDir,
            base: inputProto
        }));

        if (!protoDir) {
            const absolutePath = fs.realpathSync(inputProto);
            protoDir = path.dirname(absolutePath);
            inputProto = path.basename(absolutePath);
        }
    } catch (e) {
        throw new Error('Can not locate proto file - ' + inputProto, e);
    }

    let jsonDescriptor;

    try {
        class ImportBuilder extends ProtoBuf.Builder {

            import(json, filename) {
                this._imported = this._imported || [];

                this._imported.push({
                    filename: filename,
                    json: json
                });
                super['import'](json, filename);
            }
        }

        const importBuilder = new ImportBuilder();
        // This validates that proto is parsable
        const builder = ProtoBuf.loadProtoFile({
            root: protoDir,
            file: inputProto
        }, importBuilder);
        jsonDescriptor = JSON.stringify(builder._imported, undefined, 2);
    } catch (e) {
        console.error('Proto Parsing Failed', e);
        throw new Error('Generation Failed');
    }

    Namespace.reset();
    const namespace = processProto(inputProto, protoDir);
    const code = namespace.generate(
        jsonDescriptor, {
            render: data => mustache.render(fs.readFileSync(path.format({
                dir: templateDir,
                base: 'module.js.mt'
            }), 'utf8'), data)
        }, {
            render: data => mustache.render(fs.readFileSync(path.format({
                dir: templateDir,
                base: 'root.js.mt'
            }), 'utf8'), data)
        }
    );

    for (const key of Object.keys(code)) {
        const dir = path.format({
            dir: outputDir,
            base: key
        });
        fs.ensureDirSync(dir);
        const file = path.format({
            dir: dir,
            base: 'index.js'
        });
        fs.writeFileSync(file, code[key], {encoding: 'utf8'});
    }

}

module.exports = generateFromProto;
