const path = require('path');
const babelConfig = require('./babel.config');

const libraryName = 'just-config';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: {
            root: libraryName,
            amd: libraryName,
            commonjs: libraryName,
        },
        libraryTarget: 'umd',
        // When using umd, to fix problems with usage in node
        // https://github.com/webpack/webpack/issues/6677
        globalObject: 'this',
        // Allow common-js to require directly
        // useAsync = require('react-use-async-hook')
        // rather than require('react-use-async-hook').default
        // https://github.com/webpack/webpack/issues/3929#issuecomment-423514570
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
            },
        ],
    },
    devtool: 'source-map',
};
