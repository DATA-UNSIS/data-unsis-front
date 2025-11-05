<template>
  <div class="help-charts">
    <div class="title-container">
      <h2>¿Cómo interpretar los gráficos?</h2>
    </div>
    
    <section
      v-for="chart in charts"
      :key="chart.type"
      class="chart-section"
    >
      <h3>{{ chart.title }}</h3>
      <p>{{ chart.description }}</p>
      <div class="chart-container">
        <canvas :ref="el => setChartRef(chart.type, el)"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import {
  Chart,
  PieController,
  DoughnutController,
  BarController,
  RadarController,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Registrar los componentes de Chart.js
Chart.register(
  PieController,
  DoughnutController,
  BarController,
  RadarController,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
)

const chartInstances = ref({})
const chartRefs = ref({})

// detección de modo oscuro
const isDarkReaderActive = () => {
  try {
    const bodyStyle = window.getComputedStyle(document.body)
    const filter = bodyStyle.filter
    const hasDarkReaderFilter = filter && (
      filter.includes('invert') || 
      filter.includes('hue-rotate') ||
      filter.includes('contrast') ||
      filter.includes('darkreader')
    )
    
    const darkReaderElements = document.querySelectorAll('[class*="darkreader"], [id*="darkreader"]')
    const hasDarkReaderElements = darkReaderElements.length > 0
    const bodyBackground = bodyStyle.backgroundColor
    const isDarkBackground = bodyBackground && (
      bodyBackground.includes('rgb(23, 25, 35)') || // Fondo típico de Dark Reader
      bodyBackground.includes('rgb(13, 17, 23)') ||
      bodyBackground.includes('rgb(0, 0, 0)')
    )
    
    // 4. Verificar si el texto es blanco
    const bodyColor = bodyStyle.color
    const isWhiteText = bodyColor && bodyColor.includes('rgb(255, 255, 255)')
    
    console.log('Dark Reader Detection:', {
      filter,
      hasDarkReaderFilter,
      hasDarkReaderElements,
      bodyBackground,
      isDarkBackground,
      bodyColor,
      isWhiteText
    })
    return hasDarkReaderFilter || hasDarkReaderElements || (isDarkBackground && isWhiteText)
  } catch (error) {
    console.log('Error detecting Dark Reader:', error)
    return false
  }
}

const setChartRef = (type, el) => {
  if (el) {
    chartRefs.value[type] = el
  }
}

const charts = [
  {
    type: 'pie',
    title: 'Gráfico de Pastel (Pie)',
    description: `Este tipo de gráfico divide un círculo en segmentos que representan partes de un todo. 
    Cada rebanada indica el porcentaje que una categoría ocupa respecto al 100%. 
    Es muy útil cuando queremos mostrar proporciones, por ejemplo: la distribución de alumnos por género o 
    el porcentaje de gasto en diferentes áreas. Para leerlo, observa el tamaño de cada segmento y su etiqueta: 
    mientras más grande sea, mayor es su participación en el total.`
  },
  {
    type: 'doughnut',
    title: 'Gráfico de Dona (Doughnut)',
    description: `Es una variación del gráfico de pastel, pero con un centro vacío que a veces se utiliza para 
    mostrar un valor total o un dato central. Permite visualizar proporciones de una manera clara y estética. 
    También se usa para comparar varias distribuciones en conjunto. Por ejemplo: mostrar el porcentaje de estudiantes 
    becados frente a no becados, destacando al centro la cantidad total de alumnos.`
  },
  {
    type: 'bar',
    title: 'Gráfico de Barras (Bar)',
    description: `Este gráfico muestra datos en forma de barras rectangulares. La longitud o altura de la barra 
    representa el valor de la categoría. Es ideal para comparar cantidades entre diferentes grupos. 
    Se lee de manera sencilla: identifica la categoría en el eje horizontal y observa la altura de la barra en 
    el eje vertical, que indica el valor. Por ejemplo: número de estudiantes inscritos por carrera, 
    o cantidad de encuestas contestadas en cada semestre.`
  },
  {
    type: 'radar',
    title: 'Gráfico de Radar',
    description: `Se utiliza para mostrar múltiples variables en un mismo gráfico con forma de red o telaraña. 
    Cada eje representa una variable, y la distancia desde el centro indica el valor alcanzado. 
    Es útil para comparar perfiles o características. Por ejemplo: comparar el nivel de satisfacción de estudiantes 
    en diferentes aspectos como infraestructura, calidad docente, servicios y actividades culturales. 
    Para leerlo, observa qué tan alejado está el punto respecto al centro: cuanto más lejos, mayor es el valor.`
  }
]

onMounted(async () => {
  await nextTick()

  // Esperar un poco más para que modo oscuro aplique sus estilos
  setTimeout(() => {
    const darkMode = isDarkReaderActive()
    
    console.log('Final Dark Mode Detection:', darkMode)
    
    // COLORES DEFINITIVOS
    const textColor = darkMode ? '#FFFFFF' : '#1F2937'
    const gridColor = darkMode ? '#4B5563' : '#E5E7EB'
    const tooltipBg = darkMode ? '#1F2937' : '#FFFFFF'

    charts.forEach(chart => {
      const ctx = chartRefs.value[chart.type]
      if (!ctx) {
        console.warn(`No se encontró el canvas para el gráfico: ${chart.type}`)
        return
      }

      let data = {}
      let options = {
        plugins: {
          legend: { 
            position: 'top',
            labels: { 
              color: textColor,
              font: {
                family: "'Montserrat', Arial, sans-serif"
              }
            }
          },
          tooltip: {
            titleFont: {
              family: "'Montserrat', Arial, sans-serif"
            },
            bodyFont: {
              family: "'Montserrat', Arial, sans-serif"
            },
            backgroundColor: tooltipBg,
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: gridColor
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }

      switch (chart.type) {
        case 'pie':
          data = {
            labels: ['Rojo', 'Azul', 'Amarillo'],
            datasets: [{
              data: [300, 50, 100],
              backgroundColor: ['#f87171', '#60a5fa', '#facc15']
            }]
          }
          break

        case 'doughnut':
          data = {
            labels: ['Becados', 'No Becados'],
            datasets: [{
              data: [70, 30],
              backgroundColor: ['#34d399', '#f87171']
            }]
          }
          break

        case 'bar':
          data = {
            labels: ['Carrera A', 'Carrera B', 'Carrera C'],
            datasets: [{
              label: 'Estudiantes',
              data: [120, 80, 150],
              backgroundColor: '#60a5fa'
            }]
          }
          options.scales = {
            x: { 
              ticks: { color: textColor },
              grid: { color: gridColor }
            },
            y: { 
              ticks: { color: textColor },
              grid: { color: gridColor }
            }
          }
          break

        case 'radar':
          data = {
            labels: ['Infraestructura', 'Docencia', 'Servicios', 'Cultura', 'Ambiente'],
            datasets: [{
              label: 'Nivel de satisfacción',
              data: [80, 90, 70, 60, 85],
              backgroundColor: 'rgba(96,165,250,0.4)',
              borderColor: '#60a5fa',
              pointBackgroundColor: '#3b82f6'
            }]
          }
          options.scales = {
            r: {
              grid: { color: gridColor },
              pointLabels: { color: textColor },
              angleLines: { color: gridColor },
              ticks: { color: textColor }
            }
          }
          break
      }
      if (chartInstances.value[chart.type]) {
        chartInstances.value[chart.type].destroy()
      }

      chartInstances.value[chart.type] = new Chart(ctx, {
        type: chart.type,
        data,
        options
      })
    })
  }, 100) 
})

onBeforeUnmount(() => {
  Object.values(chartInstances.value).forEach(instance => {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy()
    }
  })
})
</script>

<style scoped>
.help-charts {
  width: 100%;
  font-family: 'Montserrat', Arial, sans-serif;
  color: #1F2937;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  margin: 0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.title-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #F9FAFB;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  text-align: center;
}

.help-charts h2 {
  color: #1F2937;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0;
  position: relative;
  padding-bottom: 1rem;
}

.help-charts h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #2D6849;
  border-radius: 2px;
}

.chart-section h3 {
  color: #2D6849;
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  text-align: left;
}

.chart-section p {
  color: #4B5563;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: justify;
  line-height: 1.7;
}

.chart-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #F9FAFB;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
}

.chart-container {
  width: 100%;
  max-width: 400px;
  height: 300px;
  margin: 1rem auto;
}

@media (max-width: 500px) {
  .help-charts {
    padding: 1rem;
  }
  
  .chart-container {
    height: 250px;
    max-width: 100%;
  }
  
  .help-charts h2 {
    font-size: 1.5rem;
  }
  
  .chart-section h3 {
    font-size: 1.1rem;
  }
  
  .chart-section p {
    font-size: 0.9rem;
  }
}
</style>