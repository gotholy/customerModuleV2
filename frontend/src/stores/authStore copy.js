import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = ref(false);
  const accessToken = ref(null);

  const login = async (email, password) => {
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
        user.value = data;
        isLoggedIn.value = true;
        accessToken.value = data.token;
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('access_token', data.accessToken);
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
  };

  const logout = async () => {
    try{
      await fetch('http://localhost:7777/api/auth/logout', {
        method: 'POST',
      });
      user.value = null;
      isLoggedIn.value = false;
      accessToken.value = null;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');

    }catch(error){
      console.error(`Logout Error`, error)
    }

  };

  const getActualUser = () => {
    return user.value || localStorage.getItem('user');
  }
  const getAccessToken = () => {
    return accessToken.value || localStorage.getItem('access_token');
  };

  const authenticateRequest = (request) => {
    const token = getAccessToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    getAccessToken,
    authenticateRequest,
    getActualUser
  };
});