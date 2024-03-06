import {RuleRegistryConfig, RuleSetting} from "./ruleRegistryConfig.js";
import {Rule} from "../../domain/rules/rule.js";
import {RuleConstructor, RuleSet} from "../../domain/rules/ruleSet.js";
import {Json} from "../../domain/json.js";

export class RuleRegistry {
    private readonly _ruleConstructors: Map<string, RuleConstructor> = new Map();
    private readonly _ruleInstances: Map<string, Rule> = new Map();

    private _enabledRules: Rule[] = [];
    private _incomingRequestRules: Rule[] = [];
    private _incomingResponseRules: Rule[] = [];
    private _outgoingRequestRules: Rule[] = [];
    private _outgoingResponseRules: Rule[] = [];

    get ruleConstructors(): ReadonlyMap<string, RuleConstructor> {
        return this._ruleConstructors;
    }
    get ruleInstances(): ReadonlyMap<string, Rule> {
        return this._ruleInstances;
    }
    get enabledRules(): readonly Rule[] {
        return this._enabledRules;
    }
    get incomingRequestRules(): readonly Rule[] {
        return this._incomingRequestRules;
    }
    get incomingResponseRules(): readonly Rule[] {
        return this._incomingResponseRules;
    }
    get outgoingRequestRules(): readonly Rule[] {
        return this._outgoingRequestRules;
    }
    get outgoingResponseRules(): readonly Rule[] {
        return this._outgoingResponseRules;
    }

    constructor(
        private readonly config: Readonly<RuleRegistryConfig>
    ) {}

    clear() {
        this._ruleConstructors.clear();
        this._ruleInstances.clear();
        this._enabledRules = [];
        this._incomingRequestRules = [];
        this._incomingResponseRules = [];
        this._outgoingRequestRules = [];
        this._outgoingResponseRules = [];
    }

    /**
     * Adds all rules from a collection of rule sets.
     * @param ruleSets Collection of rule sets to add. can be empty.
     * @param onError Optional error-handling callback. If provided, then errors will be caught and passed to this function. If not provided, then errors are thrown as usual.
     */
    addRuleSets(ruleSets: Iterable<RuleSet>, onError?: (error: Error) => void): void {
        for (const ruleSet of ruleSets) {
            this.addRuleSet(ruleSet, onError);
        }
    }

    /**
     * Adds all rules from the given rule set.
     * @param ruleSet Set to add. Can be empty.
     * @param onError Optional error-handling callback. If provided, then errors will be caught and passed to this function. If not provided, then errors are thrown as usual.
     */
    addRuleSet(ruleSet: RuleSet, onError?: (error: Error) => void): void {
        for (const [id, constructor] of Object.entries(ruleSet)) {
            if (!constructor) continue;

            try {
                this.addRule(id, constructor);

            } catch (e) {
                if (!onError) throw e;

                const error = e instanceof Error
                    ? e
                    : new Error(String(e));
                onError(error);
            }
        }
    }

    addRule(id: string, constructor: RuleConstructor): void {
        if (this._ruleConstructors.has(id))
            throw new Error(`DuplicateRuleId: detected multiple rules with ID ${id}`);

        // *Always* add the constructor.
        // Future work will allow rules to be enabled / disabled at runtime.
        this._ruleConstructors.set(id, constructor);

        // Construct the instance.
        // This can throw if there's a startup error, so it needs to be towards the end.
        const ruleSettings = this.config.settings[id];
        const ruleConfig = getConfig(ruleSettings);
        const instance = new constructor(ruleConfig);
        this._ruleInstances.set(id, instance);

        // Pre-cache lookups
        if (isEnabled(ruleSettings)) {
            this._enabledRules.push(instance);

            if (instance.transformIncomingRequest)
                this._incomingRequestRules.push(instance);

            if (instance.transformIncomingResponse)
                this._incomingResponseRules.push(instance);

            if (instance.transformOutgoingRequest)
                this._outgoingRequestRules.push(instance);

            if (instance.transformOutgoingResponse)
                this._outgoingResponseRules.push(instance);
        }
    }
}

function isEnabled(setting: RuleSetting | undefined): boolean {
    if (!setting)
        return false;

    if (typeof(setting) === 'string')
        return setting === 'on';

    return setting[0] === 'on';
}

function getConfig(setting: RuleSetting | undefined): Json {
    if (Array.isArray(setting) && setting.length === 2)
        return setting[1];

    return null;
}
