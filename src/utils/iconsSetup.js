// Configuración de iconos offline para Iconify
import { addCollection } from '@iconify/vue'

// Iconos MDI que usamos en la aplicación
const mdiIcons = {
  'office-building': {
    body: '<path fill="currentColor" d="M3 2h10v20H3V2zm2 18h6V4H5v16zm2-14h2v2H7V6zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm6-16h10v20H13V2zm2 18h6V4h-6v16zm2-14h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>',
    width: 24,
    height: 24
  },
  'food-apple': {
    body: '<path fill="currentColor" d="M20.5 10.5c0-4.5-3.5-8-8-8s-8 3.5-8 8c0 4.5 3.5 8 8 8s8-3.5 8-8zm-8-6c3.5 0 6 2.5 6 6s-2.5 6-6 6-6-2.5-6-6 2.5-6 6-6z"/>',
    width: 24,
    height: 24
  },
  'account-group': {
    body: '<path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62c.86-1.11 1.28-2.53 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20z"/>',
    width: 24,
    height: 24
  },
  'tooth': {
    body: '<path fill="currentColor" d="M12 2c3 0 6 3 6 6c0 4-3 8-6 14c-3-6-6-10-6-14c0-3 3-6 6-6z"/>',
    width: 24,
    height: 24
  },
  'microscope': {
    body: '<path fill="currentColor" d="M9.5 3A1.5 1.5 0 0 0 8 4.5v15A1.5 1.5 0 0 0 9.5 21h5a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 14.5 3h-5z"/>',
    width: 24,
    height: 24
  },
  'school': {
    body: '<path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9L12 3zm6.82 6L12 12.72L5.18 9L12 5.28L18.82 9zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73v3.72z"/>',
    width: 24,
    height: 24
  },
  'briefcase': {
    body: '<path fill="currentColor" d="M10 2v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4V2h-4zm2 2h4v2h-4V2z"/>',
    width: 24,
    height: 24
  },
  'laptop': {
    body: '<path fill="currentColor" d="M4 6v10h16V6H4zm16-2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16zm-1 12H5V7h14v9z"/>',
    width: 24,
    height: 24
  },
  'medical-bag': {
    body: '<path fill="currentColor" d="M8 2v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2H8zm2 2h4v2h-4V2zm3 6v3h3v2h-3v3h-2v-3H8v-2h3V8h2z"/>',
    width: 24,
    height: 24
  },
  'chart-line': {
    body: '<path fill="currentColor" d="M16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6h-6z"/>',
    width: 24,
    height: 24
  },
  'computer': {
    body: '<path fill="currentColor" d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6v2H9v2h6v-2h-3v-2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm0 2h12v10H6V4z"/>',
    width: 24,
    height: 24
  },
  'heart-pulse': {
    body: '<path fill="currentColor" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3zm-3.77 15.24L12 19.1l-.73-.86C5.8 13.72 4 11.69 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 3.19-1.8 5.22-7.27 9.74z"/>',
    width: 24,
    height: 24
  },
  'stethoscope': {
    body: '<path fill="currentColor" d="M12.28 11A8.49 8.49 0 0 1 8.5 13C5.46 13 3 10.54 3 7.5S5.46 2 8.5 2s5.5 2.46 5.5 5.5c0 1.28-.44 2.46-1.18 3.39l1.18 1.18A8.49 8.49 0 0 1 15.5 11c2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.68 0-3.12-1.03-3.71-2.5H10c-1.1 0-2-.9-2-2V12h.28c.61.59 1.42 1 2.33 1h1.67z"/>',
    width: 24,
    height: 24
  },
  'school-outline': {
    body: '<path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9L12 3zm6.82 6L12 12.72L5.18 9L12 5.28L18.82 9zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73v3.72z"/>',
    width: 24,
    height: 24
  },
  'loading': {
    body: '<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"/>',
    width: 24,
    height: 24
  },
  'alert-circle': {
    body: '<path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>',
    width: 24,
    height: 24
  }
}

// Agregar la colección MDI a Iconify para uso offline
addCollection({
  prefix: 'mdi',
  icons: mdiIcons
})

// También cargar algunos iconos adicionales que usa el sidebar
const additionalIcons = {
  'home': {
    body: '<path fill="currentColor" d="M12 3l-9 8h2v8h6v-6h2v6h6v-8h2l-9-8z"/>',
    width: 24,
    height: 24
  },
  'people': {
    body: '<path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62c.86-1.11 1.28-2.53 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20z"/>',
    width: 24,
    height: 24
  },
  'help-circle': {
    body: '<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.13-9.38c1.26 0 2.25.56 2.25 1.81c0 .94-.52 1.56-1.17 2.19c-.52.5-.85.94-.85 1.69h-2c0-1.33.52-2.19 1.17-2.75c.52-.44.85-.81.85-1.19c0-.19-.13-.31-.31-.31c-.33 0-.56.25-.56.56H9.5c0-1.06.88-1.81 2.13-1.81z"/>',
    width: 24,
    height: 24
  },
  'head-question-outline': {
    body: '<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.13-9.38c1.26 0 2.25.56 2.25 1.81c0 .94-.52 1.56-1.17 2.19c-.52.5-.85.94-.85 1.69h-2c0-1.33.52-2.19 1.17-2.75c.52-.44.85-.81.85-1.19c0-.19-.13-.31-.31-.31c-.33 0-.56.25-.56.56H9.5c0-1.06.88-1.81 2.13-1.81z"/>',
    width: 24,
    height: 24
  }
}

// Agregar iconos adicionales con diferentes prefijos
addCollection({
  prefix: 'fa7-regular',
  icons: { home: additionalIcons.home }
})

addCollection({
  prefix: 'mdi',
  icons: {
    ...mdiIcons,
    people: additionalIcons.people,
    'help-circle': additionalIcons['help-circle'],
    'head-question-outline': additionalIcons['head-question-outline']
  }
})

export { mdiIcons, additionalIcons }