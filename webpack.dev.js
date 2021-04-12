const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  devtool: "inline-source-map",
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
      {
        test: /\.css$/i,
        use: ["style-loader", { loader: "css-loader", options: { sourceMap: true } }],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./client/public/index.html" }), // HTML
  ],
};
