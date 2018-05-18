const webpackConfig = require('./webpack.config');
delete webpackConfig.entry;
delete webpackConfig.devtool;
webpackConfig.mode = 'development';

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'test/*.spec.js'
        ],
        reporters: ['mocha', 'coverage'],
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        // singleRun: false, // Karma captures browsers, runs the tests and exits
        concurrency: Infinity,

        preprocessors: {
            'src/!(*.spec)+(*.js)': ['eslint', 'coverage'],
            'test/*.spec.js': ['eslint', 'webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        client: {
            captureConsole: true,
            chai: {
                includeStack: true
            }
        },

        mochaReporter: {
            showDiff: true
        },

        coverageReporter: {
            type: 'html',
            dir: './docs/coverage',
            instrumenterOptions: {
                istanbul: { noCompact: true }
            },
            includeAllSources: true
        }
    });
};
