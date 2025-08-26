// EJEMPLO DE ENDPOINT PARA EL BACKEND SPRING BOOT
// Este archivo es solo de referencia - debes implementarlo en tu proyecto Spring Boot

/*
CONTROLADOR JAVA PARA SPRING BOOT:

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:5173") // Permitir CORS para Vite
public class StatsController {
    
    @PostMapping("/chart-data")
    public ResponseEntity<?> getChartData(@RequestBody Map<String, Object> filters) {
        try {
            System.out.println("Filtros recibidos: " + filters);
            
            // Extraer los filtros enviados desde el frontend
            Map<String, Object> tipoGrafico = (Map<String, Object>) filters.get("tipoGrafico");
            List<String> carreras = (List<String>) filters.get("carreras");
            List<String> semestres = (List<String>) filters.get("semestres");
            String sexo = (String) filters.get("sexo");
            
            String chartType = (String) tipoGrafico.get("code");
            
            // Crear respuesta de ejemplo basada en el tipo de gráfico
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Datos obtenidos exitosamente");
            response.put("filters", filters);
            
            // Datos de ejemplo según el tipo de gráfico
            switch (chartType) {
                case "carrera":
                    response.put("data", Arrays.asList(
                        Map.of("label", "Ingeniería de Sistemas", "value", 45),
                        Map.of("label", "Medicina", "value", 30),
                        Map.of("label", "Derecho", "value", 25)
                    ));
                    break;
                    
                case "socioeconomico":
                    response.put("data", Arrays.asList(
                        Map.of("label", "Alto", "value", 20),
                        Map.of("label", "Medio", "value", 50),
                        Map.of("label", "Bajo", "value", 30)
                    ));
                    break;
                    
                case "becas":
                    response.put("data", Arrays.asList(
                        Map.of("label", "Beca Completa", "value", 15),
                        Map.of("label", "Beca Parcial", "value", 35),
                        Map.of("label", "Sin Beca", "value", 50)
                    ));
                    break;
                    
                default:
                    response.put("data", Arrays.asList(
                        Map.of("label", "Dato 1", "value", 40),
                        Map.of("label", "Dato 2", "value", 60)
                    ));
                    break;
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Error interno del servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}

DEPENDENCIAS MAVEN NECESARIAS:

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

CONFIGURACIÓN CORS (opcional, alternativa):

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

*/

// ESTRUCTURA ESPERADA DEL REQUEST JSON QUE LLEGA AL BACKEND:
const ejemploRequestJson = {
  tipoGrafico: {
    name: "Distribución por Carrera",
    code: "carrera", 
    type: "pie"
  },
  carreras: ["IS", "MED"], // Códigos de las carreras seleccionadas
  semestres: ["1", "2", "3"], // Códigos de los semestres seleccionados  
  sexo: "M" // Código del sexo seleccionado o null
}

// ESTRUCTURA ESPERADA DE LA RESPUESTA JSON DEL BACKEND:
const ejemploResponseJson = {
  success: true,
  message: "Datos obtenidos exitosamente",
  filters: ejemploRequestJson, // Los filtros que se enviaron
  data: [
    {
      label: "Ingeniería de Sistemas",
      value: 45
    },
    {
      label: "Medicina", 
      value: 30
    },
    {
      label: "Derecho",
      value: 25
    }
  ]
}

export { ejemploRequestJson, ejemploResponseJson }
