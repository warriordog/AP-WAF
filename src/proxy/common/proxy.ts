import {ProxyIntegrations} from "./proxyIntegrations.js";

export interface Proxy {
    start(integrations: ProxyIntegrations): Promise<void>;
    stop(): Promise<void>;
}
