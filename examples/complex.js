/* @flow */

import {Test1, Test2, Test3} from './complex/com/example/test';

import {Container, Result, Generic} from './complex/com';

import {Module1Test} from './complex/com/foobar/module1';

import {Generic as Module2Generic} from './complex/com/example/module2';

import {SubMessage} from './complex/com/foobar/module1/Module1Test';

const test1 = new Test1({
    value: new Container({
        doubleValue: 1.4
    }),
    result: Result.SUCCESS
});

const subMessage = new SubMessage({
    my_sub_data: 'test'
});

const test2 = new Test2({
    module1_test: new Module1Test({
        my_data1: 32,
        my_data2: 'hello',
        my_sub_msg: subMessage
    }),
    module1_sub_test: [subMessage, subMessage]
});

const mod2Generic = new Module2Generic({
    another_test: 5
});

const test3 = new Test3({
    base_generic: new Generic({
        test: 'abc123'
    }),
    module2_generic1: mod2Generic,
    module2_generic2: mod2Generic,
    module2_generic3: mod2Generic
});
