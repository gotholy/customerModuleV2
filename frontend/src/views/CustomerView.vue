<template>
    <div id="customer" >
        <div class="flex-container">
            <Aside />
            <section class="section">
                <h2>Customers</h2>
                <div class="mb-3">
                  <label for="formGroupExampleInput" class="form-label"></label>
                  <input type="text" class="form-control" id="formGroupExampleInput" v-model="searchQuery" placeholder="Suche nach Kunden">
                </div>
                <div v-if="loading">Loading customers...</div>
                <div v-else-if="error" class="error-message">Error: {{ error }}</div>
                <table v-else class="table">
                    <thead>
                        <tr>
                          <th scope="col" @click="sort('intnr')"># 
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                          <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                          <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                          <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>  
                          </svg>
                          </th>
                          <th scope="col" @click="sort('first_name')">First name</th>
                          <th scope="col" @click="sort('last_name')">Last name</th>
                          <th scope="col" @click="sort('company_name')">Company name</th>
                          <th scope="col" @click="sort('country')">Country</th>
                          <th scope="col" @click="sort('zip')">PLZ/Ort</th>
                          <th scope="col" @click="sort('street')">Adresse</th>
                          <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in filteredCustomers" :key="customer._id">
                        <td>{{ customer.intnr }}</td>
                        <td>{{ customer.contact_persons[0].first_name }}</td>
                        <td>{{ customer.contact_persons[0].last_name }}</td>
                        <td>{{ customer.addresses[0].company_name }}</td>
                        <td>{{ customer.addresses[0].country }}</td>
                        <td>{{ customer.addresses[0].zip }} / {{ customer.addresses[0].city }}</td>
                        <td>{{ customer.addresses[0].street }}</td>
                        <td class="deleteAndDetail">
                            <p class="iconWrapperBtn" @click="showConfirmDeleteModal(customer._id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 01 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </p>
                            <!-- Button mit router-link, um zur OneCustomerView.vue zu wechseln und die ID zu übergeben -->
                            <router-link :to="{ name: 'OneCustomerView', params: { id: customer._id } }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                            </svg>
                            </router-link>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

    <!--Pop-Up-Fenster für bestätigung zum löschen des Kunden-->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">Bestätigung</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Möchten Sie den Kunden wirklich löschen?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Nein</button>
            <button type="button" class="btn btn-danger" @click="deleteCustomer(customerIdToDelete)" data-bs-dismiss="modal">Ja</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
  
<script setup>
import {Modal} from 'bootstrap'
import Aside from '../components/aside.vue'
import { useCustomerStore } from '../stores/customerStore'
import { computed, onMounted, ref, nextTick } from 'vue'
import { sortCustomers } from '../utils/sort.js'


const customerStore = useCustomerStore()

const customers = computed(() => customerStore.customers)
const loading = computed(() => customerStore.loading)
const error = computed(() => customerStore.error)

const customerIdToDelete = ref(null)

const searchQuery = ref('')

function searchCustomers() {
  const filteredCustomers = customers.value.filter(customer => {
    const searchString = searchQuery.value.toLowerCase()
    return (
      customer.intnr.toString().includes(searchString) ||
      customer.contact_persons[0].first_name.toLowerCase().includes(searchString) ||
      customer.contact_persons[0].last_name.toLowerCase().includes(searchString) ||
      customer.addresses[0].company_name.toLowerCase().includes(searchString) ||
      customer.addresses[0].country.toLowerCase().includes(searchString) ||
      customer.addresses[0].zip.toString().includes(searchString) ||
      customer.addresses[0].street.toLowerCase().includes(searchString)
    )
  })
  return filteredCustomers
}

const filteredCustomers = computed(() => searchCustomers())
async function getCustomers() {
  await customerStore.fetchCustomers()
}

async function deleteCustomer(id) {
  await customerStore.deleteCustomerById(id)
  await getCustomers()
}

function showConfirmDeleteModal(id) {
  customerIdToDelete.value = id
  nextTick(() => {
    const modal = new Modal(document.getElementById('confirmDeleteModal'))
    modal.show()
  })
}

const sortKey = ref('intnr')
const sortOrders = ref({
  intnr: 'asc',
  first_name: 'asc',
  last_name: 'asc',
  company_name: 'asc',
  country: 'asc',
  zip: 'asc',
  street: 'asc'
})

function sort(key) {
  sortCustomers(key, customers.value, sortOrders.value)
}

onMounted(async () => {
    await getCustomers()
})

</script>

<style scoped> 
#id {
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
}
.flex-container{
    display: flex;
}

.section{ 
    background-color: aliceblue; 
    width: 100vw; 
    padding: 5vh 2vw;
    display: flex;
    flex-direction: column;
    margin-bottom: 10vh;
} 
.iconWrapperBtn{
    cursor: pointer;
}
.deleteAndDetail{
    display: flex;
    gap: 1vw;
}
span{
  font-size: 0.5rem;
}
</style>
