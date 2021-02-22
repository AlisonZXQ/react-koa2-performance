'use strict';

const devConfig = require('./build/webpack.development.js');
const prodConfig = require('./build/webpack.production.js');

module.exports = (function () {
  let config;
  /**
   * production: 生产模式
   * development: 后端
   */
  switch (process.env.NODE_ENV) {
    case 'production':
      config = prodConfig;
      break;
    case 'development':
      config = devConfig;
      break;
    default:
      config = devConfig;
  }
  return config;
})();
