export class Payload {
    private _text?: string;
    private _json?: Json;

    constructor (
        public contentType: string,
        private _raw: Buffer
    ) {}

    get raw(): Buffer {
        return this._raw;
    }
    set raw(value: Buffer) {
        this._reset(value);
    }

    get text(): string {
        if (!this._text) {
            this._text = this._raw.toString('utf-8');
        }
        return this._text;
    }
    set text(value: string) {
        const buffer = Buffer.from(value, 'utf-8');
        this._reset(buffer);
        this._text = value;
    }

    get json(): Json {
        if (!this._json) {
            this._json = JSON.parse(this.text) as Json;
        }
        return this._json;
    }
    set json(value: Json) {
        this.text = JSON.stringify(value);
        this._json = value;
    }

    private _reset(raw: Buffer): void {
        this._raw = raw;
        this._text = undefined;
        this._json = undefined;
    }
}

export type Json = number | boolean | string | null | { [property: string]: Json | undefined } | Json[];

// export interface JsonLdPayload extends JsonPayload {
//     document: LDDocument;
// }
//
// export interface ActivityPubPayload extends JsonLdPayload {
//     message: APMessage
// }
