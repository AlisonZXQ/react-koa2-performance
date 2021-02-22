import request from '../utils/request';

// 获取应用列表
export async function getHttpResponseData(params) {
  return request('/api/httptest/getHttpResponseData', { data: params, method: 'POST' });
}
