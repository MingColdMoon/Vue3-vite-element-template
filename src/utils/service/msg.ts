import { ERROR_MSG_DURATION, NO_ERROR_MSG_CODE } from '@/config';
import { ElMessage } from 'element-plus'

const stack = new Map()

function addStack(error: Service.RequestError) {
	stack.set(error.code, error.msg)
}

function removeMsg(error: Service.RequestError) {
	stack.delete(error.code)
}

function hasErrorMsg(error: Service.RequestError) {
  return stack.has(error.code);
}

export function showErrorMsg(error: Service.RequestError) {
	if (!error.msg || NO_ERROR_MSG_CODE.includes(error.code) || hasErrorMsg(error) ) return

	addStack(error)

	window.console.warn(error.code, error.msg)
	ElMessage({
    message: error.msg,
		duration: ERROR_MSG_DURATION,
    type: 'error',
  })
	setTimeout(() => {
		removeMsg(error)
	}, ERROR_MSG_DURATION)
}
