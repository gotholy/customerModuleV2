import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: {},
    accessToken: ""
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await fetch('http://localhost:7777/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        if(response.ok){
          const data = await response.json();
          this.user = data
          this.accessToken = data.token;
          document.cookie = `access_token=${this.accessToken}; path=/`;
          console.log(this.accessToken);
          await this.fetchUserById(data._id)
        }
      } catch (error) {
        this.error = error.message
        return false
      }
    },
    async fetchUserById(id) {
      console.log('fetch called');
      const {data} = await fetch(`http://localhost:7777/api/user/getUser/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      this.user = data
      return response.json();
    }
  },
})