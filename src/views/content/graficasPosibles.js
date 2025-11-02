const Demografic_Grafics = {
    MAJOR_DISTRIBUTION: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "pie", 
        title: "Distribución por carreras", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        Purpose: "Muestra la distribución de estudiantes matriculados en cada carrera de la UNSIS, permitiendo identificar las carreras con mayor demanda.",
        Interpretation: "Cada elemento representa una carrera y su valor indica la cantidad o porcentaje de estudiantes inscritos. Una distribución equilibrada sugiere diversidad educativa.",
        Application: "Si Licenciatura en Enfermería concentra el 60% de la matrícula, se pueden asignar más recursos a esta carrera y promover las demás para equilibrar la oferta educativa."
    },
    SEX_DISTRIBUTION: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "Distribución por sexo", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Representa la composición de género del alumnado de la UNSIS, ayudando a diseñar políticas de equidad de género.",
        Interpretation: "Los valores muestran la proporción de hombres y mujeres matriculados. Una distribución equilibrada estaría cerca del 50%-50%.",
        Application: "Si en Licenciatura en Informática hay 80% hombres y 20% mujeres, se pueden implementar campañas de promoción dirigidas a mujeres para fomentar su participación en áreas."
    },
    CIVIL_STATE: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "doughnut", 
        title: "Distribución por estado civil", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Muestra el estado civil de los estudiantes, permitiendo entender sus responsabilidades familiares y adaptar servicios educativos.",
        Interpretation: "Las categorías incluyen soltero, casado, unión libre, divorciado, etc. Valores altos en casados indican estudiantes con responsabilidades familiares.",
        Application: "Un alto porcentaje de estudiantes casados puede indicar la necesidad de horarios flexibles, modalidades en línea o servicios de guardería en la universidad."
    },
    SEMESTER_DISTRIBUTION: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "Distribución por semestre", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Visualiza la cantidad de estudiantes en cada semestre académico, identificando tasas de retención y deserción estudiantil.",
        Interpretation: "Una disminución progresiva entre semestres indica deserción. Los 'cuellos de botella' se ven como caídas bruscas en semestres específicos.",
        Application: "Si el tercer semestre tiene significativamente menos estudiantes que el primero, indica deserción temprana que debe investigarse mediante programas de tutorías."
    },
    AGE_DISTRIBUTION: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "line", 
        title: "Distribución por edad", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Presenta los rangos de edad de los estudiantes, permitiendo diseñar estrategias pedagógicas apropiadas para cada grupo etario.",
        Interpretation: "Los rangos típicos van de 18-22 años (estudiantes tradicionales) y 23+ años (no tradicionales). La concentración en cada rango indica el perfil demográfico.",
        Application: "Si hay muchos estudiantes mayores de 25 años, se pueden ofrecer modalidades más flexibles, horarios nocturnos o programas de nivelación."
    }
}

const Geografic_Distribution = {
    STATE_DISTRIBUTION: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "pie", 
        title: "Distribución por estado", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Indica la procedencia geográfica de los estudiantes por estado de la República Mexicana, mostrando el alcance regional de la institución.",
        Interpretation: "Los valores muestran qué estados aportan más estudiantes. Alta concentración en un estado indica carácter regional; diversidad sugiere alcance nacional.",
        Application: "Si el 90% son de Oaxaca y solo 10% de otros estados, se pueden crear becas o residencias para atraer estudiantes foráneos y diversificar la comunidad."
    },
    MUNICIPALITY_DISTRIBUTION: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "Distribución por municipio", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Muestra la cantidad de estudiantes provenientes de cada municipio del estado, proporcionando información detallada sobre la procedencia local.",
        Interpretation: "Los municipios con mayor representación tienen valores más altos. La distribución indica el radio de influencia geográfica de la universidad.",
        Application: "Si muchos estudiantes vienen de municipios alejados, se puede establecer un sistema de transporte colectivo o considerar residencias estudiantiles."
    }
}

const Academic_Formation = {
    //ACADEMIC_FORMATION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "doughnut", title: "Nivel de formación académica", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    TYPE_INSTITUTION_PROCEDENCY: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "Tipo de institución de procedencia", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Identifica el subsistema educativo de bachillerato del cual provienen los estudiantes (COBACH, DGETI, IEBO, CECyTE, etc.).",
        Interpretation: "Cada elemento representa un tipo de institución y su valor indica cuántos estudiantes provienen de cada subsistema educativo.",
        Application: "Si muchos estudiantes vienen de bachilleratos técnicos, se puede diseñar un curso propedéutico que refuerce conocimientos teóricos necesarios para el nivel universitario."
    }
}

const Socioeconomic_Information = {
    ECONOMIC_LEVEL: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "pie", 
        title: "Nivel de ingresos", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Presenta el nivel socioeconómico de los estudiantes según el ingreso familiar mensual, información fundamental para diseñar programas de apoyo económico.",
        Interpretation: "Los valores muestran la distribución por rangos de ingreso familiar. Valores altos en ingresos bajos indican necesidad de apoyo financiero.",
        Application: "Si el 70% tiene ingresos menores a 5,000 pesos mensuales, se justifica ampliar el programa de becas y crear fondos de emergencia."
    },
    SCHOLARSHIPS_REQUESTED: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "Becas solicitadas", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Muestra la cantidad de solicitudes de cada tipo de beca disponible (Benito Juárez, Elisa Acuña, institucional, alimenticia, etc.).",
        Interpretation: "Los valores más altos indican los tipos de beca con mayor demanda. La comparación entre tipos revela las necesidades prioritarias de apoyo.",
        Application: "Si la beca de alimentación tiene muchas más solicitudes que cupos disponibles, se puede ampliar el comedor o negociar convenios con establecimientos locales."
    },
    HOUSEHOLD_SERVICES: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "line", 
        title: "Servicios básicos del hogar", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Indica los servicios básicos con los que cuentan los estudiantes en sus hogares (agua potable, electricidad, drenaje, internet, etc.).",
        Interpretation: "Los valores más altos representan servicios con mayor cobertura. Valores bajos indican servicios con acceso limitado que requieren atención.",
        Application: "Si muchos no tienen internet en casa, la universidad debe garantizar acceso a salas de cómputo con horarios extendidos y materiales descargables sin conexión."
    }
}

const Personalizated_Questions = {
    TRANSPORT_MEDIUM: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "¿Cuál es tu principal medio de transporte para llegar a la universidad?", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Visualiza los medios de transporte que utilizan los estudiantes para trasladarse (transporte público, automóvil propio, bicicleta, a pie, etc.).",
        Interpretation: "Los valores más altos representan los medios más utilizados. La diversidad en medios indica diferentes necesidades de movilidad estudiantil.",
        Application: "Si muchos usan transporte público de larga distancia, se pueden negociar descuentos especiales o ajustar horarios de clases para coincidir con rutas disponibles."
    },
    //EXTRACURRICULAR_ACTIVITY: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "¿Qué actividad extracurricular te interesa más?", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    HOMEWORK_DEVICES: {
        possibleGrafics: ["pie", "doughnut","bar", "line"], 
        type: "bar", 
        title: "¿Qué dispositivo utilizas para hacer tus tareas?", 
        backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
        borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        Purpose: "Muestra los dispositivos tecnológicos para actividades académicas (computadora de escritorio, laptop, tablet, smartphone, etc.).",
        Interpretation: "Los valores indican qué dispositivos son más comunes. Alta dependencia de smartphones sugiere limitaciones tecnológicas que deben atenderse.",
        Application: "Si la mayoría solo tiene smartphone, las plataformas deben optimizarse para móviles, y considerar préstamo de laptops para software especializado."
    }
}
export default {
    Demografic_Grafics,
    Geografic_Distribution,
    Academic_Formation,
    Socioeconomic_Information,
    Personalizated_Questions,
    
};

