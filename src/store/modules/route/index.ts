import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route-store', {
	state: () => ({
		menu: []
	}),
	actions: {
		/** 存入路由信息 */
		async initDynamicRoute() {
		}
	}
})
