<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import Chart from 'primevue/chart';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
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
const isDialogVisible = ref(false);
const dialogChartKey = ref(0);
const chartContainerRef = ref(null);

const openDialog = () => {
  isDialogVisible.value = true;
  // Forzar re-render del chart en el diálogo
  nextTick(() => {
    dialogChartKey.value++;
  });
};

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
  maintainAspectRatio: true,
  aspectRatio: selectedType.value === 'pie' || selectedType.value === 'doughnut' ? 1 : 2,
  devicePixelRatio: Math.max(window.devicePixelRatio || 1, 2), // Mínimo 2x para mejor calidad
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

// Opciones del chart para el dialog
const dialogChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: selectedType.value === 'pie' || selectedType.value === 'doughnut' ? 1.2 : 2.5,
  devicePixelRatio: Math.max(window.devicePixelRatio || 1, 3), // Máxima calidad para el diálogo
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
    animateRotate: selectedType.value === 'pie' || selectedType.value === 'doughnut',
    animateScale: selectedType.value === 'pie' || selectedType.value === 'doughnut'
  },
  interaction: { intersect: false, mode: 'index' },
  layout: { padding: { top: 20, bottom: 20, left: 20, right: 20 } },
  plugins: {
    legend: {
      position: selectedType.value === 'bar' ? 'top' : 'bottom',
      display: true,
      labels: {
        boxWidth: 15,
        font: { size: 14, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        usePointStyle: true,
        padding: 15
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 16 },
      bodyFont: { size: 14 },
      padding: 12,
      cornerRadius: 6
    }
  },
  scales: selectedType.value === 'bar' || selectedType.value === 'line' ? {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0, 0, 0, 0.1)', lineWidth: 1 },
      ticks: { 
        font: { size: 12, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        maxTicksLimit: 8
      }
    },
    x: {
      grid: { display: false },
      ticks: { 
        font: { size: 12, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        maxRotation: 45,
        minRotation: 0
      }
    }
  } : {},
  elements: selectedType.value === 'pie' || selectedType.value === 'doughnut' ? {
    arc: { borderWidth: 2, borderColor: '#fff' }
  } : {}
}));

function exportChartPNG() {
  // Buscar el canvas específicamente dentro de este componente
  const chartElement = chartContainerRef.value?.querySelector('canvas');
  if (chartElement) {
    // Crear un canvas temporal 
    const originalCanvas = chartElement;
    const scaleFactor = 4;
    // Crear canvas temporal de alta resolución
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    // Configurar el canvas temporal con mayor resolución
    tempCanvas.width = originalCanvas.width * scaleFactor;
    tempCanvas.height = originalCanvas.height * scaleFactor;
    // Configurar el contexto para renderizado de alta calidad
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.webkitImageSmoothingEnabled = false;
    tempCtx.mozImageSmoothingEnabled = false;
    tempCtx.msImageSmoothingEnabled = false;
    tempCtx.scale(scaleFactor, scaleFactor); 
    tempCtx.drawImage(originalCanvas, 0, 0);
    const link = document.createElement('a');
    link.href = tempCanvas.toDataURL('image/png', 1.0);
    link.download = `${props.title.replace(/\s+/g, '_').toLowerCase()}_hq.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Exportar grafico del dialog
function exportDialogChartPNG() {
  const chartElement = document.querySelector(`.dialog-chart-container canvas`);
  if (chartElement) {
    const originalCanvas = chartElement;
    const scaleFactor = 6;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = originalCanvas.width * scaleFactor;
    tempCanvas.height = originalCanvas.height * scaleFactor;
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.webkitImageSmoothingEnabled = false;
    tempCtx.mozImageSmoothingEnabled = false;
    tempCtx.msImageSmoothingEnabled = false
    tempCtx.scale(scaleFactor, scaleFactor);
    tempCtx.drawImage(originalCanvas, 0, 0);
    const link = document.createElement('a');
    link.href = tempCanvas.toDataURL('image/png', 1.0);
    link.download = `${props.title.replace(/\s+/g, '_').toLowerCase()}_ultra_hq.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
</script>

<template>

  <!-- Card con la gráfica mas grande -->
    <Card class="chart-card">
        <template #header>
            <div class="chart-header">
                <span class="chart-title">{{ title }}</span>
                <Button aria-label="Download" size="small" text @click="exportChartPNG()">
                  <Icon icon="material-symbols-light:download-rounded" width="28" height="28"  style="color: #000000" />
                </Button>
            </div>
        </template>
        <template #content>
            <div ref="chartContainerRef" class="chart-container" @click="openDialog">
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

    <!-- Diálogo con la gráfica mas grande -->
    <Dialog 
        v-model:visible="isDialogVisible" 
        :header="title"
        modal
        :style="{ width: '90vw', maxWidth: '1000px' }"
        :dismissable-mask="true"
        :closable="true"
        class="chart-dialog"
    >
        <template #header>
            <div class="dialog-header">
                <span class="align-center">{{ title }}</span>
                <Button aria-label="Download HQ" size="small" severity="secondary" @click="exportDialogChartPNG()">
                  <Icon icon="material-symbols-light:download-rounded" width="30" height="30"  style="color: #000000" />
                </Button>
            </div>
        </template>
        <div class="dialog-chart-container">
            <Chart 
                :key="dialogChartKey"
                :type="selectedType" 
                :data="chartData" 
                :options="dialogChartOptions" 
            />
        </div>
    </Dialog>
</template>

<style scoped>
.chart-card {
  height: 100%;
  width: 100%;
  aspect-ratio: 1/1;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.chart-card :deep(.p-card) {
  height: 100%;
  display: flex;
  will-change: transform;
  image-rendering: crisp-edges;
  background: #ffffff;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;
}

.chart-card :deep(.p-card):hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.chart-card :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.chart-card :deep(.p-card-header) {
  padding: 0.75rem;
  flex-shrink: 0;
  border-bottom: 1px solid #E5E7EB;
  background: #F9FAFB;
}

.chart-card :deep(.p-card-content) {
  flex: 1;
  padding: 0.5rem;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  position: relative;
  overflow: hidden;
  min-height: 0;
  background: #ffffff;
}

.chart-card :deep(.p-card-footer) {
  padding: 0;
  flex-shrink: 0;
  background: #F9FAFB;
  border-top: 1px solid #E5E7EB;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-title {
  font-size: 0.95rem;
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 600;
  color: #2D6849;
  line-height: 1.2;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
  max-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  transform: translateZ(0);
  will-change: transform;
  cursor: pointer; 
  transition: opacity 0.2s ease;
  overflow: hidden;
}

.chart-container:hover {
  opacity: 0.9;
}

.chart-container :deep(canvas) {
  max-width: 100% !important;
  max-height: 100% !important;
  image-rendering: auto; /* Mejor para gráficos */
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  /* Optimización para diferentes resoluciones */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.chart-container :deep(.p-chart) {
  width: 100% !important;
  height: auto !important;
  flex: 1;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.chart-container :deep(.p-chart > div) {
  width: 100% !important;
  height: auto !important;
  flex: 1 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.chart-container :deep(.p-chart > div) {
  width: 100% !important;
  height: auto !important;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-footer {
  padding: 0.75rem;
}

hr {
  margin: 0 0 0.75rem 0;
  border: none;
  border-top: 1px solid #E5E7EB;
}

.chart-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.90rem;
  font-family: 'Montserrat', Arial, sans-serif;
}

.chart-controls span {
  font-weight: 500;
  color: #6B7280;
  white-space: nowrap;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.type-select {
  flex: 1;
  min-width: 0;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.type-select :deep(.p-select-label) {
  color: #78877F;
  font-size: 0.9rem;
  font-family: 'Montserrat', Arial, sans-serif;
  padding: 0.5rem 0.5rem;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.type-select :deep(.p-select-dropdown) {
  width: 1.5rem;
  font-size: 0.8rem;
  font-family: 'Montserrat', Arial, sans-serif;
}

@media (max-width: 768px) {
  .chart-title {
    font-size: 0.8rem;
  }
  
  .chart-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 0.3rem;
  }
}

/* Optimización para pantallas de alta densidad */
@media (min-resolution: 2dppx) {
  .chart-container :deep(canvas) {
    image-rendering: auto;
  }
  
  .chart-title {
    font-size: 0.9rem;
  }
}

/* Estilos para el diálogo */
.chart-dialog :deep(.p-dialog-content) {
  padding: 1rem;
}

.dialog-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.dialog-header span {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.dialog-header Button {
  position: absolute;
  right: 0;
  background: transparent;
  border-color: transparent;
}

.dialog-chart-container {
  width: 100%;
  min-height: 400px;
  max-height: 70vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.dialog-chart-container :deep(.p-chart) {
  width: 100% !important;
  height: auto !important;
  max-height: 100%;
  flex: 1;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.dialog-chart-container :deep(.p-chart > div) {
  width: 100% !important;
  height: auto !important;
  max-height: 100%;
  flex: 1 !important;
  display: flex !important;
}

.dialog-chart-container :deep(canvas) {
  width: 80%;
  max-width: 100% !important;
  max-height: 100% !important;
  image-rendering: auto;
  transform: translateZ(0);
  backface-visibility: hidden;
}

@media (max-width: 768px) {
  .chart-dialog {
    width: 95vw !important;
  }
  
  .dialog-chart-container {
    max-height: 60vh;
    min-height: 300px;
  }
}
</style>
