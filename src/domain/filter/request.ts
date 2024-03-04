import {Payload} from "./payload.js";

export interface Request {
    url: URL;
    payload?: Payload;
}
