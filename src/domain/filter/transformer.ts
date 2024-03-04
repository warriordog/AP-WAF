import {Action} from "./action.js";
import {Request} from "./request.js";

export type RequestTransformer = (request: Request) => Promise<Action>
export type ResponseTransformer = (request: Request, response: Response) => Promise<Action>


export function isTransformer(raw: unknown): raw is RequestTransformer {
    return typeof(raw) === 'function'
}
