// webpack.config.js

var webpack = require('webpack');
var path = require('path');

var config = {
  entry: __dirname + '/src/main.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: "build.js",
    umdNamedDefine: true
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};

module.exports = config;