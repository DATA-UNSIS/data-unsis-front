<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import Select from 'primevue/select'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// Referencias reactivas para los valores seleccionados
const selectedCarrera = ref(null)
const selectedSemestre = ref(null)
const selectedSexo = ref(null)

// Referencias para los gráficos
const chartRef = ref<HTMLCanvasElement>()
const chartInstance = ref<Chart>()

// Opciones para los dropdowns
const carreras = ref([
  { name: 'Ingeniería de Sistemas', code: 'IS' },
  { name: 'Ingeniería Civil', code: 'IC' },
  { name: 'Medicina', code: 'MED' },
  { name: 'Derecho', code: 'DER' },
  { name: 'Administración de Empresas', code: 'ADE' },
  { name: 'Psicología', code: 'PSI' },
  { name: 'Todas las carreras', code: 'ALL' }
])

const semestres = ref([
  { name: '1er Semestre', code: '1' },
  { name: '2do Semestre', code: '2' },
  { name: '3er Semestre', code: '3' },
  { name: '4to Semestre', code: '4' },
  { name: '5to Semestre', code: '5' },
  { name: '6to Semestre', code: '6' },
  { name: '7mo Semestre', code: '7' },
  { name: '8vo Semestre', code: '8' },
  { name: 'Todos los semestres', code: 'ALL' }
])

const sexos = ref([
  { name: 'Masculino', code: 'M' },
  { name: 'Femenino', code: 'F' },
  { name: 'Ambos', code: 'ALL' }
])

// Tipo de gráfico seleccionado
const selectedChart = ref(null)
const tiposGrafico = ref([
  { name: 'Distribución por Carrera', code: 'carrera', type: 'pie' },
  { name: 'Nivel Socioeconómico', code: 'socioeconomico', type: 'doughnut' },
  { name: 'Becas Solicitadas', code: 'becas', type: 'bar' },
  { name: 'Servicios en Hogar', code: 'servicios', type: 'radar' },
  { name: 'Procedencia Geográfica', code: 'geografia', type: 'bar' },
  { name: 'Estado Civil', code: 'estadocivil', type: 'pie' }
])

// Datos simulados basados en la BD
const datosGraficos = {
  carrera: {
    labels: ['Ing. Sistemas', 'Ing. Civil', 'Medicina', 'Derecho', 'Administración', 'Psicología'],
    data: [320, 245, 180, 156, 134, 98],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
  },
  socioeconomico: {
    labels: ['Nivel Alto', 'Nivel Medio-Alto', 'Nivel Medio', 'Nivel Medio-Bajo', 'Nivel Bajo'],
    data: [45, 120, 380, 290, 298],
    colors: ['#2ECC71', '#3498DB', '#F39C12', '#E74C3C', '#95A5A6']
  },
  becas: {
    labels: ['Beca Manutención', 'Jóvenes Escribiendo', 'Semillas Talento', 'CONAFE', 'Madre Soltera'],
    data: [450, 234, 189, 167, 89],
    colors: ['#3498DB', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6']
  },
  servicios: {
    labels: ['Energía Eléctrica', 'Agua Potable', 'Drenaje', 'Gas', 'Internet', 'TV'],
    data: [95, 87, 76, 45, 67, 89],
    colors: ['#3498DB']
  },
  geografia: {
    labels: ['Miahuatlán', 'Pochutla', 'Ejutla', 'Ocotlán', 'Zimatán', 'Otros'],
    data: [423, 267, 189, 156, 134, 164],
    colors: ['#2ECC71', '#3498DB', '#E74C3C', '#F39C12', '#9B59B6', '#95A5A6']
  },
  estadocivil: {
    labels: ['Soltero(a)', 'Casado(a)', 'Unión Libre', 'Divorciado(a)'],
    data: [1045, 67, 18, 3],
    colors: ['#3498DB', '#2ECC71', '#F39C12', '#E74C3C']
  }
}

const createChart = async () => {
  if (!selectedChart.value) return

  // Esperar al siguiente tick para asegurar que el DOM esté listo
  await nextTick()
  
  if (!chartRef.value) {
    console.warn('Canvas no está disponible')
    return
  }

  const ctx = chartRef.value.getContext('2d')
  if (!ctx) {
    console.warn('Contexto 2D no está disponible')
    return
  }

  // Destruir gráfico anterior si existe
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
  }

  const chartData = datosGraficos[selectedChart.value.code]
  const chartType = selectedChart.value.type

  const config = {
    type: chartType,
    data: {
      labels: chartData.labels,
      datasets: [{
        label: selectedChart.value.name,
        data: chartData.data,
        backgroundColor: chartData.colors,
        borderColor: chartType === 'radar' ? chartData.colors[0] : chartData.colors,
        borderWidth: chartType === 'radar' ? 2 : 1,
        fill: chartType === 'radar'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: selectedChart.value.name,
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          position: chartType === 'bar' ? 'top' : 'bottom',
          display: chartType !== 'bar'
        }
      },
      scales: chartType === 'bar' ? {
        y: { beginAtZero: true }
      } : chartType === 'radar' ? {
        r: { beginAtZero: true, max: 100 }
      } : {}
    }
  }

  try {
    chartInstance.value = new Chart(ctx, config)
  } catch (error) {
    console.error('Error al crear gráfico:', error)
  }
}

// Función para generar gráfico
const generateChart = async () => {
  if (!selectedChart.value) {
    alert('Por favor selecciona un tipo de gráfico')
    return
  }
  await createChart()
}

// Watchers para regenerar gráfico cuando cambien los filtros
watch([selectedCarrera, selectedSemestre, selectedSexo], async () => {
  if (selectedChart.value) {
    await createChart()
  }
})

// Watcher para cuando cambie el tipo de gráfico
watch(selectedChart, async () => {
  if (selectedChart.value) {
    await createChart()
  }
})

onMounted(async () => {
  // Seleccionar el primer tipo de gráfico por defecto
  selectedChart.value = tiposGrafico.value[0]
  // Crear el gráfico inicial
  await nextTick()
  await createChart()
})
</script>

<template>
  <div class="statistics-container">
    <!-- Título Principal -->
    <div class="header-section">
      <h1 class="main-title">
        <i class="pi pi-chart-bar"></i>
        Estadísticas UNSIS
      </h1>
      <p class="subtitle">Sistema de Análisis de Datos Universitarios</p>
    </div>

    <!-- Sección de Filtros -->
    <div class="filters-section">
      <div class="filters-header">
        <h2 class="filters-title">
          <i class="pi pi-sliders-h"></i>
          Personaliza los parámetros para graficar
        </h2>
      </div>
      
      <div class="filters-grid">
        <!-- Select Tipo de Gráfico -->
        <div class="filter-item">
          <label class="filter-label">
            <i class="pi pi-chart-pie"></i>
            Tipo de Gráfico
          </label>
          <Select 
            v-model="selectedChart" 
            :options="tiposGrafico" 
            optionLabel="name" 
            placeholder="Selecciona tipo de gráfico"
            class="custom-select"
            showClear
          />
        </div>

        <!-- Select Carrera -->
        <div class="filter-item">
          <label class="filter-label">
            <i class="pi pi-graduation-cap"></i>
            Carrera
          </label>
          <Select 
            v-model="selectedCarrera" 
            :options="carreras" 
            optionLabel="name" 
            placeholder="Selecciona una carrera"
            class="custom-select"
            showClear
          />
        </div>

        <!-- Select Semestre -->
        <div class="filter-item">
          <label class="filter-label">
            <i class="pi pi-calendar"></i>
            Semestre
          </label>
          <Select 
            v-model="selectedSemestre" 
            :options="semestres" 
            optionLabel="name" 
            placeholder="Selecciona un semestre"
            class="custom-select"
            showClear
          />
        </div>

        <!-- Select Sexo -->
        <div class="filter-item">
          <label class="filter-label">
            <i class="pi pi-users"></i>
            Sexo
          </label>
          <Select 
            v-model="selectedSexo" 
            :options="sexos" 
            optionLabel="name" 
            placeholder="Selecciona el sexo"
            class="custom-select"
            showClear
          />
        </div>
      </div>

      <!-- Botón Generar -->
      <div class="action-section">
        <button 
          @click="generateChart"
          class="generate-btn"
          :disabled="!selectedChart"
        >
          <i class="pi pi-chart-pie"></i>
          Generar Gráfico
        </button>
      </div>
    </div>

    <!-- Área del Gráfico -->
    <div class="chart-section">
      <div v-if="!selectedChart" class="chart-placeholder">
        <i class="pi pi-chart-line chart-icon"></i>
        <h3>Selecciona un tipo de gráfico para visualizar</h3>
        <p>Elige el tipo de análisis estadístico que deseas ver</p>
      </div>
      <div v-else class="chart-container">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics-container {
  padding: 0;
  background: transparent;
  min-height: 100%;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 30px;
  background: transparent;
  padding: 0;
  border: none;
}

.main-title {
  color: #333;
  font-size: 2.5rem;
  font-weight: normal;
  margin-bottom: 10px;
}

.main-title i {
  margin-right: 10px;
  color: #666;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

/* Filters Section */
.filters-section {
  background: transparent;
  padding: 0;
  margin-bottom: 20px;
  border: none;
}

.filters-header {
  text-align: center;
  margin-bottom: 20px;
}

.filters-title {
  color: #333;
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.filters-title i {
  color: #666;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-weight: normal;
  color: #555;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label i {
  color: #666;
}

:deep(.custom-select) {
  width: 100%;
  height: 40px;
}

:deep(.p-select) {
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

:deep(.p-select:hover) {
  border-color: #999;
}

:deep(.p-select.p-focus) {
  border-color: #666;
  box-shadow: none;
}

/* Action Section */
.action-section {
  text-align: center;
}

.generate-btn {
  background: #666;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.generate-btn:hover:not(:disabled) {
  background: #555;
}

.generate-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Chart Section */
.chart-section {
  background: transparent;
  padding: 20px 0;
  border: none;
}

.chart-container {
  height: 400px;
  position: relative;
}

.chart-placeholder {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.chart-icon {
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 15px;
}

.chart-placeholder h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #555;
  font-weight: normal;
}

.chart-placeholder p {
  font-size: 1rem;
  line-height: 1.5;
  max-width: 500px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .statistics-container {
    padding: 0;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
}
</style>