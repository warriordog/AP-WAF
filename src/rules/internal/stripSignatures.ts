import {Rule} from "../../domain/rules/rule.js";
import {Action, transform} from "../../domain/filter/action.js";

export async function stripSignaturesFromRequest(request: Request): Promise<Action> {

    // TODO implement
    return { type: transform, request };
}

export const stripSignatures: Rule = {
    id: 'stripSignatures',
    name: 'Strip Signatures',
    description: 'Removes Linked Data signatures from messages, to ensure that transformed messages are accepted. It is *highly* recommended to keep this enabled!',

    transformIncoming: stripSignaturesFromRequest,
    transformOutgoing: stripSignaturesFromRequest
}
