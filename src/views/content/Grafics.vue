<script setup>
import graficasPosibles from './graficasPosibles.js'
import ChartCard from '../../components/ChartCard.vue'
</script>

<template>
    <div class="content-container">
      <ChartCard
        title="Distribución por Sexo"
        :chartData="graficasPosibles.estudiantesData"
        type="doughnut"
        :posibleTypes="graficasPosibles.tiposGrafico"
      />
      <ChartCard
        title="Distribución por Estado Civil"
        :chartData="graficasPosibles.estudiantesData"
        type="pie"
        :posibleTypes="graficasPosibles.tiposGrafico"
      />
      <ChartCard
        title="Distribución por Semestre"
        :chartData="graficasPosibles.estudiantesData"
        type="bar"
        :posibleTypes="graficasPosibles.tiposGrafico"
      />
      <ChartCard
        title="Distribución por Carreras"
        :chartData="graficasPosibles.estudiantesData"
        type="bar"
        :posibleTypes="graficasPosibles.tiposGrafico"
      />
      <ChartCard
        title="Distribución por Edad"
        :chartData="graficasPosibles.estudiantesData"
        type="line"
        :posibleTypes="graficasPosibles.tiposGrafico"
      />
      <ChartCard
        title="Distribución por Edad"
        :chartData="graficasPosibles.estudiantesData"
        type="line"
        :posibleTypes="graficasPosibles.tiposGrafico"
      />
    </div>
</template>

<style scoped>
.content-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  background-color: #4a7c59;
  min-height: 100vh;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content-container :deep(.chart-card) {
  min-height: 350px;
  height: auto;
  width: 100%;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.content-container :deep(.p-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.content-container :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container :deep(.p-card-content) {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

@media (min-width: 1200px) {
  .content-container {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1400px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .content-container {
    grid-template-columns: repeat(3, 1fr);
    padding: 1.75rem;
    gap: 1.25rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 320px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.5rem;
    gap: 1.25rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 340px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 300px;
  }
}

@media (max-width: 575px) {
  .content-container {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 280px;
  }
}

@media (max-width: 400px) {
  .content-container {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 250px;
  }
}

@media (min-width: 1600px) {
  .content-container {
    max-width: 1600px;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}

@media (orientation: landscape) and (max-height: 800px) and (min-width: 768px) {
  .content-container :deep(.chart-card) {
    min-height: 280px;
  }
}

@media (min-resolution: 1.25dppx) {
  .content-container :deep(.chart-card) {
    image-rendering: -webkit-optimize-contrast;
  }
}

@media (min-resolution: 1.5dppx) {
  .content-container :deep(.chart-card) {
    image-rendering: auto;
  }
}
</style>
