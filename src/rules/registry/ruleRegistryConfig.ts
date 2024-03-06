import {Json} from "../../domain/json.js";

export interface RuleRegistryConfig {
    settings: Partial<Record<string, RuleSetting>>;
}
export type RuleSetting = RuleSettingShorthand | RuleSettingLonghand | RuleSettingTuple;
export type RuleSettingShorthand = 'on' | 'off';
export type RuleSettingLonghand = [ RuleSettingShorthand ];
export type RuleSettingTuple = [ RuleSettingShorthand, Json ];
