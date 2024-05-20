import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()
        const accessToken = authStore.token;
        if (!accessToken) {
          return next({ name: 'login' })
        }
        next()
      },
    },
  ],
})

export default router
