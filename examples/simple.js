/* @flow */

import {Chat, Greeting, GreetingType} from './simple/foo';


const chat = new Chat({
    greeting: new Greeting({
        type: GreetingType.HELLO,
        text: 'Hi'
    }),
    body: 'How are you?'
});

console.log(chat);
