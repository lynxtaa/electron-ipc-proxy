const isEnvTest = process.env.NODE_ENV === 'test'

module.exports = {
	presets: ['@babel/preset-typescript'],
	plugins: [isEnvTest && '@babel/transform-modules-commonjs'].filter(Boolean),
}
