import {Rule} from "../../domain/rules/rule.js";
import {transform} from "../../domain/filter/action.js";
import {Json} from "../../domain/json.js";
import {RequestContext, ResponseContext} from "../../domain/filter/transformer.js";
import {isJsonLdType} from "../../domain/filter/contentTypes.js";
import {Payload} from "../../domain/filter/payload.js";

export const stripSignatures: Rule = {
    id: 'stripSignatures',
    name: 'Strip Signatures',
    description: 'Removes Linked Data signatures from messages, to ensure that transformed messages are accepted. It is *highly* recommended to keep this enabled!',

    transformIncomingRequest: stripSignaturesFromRequest,
    transformOutgoingResponse: stripSignaturesFromResponse,

    transformOutgoingRequest: stripSignaturesFromRequest,
    transformIncomingResponse: stripSignaturesFromResponse
}

export default { stripSignatures };

export function stripSignaturesFromRequest(context: RequestContext) {
    stripSignaturesFromPayload(context.request.payload);
}
export function stripSignaturesFromResponse(context: ResponseContext) {
    stripSignaturesFromPayload(context.response.payload);
}

function stripSignaturesFromPayload(payload: Payload | undefined) {
    if (payload && isJsonLdType(payload) && payload?.json) {
        // TODO check for context
        stripJson(payload.json);
        return transform;
    }
}

/**
 * Recursively walks a JSON payload to delete any "signature" properties.
 */
function stripJson(json: Json): void {
    if (typeof(json) !== 'object')
        return;

    if (json === null)
        return;

    if (Array.isArray(json))
        for (const j of json)
            stripJson(j);

    // Anything else must be an object
    if ('signature' in json)
        delete json.signature;

    for (const j of Object.values(json))
        if (j !== undefined)
            stripJson(j);
}
