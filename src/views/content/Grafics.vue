<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Button from 'primevue/button'
import graficasPosibles from './graficasPosibles.js'
import ChartCard from '../../components/ChartCard.vue'
import { statsApi } from '../../services/statsApi.js'

let response = null;
// Usar los props recibidos, pero mantener valores por defecto si no se reciben
const majorsToUse = computed(() => {
  return props.majors && props.majors.length > 0 
    ? props.majors 
    : ["Licenciatura en Administración Municipal", "Licenciatura en Administración Pública", "Licenciatura en Ciencias Biomédicas", "Licenciatura en Ciencias Empresariales",
       "Licenciatura en Enfermería", "Licenciatura en Informática", "Licenciatura en Medicina", "Licenciatura en Nutrición", "Licenciatura en Odontología"];
});

const semestersToUse = computed(() => {
  return props.semesters && props.semesters.length > 0 
    ? props.semesters 
    : ["Curso Propedéutico", "Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Undécimo", "Duodécimo"];
});

const titlesToUse = computed(() => {
  return props.titles && props.titles.length > 0 
    ? props.titles 
    : Object.keys(graficasPosibles.Demografic_Grafics);
});


// Variables reactivas para manejar múltiples gráficos
const chartDataList = ref([]);
async function dataBackend () {
  console.log('Enviando datos al backend...', titlesToUse.value, majorsToUse.value, semestersToUse.value, props.sexo);
  response = await statsApi.getChartData(titlesToUse.value, majorsToUse.value, semestersToUse.value, props.sexo)
  separateResponse()
}

const props = defineProps({
  majors: {
    type: Array,
    default: () => []
  },
  semesters: {
    type: Array,
    default: () => []
  },
  sexo: {
    type: String,
    default: null
  },
  titles: {
    type: Array,
    default: () => []
  }
})

// Watcher para detectar cambios en los filtros y actualizar los datos automáticamente
watch([() => props.majors, () => props.semesters, () => props.sexo], () => {
  console.log('Filtros cambiaron, actualizando datos...');
  dataBackend();
}, { deep: true });

// Ejecutar al montar el componente si hay filtros o usar los valores por defecto
onMounted(() => {
  console.log('Componente montado, cargando datos iniciales...');
  dataBackend();
});

function separateResponse() {
  const data = response.data;
  const newChartList = [];
  
  data.results.forEach(element => {
    // Busca el ENUM correspondiente al título en todas las categorías
    let enumProps = null;
    
    // Buscar en todas las categorías disponibles
    const allCategories = [
      graficasPosibles.Demografic_Grafics,
      graficasPosibles.Geografic_Distribution, 
      graficasPosibles.Academic_Formation,
      graficasPosibles.Socioeconomic_Information,
      graficasPosibles.Personalizated_Questions
    ];
    
    for (const category of allCategories) {
      if (category[element.title]) {
        enumProps = category[element.title];
        break;
      }
    }
    
    // Si no se encuentra la configuración, usar valores por defecto
    if (!enumProps) {
      console.log(`No se encontró configuración para el elemento: ${element.title}`);
      enumProps = {
        title: element.title,
        type: 'bar',
        possibleGrafics: ['bar', 'pie', 'doughnut', 'line'],
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: 'Gráfico generado automáticamente para mostrar la distribución de datos.',
        Interpretation: 'Los valores más altos representan categorías con mayor frecuencia o importancia.',
        Application: 'Utiliza esta información para tomar decisiones basadas en los datos presentados.'
      };
    }
    
    // Extraer las claves (strings) del objeto data
    const labels = Object.keys(element.data); 
    const values = Object.values(element.data); 

    const chartData = {
      labels: labels,
      datasets: [{
        label: enumProps.title,
        data: values,
        backgroundColor: enumProps.backgroundColors,
        borderColor: enumProps.borderColors,
        borderWidth: 1
      }]
    };
    
    // objeto especial para los datos de un grafico
    const chartInfo = {
      id: element.title,
      title: enumProps.title,
      chartData: chartData,
      type: enumProps.type,
      possibleTypes: enumProps.possibleGrafics?.map(type => ({ 
        name: getTypeDisplayName(type), 
        value: type 
      })) || [],
      Purpose: enumProps.Purpose,
      Interpretation: enumProps.Interpretation,
      Application: enumProps.Application
    };
    
    newChartList.push(chartInfo);
  });
  
  chartDataList.value = newChartList;
}

// Función auxiliar para obtener nombres de display amigables
function getTypeDisplayName(type) {
  const typeMap = {
    'bar': 'Gráfico de Barras',
    'pie': 'Gráfico de Pastel', 
    'doughnut': 'Gráfico de Dona',
    'line': 'Gráfico de Líneas'
  };
  return typeMap[type] || type;
}
</script>

<template>
    <div class="content-container">
      <ChartCard 
        v-for="chart in chartDataList" 
        :key="chart.id"
        :title="chart.title"
        :chartData="chart.chartData"
        :type="chart.type"
        :posibleTypes="chart.possibleTypes"
        :Purpose="chart.Purpose"
        :Interpretation="chart.Interpretation"
        :Application="chart.Application"
      />
    </div>
</template>

<style scoped>
.content-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  background-color: transparent;
  min-height: 100vh;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content-container :deep(.chart-card) {
  min-height: 350px;
  max-height: 450px;
  height: auto;
  width: 100%;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  overflow: hidden;
}

.content-container :deep(.p-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.content-container :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container :deep(.p-card-content) {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

@media (min-width: 1200px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1400px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.75rem;
    gap: 1.25rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 320px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.5rem;
    gap: 1.25rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 340px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 300px;
  }
}

@media (max-width: 575px) {
  .content-container {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 280px;
  }
}

@media (max-width: 400px) {
  .content-container {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .content-container :deep(.chart-card) {
    min-height: 250px;
  }
}

@media (min-width: 1600px) {
  .content-container {
    max-width: 1600px;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (orientation: landscape) and (max-height: 800px) and (min-width: 768px) {
  .content-container :deep(.chart-card) {
    min-height: 280px;
  }
}

@media (min-resolution: 1.25dppx) {
  .content-container :deep(.chart-card) {
    image-rendering: -webkit-optimize-contrast;
  }
}

@media (min-resolution: 1.5dppx) {
  .content-container :deep(.chart-card) {
    image-rendering: auto;
  }
}
</style>
