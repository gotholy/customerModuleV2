import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookie from 'vue-cookies'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const pinia = createPinia();
const app = createApp(App);

app.use(pinia)
app.use(router)
app.use(VueCookie)

app.mount('#app')
