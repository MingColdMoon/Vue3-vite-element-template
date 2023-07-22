import { defineStore } from 'pinia'
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
		submitLoginInfo(userName: string) {
			this.userInfo.userId = '1'
			this.userInfo.userName = userName
		}
	}
})
