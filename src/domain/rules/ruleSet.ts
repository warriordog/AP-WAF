import {Rule} from "./rule.js";
import {Json} from "../json.js";

export type RuleSet = Partial<Record<string, RuleConstructor>>;
export type RuleConstructor = new (config: Json) => Rule;

// export function isRuleSet(raw: unknown): raw is RuleSet {
//     if (typeof(raw) !== 'object')
//         return false;
//
//     if (raw == null)
//         return false;
//
//     return Object
//         .values(raw)
//         .every(r => isRule(r));
// }
