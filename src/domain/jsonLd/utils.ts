import {JsonObject} from "../json.js";

export function hasASType(object: JsonObject, ...targetTypes: string[]): boolean {
    if (!('type' in object))
        return false;

    let types: string[] = [];

    if (typeof(object.type) === 'string') {
        types = [object.type];
    } else if (Array.isArray(object.type)) {
        types = object.type.filter(t => typeof(t) === 'string') as string[];
    }

    // Not very efficient tbh
    return targetTypes.some(target =>
        types.some(t => target.localeCompare(t, undefined, { sensitivity: 'accent' }) === 0)
    );
}
