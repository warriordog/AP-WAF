import {isTransformer, RequestTransformer} from "../filter/transformer.js";

export interface Rule {
    id: string;

    name?: string;
    description?: string;

    transformIncoming?: RequestTransformer;
    transformOutgoing?: RequestTransformer;
}

export function isRule(raw: unknown): raw is Rule {
    if (typeof(raw) !== 'object')
        return false;

    if (raw == null)
        return false;

    if (!('id' in raw) || typeof(raw.id) !== 'string')
        return false;

    if ('name' in raw && typeof(raw.name) !== 'string')
        return false;

    if ('description' in raw && typeof(raw.description) !== 'string')
        return false;

    if ('transformIncoming' in raw && typeof(raw.transformIncoming) !== 'function')
        return false;

    if ('transformOutgoing' in raw && typeof(raw.transformOutgoing) !== 'function')
        return false;

    return true;
}
