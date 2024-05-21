import { useAuthStore } from "../stores/authStore.js"

export const authentication = {
  async install(){
    const store = useAuthStore()
    try {
      await store.attempt()
      return
    } catch (error) {
      return
    }
  }
}