import {createRouter, createWebHistory} from "vue-router";

// Importa los componentes
const Login = () => import('../views/Login.vue')
const AppContainer = () => import('../views/AppContainer.vue')
const Home = () => import('../views/content/Home.vue')
const Fichas = () => import('../views/content/Fichas.vue')

const routes = [
  // Ruta raíz - redirección al login
  {
    path: '/',
    redirect: '/login'
  },

  // Ruta de login - primera pantalla
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  // Ruta principal con rutas anidadas para el contenido dinámico
  {
    path: '/alumnos',
    component: AppContainer,
    children: [
      // Ruta por defecto del dashboard - muestra Home
      {
        path: '',
        name: 'Home',
        component: Home
      },
      // Ruta para mostrar el componente Fichas
      {
        path: 'fichas',
        name: 'Fichas',
        component: Fichas
      }
    ]
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router