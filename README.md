## JustConfig

Easily set default values and aliases for configurations

[![Coverage Status](https://coveralls.io/repos/github/eskawl/just-config/badge.svg?branch=master)](https://coveralls.io/github/eskawl/just-config?branch=master)
![Build](https://github.com/eskawl/just-config/workflows/Build/badge.svg)
[![License](https://badgen.net/npm/license/just-config)](https://www.npmjs.org/package/just-config)
[![npm version](https://img.shields.io/npm/v/just-config.svg?logo=npm&style=popout)](https://www.npmjs.org/package/just-config)

### Installing

Using NPM:

```bash
npm i just-config
```

Using yarn:

```bash
yarn add just-config
```



### Importing
```js
const configurator = require('just-config')
```
or in ES6
```js
import configurator from 'just-config';
```

### Usage 
`configurator` takes in an object with the following keys
- `defaults`: (Optional, defaults to `{}`) An object containing default configuration values. If the original configuration already contains keys provided in default, they are not changed.
- `aliases`: (Optional, defaults to `{}`) An object containing keys for the aliases. This should be given in the form of `keyToBeAliased: alias`. If the `keyToBeAliased` is present in the original configuration, it will be replaced by `alias`. If you intend to provide a default for the `alias` use `alias` in the `defaults` configuration instead of `keyToBeAliased`.

returns a function which takes in an original configuration and sets defaults and aliases.


#### Example
Calling `configurator` returns a function to which you can pass a configuration to which defaults are to be applied. Lets call that function `getConfig`.

```js
const defaults = {
    logging: false,
    debug: false,
}

const getConfig = configurator({
    defaults,
});

const originalConfiguration = {
    speed: 'fast',
    debug: 'true',
}

const config = getConfig(originalConfiguration);
// config will be
// {
//     speed: 'fast',
//     debug: 'true',
//     logging: false,
// }
```
You can also set aliases for keys if needed
```js
const defaults = {
    logging: false,
    debug: false,
}

const aliases = {
    speed: 'velocity',
}

const getConfig = configurator({
    defaults,
    aliases,
});

const originalConfiguration = {
    speed: 'fast',
    debug: 'true',
}

const config = getConfig(originalConfiguration);
// config will be
// {
//     velocity: 'fast',
//     debug: 'true',
//     logging: false,
// }
```
