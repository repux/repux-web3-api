const path = require('path');

module.exports = {
    entry: {
        'lib/index': './src/repux-web3-api.js'
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        library: 'repux-web3-api',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [/node_modules\/promisify-es6/],
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['env']
                    }
                }]
            }
        ]
    }
};
