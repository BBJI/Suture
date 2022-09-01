const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const CopyPlugin = require( 'copy-webpack-plugin' );
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = merge(baseConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        // new CopyPlugin({
        //     patterns: [{ from: './src/static', to: 'assets' }],
        // }),
        new CleanWebpackPlugin()
    ],
});

module.exports = config;
