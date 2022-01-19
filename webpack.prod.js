var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/other",
        },
      ],
    }),
  ],
});
