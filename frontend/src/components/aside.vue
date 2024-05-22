<template>
    <aside class="aside" >
    <h1 class="customerTitle">Customer CSV uploads</h1>
    <div class="uploadContainer">
        <div class="uploadBtnContainer uploadCustomerContainer">
          <input type="file" @change="uploadCustomers($event.target.files)">
        </div> 
        <div class="uploadBtnContainer uploadAddressContainer">
          <input type="file" @change="uploadAddresses($event.target.files)">
        </div> 
        <div class="uploadBtnContainer uploadContactContainer">
          <input type="file" @change="uploadContacts($event.target.files)">
        </div> 
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </aside>
</template>

<script setup>
import { useCustomerStore } from '../stores/customerStore'
import { ref } from 'vue'

const customerStore = useCustomerStore()
let errorMessage = ref(null)

const uploadCustomers = (files) => {
  if (files.length > 0) {
    const file = files[0];
    customerStore.uploadCustomers(file)
    .catch((error) => {
      errorMessage.value = error.message
    })
  }
}

const uploadAddresses = (files) => {
  try {
    if (files.length > 0) {
    const file = files[0];
    customerStore.uploadAddresses(file)
  }
  } catch(error) {
    errorMessage.value = error.message
  }
}


const uploadContacts = (files) => {
  if (files.length > 0) {
    const file = files[0];
    customerStore.uploadContacts(file)
    .catch((error) => {
      errorMessage.value = error.message
    })
  }
}

</script>

  
<style scoped>
.aside{
  height: 94vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.customerTitle{
  font-size: 1.4rem;
}
.uploadBtnContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15vh;
    width: 15vw;
    background-color: aliceblue;
    margin: 2vh;
    padding: 2vh;
}
</style>