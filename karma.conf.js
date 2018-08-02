const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: ['test/**/*.spec.ts'],
        preprocessors: {
            'src/**/*.ts': ['tslint', 'coverage'],
            'test/**/*.spec.ts': ['tslint', 'webpack']
        },

        webpack: {
            module: webpackConfig().module,
            resolve: webpackConfig().resolve,
            node: {
                fs: 'empty'
            }
        },
        reporters: ['mocha', 'coverage'],
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        concurrency: Infinity,
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        }
    });
};
