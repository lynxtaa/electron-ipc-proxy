/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const nodeExternals = require('webpack-node-externals')

module.exports = {
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	externals: [nodeExternals()],
	devtool: 'source-map',
	entry: path.resolve(__dirname, 'src', 'main', 'index.ts'),
	target: 'electron-main',
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	node: {
		__dirname: false,
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
}
