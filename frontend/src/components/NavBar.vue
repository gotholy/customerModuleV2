<template>
 <nav class="navbar navbar-expand-lg custom-navbar">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="appNavbar">
      <ul class="navbar-nav mb-2 mb-lg-0 loginLogout">
        <li v-if="isAuthenticated" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle username" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ user.firstName }} {{ user.lastName }} <br/> <span>last login: {{ user.updated_at }}</span>
          </a>
          <ul class="dropdown-menu">
            <li><router-link :to="{name: 'user'}" class="dropdown-item">Profile</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><button @click="logout" class="dropdown-item btn btn-danger">Logout</button></li>
          </ul>
        </li>
        <template v-else>
          <li class="nav-item">
            <router-link :to="{name: 'login'}" class="nav-link" aria-current="page">Login</router-link>
          </li>
        </template>
        
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore.js';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()

const router = useRouter()

const user = computed(()=>{
  return authStore.user
})

const isAuthenticated = computed(()=>{
  return authStore.isAuthenticated
})

async function logout(){
  await authStore.logout()
    .then( res => {
      router.replace({name: 'login'})
    })
    .catch(err => {
      console.log(err.message)
    })
}

</script>

<style scoped>
.custom-navbar {
  background-color: none;
}
.username{
  color: aliceblue;
  font-size: 1.1rem;
}
span{
  font-size: 0.8rem;
}
</style>