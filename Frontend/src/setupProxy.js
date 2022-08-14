const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7134';

const context = [
  "/weatherforecast",
];
const hubContext = [
  "/hub/**",
]

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    changeOrigin: true,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);

  const hubProxy = createProxyMiddleware(hubContext, {
    target: target,
    secure: false,
    ws: true,
    changeOrigin: true,
    headers: {
      Connection: 'Keep-Alive'
    },
  });

  app.use(hubProxy);
};
