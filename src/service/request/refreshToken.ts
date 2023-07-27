import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { fetchUpdateToken } from '../api';

// TODO
/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetAuthStore } = useAuthStore();
  const refreshToken = localStorage.get('refreshToken') || '';
  const { data } = await fetchUpdateToken(refreshToken);
  if (data) {
    localStorage.set('token', data.token);
    localStorage.set('refreshToken', data.refreshToken);

    const config = { ...axiosConfig };
    if (config.headers) {
      config.headers.Authorization = data.token;
    }
    return config;
  }

  resetAuthStore();
  return null;
}
