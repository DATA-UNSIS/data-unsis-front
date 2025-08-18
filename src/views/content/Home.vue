<script setup lang="ts">
import Image from 'primevue/image'
</script>

<template>
  <div class="home-container">
    <div class="logo-section">
      <Image src="/src/assets/LogoUNSIS.png" alt="Logo de la Universidad" width="250" preview/>
    </div>
    <div class="welcome-content">
      <h1>Bienvenido al Portal de Inscripciones</h1>
      <p>Sistema de Administración Estudiantil - Universidad</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 2rem;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-content h1 {
  color: #275B3B;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.welcome-content p {
  color: #4a7c59;
  font-size: 1.2rem;
  margin: 0;
}

/* Responsive para tablets */
@media (max-width: 768px) {
  .welcome-content h1 {
    font-size: 2rem;
  }

  .welcome-content p {
    font-size: 1.1rem;
  }
}

/* Responsive para móviles */
@media (max-width: 480px) {
  .home-container {
    gap: 1.5rem;
    min-height: 50vh;
  }

  .welcome-content h1 {
    font-size: 1.8rem;
  }

  .welcome-content p {
    font-size: 1rem;
  }

  :deep(.p-image) {
    max-width: 200px;
  }
}
</style>