const path = require('path')
module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'vue-auth.es.js',
		path: path.resolve(__dirname, './dist'),
		library: 'util', // 暴露的变量
		libraryTarget: 'umd' // 支持的方案，一般填这个就行
	}
}
