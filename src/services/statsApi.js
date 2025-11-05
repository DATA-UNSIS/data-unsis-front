// Servicio para manejar las llamadas a la API de estadísticas

const API_BASE_URL = '/api/data-unsis/api/execute-general-query'
const DASHBOARD_API_URL = '/api/data-unsis/api/dashboard-data'




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
  }
}
