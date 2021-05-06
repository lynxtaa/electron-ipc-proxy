/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = env => ({
	mode: env.production ? 'production' : 'development',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	entry: path.resolve(__dirname, 'src', 'renderer', 'index.tsx'),
	target: 'electron-renderer',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: [
					env.production ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist/renderer'),
		historyApiFallback: true,
		compress: true,
		hot: true,
		host: '0.0.0.0',
		port: 4000,
		publicPath: '/',
	},
	output: {
		path: path.resolve(__dirname, 'dist/renderer'),
		filename: 'js/[name].js',
		publicPath: './',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
		env.production &&
			new MiniCssExtractPlugin({
				filename: '/css/[name].css',
				chunkFilename: '/css/[name].chunk.css',
			}),
		!env.production && new HotModuleReplacementPlugin(),
		!env.production && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
})
