import request from '../utils/request';

// 登陆
export async function login(params) {
  return request('/api/user/userLogin', { data: { ...params }, method: 'POST' });
}

// 退出
export async function loginOut(params) {
  return request('/api/user/loginOut', { data: { ...params }, method: 'POST' });
}

// 注册
export async function userRegister(params) {
  return request('/api/user/userRegister', { data: { ...params }, method: 'POST' });
}