const rewire = require('rewire');

module.exports = {

    testInit(test) {
        const generate = require('../../build/generate');

        test.expect(1);
        test.throws(() => generate());
        test.done();
    },

    testCamelCase(test) {

        const generate = rewire('../../build/generate');

        const camelCase = generate.__get__('camelCase');

        test.expect(8);
        test.equals(camelCase('foo'), 'foo');
        test.equals(camelCase('foo_bar'), 'fooBar');
        test.equals(camelCase('foo_bar_bob'), 'fooBarBob');
        test.equals(camelCase('foo_bar_'), 'fooBar');
        test.equals(camelCase('foo', true), 'Foo');
        test.equals(camelCase('foo_bar', true), 'FooBar');
        test.equals(camelCase('foo_bar_bob', true), 'FooBarBob');
        test.equals(camelCase('foo_bar_', true), 'FooBar');

        test.done();

    },

    testClean(test) {

        const generate = rewire('../../build/generate');

        const clean = generate.__get__('clean');

        const result = clean('() => { return "test string"};');

        test.expect(2);
        test.equals(eval(result)(), 'test string', 'result some clean should be evalable');

        test.throws(() => clean('{ some gibberish'), 'clean should throw on bad code');

        test.done();

    },

    testNamespace(test) {

        test.expect(28);

        const generate = rewire('../../build/generate');

        const Namespace = generate.__get__('Namespace');

        const module1 = Namespace.getNamespace('com.foobar.module1');
        const module2 = Namespace.getNamespace('com.example.module2');
        const main = Namespace.getNamespace('com.example.test');
        const base = Namespace.getNamespace('com');
        const root = Namespace.getNamespace('');

        base.update({
            'package': 'com',
            'messages': [
                {
                    'name': 'Container',
                    'fields': [
                        {
                            'rule': 'optional',
                            'type': 'double',
                            'name': 'doubleValue',
                            'options': {},
                            'id': 1,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'float',
                            'name': 'floatValue',
                            'options': {},
                            'id': 2,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'int64',
                            'name': 'int64Value',
                            'options': {},
                            'id': 3,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'uint64',
                            'name': 'uint64Value',
                            'options': {},
                            'id': 4,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'int32',
                            'name': 'int32Value',
                            'options': {},
                            'id': 5,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'fixed64',
                            'name': 'fixed64Value',
                            'options': {},
                            'id': 6,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'fixed32',
                            'name': 'fixed32Value',
                            'options': {},
                            'id': 7,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'bool',
                            'name': 'boolValue',
                            'options': {},
                            'id': 8,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'string',
                            'name': 'stringValue',
                            'options': {},
                            'id': 9,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'bytes',
                            'name': 'bytesValue',
                            'options': {},
                            'id': 10,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'uint32',
                            'name': 'uint32Value',
                            'options': {},
                            'id': 11,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'sfixed32',
                            'name': 'sfixed32Value',
                            'options': {},
                            'id': 12,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'sfixed64',
                            'name': 'sfixed64Value',
                            'options': {},
                            'id': 13,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'sint32',
                            'name': 'sint32Value',
                            'options': {},
                            'id': 14,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'sint64',
                            'name': 'sint64Value',
                            'options': {},
                            'id': 15,
                            'oneof': 'value'
                        },
                        {
                            'rule': 'optional',
                            'type': 'Result',
                            'name': 'resultValue',
                            'options': {},
                            'id': 16,
                            'oneof': 'value'
                        }
                    ],
                    'enums': [],
                    'messages': [],
                    'options': {},
                    'services': [],
                    'oneofs': {
                        'value': [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16
                        ]
                    }
                },
                {
                    'name': 'Generic',
                    'fields': [
                        {
                            'rule': 'required',
                            'type': 'string',
                            'name': 'test',
                            'options': {},
                            'id': 1
                        }
                    ],
                    'enums': [],
                    'messages': [],
                    'options': {},
                    'services': [],
                    'oneofs': {}
                }
            ],
            'enums': [
                {
                    'name': 'Result',
                    'values': [
                        {
                            'name': 'SUCCESS',
                            'id': 0
                        },
                        {
                            'name': 'FAILURE',
                            'id': 1
                        }
                    ],
                    'options': {}
                }
            ],
            'imports': [],
            'options': {},
            'services': []
        });

        module1.update({
            'package': 'com.foobar.module1',
            'messages': [
                {
                    'name': 'Module1Test',
                    'fields': [
                        {
                            'rule': 'required',
                            'type': 'int32',
                            'name': 'my_data1',
                            'options': {},
                            'id': 1
                        },
                        {
                            'rule': 'optional',
                            'type': 'string',
                            'name': 'my_data2',
                            'options': {},
                            'id': 2
                        },
                        {
                            'rule': 'optional',
                            'type': 'SubMessage',
                            'name': 'my_sub_msg',
                            'options': {},
                            'id': 3
                        }
                    ],
                    'enums': [],
                    'messages': [
                        {
                            'name': 'SubMessage',
                            'fields': [
                                {
                                    'rule': 'required',
                                    'type': 'string',
                                    'name': 'my_sub_data',
                                    'options': {},
                                    'id': 1
                                }
                            ],
                            'enums': [],
                            'messages': [],
                            'options': {},
                            'services': [],
                            'oneofs': {}
                        }
                    ],
                    'options': {},
                    'services': [],
                    'oneofs': {}
                }
            ],
            'enums': [],
            'imports': [],
            'options': {},
            'services': []
        });

        module2.update({
            'package': 'com.example.module2',
            'messages': [
                {
                    'name': 'Generic',
                    'fields': [
                        {
                            'rule': 'required',
                            'type': 'int32',
                            'name': 'another_test',
                            'options': {},
                            'id': 1
                        }
                    ],
                    'enums': [],
                    'messages': [],
                    'options': {},
                    'services': [],
                    'oneofs': {}
                }
            ],
            'enums': [],
            'imports': [],
            'options': {},
            'services': []
        });

        main.update({
            'package': 'com.example.test',
            'messages': [
                {
                    'name': 'Test1',
                    'fields': [
                        {
                            'rule': 'required',
                            'type': 'Container',
                            'name': 'value',
                            'options': {},
                            'id': 1
                        },
                        {
                            'rule': 'required',
                            'type': 'Result',
                            'name': 'result',
                            'options': {},
                            'id': 2
                        }
                    ],
                    'enums': [],
                    'messages': [],
                    'options': {},
                    'services': [],
                    'oneofs': {}
                },
                {
                    'name': 'Test2',
                    'fields': [
                        {
                            'rule': 'required',
                            'type': 'com.foobar.module1.Module1Test',
                            'name': 'module1_test',
                            'options': {},
                            'id': 1
                        },
                        {
                            'rule': 'repeated',
                            'type': 'com.foobar.module1.Module1Test.SubMessage',
                            'name': 'module1_sub_test',
                            'options': {},
                            'id': 2
                        }
                    ],
                    'enums': [],
                    'messages': [],
                    'options': {},
                    'services': [],
                    'oneofs': {}
                },
                {
                    'name': 'Test3',
                    'fields': [
                        {
                            'rule': 'required',
                            'type': 'Generic',
                            'name': 'base_generic',
                            'options': {},
                            'id': 1
                        },
                        {
                            'rule': 'optional',
                            'type': 'com.example.module2.Generic',
                            'name': 'module2_generic1',
                            'options': {},
                            'id': 2
                        },
                        {
                            'rule': 'optional',
                            'type': 'example.module2.Generic',
                            'name': 'module2_generic2',
                            'options': {},
                            'id': 3
                        },
                        {
                            'rule': 'optional',
                            'type': 'module2.Generic',
                            'name': 'module2_generic3',
                            'options': {},
                            'id': 4
                        }
                    ],
                    'enums': [],
                    'messages': [],
                    'options': {},
                    'services': [],
                    'oneofs': {}
                }
            ],
            'enums': [],
            'imports': [
                'base.proto',
                'module1.proto',
                'module2.proto'
            ],
            'options': {},
            'services': []
        });

        root.update({});

        function reduceCtx(ctx) {
            return (ctx.package && {
                package: ctx.package.dots,
                messages: ctx.package.messages.length,
                fields: ctx.package.messages.reduce((result, msg) => {
                    return result + msg.fields.length;
                }, 0),
                oneOfs: ctx.package.messages.reduce((result, msg) => {
                    return result + msg.oneOfs.length;
                }, 0),
                enums: ctx.package.enums.length,
                imports: ctx.package.imports.length
            }) || {};

        }


        main.generate('{}', {render: ctx => {
            const data = reduceCtx(ctx);

            switch (data.package) {
                case 'com.example.test':
                    test.equals(data.messages, 3);
                    test.equals(data.fields, 8);
                    test.equals(data.oneOfs, 0);
                    test.equals(data.enums, 0);
                    test.equals(data.imports, 6);
                    break;
                case 'com.example.module2':
                    test.equals(data.messages, 1);
                    test.equals(data.fields, 1);
                    test.equals(data.oneOfs, 0);
                    test.equals(data.enums, 0);
                    test.equals(data.imports, 0);

                    break;
                case 'com.foobar.module1.Module1Test':
                    test.equals(data.messages, 1);
                    test.equals(data.fields, 1);
                    test.equals(data.oneOfs, 0);
                    test.equals(data.enums, 0);
                    test.equals(data.imports, 0);

                    break;
                case 'com.foobar.module1':
                    test.equals(data.messages, 1);
                    test.equals(data.fields, 3);
                    test.equals(data.oneOfs, 0);
                    test.equals(data.enums, 0);
                    test.equals(data.imports, 1);

                    break;
                case 'com':
                    test.equals(data.messages, 2);
                    test.equals(data.fields, 17);
                    test.equals(data.oneOfs, 1);
                    test.equals(data.enums, 1);
                    test.equals(data.imports, 0);

                    break;
            }

            return '{}';
        }}, {render: () => '{}'});

        test.equals(Namespace.getNamespace('com.example').getTypeClassification('test'), 'namespace');

        test.equals(Namespace.getNamespace('com.example').getTypeClassification('rubbish'), 'unknown');

        test.throws(() => main.findNamespace('rubbish'));

        test.done();

    },

    testGeneration(test) {

        const generate = require('../../build/generate');

        generate(__dirname + '/../../examples/simple', __dirname + '/../../examples/simple/main.proto');
        generate(__dirname + '/../../examples/complex', __dirname + '/../../examples/complex/main.proto');

        test.done();
    }

};
