import { defineStore } from 'pinia'
import { useApiPrivate } from '../composables/useApi.js'

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [],
    customer: {},
    loading: false,
  }),
  getters: {
    getCustomers: (state) => state.customers,
    getCustomerById: (state) => (id) => state.customers.find(customer => customer.id === id),
  },
  actions: {
    async updateCustomer(updateCustomerData) {
      try {
        const {data} = await useApi().post(`/updateCustomer/${this.customer_id}`, updateCustomerData);
        this.customer = data
      }catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    async fetchCustomers() {
      try {
        this.loading = true;
        const { data } = await useApiPrivate().get('/api/customer/allCustomers');
        this.customers = data;
        console.log(data);
      } catch (error) {
        return error
      } finally {
        this.loading = false;
      }
    },
    async fetchCustomerById(id) {
      try {
        this.loading = true;
        const { data } = await useApiPrivate().get(`/api/customer/getOneCustomer/${id}`);
        this.customer = data;
      } catch (error) {
        return error
      } finally {
        this.loading = false;
      }
    },
    async deleteCustomerById(id) {
      try {
        this.loading = true;
        const { data } = await useApiPrivate().delete(`/api/customer/deleteCustomer/${id}`);
      } catch (error) {
        return error
      } finally {
        this.loading = false;
      }
    },
    async uploadCustomers(file) {
        try {
          this.loading = true;
          const formData = new FormData();
          formData.append('file', file);
  
          const { data } = await useApiPrivate().post('/api/customer/uploadCustomer', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.fetchCustomers()
        } catch (error) {
          if (error.response) {
            throw new Error(error.response.data.message);
          } else {
            throw error;
          }
        } finally {
          this.loading = false;
        }
    },
    async uploadAddresses(file) {
        try {
          this.loading = true;
          const formData = new FormData();
          formData.append('file', file);
  
          const { data } = await useApiPrivate().post('/api/address/uploadAddresses', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
    },
    async uploadContacts(file) {
        try {
          this.loading = true;
          const formData = new FormData();
          formData.append('file', file);
  
          const { data } = await useApiPrivate().post('/api/contact-person/uploadContacts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
    },
    // Hier könnten Sie weitere Aktionen für update, delete, etc. hinzufügen
  },
})