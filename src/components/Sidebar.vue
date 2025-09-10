<template>
  <div
    class="sidebar"
  >
    <!-- Contenido del sidebar -->
    <div class="sidebar-content border-t-indigo-500">
      <hr class="divider" />

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link 
              to="/alumnos" 
              class="nav-link" 
              exact 
              exact-active-class="router-link-exact-active"
              active-class=""
            >
              <Icon icon="fa7-regular:home" class="nav-icon" />
              <div class="grid grid-rows-2">
                <span class="nav-text block">Inicio</span>
                <span class="nav-subtext">Inicio</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/alumnos/datos-demograficos" class="nav-link">
              <Icon icon="mdi:people" class="nav-icon"/>
              <div class="grid grid-rows-2">
                <span class="nav-text block">Datos Demográficos</span>
                <span class="nav-subtext">Distribución por sexo, edad, estado civil, etc.</span>
              </div>
            </router-link>
          </li>          
          <li class="nav-item">
            <router-link to="/alumnos/distribucion-geografica" class="nav-link">
              <Icon icon="streamline-plump:world-remix" class="nav-icon"/>
              <div class="grid grid-rows-2">
                <span class="nav-text">Distribución Geográfica</span>
                <span class="nav-subtext">Procedencia por entidad o municipio.</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/alumnos/formacion-academica" class="nav-link">
              <Icon icon="icon-park-outline:bachelor-cap" class="nav-icon"/>
              <div class="grid grid-rows-2">
                <span class="nav-text">Formación Academica</span>
                <span class="nav-subtext">Trayectoria y rendimiento estudiantil.</span>
              </div>
            </router-link>
          </li>
         <li class="nav-item">
            <router-link to="/alumnos/informacion-socioeconomica" class="nav-link">
              <Icon icon="hugeicons:money-bag-02" class="nav-icon"/>
              <div class="grid grid-rows-2">
                <span class="nav-text">Información Socioeconómica</span>
                <span class="nav-subtext">Ingresos, becas, servicios del hogar.</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/alumnos/preguntas-personalizadas" class="nav-link">
              <Icon icon="mdi:head-question-outline" class="nav-icon"/>
              <div class="grid grid-rows-2">
                <span class="nav-text">Preguntas Personalizadas</span>
                <span class="nav-subtext">Respuestas del cuestionario específico.</span>
              </div>
            </router-link>
          </li>          
          <li class="nav-item">
            <router-link to="/alumnos/ayuda" class="nav-link">
              <Icon icon="mdi:help-circle" class="nav-icon" />
              <div class="grid grid-rows-2">
                <span class="nav-text">Ayuda</span>
                <span class="nav-subtext">Ayuda.</span>
              </div>
            </router-link>
          </li>
        </ul>
      </nav>


      <div class="options-section">
        <h3 class="options-title">Opciones</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <button class="nav-link logout-btn" @click="logout">
              <Icon icon="basil:logout-outline" class="nav-icon" />
              <span class="nav-text">Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  console.log("Logout clicked");
  router.push("/login");
};
</script>






<style scoped>
.sidebar {
  width: 320px;
  min-width: 250px;
  height: 100%;
  background: #ffffff;
  border-right: 2px solid #13442A;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Contenido del sidebar */
.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  background: var(--color-shadow, #ffffff);
  color: var(--color-secondary, #2D6849);
}

.nav-link.router-link-active {
  background: var(--color-secondary, #ffffff);
  color: var(--color-text, #2D6849);
}

.nav-link.router-link-exact-active {
  background: var(--color-secondary, #2D6849);
  color: var(--color-text, #ffffff);
}

.nav-icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
  width: 33px;
  height: 33px;
}

.nav-text {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-subtext {
  font-size: 0.75rem;
  font-weight: 400;
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
