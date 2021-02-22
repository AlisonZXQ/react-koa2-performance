import request from '../utils/request';

// 获取应用列表
export async function getSystemList(params) {
  return request('/api/system/getSystemList', { data: params, method: 'POST' });
}

// 添加应用
export async function addSystem(params) {
  return request('/api/system/addSystem', { data: params, method: 'POST' });
}
