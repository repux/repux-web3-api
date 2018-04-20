const path = require('path');

module.exports = {
    entry: {
        ['lib/repux']: ['./src/repux.js'],
        ['tests/index']: ['./test/run.js']
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        library: 'RepuXJsApi',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [/node_modules\/promisify-es6/],
                use: [ {
                    loader: 'babel-loader',
                    query: {
                        presets: [ 'env' ]
                    }
                } ]
            }
        ]
    }
};
