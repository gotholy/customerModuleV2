import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await fetch('http://localhost:7777/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          this.user = data;
          this.token = data.token;
          console.log(data.token);
          return true;
        } else {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async getLoggedInUser() {
      console.log('getLoggedInUserCalled');
      try {
        const token = this.token; // get the token from the store state
        console.log(token,'token getLoggedInUserCalled');
        if (!token) {
          throw new Error("No token found in the store");
        }

        const response = await fetch('http://localhost:7777/api/auth/actualUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // add the token to the headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.user = data;
          return data;
        } else {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
        throw error;
      }
    },
    async logout() {
      try {
        await fetch('http://localhost:7777/api/auth/logout', {
          method: 'POST',
        });
        this.user = null;
        this.accessToken = null;
      } catch (error) {
        console.error(`Logout Error`, error);
      }
    },
  },
});