const webpack = require('webpack');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: './dist/',
        library:"$",
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
      ]
  };
  
  module.exports = config;
  