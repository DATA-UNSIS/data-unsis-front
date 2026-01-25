// Servicio para manejar las llamadas a la API de estadísticas

const API_BASE_URL = '/api/data-unsis/api/execute-general-query'
const DASHBOARD_API_URL = '/api/data-unsis/api/dashboard-data'
const COORDINATES_API_URL = '/api/data-unsis/api/mapa/coordenadas-estudiantes'




export const statsApi = {
  /**
   * Obtiene los datos del dashboard para las carreras seleccionadas
   * @param {Array} majors - Array de carreras seleccionadas
   * @returns {Promise} - Promise con la respuesta del servidor
   */
  async getDashboardData(majors) {
    try {
      console.log('Enviando carreras al endpoint dashboard-data:', majors)

      const response = await fetch(DASHBOARD_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ majors })
      })
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Respuesta del dashboard:', data)
      
      return {
        success: true,
        data
      }
    } catch (error) {
      console.log("Error al obtener datos del dashboard", error)
      
      return {
        success: false,
        error: error.message
      }
    }
  },

  /**
   * Obtiene las coordenadas de los estudiantes basadas en los filtros
   * @param {Array} majors - Array de carreras seleccionadas
   * @param {Array} semesters - Array de semestres seleccionados (opcional)
   * @param {String} sexo - Sexo del estudiante (opcional)
   * @returns {Promise} - Promise con la respuesta del servidor
   */
  async getStudentCoordinates(majors, semesters = null, sexo = null) {
    try {
      console.log('Obteniendo coordenadas para:', { majors, semesters, sexo })

      const requestBody = { majors }
      if (semesters) requestBody.semesters = semesters
      if (sexo) requestBody.sexo = sexo

      const response = await fetch(COORDINATES_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Coordenadas recibidas:', data)
      
      return {
        success: true,
        data: data.heatMapData || []
      }
    } catch (error) {
      console.log("Error al obtener coordenadas", error)
      
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  },

  /**
   * Envía los filtros seleccionados al backend y obtiene los datos para el gráfico
   * @param {Object} filters - Filtros seleccionados por el usuario
   * @returns {Promise} - Promise con la respuesta del servidor
   */
  async getChartData(titles, majors, semesters, sexo) {
    try {
      console.log('Enviando filtros al backend:', titles, majors, semesters, sexo)

      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ titles, majors, semesters, sexo })
      })
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Respuesta del backend:', data)
      
      return {
        success: true,
        data
      }
    } catch (error) {
      console.log("Error al obtemer datos del backend", error)
      
      return {
        success: false,
        error: error.message
      }
    }
  },

  /**
   * Obtiene los datos GeoJSON de municipios con conteo de estudiantes
   * @returns {Promise} - Promise con la respuesta del servidor
   */
  async getMunicipiosConConteo() {
    try {
      console.log('Obteniendo municipios con conteo...')

      const response = await fetch('/api/data-unsis/api/mapa/municipios-con-conteo', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Municipios recibidos:', data.length)
      
      return {
        success: true,
        data
      }
    } catch (error) {
      console.log("Error al obtener municipios", error)
      
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  }
}
