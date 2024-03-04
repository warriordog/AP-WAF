import {Rule} from "../../domain/rules/rule.js";
import {Json, JsonObject} from "../../domain/json.js";
import {RequestContext} from "../../domain/filter/transformer.js";
import {Payload} from "../../domain/filter/payload.js";
import {domainMatches, parseDomain, Domain} from "../../domain/domain.js";
import {drop} from "../../domain/filter/action.js";
import {isJsonLdType} from "../../domain/filter/contentTypes.js";

export class DomainDenyList extends Rule {
    public readonly id = 'DomainDenyList';
    public readonly name = 'Domain Deny-List';
    public readonly description = 'Rejects messages from a list of blocked domains.';

    public readonly filterIncoming: boolean = true;
    public readonly filterOutgoing: boolean = true;
    public readonly domains: Domain[] = [];

    constructor(
        config: Json
    ) {
        super();

        // Config object is user-editable, so don't trust anything about it.
        if (typeof(config) === 'object' && config != null) {
            if ('filterIncoming' in config)
                this.filterIncoming = config.filterIncoming === true;

            if ('filterOutgoing' in config)
                this.filterOutgoing = config.filterOutgoing === true;

            if ('domains' in config && Array.isArray(config.domains))
                this.domains = config.domains
                    .filter(d => typeof(d) === 'string')
                    .map(host => parseDomain(host as string)) as Domain[];
        }
    }

    transformIncomingRequest({ request: { payload }}: RequestContext) {
        // For incoming requests, we instead need to check the payload
        if (this.filterIncoming && payload && this.checkPayload(payload))
            return drop;
    }

    transformOutgoingRequest({request: { url }}: RequestContext) {
        // For outgoing requests, we just need to check the domain
        if (this.filterOutgoing && this.checkUrl(url))
            return drop;
    }

    /**
     * Returns true if the object / target matches any blocked domain
     */
    private checkPayload(payload: Payload | undefined): boolean {
        // Make sure we can parse it.
        if (!payload)
            return false;
        if (!isJsonLdType(payload))
            return false;
        if (!payload.json)
            return false;

        if (Array.isArray(payload.json))
            return payload.json
                .filter(e => typeof(e) === 'object' && e != null)
                .some(e => this.checkPayloadEntry(e as JsonObject));

        return this.checkPayloadEntry(payload.json);
    }

    private checkPayloadEntry(json: Json): boolean {
        if (typeof(json) !== 'object')
            return false;
        if (json == null)
            return false;

        // Pre-check the object ID.
        // This will match most cases, but *not* boosts, likes, and other activities.
        if (this.checkJson(json))
            return true;

        // Now we check activity targets for the interactions.
        // Technically, we should check the type here.
        // But that's a lot of work and kinda brittle, so let's do it the lazy way instead.
        if ('target' in json && this.checkJson(json.target))
            return true;
        if ('object' in json && this.checkJson(json.object))
            return true;

        return false;
    }

    private checkJson(json: Json | undefined): boolean {
        if (typeof(json) !== 'object')
            return false;
        if (json == null)
            return false;
        if (!('id' in json))
            return false;
        if (typeof(json.id) !== 'string')
            return false;
        if (!URL.canParse(json.id))
            return false;

        const url = new URL(json.id);
        return this.checkUrl(url);
    }

    // /**
    //  * Returns true if the JSON contains any blocked domains.
    //  */
    // private checkJson(json: Json): boolean {
    //     // Check strings
    //     if (typeof(json) === 'string' && URL.canParse(json))
    //         return this.checkUrl(new URL(json));
    //
    //     if (Array.isArray(json))
    //         return json.some(element => this.checkJson(element));
    //
    //     if (typeof(json) === 'object' && json != null)
    //         return Object.values(json).some(value => value !== undefined && this.checkJson(value));
    //
    //     return false;
    // }

    /**
     * returns true if the URL matches any blocked domain
     */
    private checkUrl(url: URL): boolean {
        const domain = parseDomain(url.host);
        return this.domains.some(blocked => domainMatches(domain, blocked));
    }
}

export default { DomainDenyList };
