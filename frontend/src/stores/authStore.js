import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
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
          this.user = data.data;
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

    async logout() {
      try {
        await fetch('http://localhost:7777/api/auth/logout', {
          method: 'POST',
        });
        this.user = null;
      } catch (error) {
        console.error(`Logout Error`, error);
      }
    },
  },
});