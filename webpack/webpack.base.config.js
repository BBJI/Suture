const path = require( 'path' );
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: './entry/index.js',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, '..', 'output', 'suture'),
        publicPath: '/',
        chunkFilename: 'chunks/[name].[chunkhash].chunk.js',
        asyncChunks: true,
    },
    resolve: {
        alias: {},
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx|js|ts)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: true,
                            plugins: ['@babel/transform-runtime'],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader', // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: 'sass-loader', // 将 Sass 编译成 CSS
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|ico)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        name: '[name].[ext]',
                        outputPath: 'static/images/',
                        publicPath: 'static/images',
                        limit: 2048
                    }
                },
            },
            {
                test: /\.(csv|tsv)$/,
                exclude: /node_modules/,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/,
                exclude: /node_modules/,
                use: ['xml-loader'],
            },
                {
                    test: /.html$/,
                    use: ['html-withimg-loader'],
                }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../entry/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, '../src/static/images/favicon.ico')
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin( {
            'process.env': process.env
        })
    ],
};

module.exports = config;
