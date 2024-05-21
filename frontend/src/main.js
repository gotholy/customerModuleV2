import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication.js'

import App from './App.vue'
import router from './router/index.js'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

app.use(createPinia())

authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})