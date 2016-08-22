/* eslint-disable no-var, strict */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = Object.assign({}, require('./webpack.config'), {
	entry: [
		'webpack-dev-server/client?http://localhost:5000',
		'webpack/hot/dev-server',
		'./src/script'
	],
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	devtool: 'eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
});

new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		historyApiFallback: true
	})
	.listen(5000, 'localhost', function (err) {
		if (err) {
			console.log(err);
		}
		console.log('Listening at localhost:5000');
	});
