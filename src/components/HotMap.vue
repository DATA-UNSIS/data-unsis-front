<template>
  <div class="heatmap-container">
    <canvas 
      ref="canvas" 
      :width="width" 
      :height="height"
      @mousemove="handleMouseAndPan"
      @wheel="handleZoom"
      @mousedown="startPan"
      @mouseup="endPan"
      @mouseleave="endPan"
    ></canvas>
    
    <div class="controls">
      <div class="control-group">
        <label>Intensidad: {{ intensity }}</label>
        <input 
          v-model.number="intensity" 
          type="range" 
          min="0.1" 
          max="3" 
          step="0.1"
          @input="render"
        />
      </div>
      
      <div class="control-group">
        <label>Radio: {{ radius }}</label>
        <input 
          v-model.number="radius" 
          type="range" 
          min="5" 
          max="100" 
          step="5"
          @input="render"
        />
      </div>
      
      <div class="control-group">
        <label>Opacidad: {{ opacity }}</label>
        <input 
          v-model.number="opacity" 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          @input="render"
        />
      </div>
      
      <button @click="resetView" class="btn-reset">
        Resetear Vista
      </button>
      
      <div class="info">
        <small>Puntos: {{ coordinates.length }}</small>
        <small>Zoom: {{ zoom.toFixed(1) }}x</small>
      </div>
    </div>
    
    <div class="legend">
      <div class="legend-title">Intensidad</div>
      <div class="gradient-bar"></div>
      <div class="legend-labels">
        <span>Bajo</span>
        <span>Alto</span>
      </div>
    </div>
    
    <div v-if="tooltip.show" class="tooltip" :style="tooltipStyle">
      {{ tooltip.text }}
    </div>
  </div>
</template>

<script>
// Datos ficticios de coordenadas en Oaxaca
const OAXACA_SAMPLE_DATA = [
  // Centro de Oaxaca de Juárez
  { lat: 17.0654, lng: -96.7236, weight: 5 },
  { lat: 17.0632, lng: -96.7253, weight: 4 },
  { lat: 17.0670, lng: -96.7210, weight: 3 },
  { lat: 17.0645, lng: -96.7265, weight: 6 },
  { lat: 17.0688, lng: -96.7198, weight: 2 },
  
  // Monte Albán (zona arqueológica)
  { lat: 17.0434, lng: -96.7675, weight: 8 },
  { lat: 17.0445, lng: -96.7680, weight: 7 },
  { lat: 17.0428, lng: -96.7665, weight: 6 },
  
  // Zona del Zócalo
  { lat: 17.0639, lng: -96.7257, weight: 9 },
  { lat: 17.0635, lng: -96.7260, weight: 8 },
  { lat: 17.0642, lng: -96.7255, weight: 7 },
  { lat: 17.0638, lng: -96.7262, weight: 8 },
  
  // Barrio de Xochimilco
  { lat: 17.0580, lng: -96.7180, weight: 4 },
  { lat: 17.0590, lng: -96.7175, weight: 3 },
  { lat: 17.0575, lng: -96.7185, weight: 5 },
  
  // Zona norte (hacia Atzompa)
  { lat: 17.0850, lng: -96.7450, weight: 3 },
  { lat: 17.0865, lng: -96.7465, weight: 2 },
  { lat: 17.0880, lng: -96.7440, weight: 4 },
  
  // Carretera a Tlacolula
  { lat: 17.0520, lng: -96.6950, weight: 5 },
  { lat: 17.0535, lng: -96.6920, weight: 4 },
  { lat: 17.0545, lng: -96.6890, weight: 3 },
  
  // San Felipe del Agua
  { lat: 17.0780, lng: -96.7050, weight: 4 },
  { lat: 17.0795, lng: -96.7035, weight: 3 },
  { lat: 17.0810, lng: -96.7020, weight: 5 },
  
  // Zona sur (hacia Santa María Atzompa)
  { lat: 17.0350, lng: -96.7380, weight: 2 },
  { lat: 17.0365, lng: -96.7395, weight: 3 },
  { lat: 17.0340, lng: -96.7365, weight: 2 },
  
  // Dispersión adicional en la ciudad
  { lat: 17.0710, lng: -96.7280, weight: 4 },
  { lat: 17.0695, lng: -96.7295, weight: 3 },
  { lat: 17.0725, lng: -96.7265, weight: 5 },
  { lat: 17.0605, lng: -96.7310, weight: 6 },
  { lat: 17.0620, lng: -96.7295, weight: 4 },
  { lat: 17.0590, lng: -96.7325, weight: 3 },
  { lat: 17.0675, lng: -96.7155, weight: 2 },
  { lat: 17.0660, lng: -96.7170, weight: 4 },
  { lat: 17.0690, lng: -96.7140, weight: 3 },
  { lat: 17.0555, lng: -96.7420, weight: 5 },
  { lat: 17.0570, lng: -96.7435, weight: 4 },
  { lat: 17.0540, lng: -96.7405, weight: 3 },
  
  // Más puntos distribuidos
  { lat: 17.0750, lng: -96.7320, weight: 2 },
  { lat: 17.0735, lng: -96.7305, weight: 3 },
  { lat: 17.0765, lng: -96.7335, weight: 2 },
  { lat: 17.0500, lng: -96.7150, weight: 4 },
  { lat: 17.0485, lng: -96.7135, weight: 3 },
  { lat: 17.0515, lng: -96.7165, weight: 5 },
  { lat: 17.0800, lng: -96.7400, weight: 3 },
  { lat: 17.0815, lng: -96.7385, weight: 4 },
  { lat: 17.0785, lng: -96.7415, weight: 2 },
  
  // Zona de mercados
  { lat: 17.0615, lng: -96.7245, weight: 7 },
  { lat: 17.0625, lng: -96.7240, weight: 6 },
  { lat: 17.0610, lng: -96.7250, weight: 8 },
  
  // Puntos adicionales para densidad
  { lat: 17.0655, lng: -96.7220, weight: 5 },
  { lat: 17.0648, lng: -96.7228, weight: 4 },
  { lat: 17.0662, lng: -96.7212, weight: 6 },
  { lat: 17.0640, lng: -96.7275, weight: 3 },
  { lat: 17.0650, lng: -96.7268, weight: 4 },
  { lat: 17.0630, lng: -96.7282, weight: 5 }
]

export default {
  name: 'HeatmapComponent',
  props: {
    // Array de coordenadas: [{ lat, lng, weight? }, ...] o [{ x, y, weight? }, ...]
    coordinates: {
      type: Array,
      required: false,
      default: () => OAXACA_SAMPLE_DATA
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    },
    // Si usas lat/lng, define los límites del área (por defecto: Oaxaca)
    bounds: {
      type: Object,
      default: () => ({
        minLat: 17.0,
        maxLat: 17.15,
        minLng: -96.85,
        maxLng: -96.65
      })
    }
  },
  data() {
    return {
      intensity: 1,
      radius: 30,
      opacity: 0.7,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      isPanning: false,
      panStartX: 0,
      panStartY: 0,
      tooltip: {
        show: false,
        text: '',
        x: 0,
        y: 0
      },
      gradient: null,
      tileCache: {},
      loadingTiles: new Set()
    }
  },
  computed: {
    tooltipStyle() {
      return {
        left: `${this.tooltip.x}px`,
        top: `${this.tooltip.y}px`
      }
    }
  },
  mounted() {
    this.createGradient()
    this.render()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    createGradient() {
      // Crear un canvas pequeño para el gradiente
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 1
      const ctx = canvas.getContext('2d')
      
      const gradient = ctx.createLinearGradient(0, 0, 256, 0)
      
      // Gradiente de colores (azul -> cyan -> verde -> amarillo -> rojo)
      gradient.addColorStop(0, 'rgba(0, 0, 255, 0)')
      gradient.addColorStop(0.25, 'rgba(0, 255, 255, 0.5)')
      gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.7)')
      gradient.addColorStop(0.75, 'rgba(255, 255, 0, 0.9)')
      gradient.addColorStop(1, 'rgba(255, 0, 0, 1)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 256, 1)
      
      this.gradient = ctx.getImageData(0, 0, 256, 1).data
    },
    
    drawMapTiles(ctx) {
      // Calcular nivel de zoom para tiles (aproximado)
      const tileZoom = Math.floor(Math.log2(this.zoom) + 13)
      const clampedZoom = Math.max(1, Math.min(18, tileZoom))
      
      // Calcular el centro del área visible en coordenadas lat/lng
      const centerLat = (this.bounds.minLat + this.bounds.maxLat) / 2
      const centerLng = (this.bounds.minLng + this.bounds.maxLng) / 2
      
      // Convertir a tile coordinates
      const scale = Math.pow(2, clampedZoom)
      const centerX = ((centerLng + 180) / 360) * scale
      const centerY = ((1 - Math.log(Math.tan(centerLat * Math.PI / 180) + 1 / Math.cos(centerLat * Math.PI / 180)) / Math.PI) / 2) * scale
      
      // Calcular qué tiles necesitamos
      const tileSize = 256
      const viewportTilesX = Math.ceil(this.width / tileSize) + 2
      const viewportTilesY = Math.ceil(this.height / tileSize) + 2
      
      const startTileX = Math.floor(centerX - viewportTilesX / 2)
      const startTileY = Math.floor(centerY - viewportTilesY / 2)
      
      // Dibujar fondo mientras cargan los tiles
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, this.width, this.height)
      
      // Dibujar cada tile
      for (let x = 0; x < viewportTilesX; x++) {
        for (let y = 0; y < viewportTilesY; y++) {
          const tileX = startTileX + x
          const tileY = startTileY + y
          
          // Validar que el tile esté en rango válido
          if (tileX < 0 || tileY < 0 || tileX >= scale || tileY >= scale) continue
          
          const posX = (tileX - centerX) * tileSize + this.width / 2 + this.offsetX
          const posY = (tileY - centerY) * tileSize + this.height / 2 + this.offsetY
          
          this.drawTile(ctx, tileX, tileY, clampedZoom, posX, posY, tileSize)
        }
      }
    },
    
    drawTile(ctx, x, y, zoom, posX, posY, size) {
      const tileKey = `${zoom}/${x}/${y}`
      
      // Si ya está en caché, dibujarlo
      if (this.tileCache[tileKey]) {
        ctx.drawImage(this.tileCache[tileKey], posX, posY, size, size)
        return
      }
      
      // Si ya se está cargando, no hacer nada
      if (this.loadingTiles.has(tileKey)) return
      
      // Cargar el tile
      this.loadingTiles.add(tileKey)
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      // Usar OpenStreetMap tiles
      img.src = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`
      
      img.onload = () => {
        this.tileCache[tileKey] = img
        this.loadingTiles.delete(tileKey)
        this.render()
      }
      
      img.onerror = () => {
        this.loadingTiles.delete(tileKey)
      }
    },
    
    normalizeCoordinates() {
      // Convertir coordenadas lat/lng a x/y si es necesario
      const hasLatLng = this.coordinates.length > 0 && 
                        ('lat' in this.coordinates[0] || 'lng' in this.coordinates[0])
      
      if (!hasLatLng) {
        // Ya son coordenadas x/y
        return this.coordinates.map(coord => ({
          x: coord.x,
          y: coord.y,
          weight: coord.weight || 1
        }))
      }
      
      // Convertir lat/lng a coordenadas del canvas
      const { minLat, maxLat, minLng, maxLng } = this.bounds
      
      return this.coordinates.map(coord => {
        const x = ((coord.lng - minLng) / (maxLng - minLng)) * this.width
        const y = ((maxLat - coord.lat) / (maxLat - minLat)) * this.height
        return {
          x: x,
          y: y,
          weight: coord.weight || 1
        }
      })
    },
    
    render() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      
      // Limpiar canvas
      ctx.clearRect(0, 0, this.width, this.height)
      
      // Dibujar mapa de fondo (tiles de OpenStreetMap)
      this.drawMapTiles(ctx)
      
      // Crear canvas temporal para el mapa de calor
      const heatCanvas = document.createElement('canvas')
      heatCanvas.width = this.width
      heatCanvas.height = this.height
      const heatCtx = heatCanvas.getContext('2d')
      
      const normalizedCoords = this.normalizeCoordinates()
      
      // Dibujar cada punto con gradiente radial
      normalizedCoords.forEach(coord => {
        const x = coord.x * this.zoom + this.offsetX
        const y = coord.y * this.zoom + this.offsetY
        
        // Skip si está fuera del canvas
        if (x < -this.radius || x > this.width + this.radius ||
            y < -this.radius || y > this.height + this.radius) {
          return
        }
        
        const gradient = heatCtx.createRadialGradient(x, y, 0, x, y, this.radius * this.zoom)
        const alpha = Math.min(1, (coord.weight * this.intensity) / 2)
        
        gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        heatCtx.fillStyle = gradient
        heatCtx.fillRect(
          x - this.radius * this.zoom,
          y - this.radius * this.zoom,
          this.radius * 2 * this.zoom,
          this.radius * 2 * this.zoom
        )
      })
      
      // Obtener datos de imagen y aplicar gradiente de color
      const imageData = heatCtx.getImageData(0, 0, this.width, this.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]
        if (alpha > 0) {
          const colorIndex = Math.min(255, Math.floor(alpha * this.intensity))
          const gradientIndex = colorIndex * 4
          
          data[i] = this.gradient[gradientIndex]       // R
          data[i + 1] = this.gradient[gradientIndex + 1] // G
          data[i + 2] = this.gradient[gradientIndex + 2] // B
          data[i + 3] = alpha * this.opacity * 255      // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
      
      this.$emit('rendered', { zoom: this.zoom, offset: { x: this.offsetX, y: this.offsetY } })
    },
    
    handleZoom(e) {
      e.preventDefault()
      
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      const newZoom = Math.max(0.5, Math.min(5, this.zoom * delta))
      
      // Zoom hacia el cursor
      const rect = this.$refs.canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const zoomChange = newZoom / this.zoom
      this.offsetX = mouseX - (mouseX - this.offsetX) * zoomChange
      this.offsetY = mouseY - (mouseY - this.offsetY) * zoomChange
      
      this.zoom = newZoom
      this.render()
    },
    
    startPan(e) {
      this.isPanning = true
      this.panStartX = e.clientX - this.offsetX
      this.panStartY = e.clientY - this.offsetY
      this.$refs.canvas.style.cursor = 'grabbing'
    },
    
    handleMouseAndPan(e) {
      // Manejar pan si está activo
      if (this.isPanning) {
        this.offsetX = e.clientX - this.panStartX
        this.offsetY = e.clientY - this.panStartY
        this.render()
        return
      }
      
      // Manejar tooltip
      const rect = this.$refs.canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Encontrar puntos cercanos
      const normalizedCoords = this.normalizeCoordinates()
      const nearby = normalizedCoords.filter(coord => {
        const dx = (coord.x * this.zoom + this.offsetX) - x
        const dy = (coord.y * this.zoom + this.offsetY) - y
        return Math.sqrt(dx * dx + dy * dy) < this.radius
      })
      
      if (nearby.length > 0) {
        this.tooltip.show = true
        this.tooltip.text = `${nearby.length} punto${nearby.length > 1 ? 's' : ''}`
        this.tooltip.x = e.clientX - rect.left + 10
        this.tooltip.y = e.clientY - rect.top - 30
      } else {
        this.tooltip.show = false
      }
    },
    
    endPan() {
      this.isPanning = false
      this.$refs.canvas.style.cursor = 'grab'
    },
    
    resetView() {
      this.zoom = 1
      this.offsetX = 0
      this.offsetY = 0
      this.render()
    },
    
    handleResize() {
      this.$nextTick(() => {
        this.render()
      })
    }
  },
  watch: {
    coordinates: {
      handler() {
        this.$nextTick(() => {
          this.render()
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.heatmap-container {
  position: relative;
  display: inline-block;
  user-select: none;
}

canvas {
  border: 1px solid #ddd;
  cursor: grab;
  display: block;
}

.controls {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  min-width: 200px;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.control-group input[type="range"] {
  width: 100%;
  cursor: pointer;
}

.btn-reset {
  width: 100%;
  padding: 8px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
  transition: background 0.3s;
}

.btn-reset:hover {
  background: #45a049;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.info small {
  color: #666;
  font-size: 12px;
}

.legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  min-width: 150px;
}

.legend-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.gradient-bar {
  height: 20px;
  background: linear-gradient(to right, 
    rgba(0, 0, 255, 0.5),
    rgba(0, 255, 255, 0.7),
    rgba(0, 255, 0, 0.8),
    rgba(255, 255, 0, 0.9),
    rgba(255, 0, 0, 1)
  );
  border-radius: 4px;
  margin-bottom: 5px;
}

.legend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #666;
}

.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1000;
}
</style>