const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/build/dapp',
		filename: 'dapp.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico'
		}),
		new MiniCssExtractPlugin(),
		new MomentLocalesPlugin()
	],
	devServer: {
		port: 3000,
		open: true,
		hot: true
	}
};