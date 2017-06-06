[![npm version](https://badge.fury.io/js/protobuf2flowtype.svg)](https://badge.fury.io/js/protobuf2flowtype) [![CircleCI](https://circleci.com/gh/netproteus/protobuf2flowtype.svg?style=svg)](https://circleci.com/gh/netproteus/protobuf2flowtype) [![codecov](https://codecov.io/gh/netproteus/protobuf2flowtype/branch/master/graph/badge.svg)](https://codecov.io/gh/netproteus/protobuf2flowtype)

# protobuf2flowtype

The aim of this project is to allow [flowtype](https://flowtype.org/) checking of protobuf messages created using [protobufjs](https://github.com/dcodeIO/protobuf.js)

This is achieved by generating modules that match the namespaces within your protobuf definition which export the [protobufjs](https://github.com/dcodeIO/protobuf.js) builder for that namespace but also include all the necessary flowtype annotations for the messages and enums declared in that namespace.

The generated code has a runtime dependency on this module for flowtype checking only. The generated code includes the flowtype annotations inside special comment blocks so the code is fully ES5 compatible and doesn't require transpiling to run.

## Usage

### CLI

```
npm install --save protobuf2flowtype
node_modules/.bin/protobuf2flowtype --outDir src/proto --protoFile main.proto --protoRoot proto
```

### API

```
const generate = require('protobuf2flowtype/build/generate'); 

generate('src/proto', 'main.proto', 'proto');
```

## Example

### main.proto
```
package foo;

message Greeting {

    required string text = 1;

};

message Chat {

    required Greeting greeting = 1;
    optional string body = 2;
};

```

### generated code
```
.
├── foo
│   ├── Chat
│   │   └── index.js
│   ├── Greeting
│   │   └── index.js
│   └── index.js
└── index.js
```

### index.js
```
// @flow
Object.defineProperty(exports, "__esModule", {
  value: true
});

const _package = require('./package.json');

const jsonDescriptor = {
  "package": "foo",
  "messages": [{
    "name": "Greeting",
    "fields": [{
      "rule": "required",
      "type": "string",
      "name": "text",
      "id": 1
    }]
  }, {
    "name": "Chat",
    "fields": [{
      "rule": "required",
      "type": "Greeting",
      "name": "greeting",
      "id": 1
    }, {
      "rule": "optional",
      "type": "string",
      "name": "body",
      "id": 2
    }]
  }]
};

const ProtoBuf = require('protobufjs');

const builder = exports.builder = ProtoBuf.loadJson(jsonDescriptor);
exports.default = builder;
```

### foo/index.js
```
// @flow
Object.defineProperty(exports, "__esModule", {
  value: true
});

const _ = require('../index');

exports.builder = _.builder; /*::
import { Protobuf$Message } from 'protobuf2flowtype';
import type { ByteBuffer, ProtoBuf$Builder, ProtoBuf$MessageLiteral, Protobuf$RefectType } from 'protobuf2flowtype';
interface GreetingInterface extends ProtoBuf$MessageLiteral {
  text: string
}
;
type GreetingReflect = Protobuf$RefectType<GreetingInterface>;
declare class GreetingBuilder extends Protobuf$Message<GreetingInterface, GreetingReflect> {
  constructor: (values: GreetingInterface) => GreetingBuilder;
  text: string;
  getText: () => string;
  setText: (text: string) => void;
}
;
interface ChatInterface extends ProtoBuf$MessageLiteral {
  greeting: $Subtype<GreetingInterface>;
  body?: ?string;
}
;
type ChatReflect = Protobuf$RefectType<ChatInterface>;
declare class ChatBuilder extends Protobuf$Message<ChatInterface, ChatReflect> {
  constructor: (values: ChatInterface) => ChatBuilder;
  greeting: GreetingBuilder;
  getGreeting: () => GreetingBuilder;
  setGreeting: (greeting: GreetingBuilder) => void;
  body?: ?string;
  getBody: () => ?string;
  setBody: (body: ?string) => void;
}
;
type foo = {
  Greeting: Class<GreetingBuilder>;
  Chat: Class<ChatBuilder>;
};
export type { GreetingInterface, GreetingBuilder, GreetingReflect, ChatInterface, ChatBuilder, ChatReflect }; */

const namespace /*: foo */ = _.builder.build('foo');

exports.Greeting = namespace.Greeting; /*::
export const Greeting = namespace.Greeting; */
exports.Chat = namespace.Chat; /*::
export const Chat = namespace.Chat; */
exports.default = namespace; /*::
export default namespace; */
```

### Usage
```
/* @flow */
import {Chat, Greating} from './proto/foo';

const chat: Chat = new Chat({
    greeting: new Greating({ text: 'hello'}),
    body: 'some text'
});

```

## Missing features
Currently doesn't support
* Passing constructor arguments to protobufjs builders
* service definitions
* map fields



