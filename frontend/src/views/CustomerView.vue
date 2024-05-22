<template>
    <div id="customer" >
        <div class="flex-container">
            <Aside />
            <section class="section">
                <h2>Customers</h2>
                <div class="mb-3">
                  <label for="formGroupExampleInput" class="form-label"></label>
                  <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Search for Costumer">
                 </div>
                <div v-if="loading">Loading customers...</div>
                <div v-else-if="error" class="error-message">Error: {{ error }}</div>
                <table v-else class="table">
                    <thead>
                        <tr>
                        <th scope="col">Interne Nummer</th>
                        <th scope="col">Vorname</th>
                        <th scope="col">Nachname</th>
                        <th scope="col">Firmenname</th>
                        <th scope="col">Land</th>
                        <th scope="col">PLZ/Ort</th>
                        <th scope="col">Adresse</th>
                        <th>Delete/Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in customers" :key="customer._id">
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

const customerStore = useCustomerStore()

const customers = computed(() => customerStore.customers)
const loading = computed(() => customerStore.loading)
const error = computed(() => customerStore.error)

const customerIdToDelete = ref(null)

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
    padding: 4vh 2vw;
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
</style>
