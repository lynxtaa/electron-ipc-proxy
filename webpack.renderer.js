const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	entry: path.resolve(__dirname, 'src', 'renderer', 'index.ts'),
	target: 'web',
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
	plugins: [new HtmlWebpackPlugin()],
}
