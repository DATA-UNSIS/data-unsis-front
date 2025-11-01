<template>
  <div class="help-charts">
    <h2>¿Cómo interpretar los gráficos?</h2>
    <section v-for="chart in charts" :key="chart.type" class="chart-section">
      <h3>{{ chart.title }}</h3>
      <p>{{ chart.description }}</p>
      <img
        :src="getImage(chart.type)"
        :alt="`Ejemplo gráfico ${chart.title}`"
        class="chart-image" 
        width="250"
      />
    </section>
  </div>
</template>

<script setup>
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


const getImage = (type) => {
  return new URL(`../assets/help-charts/${type}.png`, import.meta.url).href
}
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

.help-charts h2 {
  color: #1F2937;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
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

.chart-image {
  display: block;
  margin: 1rem auto;
  max-width: 100%;
  width: 350px;
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  height: auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}


@media (max-width: 500px) {
  .help-charts {
    padding: 0.5rem;
  }
  .chart-image {
    width: 100%;
    max-width: 100%;
  }
  .help-charts h2 {
    font-size: 1.3rem;
  }
  .chart-section h3 {
    font-size: 1rem;
  }
}
</style>