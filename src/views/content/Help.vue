<script setup lang="ts">
import ayuda from '../../components/HelpCharts.vue'
</script>

<template>
  <div>
    <ayuda />
  </div>
</template>

<style scoped>
.help-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 2rem;
}

@media (max-width: 480px) {
  .help-container {
    gap: 1.5rem;
    min-height: 50vh;
  }
}
</style>