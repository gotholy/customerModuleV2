<template>
  <aside class="aside">
    <h1 class="customerTitle">Customer CSV uploads</h1>
    <div class="uploadContainer">
      <div class="uploadBtnContainer uploadCustomerContainer">
        <label for="customerFile">Upload customer</label>
        <input type="file" id="customerFile" @change="uploadCustomers($event.target.files)">
      </div>
      <div class="uploadBtnContainer uploadContactContainer">
        <label for="contactFile">Upload contact persons</label>
        <input type="file" id="contactFile" @change="uploadContacts($event.target.files)">
      </div>
      <div class="uploadBtnContainer uploadAddressContainer">
        <label for="addressFile">Upload addresses</label>
        <input type="file" id="addressFile" @change="uploadAddresses($event.target.files)">
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

}
.customerTitle{
  font-size: 1.4rem;
  color: aliceblue;
  margin-left: 1vw;
}
.uploadBtnContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15vh;
  width: 15vw;
  background-color: aliceblue;
  margin: 2vh;
  padding: 2vh;
}
.uploadBtnContainer input[type="file"] {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.uploadBtnContainer label {
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
}
.uploadBtnContainer label:hover {
  color: #666;
}
</style>