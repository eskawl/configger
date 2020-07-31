function configurator({ defaults = {}, aliases = {} } = {}) {
    return (config = {}) => {
        const result = {
            ...config,
        };

        Object.entries(aliases).forEach(([keyToBeAliased, alias]) => {
            if (keyToBeAliased in result) {
                if (alias in result) {
                    // Both alias and keyToBeAlias are given
                    delete result[keyToBeAliased];
                    return;
                }
                result[alias] = result[keyToBeAliased];
                delete result[keyToBeAliased];
            }
        });

        Object.entries(defaults).forEach(([key, value]) => {
            if (!(key in result)) {
                result[key] = value;
            }
        });

        return result;
    };
}

export default configurator;
