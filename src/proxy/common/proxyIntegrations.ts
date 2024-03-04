import {RequestTransformer} from "../../domain/filter/transformer.js";

export interface ProxyIntegrations {
    transformer?: RequestTransformer;
}
