import {RuleSet} from "../../domain/rules/ruleSet.js";
import {DomainDenyList} from "./domainDenyList.js";
import {StripSignatures} from "./stripSignatures.js";

/**
 * All rules that are bundled into the application code.
 * New internal rules *must* be added here.
 */
export const allInternalRules: RuleSet = {
    DomainDenyList,
    StripSignatures
};
