import {RuleConstructor, RuleSet} from "../../domain/rules/ruleSet.js";
import {RuleLoaderConfig} from "./ruleLoaderConfig.js";
import {access, readdir} from "fs/promises";
import { R_OK } from "constants";
import {Awaitable} from "../../domain/filter/transformer.js";

export class RuleLoader {
    constructor(
        readonly config: Readonly<RuleLoaderConfig>
    ) {}

    /**
     * Loads all rule sets from the configured rules directory.
     * @param onError Optional error-handling callback. If provided, then errors will be caught and passed to this function. If not provided, then errors are thrown as usual.
     */
    public async loadAllRuleSets(onError?: (error: Error) => Awaitable<void>): Promise<RuleSet[]> {
        const ruleSets: RuleSet[] = [];

        const files = await readdir(this.config.rulesDirectory);
        for (const file of files) {
            const moduleSpec = `${this.config.rulesDirectory}${file}`;
            const module = await import(moduleSpec);

            if (isModule(module)) {
                const ruleSet = module.default;
                ruleSets.push(ruleSet);

            } else {
                const error = new Error(`InvalidModule: rule file '${file}' did not export a valid rule set.`);
                if (onError) await onError(error);
                else throw error;
            }
        }

        return ruleSets;
    }

    /**
     * Loads an external rule set by name.
     * @param moduleName module import specifier, not including the prefix
     */
    public async loadRuleSet(moduleName: string): Promise<RuleSet> {
        const module = await this._loadRuleModule(moduleName);
        if (!isModule(module))
            throw new Error(`InvalidModule: rule module '${moduleName}' did not export a valid rule set.`);

        return module.default;
    }

    private async _loadRuleModule(moduleName: string): Promise<unknown> {
        for (const extension of this.config.moduleExtensions) {
            const moduleSpec = `${this.config.rulesDirectory}${moduleName}${extension}`;

            if (await existsAsync(moduleSpec))
                return await import(moduleSpec);
        }

        throw new Error(`NoSuchRule: Cannot find rule module '${moduleName}'`);
    }
}

interface RuleModule {
    default: RuleSet;
}
function isModule(raw: unknown): raw is RuleModule {
    if (typeof(raw) !== 'object') return false;
    if (raw == null) return false;
    if (!('default' in raw)) return false;

    return isRuleSet(raw.default);
}
function isRuleSet(raw: unknown) : raw is RuleSet {
    if (typeof(raw) !== 'object') return false;
    if (raw == null) return false;

    return Object
        .values(raw)
        .every(e => isRuleConstructor(e));
}
function isRuleConstructor(raw: unknown): raw is RuleConstructor {
    return typeof(raw) === 'function';
}

async function existsAsync(path: string): Promise<boolean> {
    try {
        await access(path, R_OK);
        return true;
    } catch {
        return false;
    }
}
