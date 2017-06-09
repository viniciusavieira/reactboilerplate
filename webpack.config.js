const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const srcPath = path.join(__dirname, 'src');

var PROD = process.env.NODE_ENV == 'production';
var FASTBUILD = process.env.NODE_ENV == 'fastbuild';
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = dd+'_'+mm+'_'+yyyy;

const config = {
  cache:true,
  entry: {
    app: path.join(srcPath, 'index.jsx'),
    common: ['react', 'react-router', 'react-dom']
  },
  module: {
    rules: [
    FASTBUILD ? {test: /\.js|\.jsx?$/, loader: "babel-loader", exclude: path.resolve(__dirname, "./node_modules")} : {test: /\.js|\.jsx?$/, loader: "babel-loader"},
    {test: /\.scss|\.css/, use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]},
    {test: /\.png|\.jpg|\.jpeg|\.svg|\.gif/, loader: "url-loader?hash=sha512&digest=hex&name=/assets/[hash].[ext]"},
    {test: /\.woff|\.woff2|.eot|\.ttf/, loader : 'url-loader?prefix=font/&limit=100000&name=/assets/fonts/[name].[ext]'}
    ]
  },
  output: {
    filename: PROD ? "[name]"+today+".min.js" : "[name].js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "",
  },
  plugins: PROD ? [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.optimize.CommonsChunkPlugin({name:'common', filename:"common"+today+".js", minChunks: Infinity}),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: './index.html'
      })
    ]:[
      new webpack.optimize.CommonsChunkPlugin({name:'common', filename:"common.js", minChunks: Infinity}),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: './index.html'
      })
  ],
  resolve: {
    enforceExtension: false,
    extensions: [".js",".jsx",".scss",".css"],
    modules: [path.join(__dirname, "src"),"node_modules"],
    }
};

module.exports = config;
