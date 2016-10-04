import {Chat, Greeting, GreetingType} from './simple/foo';


const chat = new Chat({
    greeting: new Greeting({
        type: GreetingType.WAVE,
        text: 123
    }),
    body: true
});

console.log(chat);
