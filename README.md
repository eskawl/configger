## Configger

Easily set default values and aliases for configurations

### Installing

Using NPM:

```bash
npm i configger
```

Using yarn:

```bash
yarn add configger
```



### Importing
```js
const configger = require('configger')
```
or in ES6
```js
import configger from 'configger';
```

### Usage 
`configger` takes in an object with the following keys
- `defaults`: (Optional, defaults to `{}`) An object containing default configuration values. If the original configuration already contains keys provided in default, they are not changed.
- `aliases`: (Optional, defaults to `{}`) An object containing keys for the aliases. This should be given in the form of `keyToBeAliased: alias`. If the `keyToBeAliased` is present in the original configuration, it will be replaced by `alias`. If you intend to provide a default for the `alias` use `alias` in the `defaults` configuration instead of `keyToBeAliased`.

returns a function which takes in an original configuration and sets defaults and aliases.


#### Example
Calling `configger` returns a function to which you can pass a configuration to which defaults are to be applied. Lets call that function `getConfig`.

```js
const defaults = {
    logging: false,
    debug: false,
}

const getConfig = configger({
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

const getConfig = configger({
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