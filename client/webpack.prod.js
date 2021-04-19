const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      {
        test: /\.js$|.jsx$/i,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        loader: "babel-loader",
      }, // Babel for JSX
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }), // HTML
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};
