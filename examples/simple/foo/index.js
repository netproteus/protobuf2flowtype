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