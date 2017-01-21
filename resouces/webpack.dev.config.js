var path = require("path"),
    webpack = require("webpack"),
    proxy = require("./proxy");

var SRC_PATH = path.join(__dirname, 'src'),
    DIST_PATH = path.join(__dirname, '../static');

var HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: {
        apps: path.join(SRC_PATH, 'root.js'),
        vendors: [
            'vue',
            'vuex',
            'vue-router',
            'vuex-router-sync',
            'whatwg-fetch',
            'es6-promise',
            'querystring'
        ]
    },

    resolve: {
        modules: [SRC_PATH, "node_modules"],
        extensions: [".less", ".css", ".js", ".vue", ".json"]
    },

    output: {
        path: DIST_PATH,
        publicPath: '',
        filename: "js/[name].js"
    },


    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        }),

        new HtmlWebpackPlugin({
            inject: false,
            filename: './index.html',
            template: path.join(SRC_PATH, 'index.html')
        })

    ],

    module: {


        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: "babel-loader",
                include: SRC_PATH
            },

            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "autoprefixer-loader"
                ]
            },

            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "autoprefixer-loader",
                    "less-loader"
                ]
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: 'imgs/[name].[ext]'
                }
            },

            {
                test: /\.(eot|woff|woff2|ttf|svg)/,
                loader: "url-loader",
                options: {
                    limit: 100,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },


    devServer: {
        proxy: proxy
    }
};


console.log("initializing webpack developent build....");

module.exports = config;
