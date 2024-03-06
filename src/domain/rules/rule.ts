import {
    Awaitable,
    RequestContext,
    ResponseContext
} from "../filter/transformer.js";
import {RequestAction, ResponseAction} from "../filter/action.js";

// TODO - consider making these static so that we don't have create an instance to get metadata.

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
