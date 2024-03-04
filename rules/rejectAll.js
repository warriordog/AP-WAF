import { drop } from '../dist/domain/filter/action.js';
import {Rule} from "../src/domain/rules/rule.js";

export class RejectAll extends Rule {
    id = 'RejectAll';
    name = 'Reject All';
    description = 'Rejects all traffic';

    transformIncomingRequest(context) {
        return drop;
    }

    transformOutgoingRequest(context) {
        return drop;
    }
}

export default { RejectAll };
