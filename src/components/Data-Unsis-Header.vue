<script setup lang="ts">
import {ref, watch, onMounted} from "vue";
import {Icon} from "@iconify/vue";
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';

const degreeOptions = [];

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
        <Button class="primary-button w-40 h-14 max-md:w-16">
          <Icon icon="material-symbols-light:download-rounded" width="30" height="30" />
          Guardar PDF
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@800&display=swap');
.font-libre {
  font-family: 'Libre Franklin', sans-serif;
}

.type-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
  font-family: 'Montserrat', Arial, sans-serif;
  color: #2d3531;
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
  color: #78877F;
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
</style>