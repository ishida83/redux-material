'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[hash].[name].bundle.js',
        chunkFilename: '[hash].[id].bundle.js',
        publicPath: '/'
    },
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
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-1'
                    ]
                }
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js'),
        new CopyWebpackPlugin([             
            // { from: './node_modules/material-design-icons/iconfont/file.txt', to: './font' },            
            { from: './node_modules/material-design-icons/iconfont/*', to: './font' }            
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
