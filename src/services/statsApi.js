// Servicio para manejar las llamadas a la API de estadísticas

const API_BASE_URL = '/api/data-unsis/api/execute-general-query'




export const statsApi = {
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
