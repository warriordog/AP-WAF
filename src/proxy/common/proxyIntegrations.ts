import {Request} from "../../domain/filter/request.js";
import {Action} from "../../domain/filter/action.js";
import {RequestContext, RequestTransformer, ResponseTransformer} from "../../domain/filter/transformer.js";

export interface ProxyIntegrations {
    requestTransformer?: RequestTransformer;
    responseTransformer?: ResponseTransformer;
}
