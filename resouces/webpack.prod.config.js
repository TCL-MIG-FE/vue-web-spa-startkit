var path = require("path"),
    webpack = require("webpack");

var SRC_PATH = path.join(__dirname, 'src'),
    DIST_PATH = path.join(__dirname, '../static'),
    CHUNK_FILE_HASH_TAG = '_[chunkhash:5]';

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    WebpackChunkHash = require("webpack-chunk-hash"),
    InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');


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
        filename: `js/[name]${CHUNK_FILE_HASH_TAG}.js`,
        chunkFilename: `js/[id].[name]${CHUNK_FILE_HASH_TAG}.js`
    },


    plugins: [

        new CleanWebpackPlugin("static", {
            root: path.join(__dirname, "../"),
            verbose: true
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendors", "manifest"],
            minChunks: Infinity
        }),

        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new InlineManifestWebpackPlugin(),

        new ExtractTextPlugin(`css/commons${CHUNK_FILE_HASH_TAG}.css`),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            comments: false
        }),

        new HtmlWebpackPlugin({
            inject: false,
            filename: '../index.html',
            template: path.join(SRC_PATH, 'index_prod.html'),
        })
    ],

    module: {

        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            loader: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                            fallbackLoader: 'vue-style-loader',
                            publicPath: "../"
                        })
                    }

                }
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: `images/[name].[ext]`
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
    }
};


console.log("initializing webpack production build....");

module.exports = config;
