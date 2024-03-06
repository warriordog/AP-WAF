export interface RuleLoaderConfig {
    /**
     * File extensions to use for resolving rule classes.
     * Extensions will be checked in-order, with earlier entries having priority.
     * Default: ['.js', '.mjs', '.cjs']
     */
    moduleExtensions: string[];

    /**
     * Path to the rules directory.
     * Must start with './' and end with '/'.
     * Default: './rules/'
     */
    rulesDirectory: string;
}

export function readRuleLoaderConfig(raw: unknown): RuleLoaderConfig {
    const config: RuleLoaderConfig = {
        moduleExtensions: ['.js', '.mjs', '.cjs'],
        rulesDirectory: './rules/'
    };

    if (typeof(raw) === 'object' && raw != null) {
        if ('moduleExtensions' in raw && Array.isArray(raw.moduleExtensions))
            config.moduleExtensions = raw.moduleExtensions.filter(e => typeof(e) === 'string') as string[];

        if ('rulesDirectory' in raw && typeof(raw.rulesDirectory) === 'string')
            config.rulesDirectory = raw.rulesDirectory;
    }

    return config;
}
