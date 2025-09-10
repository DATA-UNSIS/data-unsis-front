<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import Sidebar from '../components/Sidebar.vue';
import DataUnsisHeader from "../components/Data-Unsis-Header.vue";
import { header } from '@primeuix/themes/aura/accordion';

// Estado reactivo para controlar la visibilidad del sidebar
const isSidebarVisible = ref(true);

const isInHomeRoute = ref(true);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    isInHomeRoute.value = !(newPath === '/alumnos' || newPath === '/alumnos/home' || newPath === '/alumnos/ayuda');
  },
  { immediate: false }
);

// Estado reactivo para los filtros
const filters = ref({
  carreras: null as string[] | null,
  semestres: null as string[] | null,
  sexo: null as string | null
});

// Función para toggle del sidebar
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

// Detectar si es móvil y ocultar sidebar por defecto
onMounted(() => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    isSidebarVisible.value = false;
  }
});

const headerEmit = (newFilters: { carreras: string[] | null; semestres: string[] | null; sexo: string | null }) => {
  console.log("Filtros recibidos en AppContainer:", newFilters);
  filters.value = newFilters;
};

</script>

<template>
  <div class="app-layout" :class="{ 'sidebar-hidden': !isSidebarVisible }">
    <!-- Header -->
    <header class="header-area">
      <!-- Botón toggle del sidebar -->
      <button @click="toggleSidebar" class="sidebar-toggle-btn max-md:size-8">
        <Icon :icon="isSidebarVisible ? 'mdi:menu-open' : 'mdi:menu'" />
      </button>
      <DataUnsisHeader :is-start="isInHomeRoute" @filters-changed="headerEmit"/>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar-area" v-show="isSidebarVisible">
      <Sidebar/>
    </aside>

    <!-- Main Content -->
    <main class="main-content-area">
        <router-view 
          :key="$route.fullPath"
          :majors="filters.carreras" 
          :semesters="filters.semestres"
          :sexo="filters.sexo"
        />
    </main>

    <!-- Footer -->
    <footer class="footer-area">
      <div class="footer-content">
        <span>Universidad de la Sierra Sur</span>
        <div class="social-icons">
          <Icon class="icon" icon="line-md:facebook"/>
          <Icon class="icon" icon="line-md:instagram"/>
          <Icon class="icon" icon="line-md:twitter-x"/>
        </div>
        <span>Soporte</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Grid Layout Principal - Estructura del Contenedor */
.app-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "sidebar footer";
  grid-template-columns: 320px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background-color: #2D6849;
  transition: grid-template-columns 0.3s ease;
}

/* Cuando el sidebar está oculto */
.app-layout.sidebar-hidden {
  grid-template-areas: 
    "header"
    "main"
    "footer";
  grid-template-columns: 1fr;
}

/* Areas del Grid */
.header-area {
  grid-area: header;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
}

/* Botón toggle del sidebar */
.sidebar-toggle-btn {
  background: #275B3B;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(39, 91, 59, 0.2);
}

.sidebar-toggle-btn:hover {
  background: #1e4529;
  transform: scale(1.05);
}

.sidebar-area {
  grid-area: sidebar;
  background-color: #2D6849;
  border-right: 2px solid #13442A;
  transition: all 0.3s ease;
}

.main-content-area {
  grid-area: main;
  background-color: #2D6849;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  min-height: 0;
}

/* Contenedor interno con scroll */
.content-wrapper {
  background: #2D6849;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  height: 70vh; /* Altura fija */
  max-height: 70vh; /* Máximo fijo */
  min-height: 70vh; /* Mínimo fijo */
  width: 100%;
  position: relative;
}

.footer-area {
  grid-area: footer;
  background-color: #2D6849;
  border-top: 1px solid #13442A;
}

/* Footer Content */
.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  color: white;
  min-height: 60px;
}

.social-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon:hover {
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .app-layout {
    grid-template-columns: 280px 1fr;
  }
}

@media (max-width: 768px) {
  .app-layout {
    grid-template-areas: 
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .sidebar-area {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  /* Mostrar sidebar cuando está visible en móvil */
  .app-layout:not(.sidebar-hidden) .sidebar-area {
    transform: translateX(0);
  }
  
  /* Agregar overlay cuando el sidebar está abierto en móvil */
  .app-layout:not(.sidebar-hidden)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .main-content-area {
    padding: 1rem;
  }
  
  .content-wrapper {
    padding: 1.5rem;
    border-radius: 0.75rem;
    height: 65vh; /* Altura fija en tablet */
    max-height: 65vh;
    min-height: 65vh;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .main-content-area {
    padding: 0.5rem;
  }
  
  .content-wrapper {
    padding: 1rem;
    border-radius: 0.5rem;
    height: 60vh; /* Altura fija en móvil */
    max-height: 60vh;
    min-height: 60vh;
  }
  
  .footer-content {
    padding: 0.75rem;
  }
  
  .icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>