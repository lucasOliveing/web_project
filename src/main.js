import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

const pinia = createPinia();
const app = createApp(App);
app.use(router)
app.use(pinia)


app.mount('#app')


