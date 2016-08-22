/* eslint-disable no-var, strict */

var webpack = require('webpack');
var path = require('path');

module.exports = Object.assign({}, require('./webpack.config'), {
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
});
