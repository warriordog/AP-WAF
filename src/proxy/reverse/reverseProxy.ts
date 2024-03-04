import {ReverseProxyConfig} from "./reverseProxyConfig.js";
import {Proxy} from "../common/proxy.js";
import {ProxyIntegrations} from "../common/proxyIntegrations.js";

export class ReverseProxy implements Proxy {
    public constructor(
        readonly config: Readonly<ReverseProxyConfig>
    ) {}

    async start(integrations: ProxyIntegrations): Promise<void> {

    }

    async stop(): Promise<void> {

    }
}
