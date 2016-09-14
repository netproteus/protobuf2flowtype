// @flow

Object.defineProperty(exports, "__esModule", {
    value: true
});

const _package = require('./package.json');

const jsonDescriptor = {{{jsonDescriptor}}};

const ProtoBuf = require('protobufjs');
const builder = exports.builder = ProtoBuf.loadJson(jsonDescriptor);

exports.default = builder;
