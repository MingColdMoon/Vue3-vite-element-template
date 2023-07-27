import { AxiosError, AxiosResponse } from 'axios';
import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  ERROR_STATUS,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG
} from '@/config';
import { StrategyPattern } from '@/utils/common';
import { showErrorMsg } from './msg';

type ErrorStatus = keyof typeof ERROR_STATUS;

/**
 * 处理axios返回的错误信息
 * @param error
 * @returns error
 */
export function handleAxiosError(error: AxiosError) {
	// 默认的报错信息
	const defaultError: Service.RequestError = {
		type: 'axios',
		code: DEFAULT_REQUEST_ERROR_CODE,
		msg: DEFAULT_REQUEST_ERROR_MSG
	}

	// 对错误状态场景进行处理  采用策略模式
	const arr = [
		[
			// 网络错误
			!window.navigator.onLine || error.message === 'Network Error',
			() => {
				Object.assign(defaultError, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG})
			}
		],
		[
			// 超时错误
			error.code === REQUEST_TIMEOUT_CODE && error.message.includes('timeout'),
			() => {
				Object.assign(defaultError, { code: REQUEST_TIMEOUT_CODE, msg: REQUEST_TIMEOUT_MSG})
			}
		],
		[
			// 请求后端不成功的错误
			Boolean(error.response),
			() => {
				const errorCode: ErrorStatus = (error.response?.status as ErrorStatus) || 'DEFAULT';
        const msg = ERROR_STATUS[errorCode];
        Object.assign(defaultError, { code: errorCode, msg });
			}
		]
	]

	StrategyPattern(arr)

	// 执行弹窗提示
	showErrorMsg(defaultError)

	return defaultError
}

/**
 * 处理非200 304以外的的错误
 * @param response - 请求的响应
 */
export function handleResponseError(response: AxiosResponse) {
  const error: Service.RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  };

  if (!window.navigator.onLine) {
    // 网路错误
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
  } else {
    // 请求成功的状态码非200的错误
    const errorCode: ErrorStatus = response.status as ErrorStatus;
    const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
    Object.assign(error, { type: 'http', code: errorCode, msg });
  }

  showErrorMsg(error);

  return error;
}

/**
 * 从响应接口处理后端返回的错误(业务错误)
 * @param backendResult - 后端接口的响应数据
 */
export function handleBackendError(backendResult: Record<string, any>, config: Service.BackendResultConfig) {
  const { codeKey, msgKey } = config;
  const error: Service.RequestError = {
    type: 'backend',
    code: backendResult[codeKey],
    msg: backendResult[msgKey]
  };

  showErrorMsg(error);

  return error;
}
