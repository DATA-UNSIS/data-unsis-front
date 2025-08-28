<template>
  <div class="chart-display-container">
   
    <div class="chart-section">
      <div class="chart-container">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>

   
    <div class="auto-rotate-section">
      <button @click="nextChart" class="rotate-btn">
        Siguiente Gráfico
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// Definir las props para recibir datos del componente padre
const props = defineProps({
  chartData: {
    type: Object,
    default: null
  }
})

const chartRef = ref<HTMLCanvasElement>()
const chartInstance = ref<Chart>()
const currentChartIndex = ref(0)

// Watch para cuando cambien los datos del backend
watch(() => props.chartData, (newData) => {
  if (newData) {
    console.log('ChartDisplay recibió nuevos datos:', newData)

    // Verificar si es el nuevo formato esperado
    if (newData.success && newData.data && newData.data.datos) {
      createChartFromBackendData(newData)
    } else if (Array.isArray(newData)) {
      createChartFromDirectArray(newData)
    } else {
      console.warn('Formato de datos no reconocido:', newData)
      // Intentar procesar como formato anterior por compatibilidad
      createChartFromBackendData(newData)
    }
  }
}, { deep: true })

const chartTypes = ref([
  { name: 'Distribución por Carrera', code: 'MAJOR_DISTRIBUTION', type: 'pie', title: 'Distribución por Carrera' },
  { name: 'Nivel Socioeconómico', code: 'ECONOMI_LEVEL', type: 'doughnut', title: 'Nivel Socioeconómico' },
  { name: 'Becas Solicitadas', code: 'SCHOLARSHIPS_REQUESTED', type: 'bar', title: 'Becas Solicitadas' },
  { name: 'Servicios en Hogar', code: 'HOUSEHOLD_SERVICES', type: 'radar', title: 'Servicios en Hogar' },
  { name: 'Procedencia Geográfica', code: 'GEOGRAPHICAL_ORIGIN', type: 'bar', title: 'Procedencia Geográfica' },
  { name: 'Estado Civil', code: 'CIVIL_STATE', type: 'pie', title: 'Estado Civil' }
])

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
    colors: ['#3498DB', '#2ECC71', '#F39C12', '#E74C3C', '#9B59B6', '#95A5A6']
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
  await nextTick()
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = undefined
  }
  const currentChart = chartTypes.value[currentChartIndex.value]
  const chartData = datosGraficos[currentChart.code as keyof typeof datosGraficos]
  const chartType = currentChart.type

  const config: any = {
    type: chartType,
    data: {
      labels: chartData.labels,
      datasets: [{
        label: currentChart.name,
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
          text: currentChart.title,
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

// Nueva función para crear gráficos con datos del backend
const createChartFromBackendData = async (backendResponse: any) => {
  await nextTick()
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  // Destruir gráfico existente si lo hay
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = undefined
  }

  console.log('Creando gráfico con datos del backend:', backendResponse)

  // Verificar si la respuesta tiene el formato esperado
  if (!backendResponse.success) {
    console.error('Error en la respuesta del backend:', backendResponse)
    showErrorChart('Error al cargar los datos del servidor')
    return
  }

  if (!backendResponse.data || !backendResponse.data.datos) {
    console.error('Datos no encontrados en la respuesta:', backendResponse)
    showErrorChart('Formato de datos incorrecto')
    return
  }

  // Extraer información del nuevo formato
  const chartData = backendResponse.data.datos // Array de objetos con label y value
  const chartTitle = backendResponse.data.titulo // Título del gráfico

  // Verificar que hay datos para mostrar
  if (!Array.isArray(chartData) || chartData.length === 0) {
    console.warn('No hay datos para mostrar en el gráfico')
    showErrorChart('No hay datos disponibles para mostrar')
    return
  }

  // Determinar el tipo de gráfico basado en el título o usar por defecto
  let chartType = 'bar' // Tipo por defecto
  if (chartTitle.includes('carrera') || chartTitle.includes('civil')) {
    chartType = 'pie'
  } else if (chartTitle.includes('socioeconomico')) {
    chartType = 'doughnut'
  } else if (chartTitle.includes('servicios')) {
    chartType = 'radar'
  }

  // Extraer labels y values de la respuesta del backend
  const labels = chartData.map((item: any) => item.label)
  const data = chartData.map((item: any) => item.value)

  // Colores por defecto
  const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#C9CBCF']

  const config: any = {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: chartTitle,
        data: data,
        backgroundColor: defaultColors.slice(0, data.length),
        borderColor: chartType === 'radar' ? defaultColors[0] : defaultColors.slice(0, data.length),
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
          text: chartTitle, // Usar el título que viene del backend
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
        r: { beginAtZero: true, max: Math.max(...data) * 1.2 }
      } : {}
    }
  }

  try {
    chartInstance.value = new Chart(ctx, config)
    console.log(`Gráfico tipo '${chartType}' creado exitosamente con título: '${chartTitle}'`)
  } catch (error) {
    console.error('Error al crear gráfico con datos del backend:', error)
    showErrorChart('Error al crear el gráfico')
  }
}// Nueva función para manejar arrays directos como [{ name: "...", count: ... }]
const createChartFromDirectArray = async (dataArray: any[]) => {
  await nextTick()
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return
  
  // Destruir gráfico existente si lo hay
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = undefined
  }

  console.log('Creando gráfico con array directo:', dataArray)

  // Extraer labels y values del array
  const labels = dataArray.map((item: any) => item.name || item.label || 'Sin nombre')
  const data = dataArray.map((item: any) => item.count || item.value || 0)
  
  // Colores por defecto
  const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#C9CBCF']
  
  // Configuración por defecto para array directo (gráfico de barras)
  const chartType = 'bar'
  const chartTitle = 'Gráfico de Datos'
  
  const config: any = {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: chartTitle,
        data: data,
        backgroundColor: defaultColors.slice(0, data.length),
        borderColor: chartType === 'radar' ? defaultColors[0] : defaultColors.slice(0, data.length),
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
          text: chartTitle,
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
    console.log(`Gráfico creado exitosamente desde array directo con ${dataArray.length} elementos`)
  } catch (error) {
    console.error('Error al crear gráfico desde array directo:', error)
  }
}

const nextChart = async () => {
  currentChartIndex.value = (currentChartIndex.value + 1) % chartTypes.value.length
  await createChart()
}

// Función para mostrar gráfico de error
const showErrorChart = async (errorMessage: string) => {
  await nextTick()
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  // Destruir gráfico existente si lo hay
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = undefined
  }

  const config: any = {
    type: 'bar',
    data: {
      labels: ['Error'],
      datasets: [{
        label: 'Error',
        data: [1],
        backgroundColor: ['#E74C3C'],
        borderColor: ['#C0392B'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: errorMessage,
          font: { size: 16, weight: 'bold' },
          color: '#E74C3C'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            display: false
          }
        },
        x: {
          ticks: {
            display: false
          }
        }
      }
    }
  }

  try {
    chartInstance.value = new Chart(ctx, config)
    console.log('Gráfico de error mostrado:', errorMessage)
  } catch (error) {
    console.error('Error al mostrar gráfico de error:', error)
  }
}

onMounted(async () => {
  await nextTick()
  await createChart()
})
</script>

<style scoped>
.chart-display-container {
  background: white;
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.chart-section {
  margin-bottom: 20px;
}

.chart-container {
  height: 400px;
  position: relative;
  background: white;
  border-radius: 4px;
  padding: 10px;
}

.auto-rotate-section {
  text-align: center;
}

.rotate-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.rotate-btn:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .chart-display-container {
    padding: 15px;
  }
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 250px;
  }
  .rotate-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>