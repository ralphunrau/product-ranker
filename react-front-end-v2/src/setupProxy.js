const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (App) => {
  App.use(
    '/app',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: false
    })
  );
};