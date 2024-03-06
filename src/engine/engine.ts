import {drop, forward, intercept, RequestAction, ResponseAction} from "../domain/filter/action.js";
import {EngineConfig} from "./engineConfig.js";
import {Awaitable, RequestContext, ResponseContext} from "../domain/filter/transformer.js";
import {RuleRegistry} from "../rules/registry/ruleRegistry.js";
import {Rule} from "../domain/rules/rule.js";

export class Engine {
    constructor(
        readonly config: Readonly<EngineConfig>,
        private readonly _ruleRegistry: RuleRegistry
    ) {}

    /**
     * Filters an outgoing (from local to internet) request.
     */
    public async transformOutgoingRequest(context: RequestContext): Promise<RequestAction> {
        const rules = this._ruleRegistry.outgoingRequestRules;
        const callback = async (rule: Rule) => await rule.transformOutgoingRequest?.(context);
        return await this._transformRequest(rules, callback);
    }

    /**
     * Filters an incoming (from internet to local) response.
     * These responses are guaranteed to originate from outgoing responses.
     */
    public async transformIncomingResponse(context: ResponseContext): Promise<ResponseAction> {
        const rules = this._ruleRegistry.incomingResponseRules;
        const callback = async (rule: Rule) => await rule.transformIncomingResponse?.(context);
        return await this._transformResponse(rules, callback);
    }

    /**
     * Filters an incoming (from internet to local) request.
     */
    public async transformIncomingRequest(context: RequestContext): Promise<RequestAction> {
        const rules = this._ruleRegistry.incomingRequestRules;
        const callback = async (rule: Rule) => await rule.transformIncomingRequest?.(context);
        return await this._transformRequest(rules, callback);
    }

    /**
     * Filters an outgoing (from local to internet) response.
     * These responses are guaranteed to originate from incoming responses.
     */
    public async transformOutgoingResponse(context: ResponseContext): Promise<ResponseAction> {
        const rules = this._ruleRegistry.outgoingResponseRules;
        const callback = async (rule: Rule) => await rule.transformOutgoingResponse?.(context);
        return await this._transformResponse(rules, callback);
    }

    private async _transformRequest(rules: readonly Rule[], callback: (rule: Rule) => Awaitable<RequestAction | void>): Promise<RequestAction> {
        let finalAction: RequestAction = forward;

        for (const rule of rules) {
            const ruleAction = await callback(rule);
            if (ruleAction && ruleAction !== forward)
                finalAction = ruleAction;

            if (finalAction === drop || finalAction === intercept)
                break;
        }

        return finalAction;
    }

    private async _transformResponse(rules: readonly Rule[], callback: (rule: Rule) => Awaitable<ResponseAction | void>): Promise<ResponseAction> {
        let finalAction: ResponseAction = forward;

        for (const rule of rules) {
            const ruleAction = await callback(rule);
            if (ruleAction && ruleAction !== forward)
                finalAction = ruleAction;

            if (finalAction === drop)
                break;
        }

        return finalAction;
    }
}
