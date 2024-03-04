import {MainConfig} from "./config/mainConfig.js";
import {Engine} from "../engine/engine.js";
import {ForwardProxy} from "../proxy/forward/forwardProxy.js";
import {ReverseProxy} from "../proxy/reverse/reverseProxy.js";
import {Logger} from "./logging/logger.js";
import {Action} from "../domain/filter/action.js";
import {Request} from "../domain/filter/request.js";

export class ApWaf {
    constructor(
        private readonly _config: Readonly<MainConfig>,
        private readonly _logger: Logger,
        private readonly _engine: Engine,
        private readonly _forwardProxy: ForwardProxy,
        private readonly _reverseProxy: ReverseProxy
    ) {}

    async start(): Promise<void> {
        this._logger.debug("Starting AP-WAF...");

        this._logger.debug("Starting forward proxy");
        await this._forwardProxy.start({
            transformer: this._transformOutgoing.bind(this)
        });

        this._logger.debug("Starting reverse proxy");
        await this._reverseProxy.start({
            transformer: this._transformIncoming.bind(this)
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

    private async _transformIncoming(request: Request): Promise<Action> {
        const action = await this._engine.transformIncoming(request);

        if (this._config.logRequests)
            this._logAction('Incoming', request, action);

        return action;
    }

    private async _transformOutgoing(request: Request): Promise<Action> {
        const action = await this._engine.transformOutgoing(request);

        if (this._config.logRequests)
            this._logAction('Outgoing', request, action);

        return action;
    }

    private _logAction(direction: string, request: Request, action: Action): void {
        const description = action.type.description;
        const uri = request.url;
        this._logger.info('%s %s to %s', description, direction, uri);
    }
}
