<script setup lang="ts">
import Image from 'primevue/image'
</script>

<template>
  <div class="bg-white home-container rounded-2xl">
    <div class="logo-section">
      <Image src="/src/assets/unsis-logo.png" alt="Escudo de la Universidad de la Sierra Sur" class="size-80 max-md:size-32"  preview/>
    </div>
    <div class=" ">
      <h1 class="font-semibold !mb-4 text-green-800 text-4xl max-md:text-2xl">Bienvenido al Portal de Estadísticas</h1>
      <p class="text-green-800 text-lg max-md:text-sm">Sistema de Estadísticas del Estudio Socioeconómico.</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  margin: 1rem;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
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


</style>