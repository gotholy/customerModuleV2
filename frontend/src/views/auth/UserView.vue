<template>
    <div id="user">
        <div class="container">
          <div v-if="user" class="card card-body mt-4">
            <h1>User View</h1>
            <h4>{{ user.firstName }}</h4>
            <h4>{{ user.lastName }}</h4>
          </div>
        </div>

    </div>
  </template>
  
<script setup>
  import { useAuthStore } from '../../stores/authStore.js';

  import { computed, onMounted } from 'vue';

  const authStore = useAuthStore()
  
  const user = computed(()=>{
  console.log(authStore.userDetail)
  return authStore.userDetail
  })

  async function getUser(){
  await authStore.getUser()
  }

  onMounted(async ()=>{
    await getUser()

  })

</script>
  
  <style scoped>
  .container {
    display: flex;
    margin: 0;
    padding: 0;
  }
  </style>