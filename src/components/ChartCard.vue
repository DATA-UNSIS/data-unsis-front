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
  posibleTypes: { type: Array, required: true },
  Purpose: { type: String, required: true },
  Interpretation: { type: String, required: true },
  Application: { type: String, required: true }
});

const selectedType = ref(props.type);
const chartKey = ref(0);
const isDialogVisible = ref(false);
const dialogChartKey = ref(0);
const chartContainerRef = ref(null);
const isHelpDialogVisible = ref(false);

const openDialog = () => {
  isDialogVisible.value = true;
  // Forzar re-render del chart en el diálogo
  nextTick(() => {
    dialogChartKey.value++;
  });
};

const helpDialog = () => {
  isHelpDialogVisible.value = true;
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
// Computed para el tamaño del diálogo según el tipo de gráfica
const dialogSize = computed(() => {
  const isPieChart = selectedType.value === 'pie' || selectedType.value === 'doughnut';
  return {
    width: isPieChart ? '70vw' : '90vw',
    maxWidth: isPieChart ? '600px' : '1000px',
    height: isPieChart ? '70vh' : '80vh'
  };
});

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

    <Card class="chart-card">
        <template #header>
            <div class="chart-header">
                <span class="chart-title">{{ title }}</span>
                <div class="options-buttons">
                  <Button aria-label="Help HQ" size="small" text  @click="helpDialog()">
                    <Icon icon="mdi-light:help" width="28" height="28" style="color: #000000"/>
                  </Button>
                  <Button aria-label="Download" size="small" text @click="exportChartPNG()">
                    <Icon icon="material-symbols-light:download-rounded" width="28" height="28" style="color: #000000" />
                  </Button>
                </div>
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
        :style="{ 
          width: dialogSize.width, 
          maxWidth: dialogSize.maxWidth 
        }"
        :dismissable-mask="true"
        :closable="true"
        class="chart-dialog"
    >
        <template #header>
            <div class="dialog-header">
                <span class="align-center">{{ title }}</span>
                  <div class="options-buttons">
                    <Button aria-label="Download HQ" size="small" severity="secondary" @click="exportDialogChartPNG()">
                      <Icon icon="material-symbols-light:download-rounded" width="30" height="30"  style="color: #000000" />
                    </Button>
                  </div>
                
            </div>
        </template>
        <div 
            class="dialog-chart-container" 
            :class="{ 
              'pie-chart-container': selectedType === 'pie' || selectedType === 'doughnut',
              'bar-chart-container': selectedType === 'bar' || selectedType === 'line'
            }"
        >
            <Chart 
                :key="dialogChartKey"
                :type="selectedType" 
                :data="chartData" 
                :options="dialogChartOptions" 
            />
        </div>
    </Dialog>

    <!-- Diálogo con la información de ayuda-->
    <Dialog
        v-model:visible="isHelpDialogVisible" 
        modal
        :style="{ width: '80vw', maxWidth: '700px' }"
        :dismissable-mask="true"
        :closable="true"
        class="help-dialog"
    >
        <template #header>
            <div class="dialog-header help-dialog-header">
                <span>{{ title }}</span>
            </div>
        </template>
      <template #default>
        <div class="help-content">
          <div class="help-body">
            <div class="help-section">
              <div class="section-header">
                <Icon icon="mdi:target" width="20" height="20" style="color: #059669"/>
                <span class="section-title">Propósito del Gráfico</span>
              </div>
              <div class="help-description">
                <p>{{ Purpose }}</p>
              </div>
            </div>
            
            <div class="help-section">
              <div class="section-header">
                <Icon icon="mdi:chart-line-variant" width="20" height="20" style="color: #3B82F6"/>
                <span class="section-title">Cómo Interpretar</span>
              </div>
              <div class="help-description">
                <p>{{ Interpretation }}</p>
              </div>
            </div>

            <div class="help-section">
              <div class="section-header">
                <Icon icon="mdi:lightbulb-outline" width="20" height="20" style="color: #F59E0B"/>
                <span class="section-title">Ejemplo Práctico</span>
              </div>
              <div class="help-description">
                <p>{{ Application }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
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
  background-color: #5fff87;
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
  background-color: #e6f6f4;
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
  color: #1F2937;
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
  font-size: 0.8rem;
  font-family: 'Montserrat', Arial, sans-serif;
  padding: 0.3rem 0.5rem;
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
    font-size: 0.75rem;
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

.chart-dialog :deep(.p-dialog-header) {
  background-color: #e6f6f4;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
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
  color: #1F2937;
  font-weight: 600;
}

.dialog-header .options-buttons {
  position: absolute;
  right: 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.dialog-header Button {
  background: transparent;
  border-color: transparent;
}

.dialog-chart-container {
  width: 100%;
  height: 60vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

/* Estilos específicos para gráficas de pastel en el diálogo */
.dialog-chart-container.pie-chart-container {
  height: 50vh;
  min-height: 350px;
  max-height: 500px;
  align-items: center;
  justify-content: center;
}

/* Estilos específicos para gráficas de barras en el diálogo */
.dialog-chart-container.bar-chart-container {
  height: 60vh;
  min-height: 400px;
  max-height: 600px;
}

.dialog-chart-container :deep(.p-chart) {
  width: 100% ;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.dialog-chart-container :deep(.p-chart > div) {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
}

.dialog-chart-container :deep(canvas) {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  image-rendering: auto;
  transform: translateZ(0);
  backface-visibility: hidden;
}

@media (max-width: 768px) {
  .chart-dialog {
    width: 95vw !important;
  }
  
  .dialog-chart-container {
    height: 50vh;
    min-height: 300px;
  }
  
  .dialog-chart-container.pie-chart-container {
    height: 45vh;
    min-height: 280px;
    max-height: 400px;
  }
  
  .dialog-chart-container.bar-chart-container {
    height: 50vh;
    min-height: 320px;
    max-height: 450px;
  }
}

/* Estilos para el diálogo de ayuda */
.help-dialog :deep(.p-dialog-content) {
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
}

.help-dialog :deep(.p-dialog-header) {
  background-color: #e6f6f4;
  padding: 1.5rem;
  border-radius: 12px 12px 0 0;
}

.help-dialog-header {
  color: #1F2937;
}

.help-dialog-header span {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #1F2937;
}

.help-content {
  padding: 0;
  background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
  border-radius: 5%;
}

.help-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem 1rem 2rem;
  background: white;
  border-bottom: 1px solid #E5E7EB;
}

.help-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.2);
}

.help-title {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
  line-height: 1.3;
}

.help-body {
  padding: 1.5rem 2rem 2rem 2rem;
}

.help-section {
  margin-bottom: 2rem;
}

.help-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #F3F4F6;
}

.section-title {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
}

.help-description {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.help-description p {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #4B5563;
  margin: 0;
  text-align: justify;
}

.help-description :deep(strong) {
  font-weight: 600;
  color: #1F2937;
}

.help-description :deep(em) {
  font-style: italic;
  color: #059669;
  font-weight: 500;
}

.help-tips {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 0.9rem;
  color: #4B5563;
  border-bottom: 1px solid #F3F4F6;
  transition: all 0.2s ease;
}

.tip-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.tip-item:hover {
  color: #059669;
  transform: translateX(4px);
}

.tip-item span {
  line-height: 1.5;
}

@media (max-width: 768px) {
  .help-dialog {
    width: 95vw !important;
  }
  
  .help-header {
    padding: 1rem 1.5rem 0.75rem 1.5rem;
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .help-title {
    font-size: 1.2rem;
  }
  
  .help-body {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
  
  .section-title {
    font-size: 1rem;
  }
  
  .help-description,
  .help-tips {
    padding: 1rem;
  }
  
  .tip-item {
    font-size: 0.85rem;
  }
}
</style>
