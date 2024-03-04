import {isRule, Rule} from "./rule.js";

export type RuleSet = Rule | Rule[];

export function isRuleSet(raw: unknown): raw is RuleSet {
    if (typeof(raw) !== 'object')
        return false;

    if (raw == null)
        return false;

    if (Array.isArray(raw))
        return raw.every((r: unknown) => isRule(r));

    return isRule(raw);
}
