import { expect } from 'chai';
import configurator from '../src';

describe('Defaults', () => {
    // eslint-disable-next-line prefer-arrow-callback
    it('Should set defaults when configuration is empty', function () {
        const defaults = {
            string: 'abc',
            number: 1,
        };

        const getConfig = configurator({ defaults });
        const config = getConfig({});

        expect(config).to.deep.equal(defaults);
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should set defaults when configuration is not provided', function () {
        const defaults = {
            string: 'abc',
            number: 1,
        };

        const getConfig = configurator({ defaults });
        const config = getConfig();

        expect(config).to.deep.equal(defaults);
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should return provided config when no defaults are set', function () {
        const input = {
            string: 'abc',
            number: 1,
        };

        const getConfig = configurator();
        const config = getConfig(input);

        expect(config).to.deep.equal(input);
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should return empty config when no defaults are set and no config is provided', function () {
        const getConfig = configurator();
        const config = getConfig();

        expect(config).to.deep.equal({});
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should not change provided config', function () {
        const defaults = {
            string: 'abc',
            number: 1,
        };

        const getConfig = configurator({ defaults });
        const config = getConfig({ string: 'efg' });

        expect(config).to.deep.equal({
            string: 'efg',
            number: 1,
        });
    });
});

describe('Aliases', () => {
    // eslint-disable-next-line prefer-arrow-callback
    it('Should set aliases in the config', function () {
        const aliases = {
            1: 'ONE',
            2: 'TWO',
        };

        const getConfig = configurator({ aliases });
        const config = getConfig({
            1: 'red',
            2: 'blue',
        });

        expect(config).to.deep.equal({
            ONE: 'red',
            TWO: 'blue',
        });
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should delete aliased keys in the config', function () {
        const aliases = {
            1: 'ONE',
            2: 'TWO',
        };

        const getConfig = configurator({ aliases });
        const config = getConfig({
            1: 'red',
            2: 'blue',
        });

        expect(config[1]).to.be.undefined;
        expect(config[2]).to.be.undefined;
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should not change non aliased keys in the config', function () {
        const aliases = {
            1: 'ONE',
            2: 'TWO',
        };

        const getConfig = configurator({ aliases });
        const config = getConfig({
            1: 'red',
            2: 'blue',
            3: 'purple',
        });

        expect(config).to.deep.equal({
            ONE: 'red',
            TWO: 'blue',
            3: 'purple',
        });
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should not alias any keys when no aliases are provided', function () {
        const input = {
            1: 'ONE',
            2: 'TWO',
        };

        const getConfig = configurator({});
        const config = getConfig(input);

        expect(config).to.deep.equal(input);
    });
});

describe('Defaults with Aliases', () => {
    // eslint-disable-next-line prefer-arrow-callback
    it('Should set defaults and aliases in the config', function () {
        const aliases = {
            1: 'ONE',
            2: 'TWO',
        };

        const defaults = {
            string: 'abc',
            number: 1,
        };

        const getConfig = configurator({ defaults, aliases });
        const config = getConfig({
            1: 'red',
            2: 'blue',
            string: 'abc',
        });

        expect(config).to.deep.equal({
            ONE: 'red',
            TWO: 'blue',
            string: 'abc',
            number: 1,
        });
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should not change provided config', function () {
        const defaults = {
            string: 'abc',
            NUMBER: 1,
        };

        const aliases = {
            number: 'NUMBER',
            2: 'TWO',
        };

        const getConfig = configurator({ defaults, aliases });
        const config = getConfig({ string: 'efg', number: 1 });

        expect(config).to.deep.equal({
            string: 'efg',
            NUMBER: 1,
        });
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should ignore aliases for which config is not provided', function () {
        const defaults = {
            string: 'abc',
            NUMBER: 1,
        };

        const aliases = {
            number: 'NUMBER',
            2: 'TWO',
        };

        const getConfig = configurator({ defaults, aliases });
        const config = getConfig({ string: 'efg', number: 2 });

        expect(config).to.deep.equal({
            string: 'efg',
            NUMBER: 2,
        });
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('Should ignore keyToBeAliased when alias is also provided', function () {
        const aliases = {
            number: 'NUMBER',
        };

        const getConfig = configurator({ aliases });
        const config = getConfig({ number: 2, NUMBER: 3 });

        expect(config).to.deep.equal({
            NUMBER: 3,
        });
        expect(config.number).to.be.undefined;
    });
});
