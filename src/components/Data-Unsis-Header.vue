<script setup lang="ts">
import {ref, watch, onMounted} from "vue";
import {Icon} from "@iconify/vue";
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { usePdfExport } from '../composables/usePdfExport.js';

const degreeOptions = [];

// Instancias de composables
const toast = useToast();
const { exportChartsToPDF } = usePdfExport();

// Estado para el botón de PDF
const isGeneratingPDF = ref(false);

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
  'Curso Propedéutico',
  'Primero',
  'Segundo',
  'Tercero',
  'Cuarto',
  'Quinto',
  'Sexto',
  'Séptimo',
  'Octavo',
  'Noveno',
  'Décimo',
  'Undécimo',
  'Duodécimo'
]);

const selectedCarrera = ref([...carreras.value]);
const selectedDegree = ref([...semestres.value]);

// emit para enviar filtros
const emit = defineEmits<{
  filtersChanged: [filters: { carreras: string[], semestres: string[] }]
}>();

// Función para emitir los filtros
const emitFilters = () => {
  const carrerasToEmit = selectedCarrera.value.length === carreras.value.length 
    ? null 
    : selectedCarrera.value;
  
  const semestresToEmit = selectedDegree.value.length === semestres.value.length 
    ? null 
    : selectedDegree.value;

  emit('filtersChanged', {
    carreras: carrerasToEmit,
    semestres: semestresToEmit,
    sexo: null
  });
  console.log("Datos emitidos:", {
    carreras: carrerasToEmit,
    semestres: semestresToEmit,
    sexo: null
  });
};

watch(selectedDegree, (newVal) => {
  console.log('Semestre seleccionado:', newVal);
  emitFilters();
});

watch(selectedCarrera, (newVal) => {
  console.log('Carrera seleccionada:', newVal);
  emitFilters();
});

// Emitir filtros iniciales cuando el componente se monta
onMounted(() => {
  emitFilters();
});

// Función para generar PDF de los gráficos actuales
const generatePDF = async () => {
  if (isGeneratingPDF.value) return;
  
  isGeneratingPDF.value = true;
  
  try {
    // Mostrar notificación de inicio
    toast.add({
      severity: 'info',
      summary: 'Generando PDF',
      detail: 'Procesando los gráficos visibles, por favor espere...',
      life: 3000
    });

    // Preparar filtros actuales para incluir en el PDF
    const currentFilters = {
      carreras: selectedCarrera.value.length === carreras.value.length ? null : selectedCarrera.value,
      semestres: selectedDegree.value.length === semestres.value.length ? null : selectedDegree.value
      //sexo: null // Por ahora null, se puede extender más adelante
    };

    // Generar el PDF con los filtros actuales
    const result = await exportChartsToPDF(currentFilters);
    
    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'PDF Generado Exitosamente',
        detail: `${result.chartsCount} gráficos en ${result.pagesCount} páginas\n Archivo: ${result.fileName}`,
        life: 6000
      });
    } else {
      throw new Error(result.message);
    }
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    toast.add({
      severity: 'error',
      summary: 'Error al Generar PDF',
      detail: error.message || 'No se pudo generar el PDF. Verifique que haya gráficos visibles en pantalla.',
      life: 5000
    });
  } finally {
    isGeneratingPDF.value = false;
  }
};

const prop = defineProps<{
    isStart: boolean;
}>();
</script>

<template>
  <div class="flex items-center justify-between bg-white px-12 py-6 gap-6 m-4">

    <div class="flex items-center gap-4 max-md:hidden">
      <img class="size-24" src="/src/assets/logo.png" alt="Logo de la Unsis">
      <div class="text-green-800 uppercase text-6xl font-libre">data-unsis</div>
    </div>

    <div class="flex items-end gap-4 absolute right-12 top-1/2 transform -translate-y-1/2">

      <div class="flex-1" v-if="isStart">
        <label id="carrera" class="type-label">Carrera</label>
        <MultiSelect
            v-model="selectedCarrera"
            :options="carreras"
            class="type-multiselect"
            display="chip"
            :maxSelectedLabels="1"
            selectedItemsLabel="{0} selecciones"
        />
      </div>

      <div v-if="isStart">
        <label id="semestre" class="type-label">Semestre</label>
        <MultiSelect
            v-model="selectedDegree"
            :options="semestres"
            class="type-multiselect"
            :maxSelectedLabels="3"
            selectedItemsLabel="{0} selecciones"
        />
      </div>

      <div class="flex items-end" v-if="isStart">
        <Button 
          class="primary-button w-40 h-14 max-md:w-16 disabled:opacity-50"
          :disabled="isGeneratingPDF"
          @click="generatePDF"
        >
          <Icon 
            :icon="isGeneratingPDF ? 'material-symbols-light:hourglass-top-rounded' : 'material-symbols-light:download-rounded'" 
            width="30" 
            height="30" 
            :class="{ 'animate-spin': isGeneratingPDF }"
          />
          <span class="max-md:hidden ml-2">
            {{ isGeneratingPDF ? 'Generando...' : 'Guardar PDF' }}
          </span>
        </Button>
      </div>
    </div>
  </div>
  
  <Toast />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@800&display=swap');
.font-libre {
  font-family: 'Libre Franklin', sans-serif;
}

.type-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  font-family: 'Montserrat', Arial, sans-serif;
  color: #78877F;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.type-multiselect {
  flex: 1;
  width: 100%;
  min-width: 180px; /* Agregado para mejor control del ancho mínimo */
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.type-multiselect :deep(.p-multiselect-label) {
  color: #000000;
  font-size: 0.8rem;
  font-family: 'Montserrat', Arial, sans-serif;
  padding: 0.3rem 0.5rem;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.type-multiselect :deep(.p-multiselect-trigger) {
  width: 1.5rem;
}

.primary-button {
  background-color: #2D6849;
  color: white;
  border: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.primary-button:hover {
  background-color: #1e4529;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(45, 104, 73, 0.2);
}

.primary-button:active {
  transform: translateY(0);
}

/* Animación para el icono de carga */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Estilos para el estado deshabilitado del botón */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Espaciado para el texto del botón */
.ml-2 {
  margin-left: 0.5rem;
}
</style>