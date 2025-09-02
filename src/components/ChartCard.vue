<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import Chart from 'primevue/chart';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { Icon } from '@iconify/vue';
import Card from 'primevue/card';

const props = defineProps({
  title: { type: String, required: true },
  chartData: { type: Object, required: true },
  type: { type: String, required: true },
  posibleTypes: { type: Array, required: true }
});

const selectedType = ref(props.type);
const chartKey = ref(0);

watch(selectedType, async () => {
  await nextTick();
  chartKey.value++;
});

let resizeTimeout = null;
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => chartKey.value++, 250);
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('orientationchange', handleResize);
  if (resizeTimeout) clearTimeout(resizeTimeout);
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: window.devicePixelRatio || 1,
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
    animateRotate: selectedType.value === 'pie' || selectedType.value === 'doughnut',
    animateScale: selectedType.value === 'pie' || selectedType.value === 'doughnut'
  },
  interaction: { intersect: false, mode: 'index' },
  layout: { padding: { top: 5, bottom: 5, left: 5, right: 5 } },
  plugins: {
    legend: {
      position: selectedType.value === 'bar' ? 'top' : 'bottom',
      display: selectedType.value !== 'bar',
      labels: {
        boxWidth: 8,
        font: { size: 10, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        usePointStyle: true,
        padding: 8
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 12 },
      bodyFont: { size: 11 },
      padding: 8,
      cornerRadius: 4
    }
  },
  scales: selectedType.value === 'bar' || selectedType.value === 'line' ? {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0, 0, 0, 0.1)', lineWidth: 1 },
      ticks: { 
        font: { size: 8, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        maxTicksLimit: 6
      }
    },
    x: {
      grid: { display: false },
      ticks: { 
        font: { size: 8, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        maxRotation: 45,
        minRotation: 0
      }
    }
  } : {},
  elements: selectedType.value === 'pie' || selectedType.value === 'doughnut' ? {
    arc: { borderWidth: 1, borderColor: '#fff' }
  } : {}
}));
</script>

<template>
    <Card class="chart-card">
        <template #header>
            <div class="chart-header">
                <span class="chart-title">{{ title }}</span>
                <Button aria-label="Download" size="small" text>
                    <Icon icon="ic:outline-file-download" width="12" height="12" />
                </Button>
            </div>
        </template>
        <template #content>
            <div class="chart-container">
                <Chart 
                    :key="chartKey"
                    :type="selectedType" 
                    :data="chartData" 
                    :options="chartOptions" 
                />
            </div>
        </template>
        <template #footer>
            <div class="chart-footer">
                <hr />
                <div class="chart-controls">
                    <span>Tipo:</span>
                    <Select 
                        v-model="selectedType" 
                        :options="posibleTypes" 
                        optionLabel="name" 
                        optionValue="value" 
                        placeholder="Seleccionar"
                        size="small"
                        class="type-select"
                    />
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.chart-card {
  height: 100%;
  width: 100%;
  /* Optimizaciones para prevenir borrosidad */
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.chart-card :deep(.p-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* Optimización para renderizado */
  will-change: transform;
  image-rendering: crisp-edges;
}

.chart-card :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.chart-card :deep(.p-card-header) {
  padding: 0.5rem;
  flex-shrink: 0;
  border-bottom: 1px solid #e0e0e0;
}

.chart-card :deep(.p-card-content) {
  flex: 1;
  padding: 0.25rem;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  position: relative;
  overflow: hidden;
  min-height: 0;
}

.chart-card :deep(.p-card-footer) {
  padding: 0;
  flex-shrink: 0;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex: 1;
  transform: translateZ(0);
  will-change: transform;
}

.chart-container :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.chart-container :deep(.p-chart) {
  width: 100% !important;
  height: 100% !important;
  flex: 1;
  display: flex !important;
  align-items: stretch;
  justify-content: stretch;
}

.chart-container :deep(.p-chart > div) {
  width: 100% !important;
  height: 100% !important;
  flex: 1 !important;
  display: flex !important;
}

/* Asegurar que el contenedor del chart esté centrado */
.chart-container :deep(.p-chart > div) {
  width: 100% !important;
  height: auto !important;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-footer {
  padding: 0.5rem;
}

hr {
  margin: 0 0 0.5rem 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

.chart-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.chart-controls span {
  font-weight: 500;
  color: #555;
  white-space: nowrap;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.type-select {
  flex: 1;
  min-width: 0;
}

.type-select :deep(.p-select-label) {
  font-size: 0.7rem;
  padding: 0.3rem 0.5rem;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.type-select :deep(.p-select-dropdown) {
  width: 1.5rem;
}

@media (max-width: 768px) {
  .chart-title {
    font-size: 0.75rem;
  }
  
  .chart-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 0.3rem;
  }
}

@media (min-resolution: 1.25dppx) {
  .chart-container :deep(canvas) {
    image-rendering: auto;
  }
  
  .chart-title {
    font-size: 0.9rem;
  }
}

@media (min-resolution: 1.5dppx) {
  .chart-container :deep(canvas) {
    image-rendering: -webkit-optimize-contrast;
  }
  
  .chart-title {
    font-size: 0.95rem;
  }
}

@media (min-resolution: 2dppx) {
  .chart-container :deep(canvas) {
    image-rendering: auto;
  }
}
</style>
