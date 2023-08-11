const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: path.resolve(__dirname, './myLoader/imitate-style-loader.js')
          },
          {
            loader: path.resolve(__dirname, './myLoader/imitate-css-loader.js')
          }
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })]
};