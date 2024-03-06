import {Rule} from "./rule.js";
import {Json} from "../json.js";

export type RuleSet = Partial<Record<string, RuleConstructor>>;
export type RuleConstructor = new (config: Json) => Rule;
