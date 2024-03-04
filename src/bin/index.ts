import {ApWaf} from "../main/apWaf.js";
import {Engine} from "../engine/engine.js";
import {ForwardProxy} from "../proxy/forward/forwardProxy.js";
import {ReverseProxy} from "../proxy/reverse/reverseProxy.js";

const engine = new Engine({});
const forwardProxy = new ForwardProxy({});
const reverseProxy = new ReverseProxy({});
const waf = new ApWaf({}, console, engine, forwardProxy, reverseProxy)

await waf.start();
await waf.stop();
