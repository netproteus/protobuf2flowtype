// @flow

Object.defineProperty(exports, "__esModule", {
    value: true
});

const jsonDescriptor = {{{jsonDescriptor}}};

const ProtoBuf = require('protobufjs');
const builder = exports.builder = ProtoBuf.loadJson(jsonDescriptor);

/*:: #*/
export {builder};
export default builder;
/*$ */

exports.default = builder;
