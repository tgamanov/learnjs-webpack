'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: './frontend/app'
    },

    output: {
        path: './public',  // FS-путь к статике
        publicPath: '/', // Web-путь к статике (CDN?)
        filename: '[name].js'
    },

    watch: false,

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,           // .../node_modules/loader!file...
                include: __dirname + '/frontend',
                loader: "babel-loader",
                options: {
                    presets: ['es2015']
                }
            }, {
                test: /\.pug$/,
                loader: "pug-loader"
            }, {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!stylus-loader'
                })
            }
        ]
    },

    node: {
        fs: "empty"
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]

};
