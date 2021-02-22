import fetch from 'isomorphic-fetch';
import { obj2query, getCookie } from './helper';

const loginUrl = `http://${window.location.hostname}/openid`;
const nanjingLoginUrl = `http://${window.location.hostname}`;
const { hostname } = window.location;
const nanjingUrl = hostname.includes('test') ? 'id-test.njdiip.com' : 'id.njdiip.com';
const forbiddenUrl = '/project/403';
const CODE_MAP = {
  500: '500',
  502: '',
};

const cookieObj = getCookie();
let cookieParams = {
  pmot: '1e6b17c58b47423fb91217b920865a9c',
  pmou: 'zhangxueqing01',
};

let currentPid = -1; // 暂时先用sessionStorage来存储当前项目的id做权限控制

/**
 * 延时处理
 */
const timeout = new Promise((resolve) => {
  setTimeout(resolve, 3000);
});

/**
 * 验证返回状态码
 * @param {object} response - ajax请求返回数据
 */
function checkStatus(response) {
  if (response.status === 203) {
    location.href = forbiddenUrl;
    return timeout;
  } else if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(CODE_MAP[response.status] || response.statusText);
    error.response = response;
    error.code = response.status;
    throw error;
  }
}

/**
 * 验证用户是否登录
 * @param {object} res - ajax返回数据
 * @param {string} url - ajax请求路径
 */
function checkLogin(res, url) {
  if (window.location.hostname === 'localhost') {
    return res;
  } else if (res.code === 203) {
    location.href = forbiddenUrl;
    return timeout;
  } else {
    return res;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let newoptions = { ...options } || {};
  let newurl = url;
  newoptions.method = newoptions.method || 'GET';
  newoptions.credentials = 'include';

  // 开发&测试&线上带上登陆的cookie信息
  if (cookieObj && cookieObj.pmot && cookieObj.pmou) {
    cookieParams = {
      pmot: cookieObj.pmot,
      pmou: cookieObj.pmou,
    };
  }

  if (sessionStorage.getItem('currentPid')) {
    currentPid = sessionStorage.getItem('currentPid');
  }

  newoptions.headers = newoptions.headers || {
    ...cookieParams,
    currentPid,
  };

  if (newoptions.data) {
    if (newoptions.type && (newoptions.type === 'weekreport' || newoptions.type === 'urlencoded')) {
      newoptions.headers = {
        ...newoptions.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      if (newoptions.method === 'GET') {
        newurl = `${url}?${obj2query(newoptions.data)}`; // 对weekreport or urlencoded的单独进行处理
      } else {
        newoptions.body = obj2query(newoptions.data);
      }
    } else if (newoptions.type === 'upload') { // 上传文件
      newoptions.headers = {
        ...newoptions.headers,
      };
      newoptions.body = newoptions.data;
    } else if (/GET|HEAD|DELETE/.test(newoptions.method)) {
      newurl = `${url}?${obj2query(newoptions.data)}`; // 组装成健值对
    } else { // post类型的处理
      newoptions.headers = {
        ...newoptions.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      newoptions.body = JSON.stringify(newoptions.data);
    }
  }
  return fetch(newurl, newoptions)
    .then(checkStatus)
    .then((res) => {
      const res2 = !newoptions.raw ? res.json() : res;
      return res2;
    })
    .then((res3) => checkLogin(res3, newurl)) // 开发&测试&线上才校验
    .catch(err => {
      throw err;
    });
}