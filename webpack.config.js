const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const DIST_DIR = path.resolve(path.join(process.cwd(), 'dist'));


module.exports = {
  entry: path.join(SRC_DIR, 'index.ts'),
  output: {
    path: DIST_DIR,
    filename: 'build.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss', '.pug', '.html', '.css'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.pug'),
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader'],
      },
    ],
  },

  mode: process.env.NODE_ENVIRONMENT,
  devtool: 'inline-source-map',
  watch: true,

  devServer: {
    contentBase: DIST_DIR,
    compress: true,

    host: '0.0.0.0',
    port: 8080,

    inline: true,

    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  }
};
