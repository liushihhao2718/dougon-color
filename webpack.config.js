const path = require('path')
module.exports = {
	entry: {
		app: "./src/app.js"
	},
	output: {
		path: path.join(__dirname, 'public', 'js'),
		filename: 'bundle.js',
		publicPath:'./js'
	},
	devServer: {
		contentBase: './public',
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css' },
		]
	}
}
