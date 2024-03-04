import {RequestAction, ResponseAction} from "./action.js";
import {Request} from "./request.js";
import {Response} from './response.js'

export interface RequestTransformer {
    (context: RequestContext): Awaitable<RequestAction | void>;
}

export interface RequestContext {
    readonly requestStart: Date;
    request: Request;
    response?: Response;
}

export interface ResponseTransformer {
    (context: ResponseContext): Awaitable<ResponseAction | void>;
}

export interface ResponseContext {
    readonly requestStart: Date;
    readonly responseStart: Date;

    readonly request: Readonly<Request>;
    response: Response;
}

export type Awaitable<T> = Promise<T> | T;
