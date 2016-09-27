/* @flow */

/*::
import type {ByteBuffer} from './bytebuffer';

declare interface ProtoBuf$MessageLiteral{

};

declare interface ProtoBuf$Builder<T> {
    build(key: string): T;
}

declare interface Protobuf$RefectType<T: ProtoBuf$MessageLiteral> {
    name: string;
    getChildren: () => Array<any>;
}

declare class Protobuf$Message<T: ProtoBuf$MessageLiteral, R: Protobuf$RefectType<T>> extends Object {
    constructor(...args: Array<any>): $Subtype<T>;
    add(key: string, value: any, noAssert?: boolean): this;
    calculate(): number;
    encode64(): string;
    encodeAB(): ArrayBuffer;
    encodeDelimited(buffer?: ByteBuffer, noVerify?: boolean): ByteBuffer;
    encodeDelimited(buffer?: boolean, noVerify?: boolean): ByteBuffer;
    encodeHex(): string;
    encodeJSON(): string;
    encodeNB(): Buffer;
    get(key: string, noAssert?: boolean): any;
    set(keyOrObj: string, value: any | boolean, noAssert: boolean): this;
    toArrayBuffer(): ArrayBuffer;
    toBase64(): string;
    toBuffer(): Buffer;
    toHex(): string;
    toRaw(): any;
    toString(): string;

    $type: R;
    static $type: R;

    static decode(buffer: ArrayBuffer, length?: number | string, enc?: string): this;
    static decode(buffer: ByteBuffer, length?: number | string, enc?: string): this;
    static decode(buffer: Buffer, length?: number | string, enc?: string): this;
    static decode(buffer: string, length?: number | string, enc?: string): this;
    static decode64(str: string): this;
    static decodeDelimited(buffer: ArrayBuffer, enc: string): this;
    static decodeDelimited(buffer: ByteBuffer, enc: string): this;
    static decodeDelimited(buffer: Buffer, enc: string): this;
    static decodeDelimited(buffer: string, enc: string): this;
    static decodeHex(str: string): this;
    static decodeJSON(str: string): this;
}



export type {ByteBuffer, ProtoBuf$MessageLiteral, ProtoBuf$Builder, Protobuf$RefectType};

export {Protobuf$Message};

*/
