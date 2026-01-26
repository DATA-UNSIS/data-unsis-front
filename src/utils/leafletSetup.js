// Configuración de Leaflet para funcionamiento offline
// Soluciona el problema de iconos que no cargan correctamente con bundlers

import L from 'leaflet'

// Importar los iconos de Leaflet directamente desde node_modules
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Eliminar el _getIconUrl por defecto que causa problemas
delete L.Icon.Default.prototype._getIconUrl

// Configurar los iconos por defecto con las rutas locales
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

export default L
