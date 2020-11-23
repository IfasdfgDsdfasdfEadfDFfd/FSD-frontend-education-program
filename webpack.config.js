const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const BUILD_DIR = path.resolve(path.join(process.cwd(), 'build'));

const IS_DEV_MODE = process.env.NODE_ENV === 'development';

const getAllTemplates = folder => {
  const SEARCH_DIR = path.join(SRC_DIR, folder);

  return glob.sync(`${SEARCH_DIR}/**/*.pug`).map(filepath => {
    const { name, dir } = path.parse(filepath);

    return new HtmlWebpackPlugin({
      template: filepath,
      favicon: path.join(SRC_DIR, 'logo.svg'),
      filename: `${path.basename(dir)}/${name}.html`,
    });
  });
};

module.exports = {
  entry: path.join(SRC_DIR, 'index.ts'),
  output: {
    path: BUILD_DIR,
    filename: 'build.js',
  },

  externals: {
    jquery: 'jQuery',
    datepicker: 'air-datepicker',
  },

  // don't foget about dots...
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.pug', '.html', '.css'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.pug'),
      filename: 'index.html',
    }),
    ...getAllTemplates('components'),
    ...getAllTemplates('pages'),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.(webp|png|svg|eot|woff|woff2|ttf|)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'static',
          publicPath: process.env.ASSET_PAHT || '/',
          name: '[name].[ext]',
        },
      },
    ],
  },

  mode: process.env.NODE_ENV,
  devtool: IS_DEV_MODE ? 'inline-source-map' : 'source-map',

  devServer: {
    contentBase: BUILD_DIR,
    compress: true,

    open: true,

    host: '0.0.0.0',
    port: 8080,

    inline: true,

    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },
};
