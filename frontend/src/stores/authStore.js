import { defineStore } from 'pinia'
import { useApi,useApiPrivate } from '../composables/useApi.js'


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
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
        return error
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
        throw error
      }
    },
    async getUser() {
      try {
        const {data} = await useApiPrivate().get(`/api/auth/actualUser`);
        this.user = data
      } catch (error) { 
        throw error
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