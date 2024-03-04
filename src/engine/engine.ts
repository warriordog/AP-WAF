import {Action, forward} from "../domain/filter/action.js";
import {Request} from "../domain/filter/request.js";
import {EngineConfig} from "./engineConfig.js";

export class Engine {
    constructor(
        readonly config: Readonly<EngineConfig>
    ) {}

    /**
     * Filters an outgoing (from local to internet) request.
     */
    async transformOutgoing(request: Request): Promise<Action> {
        // TODO implement the actual pipeline
        return { type: forward };
    }

    /**
     * Filters an incoming (from internet to local) request.
     */
    async transformIncoming(request: Request): Promise<Action> {
        // TODO implement the actual pipeline
        return { type: forward };
    }
}
