<script setup lang="ts">
import Image from 'primevue/image'
</script>

<template>
  <div class="home-container">
    <div class="logo-section">
      <Image src="/src/assets/unsis-logo.png" alt="Escudo de la Universidad de la Sierra Sur" class="size-45 max-md:size-32"  preview/>
    </div>
    <div class="welcome-content">
      <h1 class="welcome-title">Bienvenido al Portal de Estadísticas</h1>
      <p class="welcome-subtitle">Sistema de Estadísticas del Estudio Socioeconómico.</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  margin: 1rem;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  text-align: center;
  gap: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-content {
  max-width: 600px;
}

.welcome-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1F2937;
  line-height: 1.2;
}

.welcome-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #2D6849;
  margin: 1rem auto 0;
  border-radius: 2px;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #6B7280;
  margin: 0;
}

@media (max-width: 768px) {
  .home-container {
    padding: 2rem 1rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
}
</style>