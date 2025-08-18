<script setup lang="ts">

import Sidebar from '../components/Sidebar.vue';

</script>

<template>
  <div class = "app-container">
    <Sidebar/>

    <div class = "content-container">
      <router-view />
    </div>
  </div>

</template>

<style scoped>

.app-container {
  display: flex;
  height: 100vh;
  background-color: #4a7c59;
}

.content-container {
  flex: 1;
  margin-left: 270px; /* Ancho del sidebar (250px) + gap (20px) */
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }

  .content-container {
    margin: 15px;
    padding: 20px;
    border-radius: 10px;
  }
}

/* Responsive para móviles */
@media (max-width: 480px) {
  .content-container {
    margin: 10px;
    padding: 15px;
    border-radius: 8px;
  }
}

</style>