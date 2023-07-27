import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
	// 用户+密码 登录
  {
    url: '/mock/login',
    method: 'post',
    response: () => {
      return {
        code: '0000',
        message: '操作成功',
        data: null
      };
    }
  },
]

export default apis
