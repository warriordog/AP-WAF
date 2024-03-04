import {Payload} from "./payload.js";

export interface Response {
    code: number;
    payload?: Payload;
}
