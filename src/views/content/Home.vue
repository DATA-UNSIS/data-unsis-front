<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import ToggleSwitch from 'primevue/toggleswitch'
import { Icon } from '@iconify/vue'

// Variables con datos ficticios
const totalStudents = ref(98)
const maleStudents = ref(82)
const femaleStudents = ref(16)
const studentsWithDisability = ref(1)
const indigenousLanguageSpeakers = ref(4)
const studentsWithMathPaternity = ref(0) // "Ningún alumno"
const nonMiahuatlanOrigin = ref(43)

// Switch para selección múltiple
const multipleSelection = ref(false)

// Lista de carreras disponibles
const careers = ref([
  { id: 1, name: 'Licenciatura en Administración Municipal', icon: 'mdi:office-building', selected: false },
  { id: 2, name: 'Licenciatura en Nutrición', icon: 'mdi:food-apple', selected: false },
  { id: 3, name: 'Licenciatura en Administración Pública', icon: 'mdi:account-group', selected: false },
  { id: 4, name: 'Licenciatura en Odontología', icon: 'mdi:tooth', selected: false },
  { id: 5, name: 'Licenciatura en Ciencias Biomédicas', icon: 'mdi:microscope', selected: false },
  { id: 6, name: 'Maestría en Administración Universitaria', icon: 'mdi:school', selected: false },
  { id: 7, name: 'Licenciatura en Ciencias Empresariales', icon: 'mdi:briefcase', selected: false },
  { id: 8, name: 'Maestría en Gobierno Electrónico', icon: 'mdi:laptop', selected: false },
  { id: 9, name: 'Licenciatura en Enfermería', icon: 'mdi:medical-bag', selected: false },
  { id: 10, name: 'Maestría en Planeación Estratégica Municipal', icon: 'mdi:chart-line', selected: false },
  { id: 11, name: 'Licenciatura en Informática', icon: 'mdi:computer', selected: true }, // Pre-seleccionada
  { id: 12, name: 'Maestría en Salud Pública', icon: 'mdi:heart-pulse', selected: false },
  { id: 13, name: 'Licenciatura en Medicina', icon: 'mdi:stethoscope', selected: false },
  { id: 14, name: 'Doctorado en Gobierno Electrónico', icon: 'mdi:school-outline', selected: false }
])

// Computed para obtener las carreras seleccionadas
const selectedCareers = computed(() => {
  return careers.value.filter(career => career.selected).map(career => ({
    id: career.id,
    name: career.name
  }))
})

// Watch para consultar datos automáticamente cuando cambie la selección
watch(selectedCareers, (newSelection) => {
  if (newSelection.length > 0) {
    consultData()
  }
}, { deep: true })

// Función para alternar selección de carrera
const toggleCareer = (careerId: number) => {
  const career = careers.value.find(c => c.id === careerId)
  if (career) {
    if (multipleSelection.value) {
      // Selección múltiple: toggle normal
      career.selected = !career.selected
    } else {
      // Selección única: deseleccionar todas las demás
      careers.value.forEach(c => c.selected = false)
      career.selected = true
    }
  }
}

// Función para consultar datos (automática)
const consultData = () => {
  console.log('Carreras seleccionadas:', selectedCareers.value)
  // Aquí se implementará la llamada a la API automáticamente
}
</script>

<template>
  <div class="home-container">
    <!-- Header -->
    <div class="header-section">
      <h1 class="main-title">¡Bienvenido al Portal de Información Estadística!</h1>
    </div>

    <div class="content-wrapper">
      <!-- Sección de selección de carreras -->
      <div class="careers-section">
        <h2 class="section-title">Consulta de alumnos totales por carrera</h2>
        <p class="section-subtitle">Selecciona una carrera</p>
        
        <!-- Switch para selección múltiple -->
        <div class="selection-mode">
          <label class="switch-label">
            <span class="switch-text">Varios</span>
            <ToggleSwitch v-model="multipleSelection" class="selection-switch" />
          </label>
        </div>
        
        <div class="careers-grid">
          <Button
            v-for="career in careers"
            :key="career.id"
            :class="['career-button', { 'selected': career.selected }]"
            @click="toggleCareer(career.id)"
            :severity="career.selected ? 'success' : 'secondary'"
            outlined
          >
            <div class="career-content">
              <Icon :icon="career.icon" width="32" height="32" />
              <span>{{ career.name }}</span>
            </div>
          </Button>
        </div>
      </div>

      <!-- Sección de estadísticas -->
      <div class="stats-section">
        <!-- Logo de UNSIS -->
        <div class="logo-container">
          <img src="/src/assets/unsis-logo.png" alt="Logo UNSIS" class="unsis-logo" />
        </div>

        <!-- Información de la carrera seleccionada -->
        <div class="selected-career-info" v-if="selectedCareers.length > 0">
          <h3 class="career-name">
            <span v-if="selectedCareers.length === 1">{{ selectedCareers[0].name }}</span>
            <span v-else>{{ selectedCareers.length }} Carreras Seleccionadas</span>
          </h3>
          
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ totalStudents }}</span>
              <span class="stat-label">alumnos</span>
            </div>
          </div>

          <div class="detailed-stats">
            <div class="stat-row">
              <span class="stat-description">Hombres:</span>
              <span class="stat-value">{{ maleStudents }} alumnos</span>
            </div>
            <div class="stat-row">
              <span class="stat-description">Mujeres:</span>
              <span class="stat-value">{{ femaleStudents }} alumnos</span>
            </div>
            <div class="stat-row">
              <span class="stat-description">Padecimiento de alguna discapacidad:</span>
              <span class="stat-value">{{ studentsWithDisability }} alumno</span>
            </div>
            <div class="stat-row">
              <span class="stat-description">Hablantes de alguna lengua indígena:</span>
              <span class="stat-value">{{ indigenousLanguageSpeakers }} alumnos</span>
            </div>
            <div class="stat-row">
              <span class="stat-description">Ejercimiento de maternidad/paternidad:</span>
              <span class="stat-value">{{ studentsWithMathPaternity === 0 ? 'Ningún alumno' : `${studentsWithMathPaternity} alumnos` }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-description">No originarios de Miahuatlán:</span>
              <span class="stat-value">{{ nonMiahuatlanOrigin }} alumnos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  font-family: 'Montserrat', Arial, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.main-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2D6849;
  margin: 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.careers-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #2D6849;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #6B7280;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.selection-mode {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  user-select: none;
}

.switch-text {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  font-family: 'Montserrat', Arial, sans-serif;
}

.selection-switch {
  --p-toggleswitch-background: #d1d5db;
  --p-toggleswitch-checked-background: #2D6849;
  --p-toggleswitch-handle-background: #ffffff;
}

.selection-switch :deep(.p-toggleswitch-slider) {
  position: relative;
}

.selection-switch :deep(.p-toggleswitch-handle) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
}

.careers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.career-button {
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  border: 2px solid #e5e7eb;
  background: white;
  text-align: left;
  justify-content: flex-start;
}

.career-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.career-button.selected {
  background: linear-gradient(135deg, #2D6849, rgba(45, 104, 73, 0.9));
  border-color: #2D6849;
  transform: translateY(-2px) translateX(3px);
  box-shadow: 0 4px 12px rgba(45, 104, 73, 0.3);
  color: #ffffff;
  position: relative;
}

.career-button.selected::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: #ffffff;
}

.career-button.selected .career-content {
  color: #ffffff;
}

.career-button.selected .career-content span {
  color: #ffffff;
}

.career-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  width: 100%;
  justify-content: flex-start;
}

.career-content span {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
}

.stats-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #2D6849;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-bottom: 2rem;
}

.unsis-logo {
  width: 120px;
  height: auto;
}

.selected-career-info {
  text-align: center;
  width: 100%;
}

.career-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2D6849;
  margin-bottom: 2rem;
}

.stats-grid {
  margin-bottom: 2rem;
}

.selected-careers-list {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.list-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  text-align: center;
}

.careers-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.career-item {
  padding: 0.5rem;
  background: #ffffff;
  border-radius: 0.5rem;
  border-left: 3px solid #2D6849;
  font-size: 0.9rem;
  color: #374151;
  text-align: left;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #2D6849;
}

.stat-label {
  font-size: 1.2rem;
  color: #6B7280;
}

.detailed-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border-left: 4px solid #2D6849;
}

.stat-description {
  font-weight: 500;
  color: #374151;
  flex: 1;
}

.stat-value {
  font-weight: 600;
  color: #2D6849;
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .careers-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
  
  .careers-section,
  .stats-section {
    padding: 1.5rem;
  }
  
  .career-content span {
    font-size: 0.8rem;
  }
}
</style>