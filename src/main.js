import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import axios from "axios";
import router from "./router";
import { Icon } from "@iconify/vue";

// Import Chart.js components
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement
)

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset:Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false, // Color de los componentes
            cssLayer: {
                name: 'primevue',
                order:'theme, base, primevue'
            }
        }
    }
});

app.use(createPinia())
app.use(router)
app.component('Icon', Icon);
app.config.globalProperties.$http = axios

app.mount('#app')
