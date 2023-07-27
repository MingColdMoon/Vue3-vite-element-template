import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Login from '../views/Login.vue';
import Home from '../views/basic-writing/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  },
	{
    path: '/login',
    component: Login
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
