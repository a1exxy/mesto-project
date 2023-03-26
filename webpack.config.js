const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = () => {
  console.log(process.env)
  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '',
    },
    mode: 'development',
    devServer: {
      static: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      port: 8080
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env.BACKEND_API_URL': JSON.stringify(process.env.BACKEND_API_URL),
        'process.env.BACKEND_API_TOKEN': JSON.stringify(process.env.BACKEND_API_TOKEN),
        'process.env.VERSION': JSON.stringify(process.env.VERSION),
      })
    ]
  }
}
