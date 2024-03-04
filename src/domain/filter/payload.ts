import {Json} from "../json.js";

export class Payload {
    private _text?: string;
    private _json?: Json;
    private _charset?: string;
    private _encoding?: BufferEncoding;

    constructor (
        private _raw: Buffer,
        public contentType: string = 'application/octet-stream',
        public contentQuality?: string
    ) {}

    get charset(): string | undefined {
        if (!this._charset && this.contentQuality) {
            this._charset = qualityToCharset(this.contentQuality);
        }
        return this._charset;
    }
    set charset(value: string | undefined) {
        this._charset = value;
        if (value) {
            this.contentQuality = charsetToQuality(value);
        } else {
            this.contentQuality = undefined;
        }
    }

    get encoding(): BufferEncoding {
        if (!this._encoding) {
            if (this.charset && isBufferEncoding(this.charset)) {
                this._encoding = this.charset;
            } else {
                this._encoding = 'utf-8';
            }
        }
        return this._encoding;
    }
    set encoding(encoding: BufferEncoding) {
        this._encoding = encoding;
        this.charset = encoding;
    }

    get raw(): Buffer {
        return this._raw;
    }
    set raw(value: Buffer) {
        this._reset(value);
    }

    get text(): string | undefined {
        if (!this._text) {
            this._text = bufferToString(this.raw, this.encoding)
        }
        return this._text;
    }
    set text(value: string) {
        const buffer = stringToBuffer(value, this.encoding);
        this._reset(buffer);
        this._text = value;
    }

    get json(): Json | undefined {
        if (!this._json && this.text) {
            this._json = stringToJson(this.text);
        }
        return this._json;
    }
    set json(value: Json) {
        this.text = jsonToString(value);
        this._json = value;
    }

    private _reset(raw: Buffer): void {
        this._raw = raw;
        this._text = undefined;
        this._json = undefined;
    }
}

function bufferToString(buffer: Buffer, encoding: BufferEncoding): string | undefined {
    try {
        return buffer.toString(encoding);
    } catch {
        return undefined;
    }
}
function stringToBuffer(value: string, encoding: BufferEncoding): Buffer {
    return  Buffer.from(value, encoding);
}

function jsonToString(json: Json): string {
    return JSON.stringify(json);
}
function stringToJson(text: string): Json | undefined {
    try {
        return JSON.parse(text) as Json;
    } catch {
        return undefined;
    }
}

function qualityToCharset(quality: string): string | undefined {
    const match = quality.toLowerCase().match(/\bcharset=([-\w]+)/);
    if (!match || !match.groups)
        return undefined;

    return match.groups[1];
}
function charsetToQuality(charset: string): string {
    return `charset=${charset}`;
}

// For some reason, we can't import this type from NodeJS
export type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "utf-16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex";
const bufferEncodings: Set<BufferEncoding> = new Set(["ascii", "utf8", "utf-8", "utf16le", "utf-16le", "ucs2", "ucs-2", "base64", "base64url", "latin1", "binary", "hex"]);
function isBufferEncoding(input: string): input is BufferEncoding {
    return bufferEncodings.has(input as BufferEncoding);
}

// export interface JsonLdPayload extends JsonPayload {
//     document: LDDocument;
// }
//
// export interface ActivityPubPayload extends JsonLdPayload {
//     message: APMessage
// }
