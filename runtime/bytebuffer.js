/* @flow */

/*::
declare class ByteBuffer {
    constructor( capacity?: number, littleEndian?: boolean, noAssert?: boolean ): this;

    static BIG_ENDIAN: boolean;

    static DEFAULT_CAPACITY: number;

    static DEFAULT_NOASSERT: boolean;

    static LITTLE_ENDIAN: boolean;

    static MAX_VARINT32_BYTES: number;

    static MAX_VARINT64_BYTES: number;

    static METRICS_BYTES: number;

    static METRICS_CHARS: number;

    static VERSION: string;

    buffer: ArrayBuffer;

    limit: number;

    littleEndian: boolean;

    markedOffset: number;

    noAssert: boolean;

    offset: number;

    view: DataView;

    static allocate( capacity?: number, littleEndian?: number, noAssert?: boolean ): ByteBuffer;

    static atob( b64: string ): string;

    static btoa( str: string ): string;

    static calculateUTF8Byte( str: string ): number;

    static calculateUTF8Char( str: string ): number;

    static calculateVariant32( value: number ): number;

    static concat( buffers: Array<ByteBuffer> | ArrayBuffer | Uint8Array | string, encoding?: string | boolean, litteEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static fromBase64( str: string, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static fromBinary( str: string, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static fromDebug( str: string, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static fromHex( str: string, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static fromUTF8( str: string, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static isByteBuffer( bb: any ): boolean;

    static wrap( buffer: ByteBuffer | ArrayBuffer | Uint8Array | string, enc?: string | boolean, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static zigZagDecode32( n: number ): number;

    static zigZagEncode32( n: number ): number;

    BE( bigEndian?: boolean ): ByteBuffer;

    LE( bigEndian?: boolean ): ByteBuffer;

    append( source: ByteBuffer | ArrayBuffer | Uint8Array | string, encoding?: string | number, offset?: number ): ByteBuffer;

    appendTo( target: ByteBuffer, offset?: number ): ByteBuffer;

    assert( assert: boolean ): ByteBuffer;

    capacity(): number;

    clear(): ByteBuffer;

    clone( copy?: boolean ): ByteBuffer;

    compact( begin?: number, end?: number ): ByteBuffer;

    copy( begin?: number, end?: number ): ByteBuffer;

    copyTo( target: ByteBuffer, targetOffset?: number, sourceOffset?: number, sourceLimit?: number ): ByteBuffer;

    ensureCapacity( capacity: number ): ByteBuffer;

    fill( value: number | string, begin?: number, end?: number ): ByteBuffer;

    flip(): ByteBuffer;

    mark( offset?: number ): ByteBuffer;

    order( littleEndian: boolean ): ByteBuffer;

    prepend( source: ByteBuffer | string | ArrayBuffer, encoding?: string | number, offset?: number ): ByteBuffer;

    prependTo( target: ByteBuffer, offset?: number ): ByteBuffer;

    printDebug( out?: ( text: string ) => void ): void;

    readByte( offset?: number ): number;

    readCString( offset?: number ): string;

    readDouble( offset?: number ): number;

    readFloat( offset?: number ): number;

    readFloat32( offset?: number ): number;

    readFloat64( offset?: number ): number;

    readIString( offset?: number ): string;

    readInt( offset?: number ): number;

    readInt16( offset?: number ): number;

    readInt32( offset?: number ): number;

    readInt8( offset?: number ): number;

    readShort( offset?: number ): number;

    readString( length: number, metrics?: number, offset?: number ): string;

    readUTF8String( chars: number, offset?: number ): string;

    readUint16( offset?: number ): number;

    readUint32( offset?: number ): number;

    readUint8( offset?: number ): number;

    readVString( offset?: number ): string;

    readVarint32( offset?: number ): number;

    readVarint32ZiZag( offset?: number ): number;

    remaining(): number;

    reset(): ByteBuffer;

    resize( capacity: number ): ByteBuffer;

    reverse( begin?: number, end?: number ): ByteBuffer;

    skip( length: number ): ByteBuffer;

    slice( begin?: number, end?: number ): ByteBuffer;

    toArrayBuffer( forceCopy?: boolean ): ArrayBuffer;

    toBase64( begin?: number, end?: number ): string;

    toBinary( begin?: number, end?: number ): string;

    toBuffer( forceCopy?: boolean ): Buffer;

    toDebug( columns?: boolean ): string | Array<string>;

    toHex( begin?: number, end?: number ): string;

    toString( encoding?: string ): string;

    toUTF8(): string;

    writeByte( value: number, offset?: number ): ByteBuffer;

    writeCString( str: string, offset?: number ): ByteBuffer;

    writeDouble( value: number, offset?: number ): ByteBuffer;

    writeFloat( value: number, offset?: number ): ByteBuffer;

    writeFloat32( value: number, offset?: number ): ByteBuffer;

    writeFloat64( value: number, offset?: number ): ByteBuffer;

    writeIString( str: string, offset?: number ): ByteBuffer;

    writeInt( value: number, offset?: number ): ByteBuffer;

    writeInt16( value: number, offset?: number ): ByteBuffer;

    writeInt32( value: number, offset?: number ): ByteBuffer;

    writeInt8( value: number, offset?: number ): ByteBuffer;

    writeShort( value: number, offset?: number ): ByteBuffer;

    WriteString( str: string, offset?: number ): ByteBuffer | number;

    writeUTF8String( str: string, offset?: number ): ByteBuffer | number;

    writeUint16( value: number, offset?: number ): ByteBuffer;

    writeUint32( value: number, offset?: number ): ByteBuffer;

    writeUint8( value: number, offset?: number ): ByteBuffer;

    writeVString( str: string, offset?: number ): ByteBuffer | number;

    writeVarint32( value: number, offset?: number ): ByteBuffer | number;

    writeVarint32ZigZag( value: number, offset?: number ): ByteBuffer | number;

}

export type {ByteBuffer};
*/
