'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        publicPath: '/'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style/useable!css!postcss!'
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less!'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'react-hot!babel?presets[]=react&presets[]=es2015&presets[]=stage-1',
                exclude: /(node_modules)/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'file'
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.scss$/, loader: 'style!css!sass'}
        ]
    },
    postcss: function() {
        return [
            autoprefixer({browsers: ['last 3 versions']})
        ];
    },
    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'js', 'fw', 'lib')
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        new CopyWebpackPlugin([             
            // { from: './node_modules/material-design-icons/iconfont/file.txt', to: './font' },            
            { from: './node_modules/material-design-icons/iconfont', to: './font' }            
        ], {
            ignore: [
                // Doesn't copy any files with a txt extension     
                '*.txt',
                
                // Doesn't copy any file, even if they start with a dot 
                { glob: '**/*', dot: true }
            ],
 
            // By default, we only copy modified files during 
            // a watch or webpack-dev-server build. Setting this 
            // to `true` copies all files. 
            copyUnmodified: true
        }),
        new HtmlWebpackPlugin({
            title: 'Rule World',
            description: '',
            username: 'Rule World, webmaster@rule.world',
            filename: 'index.html',
            inject: 'body',
            template: 'index.html_vm',
            favicon: 'img/favicon.ico',
            hash: false
        })
    ]
};
