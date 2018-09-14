const path = require('path');

module.exports = env => {
    let entries = {};
    entries['lib/index'] = ['./src/index.ts'];

    return {
        entry: entries,
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'build'),
            library: 'RepuxLib',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [/node_modules\/promisify-es6/],
                    use: [
                        {
                            loader: 'babel-loader',
                            query: {
                                presets: ['env']
                            }
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    exclude: [/node_modules/, /build/],
                    loader: 'awesome-typescript-loader'
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader'
                }
            ]
        }
    };
};
