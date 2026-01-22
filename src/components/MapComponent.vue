<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 1. Definimos los colores (Escala de Rojos/Naranjas)
// Ajusté los números a bajitos porque dijiste que hay pocos datos.
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

onMounted(async () => {
    // Inicializar mapa
    const map = L.map('map').setView([17.05, -96.72], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    try {
        // Llamada al Backend
        const response = await fetch('http://localhost:8080/api/mapa/municipios-con-conteo');
        const dataStrings = await response.json();
        
        // Convertir Strings a JSON real
        const features = dataStrings.map(str => JSON.parse(str));

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

    } catch (error) {
        console.error("Error cargando mapa:", error);
    }
});
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    height: 80vh; /* Altura del 80% de la pantalla */
    width: 100%;
    background-color: #f0f0f0;
}
</style>
