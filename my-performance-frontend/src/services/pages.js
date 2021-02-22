import request from '../utils/request';

// 获取页面性能数据
export async function getPagesData(params) {
  return request('/api/pages/getPageList', { data: params, method: 'POST' });
}