<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import Sidebar from '../components/Sidebar.vue';
import DataUnsisHeader from "../components/Data-Unsis-Header.vue";

const isInHomeRoute = ref(true);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    isInHomeRoute.value = !(newPath === '/alumnos' || newPath === '/alumnos/home' || newPath === '/alumnos/ayuda');
  },
  { immediate: false }
);

const filters = ref({
  carreras: null as string[] | null,
  semestres: null as string[] | null,
  sexo: null as string | null
});

const isSidebarVisible = ref(true);
const isMobile = ref(false);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (isMobile.value) {
    isSidebarVisible.value = false;
  } else {
    if (!hasUserToggledSidebar.value) {
      isSidebarVisible.value = true;
    }
  }
};

const hasUserToggledSidebar = ref(false);

const toggleSidebar = () => {
  hasUserToggledSidebar.value = true;
  isSidebarVisible.value = !isSidebarVisible.value;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
});

const headerEmit = (newFilters: { carreras: string[] | null; semestres: string[] | null; sexo: string | null }) => {
  console.log("Filtros recibidos en AppContainer:", newFilters);
  filters.value = newFilters;
};

</script>

<template>
  <div class="app-layout" :class="{ 'sidebar-collapsed': !isSidebarVisible }">
    <!-- Overlay para móvil cuando el sidebar está visible -->
    <div 
      v-if="isMobile && isSidebarVisible" 
      class="mobile-overlay"
      @click="toggleSidebar"
    ></div>

    <header class="header-area">
      <DataUnsisHeader :is-start="isInHomeRoute" @filters-changed="headerEmit"/>
    </header>

    <aside class="sidebar-area" v-show="isSidebarVisible">
      <Sidebar/>
    </aside>

    <button
      class="external-sidebar-btn"
      :aria-label="isSidebarVisible ? 'Contraer barra lateral' : 'Expandir barra lateral'"
      :title="isSidebarVisible ? 'Contraer barra lateral' : 'Expandir barra lateral'"
      tabindex="0"
      @click="toggleSidebar"
    >
      <Icon
        :icon="isSidebarVisible ? 'material-symbols:left-panel-close-sharp' : 'material-symbols:left-panel-open-sharp'"
        width="24"
        height="24"
      />
    </button>

    <main class="main-content-area">
      <router-view
        :key="$route.fullPath"
        :majors="filters.carreras"
        :semesters="filters.semestres"
        :sexo="filters.sexo"
      />
    </main>

    <footer class="footer-area">
      <div class="footer-content">
        <span>Universidad de la Sierra Sur</span>
        <div class="social-icons">
          <a href="https://www.facebook.com/share/1Gcirt5MEX/" target="_blank" rel="noopener">
            <Icon class="icon" icon="line-md:facebook"/>
          </a>
          <a href="https://www.instagram.com/suneo_unsis/" target="_blank" rel="noopener">
            <Icon class="icon" icon="line-md:instagram"/>
          </a>
          <a href="https://twitter.com/SUNEO_UNSIS" target="_blank" rel="noopener">
            <Icon class="icon" icon="line-md:twitter-x"/>
          </a>
        </div>
        <span>Soporte</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
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

.app-layout.sidebar-collapsed {
  grid-template-areas:
    "header header"
    "main main"
    "footer footer";
  grid-template-columns: 1fr;
}

.app-layout.sidebar-collapsed .main-content-area {
  max-width: 100%;
}

.app-layout.sidebar-collapsed .content-wrapper {
  transition: all 0.3s ease;
}

.app-layout.sidebar-collapsed :deep(.content-container) {
  max-width: none;
}

/* Responsive grid para cuando el sidebar está colapsado - máximo 3 por fila */
@media (min-width: 1200px) {
  .app-layout.sidebar-collapsed :deep(.content-container) {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .app-layout.sidebar-collapsed :deep(.content-container) {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .app-layout.sidebar-collapsed :deep(.content-container) {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .app-layout.sidebar-collapsed :deep(.content-container) {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Overlay para móvil */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

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

.sidebar-area {
  grid-area: sidebar;
  background-color: #2D6849;
  border-right: 2px solid #13442A;
  transition: all 0.3s ease;
}

.external-sidebar-btn {
  position: fixed;
  left: calc(320px - 22px);
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: #ffffff;
  border: 2px solid #2D6849;
  color: #2D6849;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1002;
  cursor: pointer;
  transition: all 0.3s ease;
}

.external-sidebar-btn:hover {
  background: #f0f9f4;
  border-color: #1e4529;
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.12);
}

.external-sidebar-btn:focus {
  outline: 3px solid #4CAF50;
  outline-offset: 2px;
}

.external-sidebar-btn:active {
  transform: translateY(-50%) scale(0.98);
  background: #e8f5e8;
}

.app-layout.sidebar-collapsed .external-sidebar-btn {
  left: 26px;
}

.external-sidebar-btn > :deep(svg) {
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.external-sidebar-btn:hover > :deep(svg) {
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .external-sidebar-btn {
    left: calc(280px - 22px);
  }
  .app-layout.sidebar-collapsed .external-sidebar-btn {
    left: 26px;
  }
}

@media (max-width: 768px) {
  .external-sidebar-btn {
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
    display: flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .external-sidebar-btn {
    transition: none;
  }
  .external-sidebar-btn:hover {
    transform: translateY(-50%);
  }
  .external-sidebar-btn:hover > :deep(svg) {
    transform: none;
  }
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
  width: 100%;
  transition: all 0.3s ease;
}

.content-wrapper {
  background: #2D6849;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  height: 70vh;
  max-height: 70vh;
  min-height: 70vh;
  width: 100%;
  position: relative;
  min-height: 400px;
}

.footer-area {
  grid-area: footer;
  background-color: #2D6849;
  border-top: 1px solid #13442A;
}

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
    transition: transform 0.3s ease;
    transform: translateX(0);
  }
  .app-layout.sidebar-collapsed .sidebar-area {
    transform: translateX(-100%);
  }
  .external-sidebar-btn {
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
  }
  .app-layout.sidebar-collapsed .external-sidebar-btn {
    left: 16px;
  }
  .main-content-area {
    padding: 1rem;
  }
  .content-wrapper {
    padding: 1.5rem;
    border-radius: 0.75rem;
    height: 65vh;
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
    height: 60vh;
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