// @flow

Object.defineProperty(exports, "__esModule", {
  value: true
});

/*:: #*/
import {builder} from '../index';
export {builder};
/*$ */

const _ = require('../index');

exports.builder = _.builder;

{{#package}}

/*:: #*/

    import {Protobuf$Message} from 'protobuf2flowtype-runtime';

    import type {ByteBuffer, ProtoBuf$Builder, ProtoBuf$MessageLiteral, Protobuf$RefectType} from 'protobuf2flowtype-runtime';

    {{#imports}}

    import type {
      {{#types}}
         {{name}} as {{alias}},
      {{/types}}
    } from '{{{location}}}';

    {{/imports}}

    {{#enums}}

        type {{name}}Options = {
            {{#values}}
                {{name}}: {{id}};
            {{/values}}
        }

        type {{name}}Values = {{valueList}};

    {{/enums}}

    {{#messages}}

        type {{name}}Interface = ProtoBuf$MessageLiteral & {
            {{#fields}}
                {{name}}{{#optional}}?{{/optional}}: {{#voidable}}?{{/voidable}}{{{type.interface}}};
            {{/fields}}
        };
        type {{name}}Reflect = Protobuf$RefectType<{{name}}Interface>;


        declare class {{name}}Builder extends Protobuf$Message<{{name}}Interface, {{name}}Reflect> {
            constructor(values: {{name}}Interface): {{name}}Builder;

            {{#fields}}
                {{name}}{{#optional}}?{{/optional}}: {{#voidable}}?{{/voidable}}{{{type.builder}}};
                get{{upperName}}(): {{#voidable}}?{{/voidable}}{{{type.builder}}};
                set{{upperName}}({{name}}: {{#voidable}}?{{/voidable}}{{{type.builder}}}): void;
            {{/fields}}

            {{#oneOfs}}
                {{name}}: string;
            {{/oneOfs}}
        };

    {{/messages}}

    type {{dollar}} = {
        {{#messages}}
            {{name}}: Class<{{name}}Builder>,
        {{/messages}}
        {{#enums}}
            {{name}}: {{name}}Options,
        {{/enums}}
    }

    export type {
        {{#messages}}
            {{name}}Interface, {{name}}Builder, {{name}}Reflect,
        {{/messages}}
        {{#enums}}
            {{name}}Values, {{name}}Options,
        {{/enums}}
    };
/*$ */

    const namespace /*: {{dollar}} */ = _.builder.build('{{dots}}');

    {{#messages}}
        exports.{{name}} = namespace.{{name}};
/*:: #*/
        export const {{name}} = namespace.{{name}};
/*$ */
    {{/messages}}

    {{#enums}}
        exports.{{name}} = namespace.{{name}};
/*:: #*/
        export const {{name}} = namespace.{{name}};
/*$ */
    {{/enums}}

    exports.default = namespace;
/*:: #*/
    export default namespace;
/*$ */
{{/package}}
