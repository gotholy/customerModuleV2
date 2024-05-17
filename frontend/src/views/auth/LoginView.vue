<template>
    <div id="login">
      <div class="container">
        <div class="card card-body mt-4">
          <h5 class="card-title">Sell Cars</h5>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Username">
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
          </div>
            <div class="btn-container">
                <button type="submit" class="btn">Login</button>
            </div>
            <div class="error" v-if="error">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../../stores/authStore.js'
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async handleSubmit() {
        
        try {
        const authStore = useAuthStore()
        const success = await authStore.login(this.email, this.password)
        if (success) {
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        this.error = error.message;
      }
      }
    }
  }
</script>

<style scoped>
#login{
  background-color: #2966e8a4; 
  height: 100vh;
}
.btn{
  background-color: #2966e8a4; 
  border-color: aliceblue;
}
.container {
  width: 40vw;
  margin: auto;
  padding-top: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-container{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.card{
  border-color: aliceblue;

  display: flex;
  justify-content: center;
  max-width: 25vw;
}
.card-title{
  display: flex;
  align-items: center;
  justify-content: center
}
</style>
