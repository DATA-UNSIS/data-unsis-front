<script setup lang="ts">
import {ref, watch} from "vue";
import {Icon} from "@iconify/vue";
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';

const selectedDegree = ref(null);
const selectedCarrera = ref(null);
const degreeOptions = [];

// Opciones para los dropdowns
const carreras = ref([
  {name: 'Licenciatura en Administración Municipal', code: 'LAM'},
  {name: 'Licenciatura en Administración Pública', code: 'LAP'},
  {name: 'Licenciatura en Ciencias Biomédicas', code: 'LCB'},
  {name: 'Licenciatura en Ciencias Empresariales', code: 'LCE'},
  {name: 'Licenciatura en Enfermería', code: 'LEN'},
  {name: 'Licenciatura en Informática', code: 'LIN'},
  {name: 'Licenciatura en Medicina', code: 'LME'},
  {name: 'Licenciatura en Nutrición', code: 'LNU'},
  {name: 'Licenciatura en Odontología', code: 'LOD'},
  {name: 'Maestría en Administración Universitaria', code: 'MAU'},
  {name: 'Maestría en Gobierno Electrónico', code: 'MGE'},
  {name: 'Maestría en Planeación Estratégica Municipal', code: 'MPE'},
  {name: 'Maestría en Salud Pública', code: 'MSP'},
  {name: 'Doctorado en Gobierno Electrónico', code: 'DGE'}
]);

const semestres = ref([
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

watch(selectedDegree, (newVal) => {
  console.log('Semestre seleccionado:', newVal);
});

watch(selectedCarrera, (newVal) => {
  console.log('Carrera seleccionada:', newVal);
  const carrera = carreras.value.find(c => c.name === newVal);
});


const prop = defineProps<{
    isStart: boolean;
}>();
</script>

<template>

    <div class="flex items-center justify-between flex-nowrap bg-white px-12 py-6 gap-6 m-4">
      <div class="flex items-center gap-4 max-md:hidden">
        <img class="size-24 ml-20" src="/src/assets/logo.png" alt="Logo de la Unsis">
        <div class="text-green-800 uppercase text-6xl font-libre">data-unsis</div>
      </div>

      <div class="flex items-center gap-4">
        <div class="grid grid-cols-4 gap-4 items-center">
        <div class="flex-1 mt-3.5 " v-if="isStart">
          <label id="carrera" class="block !ml-3.5 text-sm font-medium text-gray-700">Carrera</label>
          <MultiSelect
            v-model="selectedCarrera"
            :options="carreras"
            optionLabel="name"
            optionValue="name"
            
            :class="['text-black','','', 'w-full', '!ml-3.5', '!mb-3.5', '!shadow-md','max-md:w-16']"
            size="small"
            display="chip"
            :maxSelectedLabels="1"
            selectedItemsLabel="{0} selecciones"
          />
        </div>
        
        <div v-if="isStart">
          <label id="semestre" class=" !ml-3.5 block text-sm font-medium text-gray-700">Semestre</label>
          <MultiSelect 
          v-model="selectedDegree" 
          :options="semestres" 
           
          :class="['items-center', '','w-full', '!mb-3.5', '!ml-3.5', '', '!shadow-md', 'max-md:w-16','']"
          size="small"
          :maxSelectedLabels="3"
          selectedItemsLabel="{0} selecciones"
          />
        </div>
        <div class="h-6 !mb-6 !ml-3.5">
        <Button class="bg-green-800 text-white w-36 h-12 max-md:w-16" >
          <Icon icon="material-symbols-light:download-rounded" width="24" height="24" />
          Guardar PDF
        </Button>
        </div>
      </div>
      </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@800&display=swap');
.font-libre {
  font-family: 'Libre Franklin', sans-serif;
}

</style>