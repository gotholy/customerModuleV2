<template>
    <div id="login">
      <div class="container">
        <div class="card card-body mt-4">
          <h5 class="card-title">Sell Cars</h5>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
            <input v-model="loginData.email" type="email" class="form-control" id="email"  placeholder="Username">
          </div>
          <div class="mb-3">
            <input v-model="loginData.password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
            <div class="btn-container">
                <button type="submit" class="btn">Login</button>
            </div>
            <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { useAuthStore } from '../../stores/authStore.js';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore()
  const router = useRouter()
  const loginData = reactive({
    email: "",
    password: "",
  })

  let errorMessage = ref("")

  async function handleSubmit(){
  try {
    await authStore.login(loginData)
    router.replace({name: "user"})
  } catch(error) {
    errorMessage.value = error.message
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
