const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const path = require( 'path' );
const port = 3005;

const config = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            // progress: true,
            reconnect: true,
        },
        compress: true,
        host: '0.0.0.0',
        port,
        hot: true,
        server: 'http',
        historyApiFallback: true,
    },
});

module.exports = config;
