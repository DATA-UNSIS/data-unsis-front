const  Demografic_Grafics = {
    MAJOR_DISTRIBUTION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "pie", title: "Distribucion por carreras", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    SEX_DISTRIBUTION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "Distribucion por sexo", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    CIVIL_STATE: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "doughnut", title: "Distribucion por estado civil", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    SEMESTER_DISTRIBUTION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "Distribucion por semestre", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    AGE_DISTRIBUTION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "line", title: "Distribucion por edad", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
}

const  Geografic_Distribution = {
    STATE_DISTRIBUTION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "pie", title: "Distribucion por estado", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    MUNICIPALITY_DISTRIBUTION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "Distribucion por municipio", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
}

const Academic_Formation = {
    //ACADEMIC_FORMATION: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "doughnut", title: "Nivel de formación académica", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    TYPE_INSTITUTION_PROCEDENCY: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "Tipo de institución de procedencia", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
}

const Socioeconomic_Information = {
    ECONOMIC_LEVEL: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "pie", title: "Nivel de ingresos", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    SCHOLARSHIPS_REQUESTED: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "Becas solicitadas", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    HOUSEHOLD_SERVICES: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "line", title: "Servicios básicos del hogar", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
}

const Personalizated_Questions = {
    TRANSPORT_MEDIUM: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "¿Cuál es tu principal medio de transporte para llegar a la universidad?", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    EXTRACURRICULAR_ACTIVITY: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "¿Qué actividad extracurricular te interesa más?", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] },
    HOMEWORK_DEVICES: {possibleGrafics: ["pie", "doughnut","bar", "line"], type: "bar", title: "¿Qué dispositivo utilizas para hacer tus tareas?", backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], borderColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
}

/*
Lista de graficos que estaran disponibles
Graficos demograficos{
    MAJOR_DISTRIBUTION: Graficos que muestra cuantos alumnos hay en cada carrera
    SEX_DISTRIBUTION: Graficos que muestra la distribucion de alumnos por sexo
    CIVIL_STATE: Graficos que muestra la distribucion de alumnos por estado civil
    SEMESTER_DISTRIBUTION: Graficos que muestra la distribucion de alumnos por semestre
    AGE_DISTRIBUTION: Graficos que muestra la distribucion de alumnos por edad
}
Distribucion_Geografica{
    STATE_DISTRIBUTION: Graficos que muestra la distribucion de alumnos por estado
    MUNICIPALITY_DISTRIBUTION: Graficos que muestra la distribucion de alumnos por municipio
}
Formacion_Academica{
    TYPE_INSTITUTION_PROCEDENCY: Grafico que muestra el subsistema educativo del cual provienen los alumnos
}

Informacion_Socioeconomica{
    ECONOMIC_LEVEL: Grafico que muestra el nivel de ingresos de los alumnos
    SCHOLARSHIPS_REQUESTED: Grafico que muestra la cantidad de solicitudes de cada una de las becas
    HOUSEHOLD_SERVICES: Grafico que muestra los servicios con los que cuentan los alumnos
    FAMILY_HOUSE: Grafica que dice la cantidad de alumnos que viven en casa propia, rentada, prestada o viaja diariamente
}

Preguntas personalizadas{
    TRANSPORT_MEDIUM: Grafico que muestra el medio de transporte utilizado por los alumnos
    HOMEWORK_DEVICES: Grafico que muestra los medios de apoyo para estudiar en casa
}
*/
// Exportar caracteristicas de cada una de las graficas
export default {
    Demografic_Grafics,
    Geografic_Distribution,
    Academic_Formation,
    Socioeconomic_Information,
    Personalizated_Questions,
    
};

