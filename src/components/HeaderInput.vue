<script setup lang="ts">
import { ref, watch } from 'vue'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'

// Definir los emits para comunicación con el componente padre
const emit = defineEmits(['generate-chart'])

// Referencias reactivas
const selectedCarrera = ref([])
const selectedSemestre = ref([])
const selectedSexo = ref(null)

// Opciones para los dropdowns
const carreras = ref([
  "Licenciatura en Administración Municipal",
  "Licenciatura en Administración Pública",
  "Licenciatura en Ciencias Biomédicas",
  "Licenciatura en Ciencias Empresariales",
  "Licenciatura en Enfermería",
  "Licenciatura en Informática",
  "Licenciatura en Medicina",
  "Licenciatura en Nutrición",
  "Licenciatura en Odontología",
  "Maestría en Administración Universitaria",
  "Maestría en Gobierno Electrónico",
  "Maestría en Planeación Estratégica Municipal",
  "Maestría en Salud Pública",
  "Doctorado en Gobierno Electrónico"
]);

const semestres = ref([
  { name: 'Primero' },
  { name: 'Segundo' },
  { name: 'Tercero' },
  { name: 'Cuarto' },
  { name: 'Quinto' },
  { name: 'Sexto' },
  { name: 'Séptimo' },
  { name: 'Octavo' },
  { name: 'Noveno' },
  { name: 'Décimo' },
  { name: 'Undécimo' },
  { name: 'Duodécimo' }
]);

const sexos = ref([
  { name: 'Mujer' },
  { name: 'Hombre' },
  { name: 'Ambos' }
]);

// Tipo de gráfico seleccionado
const selectedChart = ref(null);

const tiposGrafico = ref([
  { name: 'Distribución por Carrera', code: 'carrera', type: 'pie' },
  { name: 'Nivel Socioeconómico', code: 'socioeconomico', type: 'doughnut' },
  { name: 'Becas Solicitadas', code: 'becas', type: 'bar' },
  { name: 'Servicios en Hogar', code: 'servicios', type: 'radar' },
  { name: 'Procedencia Geográfica', code: 'geografia', type: 'bar' },
  { name: 'Estado Civil', code: 'estadocivil', type: 'pie' }
]);

// Variable para controlar si las carreras están deshabilitadas
const isCarrerasDisabled = ref(false);

// Watch para manejar la selección del tipo de gráfico
watch(selectedChart, (newChart) => {
  if (newChart && newChart.code === 'carrera') {
    // Si selecciona "Distribución por Carrera", seleccionar todas las carreras y deshabilitar
    selectedCarrera.value = [...carreras.value]; // Seleccionar todas las carreras
    isCarrerasDisabled.value = true;
    console.log('Gráfico de carreras seleccionado: todas las carreras habilitadas por defecto')
  } else {
    // Si selecciona otro tipo, habilitar la selección de carreras
    isCarrerasDisabled.value = false;
    // Opcional: limpiar la selección cuando cambie a otro tipo
    // selectedCarrera.value = []
  }
}, { immediate: true });

// Función para generar gráfico, emite el evento al padre
const generateChart = () => {
  if (!selectedChart.value) {
    alert('Por favor selecciona un tipo de gráfico');
    return;
  }
  
  // Preparar los datos para enviar al backend
  const filterData = {
    carreras: selectedCarrera.value, // Enviar los nombres directamente
    semestres: selectedSemestre.value,
    sexo: selectedSexo.value // Enviar el código o null
  }
  
  console.log('Enviando filtros seleccionados:', filterData)
  
  // Emitir evento al componente padre con los filtros
  emit('generate-chart', filterData)
}
</script>

<template>
  <div class="statistics-container">
    <!-- Título Principal -->
    <div class="header-section">
      <h1 class="main-title">
        Estadísticas UNSIS
      </h1>
      <h2 class="subtitle">
        Sistema de Análisis de Datos Universitarios
      </h2>
    </div>

    <!-- Sección de Filtros -->
    <div class="filters-section">
      <div class="filters-header">
        <h4 class="filters-title">
          <i class="pi pi-sliders-h"></i>
          Personaliza los parámetros para graficar
        </h4>
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

        <!-- MultiSelect Carrera -->
        <div class="filter-item">
          <label class="filter-label">
            <i class="pi pi-graduation-cap"></i>
            Carrera
            <span v-if="isCarrerasDisabled" class="disabled-label">(Todas seleccionadas)</span>
          </label>
          <MultiSelect
            v-model="selectedCarrera"
            :options="carreras"
            placeholder="Selecciona una o varias carreras"
            class="custom-select"
            display="chip"
            :maxSelectedLabels="2"
            selectedItemsLabel="{0} carreras seleccionadas"
            showClear
            :disabled="isCarrerasDisabled"
          />
        </div>

        <!-- MultiSelect Semestre -->
        <div class="filter-item">
          <label class="filter-label">
            <i class="pi pi-calendar"></i>
            Semestre
          </label>
          <MultiSelect
            v-model="selectedSemestre"
            :options="semestres"
            optionLabel="name"
            placeholder="Selecciona uno o varios semestres"
            class="custom-select"
            display="chip"
            :maxSelectedLabels="2"
            selectedItemsLabel="{0} semestres seleccionados"
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
  </div>
</template>

<style scoped>
.statistics-container {
  width: 100%;
  background: transparent;
  padding: 0;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 30px;
  background: transparent;
  padding: 0;
  border: none;
  background-color: #275B3B;
  border-radius: 20px;
  flex: content;
}

.main-title {
  color: #efefef;
  font-size: 2.5rem;
  font-weight: normal;
  margin-bottom: 10px;
}

.main-title i {
  margin-right: 10px;
  color: #efefef;
}

.subtitle {
  color: #efefef;
  font-size: 1.5rem;
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
  color: #275B3B;
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.filters-title i {
  color: #275B3B;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  color: #275B3B;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label i {
  color: #275B3B;
}

:deep(.custom-select) {
  width: 100%;
  height: 40px;
}

:deep(.p-select) {
  border: 1px solid #4a8b61;
  border-radius: 4px;
  background: #f8fdf9;
}

:deep(.p-multiselect) {
  border: 1px solid #4a8b61;
  border-radius: 4px;
  background: #f8fdf9;
}

:deep(.p-select:hover) {
  border-color: #275B3B;
  background: #f0f8f1;
}

:deep(.p-multiselect:hover) {
  border-color: #275B3B;
  background: #f0f8f1;
}

:deep(.p-select.p-focus) {
  border-color: #275B3B;
  box-shadow: 0 0 0 2px rgba(39, 91, 59, 0.2);
}

:deep(.p-multiselect.p-focus) {
  border-color: #275B3B;
  box-shadow: 0 0 0 2px rgba(39, 91, 59, 0.2);
}

/* Controlar el tamaño y comportamiento de los MultiSelect */
:deep(.p-multiselect .p-multiselect-label-container) {
  max-height: 60px;
  overflow-y: auto;
  flex-wrap: wrap;
}

:deep(.p-multiselect .p-chip) {
  max-width: 120px;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background: #275B3B;
  color: white;
}

:deep(.p-multiselect .p-chip .p-chip-remove-icon) {
  color: white;
}

:deep(.p-multiselect .p-chip .p-chip-remove-icon:hover) {
  background: rgba(255, 255, 255, 0.2);
}

:deep(.p-multiselect .p-chip .p-chip-text) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
}

:deep(.p-multiselect-label) {
  max-height: 60px;
  overflow-y: auto;
  line-height: 1.2;
}

/* Estilos para opciones del dropdown */
:deep(.p-select-option:hover) {
  background: rgba(39, 91, 59, 0.1);
  color: #275B3B;
}

:deep(.p-multiselect-option:hover) {
  background: rgba(39, 91, 59, 0.1);
  color: #275B3B;
}

:deep(.p-select-option.p-selected) {
  background: #275B3B;
  color: white;
}

:deep(.p-multiselect-option.p-selected) {
  background: #275B3B;
  color: white;
}

:deep(.p-select-option.p-selected:hover) {
  background: #1e4529;
  color: white;
}

:deep(.p-multiselect-option.p-selected:hover) {
  background: #1e4529;
  color: white;
}

/* Checkbox en multiselect */
:deep(.p-multiselect-option .p-checkbox .p-checkbox-box) {
  border-color: #275B3B;
}

:deep(.p-multiselect-option .p-checkbox.p-checked .p-checkbox-box) {
  background: #275B3B;
  border-color: #275B3B;
}

/* Iconos en los dropdowns */
:deep(.p-select-dropdown) {
  color: #275B3B;
}

:deep(.p-multiselect-dropdown) {
  color: #275B3B;
}

/* Placeholder text */
:deep(.p-select-label),
:deep(.p-multiselect-label) {
  color: #6b7280;
}

:deep(.p-select-label.p-placeholder),
:deep(.p-multiselect-label.p-placeholder) {
  color: #9ca3af;
}

/* Estilos para campos deshabilitados */
.disabled-label {
  font-size: 0.8rem;
  color: #94a3a3;
  font-weight: normal;
  margin-left: 5px;
}

:deep(.p-multiselect.p-disabled) {
  background: #f9fafb !important;
  border-color: #d1d5db !important;
  opacity: 0.6;
}

:deep(.p-multiselect.p-disabled .p-multiselect-label) {
  color: #6b7280 !important;
}

:deep(.p-multiselect.p-disabled .p-chip) {
  background: #9ca3af !important;
  color: white !important;
}

/* Action Section */
.action-section {
  text-align: center;
}

.generate-btn {
  background: #275B3B;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.generate-btn:hover:not(:disabled) {
  background: #1e4529;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 91, 59, 0.4);
}

.generate-btn:disabled {
  background: #94a3a3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .statistics-container {
    padding: 10px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>