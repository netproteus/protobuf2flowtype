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