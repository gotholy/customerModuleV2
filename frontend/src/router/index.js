import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore.js'
import UserView from '../views/auth/UserView.vue'
import CustomerView from '../views/CustomerView.vue'
import OneCustomerView from '../views/OneCustomerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {requiresGuest: true}
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {requiresAuth: true}
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView,
      meta: {requiresAuth: true}
    },
    {
      path: '/customer/:id',
      name: 'OneCustomerView',
      component: OneCustomerView,
      props: true,
      meta: {requiresAuth: true}
    },
  ],
})

router.beforeEach((to, from) => {
  const store = useAuthStore(); 
  if(to.meta.requiresAuth && !store.isAuthenticated){
    return {name: 'login'}
  }else if(to.meta.requiresGuest && store.isAuthenticated){
    return {name: 'customer'}
  }
})

export default router