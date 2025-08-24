<template>
   <aside class="sidebar">

    <div class="sidebar-header">
      <div class="sae-logo">
        <img
          src="/src/assets/sae-logo.png"
          alt="SAE Logo"
          class="sae-logo-img"
        />
      </div>
      <h2 class="portal-title">PORTAL DE INSCRIPCIONES</h2>
    </div>


    <hr class="divider" />

   
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/alumnos" class="nav-link">
            <Icon icon="mdi:home" class="nav-icon" />
            <span class="nav-text">Inicio</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/alumnos/fichas" class="nav-link">
            <Icon icon="mdi:bookmark" class="nav-icon" />
            <span class="nav-text">Estadisticas Generales</span>
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link to="/ayuda" class="nav-link">
            <Icon icon="mdi:help-circle" class="nav-icon" />
            <span class="nav-text">Ayuda</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <hr class="divider" />

    
    <div class="options-section">
      <h3 class="options-title">Opciones</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <button class="nav-link logout-btn" @click="logout">
            <Icon icon="mdi:close" class="nav-icon" />
            <span class="nav-text">Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
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
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background: var(--color-secondary, #ffffff);
  border-right: 2px solid var(--color-shadow, #13442A);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.sidebar-header {
  padding: 2rem 1.5rem 1rem;
  text-align: center;
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

.sae-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.sae-logo-img {
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

  .sae-logo-img {
    max-width: 100px;
  }

  .portal-title {
    font-size: 0.8rem;
    margin: 1rem 0.25rem 0 0.25rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 220px;
    min-width: 220px;
  }
  
  .sae-logo-img {
    max-width: 90px;
  }
  
  .portal-title {
    font-size: 0.75rem;
    margin: 0.75rem 0.25rem 0 0.25rem;
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

  .sae-logo-img {
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
