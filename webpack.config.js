'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
  	app:'./src/webclient/assets/js/apps/apps.js',
  	lib: ["babel/polyfill", 'react', 'react-router', 'flummox', 'superagent', 'fastclick']
  },
  output: {
    path: __dirname + '/dest/webclient/assets/js',
    filename: 'apps.js',
    publicPath: '/assets/js/'
  },
  devtool: "#source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
	new webpack.optimize.CommonsChunkPlugin("lib", 'lib.js')
  ],
  resolve: {
    extensions: ["", ".jsx", ".js", ".json"],
    //https://github.com/desandro/masonry/issues/679
    modulesDirectories: ['node_modules'],
    alias:{
      "matches-selector/matches-selector": "desandro-matches-selector",
      "eventEmitter/EventEmitter": "wolfy87-eventemitter",
      "get-style-property/get-style-property": "desandro-get-style-property"
    }
  },
  cache: true,
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader?stage=1'], exclude: /node_modules/ },
      { test: /\.js?$/, loaders: ['babel-loader?stage=1'], exclude: /node_modules/ },
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
};