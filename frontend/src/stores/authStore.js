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
        const response = await fetch('http://localhost:7777/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
          throw new Error('Invalid email or password')
        }
        this.user = response

        this.accessToken = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
        console.log(accessToken);
        // console.log('login successfull');
        // console.log('data', user);
        await this.fetchUserById(response.data._id)

        return response.data
      } catch (error) {
        this.error = error.message
        return false
      }
    },
    async fetchUserById(id) {
      console.log('userbyid called');
      const {data} = await fetch(`http://localhost:7777/api/auth/user/${id}`, {
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