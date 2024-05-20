<template>
    <aside class="aside">
    <h3>firstName lastName</h3>
    <p>last Login: 13.05.2024, 10:32Uhr </p>
    <h1>Customer CSV Upload</h1>
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
import router from '../router/index.js';
import { ref } from 'vue';

const authStore = useAuthStore();
const user = ref(null);
async function mounted() {
  if (authStore.token) {
    user.value = await authStore.getLoggedInUser();
  }
}

const logout = async () => {
  await authStore.logout();
  router.push({ name: 'login' })

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