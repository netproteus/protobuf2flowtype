// @flow

Object.defineProperty(exports, "__esModule", {
    value: true
});

const jsonDescriptor = {{{jsonDescriptor}}};

const ProtoBuf = require('protobufjs');
const builder = exports.builder = new ProtoBuf.Builder();
for (const ns of jsonDescriptor) {
    builder['import'](ns.json, ns.filename);
}

/*:: #*/
export {builder};
export default builder;
/*$ */

exports.default = builder;
