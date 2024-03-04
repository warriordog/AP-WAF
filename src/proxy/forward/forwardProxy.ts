import {ForwardProxyConfig} from "./forwardProxyConfig.js";
import {Proxy} from "../common/proxy.js";
import {ProxyIntegrations} from "../common/proxyIntegrations.js";

export class ForwardProxy implements Proxy {
    public constructor(
        readonly config: Readonly<ForwardProxyConfig>
    ) {}

    async start(integrations: ProxyIntegrations): Promise<void> {

    }

    async stop(): Promise<void> {

    }
}
