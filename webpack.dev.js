var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    open: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
    proxy: {
      "/v1.9": {
        target: "https://api.dtf.ru/v1.9",
        changeOrigin: true,
        pathRewrite: {
          "^/v1.9": "",
        },
      },
      "/v2.1": {
        target: "https://api.dtf.ru/v2.1",
        changeOrigin: true,
        pathRewrite: {
          "^/v2.1": "",
        },
      },
    },
  },
});
