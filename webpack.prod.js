const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./client/src/index.js",
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      { test: /\.js$|.jsx$/i, exclude: /node_modules/, loader: "babel-loader" }, // Babel for JSX
      { test: /\.scss$/i, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./client/public/index.html" }), // HTML
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};
