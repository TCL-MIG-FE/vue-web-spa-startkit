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
		alias: {},
		extensions: ["", ".less", ".css", ".js", ".vue", ".json"]
	},
	
	output: {
		path: DIST_PATH,
		publicPath: '',
		filename: "js/[name].js"
	},
	
	clearBeforeBuild: false,
	
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(
			'vendors',
			'js/vendors.js', // vendor date
			Infinity
		),
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
		noParse: [],
		
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			}, {
				test: /\.js$/,
				loader: "babel",
				include: SRC_PATH
			},
			
			{
				test: /\.css$/,
				loader: "style!css!autoprefixer"
			},
			
			{
				test: /\.less$/,
				loader: "style!css!autoprefixer!less"
			},
			
			{
				test: /\.(png|jpg|gif)$/,
				loader: "url",
				query: {
					limit: 8192,
					name: 'imgs/[name].[ext]'
				}
			},
			
			{
				test: /\.(eot|woff|woff2|ttf|svg)/,
				loader: "url",
				query: {
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
