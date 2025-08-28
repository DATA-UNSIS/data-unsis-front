<template>
  <!-- Botón de toggle para móviles (fuera del sidebar) -->
  <button 
    v-if="isMobile && isMobileHidden" 
    class="mobile-hamburger" 
    @click="toggleMobileSidebar"
  >
    <Icon icon="mdi:menu" />
  </button>

  <!-- Overlay para móviles -->
  <div 
    v-if="isMobile" 
    class="sidebar-overlay" 
    :class="{ 'show': !isMobileHidden }" 
    @click="hideMobileSidebar"
  ></div>

  <aside 
    class="sidebar" 
    :class="{ 
      'sidebar-collapsed': isCollapsed, 
      'sidebar-mobile-hidden': isMobile && isMobileHidden 
    }"
  >
    <!-- Contenido del sidebar -->
    <div class="sidebar-content">
      <!-- Botón de colapsar para desktop -->
      <button 
        v-if="!isMobile"
        class="sidebar-toggle desktop-only" 
        @click="toggleCollapse"
      >
        <Icon :icon="isCollapsed ? 'mdi:menu' : 'mdi:menu-open'" />
      </button>

      <div class="sidebar-header">
        <div class="unsis-logo">
          <img
            src="/src/assets/logo.png"
            alt="Escudo de la Universidad de la Sierra Sur"
            class="unsis-logo-img"
          />
        </div>
        <h2 class="portal-title" v-show="!isCollapsed">PORTAL DE ESTADISTICAS</h2>
      </div>

      <hr class="divider" />

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/alumnos" class="nav-link" @click="handleMobileClick">
              <Icon icon="mdi:home" class="nav-icon" />
              <span class="nav-text" v-show="!isCollapsed">Inicio</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/alumnos/fichas" class="nav-link" @click="handleMobileClick">
              <Icon icon="mdi:chart-bar" class="nav-icon" />
              <span class="nav-text" v-show="!isCollapsed">Estadisticas Generales</span>
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link to="/ayuda" class="nav-link" @click="handleMobileClick">
              <Icon icon="mdi:help-circle" class="nav-icon" />
              <span class="nav-text" v-show="!isCollapsed">Ayuda</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <hr class="divider" />

      <div class="options-section">
        <h3 class="options-title" v-show="!isCollapsed">Opciones</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <button class="nav-link logout-btn" @click="logout">
              <Icon icon="mdi:logout" class="nav-icon" />
              <span class="nav-text" v-show="!isCollapsed">Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Estados reactivos
const isCollapsed = ref(false)
const isMobileHidden = ref(false) // Inicializar como visible
const isMobile = ref(false)

// Detectar si es móvil
const checkMobile = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth <= 768
  
  // Solo cambiar estado si cambió el tipo de dispositivo
  if (!wasMobile && isMobile.value) {
    // Cambió a móvil: ocultar sidebar
    isMobileHidden.value = true
  } else if (wasMobile && !isMobile.value) {
    // Cambió a desktop: mostrar sidebar
    isMobileHidden.value = false
  }
}

// Funciones
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleMobileSidebar = () => {
  isMobileHidden.value = !isMobileHidden.value
}

const hideMobileSidebar = () => {
  if (isMobile.value) {
    isMobileHidden.value = true
  }
}

const handleMobileClick = () => {
  if (isMobile.value) {
    isMobileHidden.value = true
  }
}

const logout = () => {
  console.log("Logout clicked");
  router.push("/login");
  if (isMobile.value) {
    isMobileHidden.value = true
  }
};

// Lifecycle
onMounted(() => {
  // Detectar el tipo de dispositivo al inicio
  isMobile.value = window.innerWidth <= 768
  isMobileHidden.value = isMobile.value // Oculto solo en móvil
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>






<style scoped>
.sidebar {
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background: #ffffff;
  border-right: 2px solid #13442A;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Estados del sidebar */
.sidebar-collapsed {
  width: 70px;
  min-width: 70px;
}

/* Solo aplicar hide en móviles */
@media (max-width: 768px) {
  .sidebar-mobile-hidden {
    transform: translateX(-100%);
  }
}

/* Contenido del sidebar */
.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Botón hamburguesa móvil independiente */
.mobile-hamburger {
  position: fixed;
  top: 15px;
  left: 15px;
  background: var(--color-primary, #4a7c59);
  color: white;
  border: none;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.mobile-hamburger:hover {
  background: var(--color-primary-dark, #3a5c49);
  transform: scale(1.05);
}

/* Botón de toggle dentro del sidebar */
.sidebar-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-primary, #4a7c59);
  color: white;
  border: none;
  border-radius: 4px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background: var(--color-primary-dark, #3a5c49);
  transform: scale(1.05);
}

/* Mostrar/ocultar botones según dispositivo */
.mobile-only {
  display: none;
}

.desktop-only {
  display: flex;
}

/* En desktop, ocultar hamburguesa móvil */
@media (min-width: 769px) {
  .mobile-hamburger {
    display: none;
  }
}

/* Overlay para móviles */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.sidebar-overlay.show {
  opacity: 1;
  visibility: visible;
}

.sidebar-header {
  padding: 2rem 1.5rem 1rem;
  text-align: center;
  transition: padding 0.3s ease;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo-icon {
  background: var(--color-shadow, #13442A);
  color: var(--color-secondary, #ffffff);
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text, #275B3B);
}

.unsis-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.unsis-logo-img {
  max-width: 120px;
  width: 100%;
  height: auto;
  display: block;
}

.portal-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color-text, #275B3B);
  margin: 1rem 0.5rem 0 0.5rem;
  text-transform: uppercase;
  text-align: center;
  word-wrap: break-word;
}

.divider {
  border: none;
  height: 1px;
  background: var(--color-tertiary, #5F7D6F);
  margin: 1rem 0;
}

.sidebar-nav {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-plain-text, #000000);
  border-radius: 0;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
  width: 100%;
  margin: 0;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
}

.nav-link:hover {
  background: var(--color-shadow, #13442A);
  color: var(--color-secondary, #ffffff);
}

.nav-link.router-link-active {
  background: var(--color-secondary, #ffffff);
  color: var(--color-text, #275B3B);
}

.nav-icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
}

.nav-text {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.options-section {
  padding: 0 0 2rem 0;
  overflow: hidden;
  flex-shrink: 0;
}

.options-title {
  font-size: 0.8rem;
  color: var(--color-plain-text, #000000);
  text-align: center;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  font-weight: 500;
}

.logout-btn {
  color: var(--color-plain-text, #000000) !important;
}

.logout-btn:hover {
  background: var(--color-shadow, #13442A) !important;
  color: var(--color-secondary, #ffffff) !important;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    width: 250px;
    min-width: 250px;
  }

  .unsis-logo-img {
    max-width: 100px;
  }

  .portal-title {
    font-size: 0.8rem;
    margin: 1rem 0.25rem 0 0.25rem;
  }
}

/* Estilos para sidebar colapsado */
.sidebar-collapsed .sidebar-header {
  padding: 1rem 0.5rem;
}

.sidebar-collapsed .unsis-logo-img {
  max-width: 40px;
}

.sidebar-collapsed .nav-link {
  justify-content: center;
  padding: 0.75rem 0.5rem;
}

.sidebar-collapsed .nav-icon {
  margin-right: 0;
}

.sidebar-collapsed .options-title {
  display: none;
}

/* Media queries para responsive */
@media (max-width: 768px) {
  .mobile-only {
    display: flex;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1002;
  }
  
  .desktop-only {
    display: none;
  }
  
  .sidebar {
    z-index: 1001;
    width: 280px;
    min-width: 280px;
  }
  
  .sidebar:not(.sidebar-mobile-hidden) {
    transform: translateX(0);
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .nav-icon {
    font-size: 1.1rem;
    margin-right: 0.5rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 200px;
    min-width: 200px;
  }

  .unsis-logo-img {
    max-width: 80px;
  }
  
  .portal-title {
    font-size: 0.7rem;
    margin: 0.75rem 0.25rem 0 0.25rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.5rem;
    font-size: 0.85rem;
  }
  
  .nav-icon {
    font-size: 1rem;
    margin-right: 0.4rem;
  }

  .options-title {
    font-size: 0.7rem;
  }
}
</style>
