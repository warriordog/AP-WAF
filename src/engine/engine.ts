import {forward, RequestAction, ResponseAction} from "../domain/filter/action.js";
import {EngineConfig} from "./engineConfig.js";
import {RequestContext, ResponseContext} from "../domain/filter/transformer.js";

export class Engine {
    constructor(
        readonly config: Readonly<EngineConfig>
    ) {}

    /**
     * Filters an outgoing (from local to internet) request.
     */
    async transformOutgoingRequest(context: RequestContext): Promise<RequestAction> {
        // TODO implement the actual pipeline
        return forward;
    }

    /**
     * Filters an incoming (from internet to local) response.
     * These responses are guaranteed to originate from outgoing responses.
     */
    async transformIncomingResponse(context: ResponseContext): Promise<ResponseAction> {
        // TODO implement the actual pipeline
        return forward;
    }

    /**
     * Filters an incoming (from internet to local) request.
     */
    async transformIncomingRequest(context: RequestContext): Promise<RequestAction> {
        // TODO implement the actual pipeline
        return forward;
    }

    /**
     * Filters an outgoing (from local to internet) response.
     * These responses are guaranteed to originate from incoming responses.
     */
    async transformOutgoingResponse(context: ResponseContext): Promise<ResponseAction> {
        // TODO implement the actual pipeline
        return forward;
    }
}
