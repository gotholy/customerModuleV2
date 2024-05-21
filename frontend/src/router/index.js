import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore.js'
import UserView from '@/views/auth/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {requiresGuest: true}
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
      // Remove the requiresGuest meta property from the home route
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {requiresAuth: true}
    },
  ],
})

router.beforeEach((to, from) => {
  const store = useAuthStore(); 
  if(to.meta.requiresAuth && !store.isAuthenticated){
    return {name: 'login'}
  }else if(to.meta.requiresGuest && store.isAuthenticated){
    // Only redirect authenticated users to the home page if they're trying to access a route that requires a guest
    return {name: 'home'}
  }
})

export default router