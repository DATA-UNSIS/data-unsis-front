// Configuración de iconos offline para Iconify
import { addCollection } from '@iconify/vue'

// ============================================
// ICONOS MDI (Material Design Icons)
// ============================================
const mdiIcons = {
  // Iconos de carreras (Home.vue)
  'office-building': {
    body: '<path fill="currentColor" d="M5 3v18h6v-3.5h2V21h6V3zm2 2h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 13h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 17h2v2H7zm8 0h2v2h-2z"/>',
    width: 24,
    height: 24
  },
  'food-apple': {
    body: '<path fill="currentColor" d="M20 10c0 4.993-4.53 9.5-8 12.5c-3.47-3-8-7.507-8-12.5a8 8 0 0 1 8-8c4.418 0 8 3.582 8 8m-8-6c-3.314 0-6 2.686-6 6c0 3.5 3 7 6 9.5c3-2.5 6-6 6-9.5c0-3.314-2.686-6-6-6m0-4c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2"/>',
    width: 24,
    height: 24
  },
  'account-group': {
    body: '<path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62c.86-1.11 1.28-2.53 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20z"/>',
    width: 24,
    height: 24
  },
  'tooth': {
    body: '<path fill="currentColor" d="M7 2c-1.5 0-3 1-3 3.5C4 8 5.5 11 5.5 14s-1 5.5 1 7c1 .75 2 .25 2.5-1l1-4c.25-1 .5-1 1-1s.75 0 1 1l1 4c.5 1.25 1.5 1.75 2.5 1c2-1.5 1-4 1-7S20 8 20 5.5C20 3 18.5 2 17 2c-1 0-2 .5-2.5 1.5c-.5 1-1.5 1.5-2.5 1.5s-2-.5-2.5-1.5C9 2.5 8 2 7 2"/>',
    width: 24,
    height: 24
  },
  'microscope': {
    body: '<path fill="currentColor" d="M9.46 6.28L11.05 9C8.47 9.26 6.5 11.41 6.5 14A5 5 0 0 0 11.5 19c.55 0 1.09-.09 1.6-.26L14.65 21H2v-2h10.1A5 5 0 0 1 6.5 14c0-2.55 1.9-4.65 4.36-4.97l-.18-.31L7.86 8.5l1-1.73l2.82 1.64L12 9l2.82-1.64l1 1.73zM21.66 8.73l-2.82 1.63L18.5 9.9l-.34.6c1.1 1.22 1.84 2.74 1.84 4.5c0 .65-.09 1.28-.26 1.87l-1.93-1.12A3.48 3.48 0 0 0 15 11.5c0-.73.23-1.41.62-1.97l.34-.59L13.14 7.3l1-1.73l2.82 1.63l.68-1.18l1 1.73l-.68 1.18l2.7 1.57z"/>',
    width: 24,
    height: 24
  },
  'school': {
    body: '<path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9L12 3zm6.82 6L12 12.72L5.18 9L12 5.28L18.82 9zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73v3.72z"/>',
    width: 24,
    height: 24
  },
  'briefcase': {
    body: '<path fill="currentColor" d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2m4 4V4h-4v2h4z"/>',
    width: 24,
    height: 24
  },
  'laptop': {
    body: '<path fill="currentColor" d="M4 6h16v10H4V6m16-2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6v2h4v2H6v-2h4v-2H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h16z"/>',
    width: 24,
    height: 24
  },
  'medical-bag': {
    body: '<path fill="currentColor" d="M10 3L8 5v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V5l-2-2h-4m0 2h4v2h-4V5m1 5h2v3h3v2h-3v3h-2v-3H8v-2h3v-3z"/>',
    width: 24,
    height: 24
  },
  'chart-line': {
    body: '<path fill="currentColor" d="M16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6h-6z"/>',
    width: 24,
    height: 24
  },
  'computer': {
    body: '<path fill="currentColor" d="M4 2a2 2 0 0 0-2 2v11h2V4h16v11h2V4a2 2 0 0 0-2-2H4m4 13a2 2 0 0 0-2 2v1H0v2h24v-2h-6v-1a2 2 0 0 0-2-2H8m0 2h8v1H8v-1z"/>',
    width: 24,
    height: 24
  },
  'heart-pulse': {
    body: '<path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35M16.5 5c-1.22 0-2.38.59-3.13 1.55L12.5 7.7h-1l-.87-1.15A3.95 3.95 0 0 0 7.5 5C5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1l.1-.1c4.76-4.31 7.9-7.16 7.9-10.05c0-2-1.5-3.5-3.5-3.5Z"/>',
    width: 24,
    height: 24
  },
  'stethoscope': {
    body: '<path fill="currentColor" d="M19 8c-.55 0-1 .45-1 1a3.008 3.008 0 0 1-4 2.83V9c0-.64-.05-1.26-.16-1.86c.56-.54.95-1.26 1.08-2.08l.03-.14c.01-.06.02-.12.02-.19l.01-.16V4c0-.26-.11-.5-.28-.69l-.04-.04C14.47 3.1 14.25 3 14 3h-1c-.55 0-1 .45-1 1s.45 1 1 1v.33l-.02.06A1.977 1.977 0 0 1 11 7c-.62 0-1.18-.28-1.55-.73l-.01-.01c-.01-.01-.01-.01-.01-.02L9.41 6.2L9.4 6.16L9.29 6h-.85l-.04.07l-.09.07c-.03.02-.05.05-.07.07a1.975 1.975 0 0 1-1.71 1.04l-.06.05l-.08.01L6 7c-.08.53-.05 1.09.05 1.63A6.01 6.01 0 0 0 11 14v1.17c-.31.11-.58.31-.8.55c-.54.47-.91 1.1-.98 1.84c-.04.21-.03.42 0 .62c.05.34.15.68.34.98c.45.73 1.2 1.21 2.03 1.32c.07.01.13.01.2.02c.06 0 .11.01.17.01c.19 0 .39-.02.58-.06c.52-.08.99-.28 1.38-.59a2.48 2.48 0 0 0 .85-1.27a3.09 3.09 0 0 0-.08-1.57a2.47 2.47 0 0 0-.78-1.12c-.17-.15-.36-.28-.56-.39V14a6 6 0 0 0 6-6c0-1.3-.42-2.5-1.12-3.47c.08-.17.12-.35.12-.53c0-.55-.45-1-1-1m0 2a1 1 0 1 1 0 2a1 1 0 0 1 0-2"/>',
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
  },
  // Iconos adicionales del Sidebar
  'people': {
    body: '<path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62c.86-1.11 1.28-2.53 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20z"/>',
    width: 24,
    height: 24
  },
  'help-circle': {
    body: '<path fill="currentColor" d="M15.07 11.25l-.9.92c-.72.73-1.17 1.33-1.17 2.83h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-2-2a2 2 0 0 0-2 2H8a4 4 0 0 1 4-4a4 4 0 0 1 4 4c0 .88-.36 1.68-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>',
    width: 24,
    height: 24
  },
  'comment-help-outline': {
    body: '<path fill="currentColor" d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2m0 2v13.17L5.17 16H20V4H4m7 9h2v2h-2v-2m2-2h-2c0-3.25 3-3 3-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2H8a4 4 0 0 1 4-4a4 4 0 0 1 4 4c0 2.5-3 2.75-3 5Z"/>',
    width: 24,
    height: 24
  },
  // Iconos de ChartCard
  'chart-bar': {
    body: '<path fill="currentColor" d="M22 21H2V3h2v16h2v-9h4v9h2V6h4v13h2v-5h4v7Z"/>',
    width: 24,
    height: 24
  },
  'table': {
    body: '<path fill="currentColor" d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 4v4h6V8H5m8 0v4h6V8h-6m-8 6v4h6v-4H5m8 0v4h6v-4h-6Z"/>',
    width: 24,
    height: 24
  },
  'file-image-outline': {
    body: '<path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11m-6.5-8.5A1.5 1.5 0 0 1 12 15a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 12a1.5 1.5 0 0 1 1.5 1.5M18 20H6l3-4l1.5 2l2.5-3l5 5Z"/>',
    width: 24,
    height: 24
  },
  'file-delimited-outline': {
    body: '<path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6M6 4h7l5 5v11H6V4m1 7v2h2v-2H7m0 4v2h2v-2H7m8-4v2h2v-2h-2m0 4v2h2v-2h-2m-4-4v2h2v-2h-2m0 4v2h2v-2h-2Z"/>',
    width: 24,
    height: 24
  },
  'download-multiple': {
    body: '<path fill="currentColor" d="M9 1v6H5l7 7l7-7h-4V1H9m-4 9v2h14v-2H5m0 4v2h14v-2H5m0 4v2h14v-2H5Z"/>',
    width: 24,
    height: 24
  },
  'information-outline': {
    body: '<path fill="currentColor" d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2v6Z"/>',
    width: 24,
    height: 24
  },
  'target': {
    body: '<path fill="currentColor" d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8m0 3a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z"/>',
    width: 24,
    height: 24
  },
  'chart-line-variant': {
    body: '<path fill="currentColor" d="M3.5 18.5L2 20l6-6l4 4L21 9v3h2V5h-7v2h3l-7 7l-4-4l-4.5 4.5Z"/>',
    width: 24,
    height: 24
  },
  'lightbulb-outline': {
    body: '<path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1m3-17a5 5 0 0 1 5 5c0 2.05-1.23 3.81-3 4.58V16h-4v-2.42c-1.77-.77-3-2.53-3-4.58a5 5 0 0 1 5-5Z"/>',
    width: 24,
    height: 24
  },
  'eye': {
    body: '<path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/>',
    width: 24,
    height: 24
  },
  'eye-off': {
    body: '<path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS MDI-LIGHT
// ============================================
const mdiLightIcons = {
  'help': {
    body: '<path fill="currentColor" d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 14.5a6.5 6.5 0 1 1 0-13a6.5 6.5 0 0 1 0 13M12 7c-1.657 0-3 1.343-3 3h1.5c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5c0 1.5-2.25 1.313-2.25 3.75h1.5c0-1.688 2.25-1.875 2.25-3.75c0-1.657-1.343-3-3-3m-.75 8.25h1.5v1.5h-1.5z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS MATERIAL SYMBOLS
// ============================================
const materialSymbolsIcons = {
  'left-panel-close-sharp': {
    body: '<path fill="currentColor" d="M3 21V3h18v18zm2-2h4V5H5zm6 0h8V5h-8zm2-6l3-3l-.7-.7l-2.3 2.3V7h-1v5.6l-2.3-2.3l-.7.7z"/>',
    width: 24,
    height: 24
  },
  'left-panel-open-sharp': {
    body: '<path fill="currentColor" d="M3 21V3h18v18zm2-2h4V5H5zm6 0h8V5h-8zm5-6l-3-3l.7-.7l2.3 2.3V7h1v4.6l2.3-2.3l.7.7z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS MATERIAL SYMBOLS LIGHT
// ============================================
const materialSymbolsLightIcons = {
  'hourglass-top-rounded': {
    body: '<path fill="currentColor" d="M8 20h8v-3.5q0-1.7-1.163-2.925T12 12.35q-1.675.225-2.838 1.45T8 16.5zm0-14h8V5H8zm4 7.3q1.3-.2 2.15-1.125T15 10V5q0-.825-.588-1.412T13 3H11q-.825 0-1.412.588T9 5v5q0 1.15.85 2.075T12 13.3M8 21q-.425 0-.712-.288T7 20v-3.5q0-1.725.988-3.112T10.35 11.5q-1.375-.5-2.362-1.887T7 6.5V4q0-.825.588-1.412T9 2h6q.825 0 1.413.588T17 4v2.5q0 1.725-.987 3.113T13.65 11.5q1.375.5 2.363 1.888T17 16.5V20q0 .425-.288.713T16 21z"/>',
    width: 24,
    height: 24
  },
  'download-rounded': {
    body: '<path fill="currentColor" d="m12 15.575l-3.538-3.55l.708-.72L11.5 13.64V5.5h1v8.138l2.33-2.333l.708.72zM5.615 19q-.69 0-1.152-.462T4 17.385v-2.27h1v2.27q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-2.27h1v2.27q0 .69-.462 1.153T18.385 19z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS FA7-REGULAR (Home)
// ============================================
const fa7RegularIcons = {
  'home': {
    body: '<path fill="currentColor" d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.72-.72V21a.75.75 0 0 1-.75.75H6.31a.75.75 0 0 1-.75-.75v-8.13l-.72.72a.75.75 0 0 1-1.06-1.06l8.69-8.69ZM7.06 11.27V20.25h3.19v-4.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v4.5h3.19v-8.98L12 6.33l-4.94 4.94Zm4.69 8.98v-3.75h.5v3.75h-.5Z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS STREAMLINE-PLUMP
// ============================================
const streamlinePlumpIcons = {
  'world-remix': {
    body: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.94-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93m6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS ICON-PARK-OUTLINE
// ============================================
const iconParkOutlineIcons = {
  'bachelor-cap': {
    body: '<path fill="currentColor" d="M2 10.5L12 5l10 5.5l-10 5.5zm2.13 2.14V18l7.87 4l7.87-4v-5.36L12 16.5z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS HUGEICONS
// ============================================
const hugeiconsIcons = {
  'money-bag-02': {
    body: '<path fill="currentColor" d="M12 2c1.1 0 2 .9 2 2v.5c0 .28.22.5.5.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 0 .5-.5V4c0-1.1.9-2 2-2m-7 7c0-1 .5-2 1.5-2.5L8 8l-1 1.5c-.5.75-.5 1.5-.5 2.5v5c0 2.5 2.5 5 5.5 5s5.5-2.5 5.5-5v-5c0-1 0-1.75-.5-2.5L16 8l1.5-1.5c1 .5 1.5 1.5 1.5 2.5v8c0 3.5-3 6.5-7 6.5S5 20.5 5 17z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS BASIL
// ============================================
const basilIcons = {
  'logout-outline': {
    body: '<path fill="currentColor" d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a1 1 0 0 0 0-2H7V5h8a1 1 0 0 0 0-2m5.78 8.38l-2.12-2.12a1 1 0 0 0-1.41 1.41l.71.71H10a1 1 0 0 0 0 2h7.96l-.71.71a1 1 0 0 0 0 1.41a1 1 0 0 0 1.41 0l2.12-2.12a1.49 1.49 0 0 0 0-2Z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// ICONOS LINE-MD (Animados - versiones estáticas)
// ============================================
const lineMdIcons = {
  'facebook': {
    body: '<path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/>',
    width: 24,
    height: 24
  },
  'instagram': {
    body: '<path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/>',
    width: 24,
    height: 24
  },
  'twitter-x': {
    body: '<path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.16 17.52h1.832L7.045 4.126H5.078L17.044 19.77Z"/>',
    width: 24,
    height: 24
  }
}

// ============================================
// REGISTRAR TODAS LAS COLECCIONES
// ============================================

// MDI Icons
addCollection({
  prefix: 'mdi',
  icons: mdiIcons
})

// MDI Light Icons
addCollection({
  prefix: 'mdi-light',
  icons: mdiLightIcons
})

// Material Symbols
addCollection({
  prefix: 'material-symbols',
  icons: materialSymbolsIcons
})

// Material Symbols Light
addCollection({
  prefix: 'material-symbols-light',
  icons: materialSymbolsLightIcons
})

// FA7 Regular
addCollection({
  prefix: 'fa7-regular',
  icons: fa7RegularIcons
})

// Streamline Plump
addCollection({
  prefix: 'streamline-plump',
  icons: streamlinePlumpIcons
})

// Icon Park Outline
addCollection({
  prefix: 'icon-park-outline',
  icons: iconParkOutlineIcons
})

// Hugeicons
addCollection({
  prefix: 'hugeicons',
  icons: hugeiconsIcons
})

// Basil
addCollection({
  prefix: 'basil',
  icons: basilIcons
})

// Line MD
addCollection({
  prefix: 'line-md',
  icons: lineMdIcons
})

export {
  mdiIcons,
  mdiLightIcons,
  materialSymbolsIcons,
  materialSymbolsLightIcons,
  fa7RegularIcons,
  streamlinePlumpIcons,
  iconParkOutlineIcons,
  hugeiconsIcons,
  basilIcons,
  lineMdIcons
}
