/**
 * 对应的请求代理到何处
 */
module.exports = {
  proxy: [{
    context: ['/api'],
    // target: 'http://overmind.hz.netease.com',
    // target:'10.242.192.44',
    target: 'http://127.0.0.1:9001',
    secure: false,
    headers: {
      // host: 'overmind.hz.netease.com',
      host: 'localhost',
    },
  }],
};