import {createRouter, createWebHistory} from "vue-router";
import Help from "../views/content/Help.vue";
import graficasPosibles from '../views/content/graficasPosibles.js'

// Importa los componentes
const Login = () => import('../views/Login.vue')
const AppContainer = () => import('../views/AppContainer.vue')
const Home = () => import('../views/content/Home.vue')
const Grafics = () => import('../views/content/Grafics.vue')

const getGraphicTitles = (category) => {
  return Object.keys(graficasPosibles[category] || {})
}

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
      // Ruta para mostrar el componente Datos Demográficos
      {
        path: 'datos-demograficos',
        name: 'Datos Demograficos',
        component: Grafics,
        props: () => ({
          titles: getGraphicTitles('Demografic_Grafics')
        } ) 
      },
      {
        path: 'distribucion-geografica',
        name: 'Distribucion Geografica',
        component: Grafics,
        props: () => ({
          titles: getGraphicTitles('Geografic_Distribution')
        } ) 
      },
      {
        path: 'formacion-academica',
        name: 'Formacion Academica',
        component: Grafics,
        props: () => ({
          titles: getGraphicTitles('Academic_Formation')
        } ) 
      },
      {
        path: 'informacion-socioeconomica',
        name: 'Informacion Socioeconomica',
        component: Grafics,
        props: () => ({
          titles: getGraphicTitles('Socioeconomic_Information')
        })
      },
      {
        path: 'preguntas-personalizadas',
        name: 'Preguntas Personalizadas',
        component: Grafics,
        props: () => ({
          titles: getGraphicTitles('Personalizated_Questions')
        })
      },
       // Ruta para mostrar el componente Ayuda
      {
        path: 'ayuda',
        name: 'Ayuda',
        component: Help
      }
    ]
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router