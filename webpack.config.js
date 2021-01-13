const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');

const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const STATIC_DIR = path.join(SRC_DIR, 'static');
const BUILD_DIR = path.resolve(path.join(process.cwd(), 'build'));

const IS_DEV_MODE = process.env.NODE_ENV === 'development';

const getAllTemplates = folder => {
  const SEARCH_DIR = path.join(SRC_DIR, folder);

  return glob.sync(`${SEARCH_DIR}/**/*.pug`).map(filepath => {
    const { name, dir } = path.parse(filepath);

    return new HtmlWebpackPlugin({
      template: filepath,
      favicon: path.join(SRC_DIR, 'favicon.svg'),
      filename: `${path.basename(dir)}/${name}.html`,
      templateParameters: {
        asset_path: process.env.ASSET_PATH,
      },
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

  // don't forget about dots...
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.pug', '.html', '.css'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.pug'),
      favicon: path.join(SRC_DIR, 'favicon.svg'),
      filename: 'index.html',
      templateParameters: {
        asset_path: process.env.ASSET_PATH,
      },
    }),
    ...getAllTemplates('components'),
    ...getAllTemplates('pages'),
    new CopyWebpackPlugin({
      patterns: [{ from: STATIC_DIR, to: 'static' }],
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV_MODE ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: IS_DEV_MODE ? '[id].css' : '[id].[fullhash].css',
    }),
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
          IS_DEV_MODE
            ? { loader: 'style-loader' }
            : MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
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
          publicPath: process.env.ASSET_PATH || '/',
          name: '[name].[ext]',
        },
      },
    ],
  },

  mode: process.env.NODE_ENV,
  devtool: IS_DEV_MODE ? 'eval-cheap-module-source-map' : 'source-map',

  devServer: {
    contentBase: BUILD_DIR,
    compress: true,

    open: true,

    host: 'localhost',
    port: 8080,

    inline: true,

    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },

  optimization: {
    minimize: true,
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
