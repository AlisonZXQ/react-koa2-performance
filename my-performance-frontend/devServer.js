const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const path = require('path')
const port = 8888;
const devProxyConfig = require('./localConfig/Index');
const compiler = Webpack(webpackConfig);

new WebpackDevServer(compiler, {
  disableHostCheck: true,
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  contentBase: [__dirname, path.resolve(__dirname, '../')],
  stats: {
    colors: true
  },
  clientLogLevel: 'error',
  proxy: [
    {
      context: ['/api'],
      target: 'http://127.0.0.1:9001',
      secure: false,
      headers: {
        host: 'localhost',
      },
    },
  ],
  // ...devProxyConfig,
}).listen(port, function (err, result) {
  if (err) {
    return console.log(err)
  }
  console.log(`Listening at http://localhost:${port}/`)
});