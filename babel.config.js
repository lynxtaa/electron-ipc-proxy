const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvTest = process.env.NODE_ENV === 'test'

module.exports = {
	presets: [
		[
			'@babel/preset-react',
			{
				development: isEnvDevelopment || isEnvTest,
				useBuiltIns: true,
				runtime: 'automatic',
			},
		],
		'@babel/preset-typescript',
	],

	plugins: [
		isEnvDevelopment && 'react-refresh/babel',
		isEnvTest && '@babel/transform-modules-commonjs',
	].filter(Boolean),
}
