const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,'./../','dist')
  },
  plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
       template: './templates/index.html',
       favicon: './templates/favicon.ico'
      }),
       new webpack.HotModuleReplacementPlugin()
    ],
   devServer: {
       contentBase: path.join(__dirname,'dist'),
       port: 3000,
       hot: true,
       open: true,
       historyApiFallback: true,
       proxy: {
            '/api': {
                target: 'http://localhost:8080',
        		pathRewrite: { '^/api': '' }
        		} 	  
            }
        },
  module: {
	rules: [
	  {
        test: /\.(js|jsx)$/,
        resolve: {
            	extensions: ['.js', '.jsx']
            },
		exclude: /(node_modules|bower_components)/,
		use: {
		  loader: 'babel-loader',
		  options: {
			presets: ['@babel/preset-env']
		  }
		}
	  },
	  {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
	  },
	  {
		test: /\.scss$/,
		use: [
			"style-loader", // creates style nodes from JS strings
			"css-loader", // translates CSS into CommonJS
			"sass-loader" // compiles Sass to CSS, using Node Sass by default
		]
	},
	{
		test: /\.(png|svg|jpg|gif)$/,
		use: [
		       'file-loader'
		     ]		 
         },
	{
         	test: /\.(woff|woff2|eot|ttf|otf)$/,
	        use: [
	           'file-loader'
         	]
        }

	


	]
  }

};