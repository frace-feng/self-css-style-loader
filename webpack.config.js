const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MyPlugin = require('./myPlugin/log')
const FileListPlugin = require('./myPlugin/FileListPlugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".js", ".css"],
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
  plugins: [new HtmlWebpackPlugin({ template: './index.html' }),
  new MyPlugin(),
  new FileListPlugin({filename:'fileLen.md'})

]
};