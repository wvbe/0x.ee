/* eslint-disable no-var */

var webpack = require('webpack');
var path = require('path');

module.exports = {
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	sassLoader: {
		sourceMap: true
	}
};
