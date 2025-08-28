<script setup>
import { ref } from 'vue'
import HeaderInput from '../../components/HeaderInput.vue'
import ChartDisplay from '../../components/ChartDisplay.vue'
import { statsApi } from '../../services/statsApi.js'

// Definir los emits si este componente necesita emitir eventos a su padre
const emit = defineEmits(['datos_obtenidos'])

// Estados reactivos
const chartData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

// Función que maneja el evento del HeaderInput
const handleGenerateChart = async (filterData) => {
  console.log('Filtros recibidos en Grafics:', filterData)
  
  // Mostrar indicador de carga
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    // Llamar al backend con los filtros
    const result = await statsApi.getChartData(filterData)
    
    if (result.success) {
      console.log('Datos recibidos del backend:', result.data)
      
      chartData.value = result.data  // Usar directamente la respuesta del backend
      
      console.log('Datos del backend pasados a ChartDisplay:', chartData.value)
    } else {
      console.error('Error del backend:', result.error)
      errorMessage.value = `Error del servidor: ${result.error}`
      alert(`Error: ${result.error}`)
    }
  } catch (error) {
    console.error('Error inesperado:', error)
    errorMessage.value = 'Error inesperado al conectar con el servidor'
    alert('Error inesperado al conectar con el servidor')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="grafics-container">
    <!-- Mostrar indicador de carga si está cargando -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem; color: #275B3B;"></i>
        <p>Obteniendo datos del servidor...</p>
      </div>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      <i class="pi pi-exclamation-triangle"></i>
      {{ errorMessage }}
    </div>
    
    <HeaderInput @generate-chart="handleGenerateChart" />
    
    <ChartDisplay :chart-data="chartData" />
  </div>
</template>

<style scoped>
.grafics-container {
  position: relative;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: #275B3B;
}

.loading-spinner p {
  margin-top: 10px;
  font-size: 1.1rem;
  color: #275B3B;
}

.error-message {
  background: #fee;
  color: #c53030;
  padding: 10px 15px;
  border: 1px solid #feb2b2;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-message i {
  color: #c53030;
}
</style>
