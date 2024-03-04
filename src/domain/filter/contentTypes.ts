import {Payload} from "./payload.js";

export const jsonContentTypes = [
    'application/json',
    'application/ld+json',
    'application/activity+json'
];

export const jsonLdContentTypes = [
    'application/ld+json',
    'application/activity+json'
];


export function isJsonType(type: string | Payload): boolean {
    return isType(type, jsonContentTypes);
}

export function isJsonLdType(type: string | Payload): boolean {
    return isType(type, jsonLdContentTypes);
}

function isType(type: string | Payload, types: string[]): boolean {
    if (typeof(type) !== 'string')
        type = type.contentType;

    return types.includes(type);
}
