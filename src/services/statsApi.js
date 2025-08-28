// Servicio para manejar las llamadas a la API de estadísticas

const API_BASE_URL = 'http://localhost:8080/json/testTotalAlumnos'

export const statsApi = {
  /**
   * Envía los filtros seleccionados al backend y obtiene los datos para el gráfico
   * @param {Object} filters - Filtros seleccionados por el usuario
   * @returns {Promise} - Promise con la respuesta del servidor
   */
  async getChartData(filters) {
    try {
      console.log('Enviando filtros al backend:', filters.carrera, filters.semestre, filters.sexo)
      
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(filters)
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
      console.log("Error al obtemer datos del backend")
      
      return {
        success: false,
        error: error.message
      }
    }
  }
}
