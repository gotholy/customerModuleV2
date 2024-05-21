<template>
    <aside class="aside">
      <template v-if="isAuthenticated">
      <h3>{{ user.first_name }} {{ user.last_name }}</h3>
      <p>Letzter Login: 13.05.2024, 10:32 Uhr</p>
    </template>
    <template v-else>
      <p>Bitte melden Sie sich an, um auf diese Seite zuzugreifen.</p>
      <button type="button" class="btn" @click="login">Login</button>
    </template>
    <div class="uploadContainer">
        <div class="uploadBtnContainer">
            <button type="button" class="btn">Upload Customer</button>
        </div> 
        <div class="uploadBtnContainer">
          <button type="button" class="btn">Upload Contact</button>
        </div> 
        <div class="uploadBtnContainer">
          <button type="button" class="btn">Upload Adresses</button>
        </div> 
        <button type="button" class="btn btn-primary" @click="logout">Logout</button>
    </div>
    </aside>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore.js';
import { computed } from 'vue';
import router from '../router/index.js';


const authStore = useAuthStore();

const user = computed(()=>{
  return authStore.user
})
const isAuthenticated = computed(()=>{
  return authStore.isAuthenticated
})


const logout = async () => {
  try {
    await authStore.logout()
    .then( res => {
      router.push({ name: 'login' })
    })
  } catch (err) {
    console.log(err.message);
  }
};
const login = () => {
  router.push({ name: 'login' });
};
</script>

  
<style scoped>
.aside {
    background-color: #2966e8a4; 
    width: 20vw;
    height: 100vh;
    padding: 0.5vh 1vw 0.5vw 1vw;
}
h1{
    font-size: 1.5rem;
    margin-bottom: 4vh;
    color: aliceblue;
}
h3{
  color: aliceblue;
}
p{
  color: aliceblue;
}
.uploadBtnContainer{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 18vh;
    width: 18vw;
    background-color: aliceblue;
    margin-bottom: 2vh;
    padding-top: 2vh;
}
</style>