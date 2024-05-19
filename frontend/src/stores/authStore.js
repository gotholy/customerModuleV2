import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: {},
    accessToken: null
  }),
  actions: {
    async login(email, password) {
      try {
        // const response = await fetch('http://localhost:7777/api/auth/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ email, password })
        // })
      }catch (error) {
      }
    },
    async fetchUserById(id) {
      try {
        // const {data} = await fetch(`http://localhost:7777/api/auth/user/${id}`, {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${this.accessToken}`
        //   }
        // });
      } catch (error) { 
      }
    },
    async logout(){
      // await fetch('http://localhost:7777/api/auth/logout', {
      //           method: 'POST',
      //         });
    }
  },
})