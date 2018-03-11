const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const config = {
  entry: './src/index.js',
  target: 'node',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env'],
        //   },
        // },
      },
      {
        test: /^(?!.*\.test\.jsx?$).*\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  devtool: 'sourcemap',
};

module.exports = config;
