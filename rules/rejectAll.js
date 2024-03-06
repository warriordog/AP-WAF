import { drop } from '../dist/domain/filter/action.js';
import {Rule} from "../src/domain/rules/rule.js";

/*
 * Implementing a rule is easy.
 * First, you create a JavaScript file in the "rules" folder.
 * Then, you implement one or more rule classes as shown below.
 */

/**
 * Sample rule to demonstrate extension mechanism.
 * All rules are implemented as ES classes extending from Rule.
 */
export class RejectAll extends Rule {
    /*
     * All rules have an ID.
     * This must be unique, as rule IDs are used for locating the appropriate settings in the application config.
     * By convention, this should match the class name.
     */
    id = 'RejectAll';

    /*
     * You may optionally add a human-readable name.
     * This will be shown in the admin UI.
     */
    name = 'Reject All';

    /*
     * You may optionally add a human-readable description.
     * This will be shown in the admin UI.
     */
    description = 'Rejects all ActivityPub traffic, effectively defederating the instance.';

    /*
     * You should implement one or more of the "transform" methods.
     * Transform methods accept a RequestContext or ResponseContext, and return a RequestAction or ResponseAction respectively.
     * The methods may be async and may also return no value, which will implicitly trigger the "forward" (no-op) action.
     */

     /*
     * This transformer will be called for each incoming request from a remote server, *before* it is passed to the local target.
     */
    transformIncomingRequest(context) {
        return drop;
    }

    /*
    * This transformer will be called for each outgoing request from the local server, *before* it is passed to the remote target.
    */
    transformOutgoingRequest(context) {
        return drop;
    }

    /*
     * If your rule needs special configuration settings, you may load them by defining a constructor that accepts one argument of type "Json".
     * This will contain the provided configuration value, or null if none was provided.
     * Rules may throw an Error if the configuration is invalid, or they may implement flexible fail-safe parsing. Either is acceptable.
     */
}

/*
 * Finally, you MUST default-export all rule classes as part of an object hash.
 * Keys must match the ID specified in the class itself.
 */
export default { RejectAll };
