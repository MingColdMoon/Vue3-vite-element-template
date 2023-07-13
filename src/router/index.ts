import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router