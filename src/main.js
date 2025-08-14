import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import axios from "axios";
import router from "./router";

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
app.config.globalProperties.$http = axios
app.use(createPinia())
app.use(router)
