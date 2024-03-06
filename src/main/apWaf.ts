import {MainConfig} from "./config/mainConfig.js";
import {Engine} from "../engine/engine.js";
import {ForwardProxy} from "../proxy/forward/forwardProxy.js";
import {ReverseProxy} from "../proxy/reverse/reverseProxy.js";
import {Logger} from "./logging/logger.js";
import {Action, RequestAction, ResponseAction} from "../domain/filter/action.js";
import {Request} from "../domain/filter/request.js";
import {RequestContext, ResponseContext} from "../domain/filter/transformer.js";
import {RuleRegistry} from "../rules/registry/ruleRegistry.js";
import {RuleLoader} from "../rules/loader/ruleLoader.js";

export class ApWaf {
    constructor(
        private readonly _config: Readonly<MainConfig>,
        private readonly _logger: Logger,
        private readonly _engine: Engine,
        private readonly _forwardProxy: ForwardProxy,
        private readonly _reverseProxy: ReverseProxy,
        private readonly _ruleRegistry: RuleRegistry,
        private readonly _ruleLoader: RuleLoader
    ) {}

    async init(): Promise<void> {
        this._logger.debug("Initializing AP-WAF...");

        this._logger.debug("Loading external rules");
        const ruleSets = await this._ruleLoader.loadAllRuleSets(error =>
            this._logger.error(error)
        );

        this._logger.debug("Constructing rule classes");
        this._ruleRegistry.addRuleSets(ruleSets, error =>
            this._logger.error(error)
        );

        this._logger.info("Initialized AP-WAF.");
    }

    async start(): Promise<void> {
        this._logger.debug("Starting AP-WAF...");

        this._logger.debug("Starting forward proxy");
        await this._forwardProxy.start({
            requestTransformer: this._transformOutgoingRequest.bind(this),
            responseTransformer: this._transformIncomingResponse.bind(this)
        });

        this._logger.debug("Starting reverse proxy");
        await this._reverseProxy.start({
            requestTransformer: this._transformIncomingRequest.bind(this),
            responseTransformer: this._transformOutgoingResponse.bind(this)
        });

        this._logger.info("Started AP-WAF");
    }

    async stop(): Promise<void> {
        this._logger.debug("Stopping AP-WAF...");

        this._logger.debug("Stopping forward proxy");
        await this._forwardProxy.stop();

        this._logger.debug("Stopping reverse proxy");
        await this._reverseProxy.stop();

        this._logger.info("Stopped AP-WAF");
    }

    private async _transformOutgoingRequest(context: RequestContext): Promise<RequestAction> {
        const action = await this._engine.transformOutgoingRequest(context);

        if (this._config.logRequests)
            this._logAction('Outgoing Request to', context.request, action);

        return action;
    }

    private async _transformIncomingResponse(context: ResponseContext): Promise<ResponseAction> {
        const action = await this._engine.transformIncomingResponse(context);

        if (this._config.logRequests)
            this._logAction('Incoming Response from', context.request, action);

        return action;
    }


    private async _transformIncomingRequest(context: RequestContext): Promise<RequestAction> {
        const action = await this._engine.transformIncomingRequest(context);

        if (this._config.logRequests)
            this._logAction('Incoming Request from', context.request, action);

        return action;
    }

    private async _transformOutgoingResponse(context: ResponseContext): Promise<ResponseAction> {
        const action = await this._engine.transformOutgoingResponse(context);

        if (this._config.logRequests)
            this._logAction('Outgoing Response to', context.request, action);

        return action;
    }

    private _logAction(operation: string, request: Request, { description: action }: Action): void {
        const target = request.url;
        this._logger.info('%s %s %s', action, operation, target);
    }
}
