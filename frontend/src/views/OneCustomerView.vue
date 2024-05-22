<template>
  <div id="OneCustomer">
    <div class="flex-container">
      <section class="section">
        <h2>Customer Details</h2>
        <div v-if="loading">Loading customer...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Internal Number</th>
                <th scope="col">Type</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ companyName }}</td>
                <td>{{ customer.intnr }}</td> 
                <td>{{ customer.type }}</td>
                <td>                            
                  <p class="iconWrapperBtn" @click="showUpdateCustomerInputModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <h3>Contact Persons</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile Phone</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contactPerson in customer.contact_persons" :key="contactPerson._id">
                <td>{{ contactPerson.first_name }}</td>
                <td>{{ contactPerson.last_name }}</td>
                <td>{{ contactPerson.email }}</td>
                <td>{{ contactPerson.mobile_phone }}</td>
                <td>                            
                  <p class="iconWrapperBtn" @click="showUpdateContactPersonInputModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <h3>Addresses</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Country</th>
                <th scope="col">City/Zip</th>
                <th scope="col">Street</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Fax</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="address in customer.addresses" :key="address._id">
                <td>{{ address.company_name }}</td>
                <td>{{ address.country }}</td>
                <td>{{ address.city }} {{ address.zip }}</td>
                <td>{{ address.street }}</td>
                <td>{{ address.email }}</td>
                <td>{{ address.phone }}</td>
                <td>{{ address.fax }}</td>
                <td>                            
                  <p class="iconWrapperBtn" @click="showUpdateAddressesInputModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <router-link :to="{name: 'customer'}" class="" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-backspace" viewBox="0 0 16 16">
                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
              </svg>
          </router-link>
        </div>
     </section>
    </div>
  </div>
</template>

<script setup> import { useCustomerStore } from '../stores/customerStore' 
import { onMounted, computed, ref } from 'vue' 
import {useRoute} from 'vue-router' 
const route = useRoute() 

const customerStore = useCustomerStore()
const loading = ref() 
const error = ref(null) 

const updateCustomerData = {
  
}

const customer = computed(() => customerStore.customer) 
const addresses = computed(() => customerStore.customer.addresses) 
const contactPersons = computed(() => customerStore.customer.contact_persons) 
const companyName = ref('') 

onMounted(async () => { 
  const id = computed(() => route.params.id).value; const idString = String(id); 
  await customerStore.fetchCustomerById(idString); 
  (customer.value.addresses && customer.value.addresses.length > 0) 
  { companyName.value = customer.value.addresses[0].company_name } 
  }
) 
</script>

<style scoped>
.section{
  min-height: 94.2vh;
  display: flex;
  flex-direction: column;
  margin: 2vh 1vw;
}
.table-container{
  display: flex;
  flex-direction: column;
}
.table{
  margin-bottom: 10vh;
  max-width: fit-content;
}
</style>