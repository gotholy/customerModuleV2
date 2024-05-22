import { defineStore } from 'pinia'
import { useApi,useApiPrivate } from '../composables/useApi.js'


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      formattedUpdatedAt: "",
    },
    accessToken: "",
    authReady: false,
  }),
  getters: {
    userDetail: (state) => state.user,
    isAuthenticated: (state) => state.accessToken ? true : false   
  },
  actions: {
    async attempt(){
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        throw error
      }
      return
    },
    async login(loginData) {
      try {
        const {data} = await useApi().post(`/api/auth/login`, loginData);
        this.accessToken = data.access_token
        await this.getUser()
        return data
      }catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    async getUser() {
      try {
        const {data} = await useApiPrivate().get(`/api/auth/actualUser`);
        const formattedUpdatedAt = new Date(data.updated_at).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        this.user = { ...data, updated_at: formattedUpdatedAt };
      } catch (error) { 
        return error
      }
    },
    async logout(){
      try {
        const {data} = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = ""
        this.user = {}
        return data
      } catch (error) {
        throw error
      }
    },
    async refresh(){
      try {
        const {data} = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data?.access_token
        return data
      } catch (error) {
        throw error
      }
    },
  },
})