const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.js$|.jsx$/i, exclude: /node_modules/, loader: "babel-loader" }, // Babel for JSX
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./client/public/index.html" }), // HTML
  ],
};
