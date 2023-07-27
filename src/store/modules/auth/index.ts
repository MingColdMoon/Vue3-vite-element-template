import { defineStore } from 'pinia'
import { useAxios } from '@vueuse/integrations/useAxios'
import { mockRequest } from '@/service/request';
interface AuthStore {
	userInfo: Auth.UserInfo
}

export const useAuthStore = defineStore('auth-store', {
	state: (): AuthStore => ({
		userInfo: {
			userId: '',
			userName: '',
			userRole: 'user'
		}
	}),
	actions: {
		/** 重置auth状态 */
    resetAuthStore() {
			this.$reset();
    },
		/** 存入登录信息 */
		async submitLoginInfo(userName: string) {
			// const { execute } = useAxios('/mock/login', { method: 'POST' }, { immediate: false })
			// const result =  await execute({ data: { key: 1 } })
			const result = mockRequest.post('/login', { userName: '1232' })
			console.log(result);
			this.userInfo.userId = '1'
			this.userInfo.userName = userName
		}
	}
})
