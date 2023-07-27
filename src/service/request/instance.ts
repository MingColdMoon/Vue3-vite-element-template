import axios  from 'axios';
import type { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { transformRequestData, handleAxiosError, handleServiceResult, handleBackendError, handleResponseError } from '@/utils/service';
import { REFRESH_TOKEN_CODE } from '@/config';
import { handleRefreshToken } from './refreshToken';

export default class CustomAxiosInstance  {
	instance: AxiosInstance
	backendConfig: Service.BackendResultConfig
	constructor (
		axiosConfig: AxiosRequestConfig,
		backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 200
    }
	) {
		this.backendConfig = backendConfig
		this.instance = axios.create(axiosConfig)
		this.setInterceptor()
	}

	// 设置拦截器
	setInterceptor() {
		// 设置请求拦截器
		this.instance.interceptors.request.use(
			async config => {
				const handleConfig = { ...config }
				if (handleConfig.headers) {
					// 数据转换
					const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType
					handleConfig.data = await transformRequestData(handleConfig.data, contentType)

					// TODO
					// 设置token
					handleConfig.headers.Authorization = ''
				}
				return handleConfig
			},
			(axiosError: AxiosError) => {
				const err = handleAxiosError(axiosError)
        return err
      }
		)

		// 设置响应拦截器
		this.instance.interceptors.response.use(
			(async response => {
			const { status } = response;
			if (status === 200 || status < 300 || status === 304) {
				const backend = response.data;
				const { codeKey, dataKey, successCode } = this.backendConfig;
				// 请求成功
				if (backend[codeKey] === successCode) {
					return handleServiceResult(null, backend[dataKey]);
				}

				// TODO
				// token失效, 刷新token
				if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
					const config = await handleRefreshToken(response.config);
					if (config) {
						return this.instance.request(config);
					}
				}

				// 处理后端传递的报错信息，并且message提示信息
				const error = handleBackendError(backend, this.backendConfig);
				// 封装成自定义的类型结构
				return handleServiceResult(error, null);
			}
			// 处理非200、300、304以外的错误代码
			const error = handleResponseError(response);
			return handleServiceResult(error, null);
		}) as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
		(axiosError: AxiosError) => {
			const error = handleAxiosError(axiosError);
			return handleServiceResult(error, null);
		})
	}
}
