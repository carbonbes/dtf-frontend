const { createProxyMiddleware } = require("http-proxy-middleware");

export default function (app) {
  app.use(
    "/v1.9",
    createProxyMiddleware({
      target: "https://api.dtf.ru/v1.9",
      changeOrigin: true,
      pathRewrite: {
        "^/v1.9": "",
      },
    })
  );

  app.use(
    "/v2.1",
    createProxyMiddleware({
      target: "https://api.dtf.ru/v2.1",
      changeOrigin: true,
      pathRewrite: {
        "^/v2.1": "",
      },
    })
  );
}
