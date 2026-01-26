<script setup>
import { onMounted, ref, watch } from 'vue';
// Importar Leaflet con configuración de iconos offline
import L from '../utils/leafletSetup.js';
import 'leaflet/dist/leaflet.css';
import { statsApi } from '../services/statsApi.js';

// Props para recibir las coordenadas desde el componente padre
const props = defineProps({
    coordinates: {
        type: Array,
        default: () => []
    }
});

// Referencias
let map = null;
let markersLayer = null;
const currentZoom = ref(8);
const MIN_ZOOM_FOR_MARKERS = 9; // Zoom mínimo para mostrar puntos (reducido para pruebas)

// 1. Definimos los colores (Escala de Rojos/Naranjas)
function getColor(d) {
    return d > 10 ? '#800026' : // Rojo intenso (Más de 10)
           d > 5  ? '#BD0026' :
           d > 2  ? '#E31A1C' :
           d > 1  ? '#FC4E2A' :
           d > 0  ? '#FD8D3C' : // Naranja (Al menos 1 alumno)
                    '#FFEDA0';  // Amarillo pálido (0 alumnos)
}

// 2. Definimos el estilo de cada polígono
function style(feature) {
    return {
        fillColor: getColor(feature.properties.total_alumnos),
        weight: 1,
        opacity: 1,
        color: 'white', // Borde blanco
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// 3. Función para agregar marcadores de puntos
function addMarkers(coordinates) {
    if (!map) {
        return;
    }
    
    // Limpiar marcadores anteriores
    if (markersLayer) {
        map.removeLayer(markersLayer);
    }
    
    // Solo mostrar si el zoom es suficiente
    if (currentZoom.value < MIN_ZOOM_FOR_MARKERS) {
        return;
    }
    
    // Crear una capa de marcadores
    markersLayer = L.layerGroup();
    
    let markersCreated = 0;
    coordinates.forEach(point => {
        if (point.lat && point.lng) {
            markersCreated++;
            // Crear un marcador circular personalizado
            const marker = L.circleMarker([point.lat, point.lng], {
                radius: 6,
                fillColor: '#FF6B35',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });
            
            // Agregar popup con información
            const intensity = point.intensity || 1;
            marker.bindPopup(`
                <div style="text-align:center">
                    <strong>Estudiantes aquí</strong><br>
                    <span style="font-size:1.1em">🎓 ${intensity} ${intensity === 1 ? 'alumno' : 'alumnos'}</span>
                </div>
            `);
            
            // Efecto hover
            marker.on('mouseover', function() {
                this.setStyle({
                    radius: 8,
                    fillOpacity: 1
                });
            });
            
            marker.on('mouseout', function() {
                this.setStyle({
                    radius: 6,
                    fillOpacity: 0.8
                });
            });
            
            markersLayer.addLayer(marker);
        }
    });
    
    markersLayer.addTo(map);
}

// 4. Watch para actualizar marcadores cuando cambien las coordenadas
watch(() => props.coordinates, (newCoordinates) => {
    if (newCoordinates && newCoordinates.length > 0) {
        addMarkers(newCoordinates);
    }
}, { deep: true });

onMounted(async () => {
    // Inicializar mapa
    map = L.map('map').setView([17.05, -96.72], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    
    // Escuchar cambios de zoom
    map.on('zoomend', () => {
        currentZoom.value = map.getZoom();
        // Re-dibujar marcadores basado en el nivel de zoom
        if (props.coordinates && props.coordinates.length > 0) {
            addMarkers(props.coordinates);
        }
    });

    try {
        // Llamada al Backend para municipios
        const response = await statsApi.getMunicipiosConConteo();
        
        if (!response.success) {
            return;
        }
        
        // Convertir Strings a JSON real
        const features = response.data.map(str => JSON.parse(str));

        // Cargar GeoJSON con estilos
        L.geoJSON({ type: "FeatureCollection", features: features }, {
            style: style, // Aplicamos la función de color
            onEachFeature: (feature, layer) => {
                // Popup al hacer clic
                const nombre = feature.properties.nombre;
                const total = feature.properties.total_alumnos;
                
                layer.bindPopup(`
                    <div style="text-align:center">
                        <strong>${nombre}</strong><br>
                        <span style="font-size:1.2em">🎓 ${total} Alumnos</span>
                    </div>
                `);
                
                // Efecto Hover (Opcional: Resaltar al pasar el mouse)
                layer.on({
                    mouseover: (e) => {
                        const layer = e.target;
                        layer.setStyle({ weight: 3, color: '#666', fillOpacity: 0.9 });
                    },
                    mouseout: (e) => {
                        // Resetea al estilo original
                        e.target.setStyle(style(feature)); 
                    }
                });
            }
        }).addTo(map);
        
        // Agregar marcadores iniciales si hay coordenadas
        if (props.coordinates && props.coordinates.length > 0) {
            addMarkers(props.coordinates);
        }

    } catch (error) {
        // Error handling
    }
});
</script>

<template>
    <div class="map-container">
        <div id="map"></div>
        <div class="zoom-display">
            <span>Zoom: {{ currentZoom }}</span>
        </div>
        <div class="zoom-indicator" v-if="currentZoom < MIN_ZOOM_FOR_MARKERS">
            <span>🔍 Acerca el mapa (zoom {{ MIN_ZOOM_FOR_MARKERS }}+) para ver los puntos de estudiantes</span>
        </div>
    </div>
</template>

<style scoped>
.map-container {
    position: relative;
    width: 100%;
}

#map {
    height: 80vh;
    width: 100%;
    background-color: #f0f0f0;
}

.zoom-display {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 8px 16px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-size: 0.9rem;
    font-weight: 600;
    color: #2D6849;
    border: 2px solid #2D6849;
}

.zoom-indicator {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.95);
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-size: 0.9rem;
    font-weight: 500;
    color: #2D6849;
    border: 2px solid #2D6849;
}
</style>
