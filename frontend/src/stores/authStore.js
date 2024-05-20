import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      id: 0,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      full_name: "",
    },
    accessToken: "",
    authReady: false,
  }),

  getters: {
    userDetail: (state) => state.user,
    isAuthenticated: (state) => !!state.accessToken,
  },
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
    async getUser() {
      try {
        // const {data} = await fetch(`http://localhost:7777/api/auth/actualUser`, {
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
    },
    async refresh(){
      // await fetch('http://localhost:7777/api/auth/logout', {
      //           method: 'POST',
      //         });
    },
  },
})