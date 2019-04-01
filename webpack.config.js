const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const docsDir = path.resolve(__dirname, 'docs');
const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: docsDir
  },
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: docsDir
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
            
          
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
            isDevelopment
            ? MiniCssExtractPlugin.loader
            : { loader: 'style-loader', options: { sourceMap: true } },
            { loader: 'css-loader', options: { sourceMap: isDevelopment } },
            { loader: 'postcss-loader', options:  { sourceMap: isDevelopment } },
            { loader: 'sass-loader', options: { sourceMap: isDevelopment } }
      ]
      }]
  },
  
  
  plugins: [new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
          }), 
          new MiniCssExtractPlugin({
            filename: '[name].css',
          chunkFilename: '[id].css'})]
};