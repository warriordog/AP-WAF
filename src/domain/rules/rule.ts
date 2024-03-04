import {
    Awaitable,
    RequestContext,
    RequestTransformer,
    ResponseContext,
    ResponseTransformer
} from "../filter/transformer.js";
import {RequestAction, ResponseAction} from "../filter/action.js";

export abstract class Rule {
    readonly abstract id: string;

    readonly name?: string;
    readonly description?: string;
}

// https://stackoverflow.com/a/59488269
export interface Rule {
    transformIncomingRequest?(context: RequestContext): Awaitable<RequestAction | void>;
    transformOutgoingResponse?(context: ResponseContext): Awaitable<ResponseAction | void>;

    transformOutgoingRequest?(context: RequestContext): Awaitable<RequestAction | void>;
    transformIncomingResponse?(context: ResponseContext): Awaitable<ResponseAction | void>;
}

// // export interface Rule {
// //     id: string;
// //
// //     name?: string;
// //     description?: string;
// //
// //     transformIncomingRequest?: RequestTransformer;
// //     transformOutgoingResponse?: ResponseTransformer;
// //
// //     transformOutgoingRequest?: RequestTransformer;
// //     transformIncomingResponse?: ResponseTransformer;
// // }
//
// export function isRule(raw: unknown): raw is Rule {
//     if (typeof(raw) !== 'object')
//         return false;
//
//     if (raw == null)
//         return false;
//
//     if (!('id' in raw) || typeof(raw.id) !== 'string')
//         return false;
//
//     if ('name' in raw && typeof(raw.name) !== 'string')
//         return false;
//
//     if ('description' in raw && typeof(raw.description) !== 'string')
//         return false;
//
//     if ('transformIncomingRequest' in raw && typeof(raw.transformIncomingRequest) !== 'function')
//         return false;
//
//     if ('transformOutgoingResponse' in raw && typeof(raw.transformOutgoingResponse) !== 'function')
//         return false;
//
//     if ('transformOutgoingRequest' in raw && typeof(raw.transformOutgoingRequest) !== 'function')
//         return false;
//
//     if ('transformIncomingResponse' in raw && typeof(raw.transformIncomingResponse) !== 'function')
//         return false;
//
//     return true;
// }
