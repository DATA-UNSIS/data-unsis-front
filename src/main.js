import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import axios from "axios";
import router from "./router";
import { Icon } from "@iconify/vue";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset:Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});

app.use(createPinia())
app.use(router)
app.component('Icon', Icon);
app.config.globalProperties.$http = axios

app.mount('#app')
