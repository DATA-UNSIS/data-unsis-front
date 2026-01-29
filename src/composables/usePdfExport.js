import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import graficasPosibles from '../views/content/graficasPosibles.js';

/**
 * Utiliza jsPDF para generar el documento y html2canvas para capturar los gráficos
 */
export function usePdfExport() {
  
  /**
   * Obtiene la información descriptiva de un gráfico desde graficasPosibles.js
   * @param {string} chartTitle - Título del gráfico
   * @returns {Object|null} - Objeto con Purpose, Interpretation, Application o null
   */
  const getChartInfo = (chartTitle) => {
    const allGraphics = Object.values(graficasPosibles);
    
    for (const category of allGraphics) {
      for (const [key, value] of Object.entries(category)) {
        if (value.title && value.title.toLowerCase() === chartTitle.toLowerCase()) {
          return {
            purpose: value.Purpose || null,
            interpretation: value.Interpretation || null,
            application: value.Application || null
          };
        }
      }
    }
    return null;
  };
  
  /**
   * Convierte una imagen a base64
   * @param {string} url - URL de la imagen
   * @returns {Promise<string>} - Imagen en base64
   */
  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  /**
   * Agrega el encabezado con logo de UNSIS y nombre de la universidad
   * @param {jsPDF} pdf - Instancia de jsPDF
   * @param {number} pageWidth - Ancho de la página
   * @param {string} logoBase64 - Logo en base64
   */
  const addPageHeader = (pdf, pageWidth, logoBase64) => {
    const logoSize = 25; // Logo más grande
    const margin = 10;
    
    // Logo en esquina superior izquierda
    if (logoBase64) {
      pdf.addImage(logoBase64, 'PNG', margin, margin-5, logoSize, logoSize);
    }
    
    // Nombre de la universidad centrado
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 51, 102); // Azul institucional
    pdf.text('Universidad de la Sierra Sur', pageWidth / 2, margin + 10, { align: 'center' });
    
    // Subtítulo centrado
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    pdf.text('Sistema de Análisis de Datos - DATA-UNSIS', pageWidth / 2, margin + 17, { align: 'center' });
    
    // Línea decorativa
    pdf.setDrawColor(0, 51, 102);
    pdf.setLineWidth(0.5);
    pdf.line(margin, margin + 22, pageWidth - margin, margin + 22);
  };

  /**
   * Agrega el pie de página sin logo
   * @param {jsPDF} pdf - Instancia de jsPDF
   * @param {number} pageWidth - Ancho de la página
   * @param {number} pageHeight - Alto de la página
   * @param {string} logoBase64 - Logo en base64
   * @param {number} pageNum - Número de página
   * @param {number} totalPages - Total de páginas
   * @param {Date} now - Fecha actual
   */
  const addPageFooter = (pdf, pageWidth, pageHeight, logoBase64, pageNum, totalPages, now) => {
    const margin = 10;
    
    // Información del pie de página
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    
    // Número de página centrado
    const pageText = `Página ${pageNum} de ${totalPages}`;
    pdf.text(pageText, pageWidth / 2, pageHeight - 15, { align: 'center' });
    
    // Fecha en el centro inferior
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    pdf.text(`${now.toLocaleDateString('es-ES')} - ${timeStr}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  };

  /**
   * Exporta todos los gráficos visibles en la página a un PDF
   * Cada gráfico ocupa una página completa con su nombre y detalles
   * @param {Object} filters - Filtros aplicados actualmente (carreras, semestres, etc.)
   * @returns {Object} - Resultado de la operación con éxito/error y nombre del archivo
   */
  const exportChartsToPDF = async (filters = null) => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Configuración de dimensiones de la página
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Cargar logo de la UNSIS
      let logoBase64 = null;
      try {
        logoBase64 = await getBase64Image('/src/assets/unsis-logo.png');
      } catch (error) {
        console.warn('No se pudo cargar el logo:', error);
      }
      
      // Buscar todos los elementos de gráficos en el DOM actual
      const chartElements = document.querySelectorAll('.chart-card');
      
      if (chartElements.length === 0) {
        throw new Error('No se encontraron gráficos para exportar en la página actual');
      }

      // === OBTENER INFORMACIÓN ADICIONAL DEL FRONTEND ===
      const now = new Date();
      const totalGraphs = chartElements.length;
      
      // Obtener información de la ruta actual
      const pathName = window.location.pathname;
      const sectionName = pathName.includes('datos-demograficos') ? 'Datos Demográficos' :
                         pathName.includes('distribucion-geografica') ? 'Distribución Geográfica' :
                         pathName.includes('formacion-academica') ? 'Formación Académica' :
                         pathName.includes('informacion-socioeconomica') ? 'Información Socioeconómica' :
                         pathName.includes('preguntas-personalizadas') ? 'Preguntas Personalizadas' :
                         'Panel Principal';
      
      // === PÁGINA DE PORTADA CON INFORMACIÓN ===
      addPageHeader(pdf, pageWidth, logoBase64);
      
      let currentY = 50;
      
      // Título principal del reporte
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 51, 102);
      pdf.text('Reporte de Análisis de Datos', pageWidth / 2, currentY, { align: 'center' });
      
      currentY += 15;
      
      // Fecha y hora de generación
      const dateStr = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Fecha de generación: ${dateStr}`, pageWidth / 2, currentY, { align: 'center' });
      
      currentY += 10;
      
      // Sección actual
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 51, 102);
      pdf.text(`Sección: ${sectionName}`, pageWidth / 2, currentY, { align: 'center' });

      // INFORMACIÓN DE METADATOS Y FILTROS
      currentY = 85;
      
      // Información general
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Resumen del Reporte:', margin, currentY);
      currentY += 7;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`• Total de gráficos incluidos: ${totalGraphs}`, margin + 5, currentY);
      currentY += 6;
      pdf.text(`• Sección analizada: ${sectionName}`, margin + 5, currentY);
      currentY += 10;
      
      // Información de filtros si están disponibles
      if (filters) {
        pdf.setFont('helvetica', 'bold');
        pdf.text('Filtros Aplicados:', margin, currentY);
        currentY += 7;
        
        pdf.setFont('helvetica', 'normal');
        
        if (filters.carreras && filters.carreras.length > 0) {
          const carrerasText = `• Carreras seleccionadas (${filters.carreras.length}): ${filters.carreras.join(', ')}`;
          const carrerasLines = pdf.splitTextToSize(carrerasText, contentWidth);
          pdf.text(carrerasLines, margin + 5, currentY);
          currentY += carrerasLines.length * 5;
        } else {
          pdf.text('• Carreras: Todas las carreras incluidas', margin + 5, currentY);
          currentY += 5;
        }
        
        if (filters.semestres && filters.semestres.length > 0) {
          const semestresText = `• Semestres seleccionados (${filters.semestres.length}): ${filters.semestres.join(', ')}`;
          const semestresLines = pdf.splitTextToSize(semestresText, contentWidth);
          pdf.text(semestresLines, margin + 5, currentY);
          currentY += semestresLines.length * 5;
        } else {
          pdf.text('• Semestres: Todos los semestres incluidos', margin + 5, currentY);
          currentY += 5;
        }
        
        if (filters.sexo) {
          pdf.text(`• Filtro por género: ${filters.sexo}`, margin + 5, currentY);
          currentY += 5;
        } else {
          pdf.text('• Género: Sin filtro aplicado (todos los géneros)', margin + 5, currentY);
          currentY += 5;
        }
      } else {
        pdf.setFont('helvetica', 'bold');
        pdf.text('Filtros Aplicados:', margin, currentY);
        currentY += 7;
        pdf.setFont('helvetica', 'italic');
        pdf.text('• Sin filtros específicos (vista completa de datos)', margin + 5, currentY);
        currentY += 5;
      }

      // Agregar pie de página a la portada
      addPageFooter(pdf, pageWidth, pageHeight, logoBase64, 1, totalGraphs + 1, now);

      // PROCESAMIENTO DE GRÁFICOS - CADA GRÁFICO EN SU PROPIA PÁGINA
      for (let i = 0; i < chartElements.length; i++) {
        const chartElement = chartElements[i];
        
        // Crear nueva página para cada gráfico
        pdf.addPage();
        
        // Agregar encabezado con logos en la nueva página
        addPageHeader(pdf, pageWidth, logoBase64);
        
        currentY = 45;
        
        try {
          // OBTENER EL TÍTULO DEL GRÁFICO
          const titleElement = chartElement.querySelector('.chart-title');
          const chartTitle = titleElement ? titleElement.textContent.trim() : `Gráfico ${i + 1}`;

          // TÍTULO DEL GRÁFICO - DESTACADO Y CENTRADO
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(0, 51, 102);
          pdf.text(chartTitle, pageWidth / 2, currentY, { align: 'center' });
          currentY += 10;
          
          // Número de gráfico
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(100, 100, 100);
          pdf.text(`Gráfico ${i + 1} de ${totalGraphs}`, pageWidth / 2, currentY, { align: 'center' });
          currentY += 12;

          // OBTENER INFORMACIÓN DESCRIPTIVA DEL GRÁFICO
          const chartInfo = getChartInfo(chartTitle);
          if (chartInfo) {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(0, 51, 102);
            
            // Propósito
            if (chartInfo.purpose) {
              pdf.text('Propósito:', margin, currentY);
              currentY += 5;
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(60, 60, 60);
              const purposeLines = pdf.splitTextToSize(chartInfo.purpose, contentWidth - 4);
              pdf.text(purposeLines, margin + 2, currentY);
              currentY += purposeLines.length * 4 + 3;
            }
            
            // Interpretación
            if (chartInfo.interpretation) {
              pdf.setFont('helvetica', 'bold');
              pdf.setTextColor(0, 51, 102);
              pdf.text('Interpretación:', margin, currentY);
              currentY += 5;
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(60, 60, 60);
              const interpretationLines = pdf.splitTextToSize(chartInfo.interpretation, contentWidth - 4);
              pdf.text(interpretationLines, margin + 2, currentY);
              currentY += interpretationLines.length * 4 + 3;
            }
            
            // Aplicación
            if (chartInfo.application) {
              pdf.setFont('helvetica', 'bold');
              pdf.setTextColor(0, 51, 102);
              pdf.text('Aplicación:', margin, currentY);
              currentY += 5;
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(60, 60, 60);
              const applicationLines = pdf.splitTextToSize(chartInfo.application, contentWidth - 4);
              pdf.text(applicationLines, margin + 2, currentY);
              currentY += applicationLines.length * 4 + 5;
            }
          }

          // BUSCAR SOLO EL GRÁFICO (SIN HEADER)
          const chartContainer = chartElement.querySelector('.chart-container') || 
                                chartElement.querySelector('.p-card-content') ||
                                chartElement.querySelector('canvas')?.parentElement ||
                                chartElement;
          
          // CAPTURA DEL GRÁFICO CON HTML2CANVAS - ALTA CALIDAD
          const canvas = await html2canvas(chartContainer, {
            scale: 2.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: chartContainer.offsetWidth,
            height: chartContainer.offsetHeight,
            onclone: (clonedDoc) => {
              const clonedElement = clonedDoc.querySelector('.chart-container') || 
                                   clonedDoc.querySelector('.p-card-content') ||
                                   clonedDoc.body.querySelector('canvas')?.parentElement;
              if (clonedElement) {
                clonedElement.style.transform = 'none';
                clonedElement.style.perspective = 'none';
                clonedElement.style.backfaceVisibility = 'visible';
                // Ocultar elementos que no queremos capturar
                const headerElements = clonedElement.querySelectorAll('.chart-header, .chart-footer, .chart-controls');
                headerElements.forEach(el => el.style.display = 'none');
              }
            }
          });

          // CÁLCULO DE DIMENSIONES PARA MAXIMIZAR EL ESPACIO DISPONIBLE
          const availableHeight = pageHeight - currentY - 40; // Espacio disponible hasta el pie de página
          const imgWidth = contentWidth;
          let imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Si la imagen es muy alta, ajustarla al espacio disponible
          if (imgHeight > availableHeight) {
            imgHeight = availableHeight;
          }
          
          // AGREGAR IMAGEN AL PDF CENTRADA
          const imgX = margin;
          pdf.addImage(canvas.toDataURL('image/png', 0.95), 'PNG', imgX, currentY, imgWidth, imgHeight);
          
          // Agregar pie de página con logos
          addPageFooter(pdf, pageWidth, pageHeight, logoBase64, i + 2, totalGraphs + 1, now);

        } catch (error) {
          // Agregar mensaje de error en el PDF
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(200, 50, 50);
          pdf.text(`Error al capturar el gráfico ${i + 1}`, pageWidth / 2, currentY, { align: 'center' });
          currentY += 10;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(150, 50, 50);
          pdf.text(`Detalles: ${error.message}`, pageWidth / 2, currentY, { align: 'center' });
          
          // Agregar pie de página incluso en páginas con error
          addPageFooter(pdf, pageWidth, pageHeight, logoBase64, i + 2, totalGraphs + 1, now);
        }
      }

      // GENERAR NOMBRE DE ARCHIVO Y DESCARGAR
      const totalPages = pdf.internal.getNumberOfPages();
      const fileName = `reporte_unsis_${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}.pdf`;
      
      // Descargar el PDF
      pdf.save(fileName);
      
      return {
        success: true,
        message: `PDF generado exitosamente con ${chartElements.length} gráficos en ${totalPages} páginas`,
        fileName,
        chartsCount: chartElements.length,
        pagesCount: totalPages,
        timestamp: now.toISOString(),
        filtersApplied: filters
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error desconocido al generar el PDF',
        fileName: null,
        chartsCount: 0
      };
    }
  };

  /**
   * Exporta un gráfico individual a PDF
   * Muestra el gráfico en una página completa con su título y logos
   * @param {HTMLElement} chartElement - Elemento DOM del gráfico a exportar
   * @param {string} title - Título del gráfico
   * @returns {Object} - Resultado de la operación
   */
  const exportSingleChartToPDF = async (chartElement, title = 'Gráfico') => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Cargar logo de la UNSIS
      let logoBase64 = null;
      try {
        logoBase64 = await getBase64Image('/src/assets/unsis-logo.png');
      } catch (error) {
        console.warn('No se pudo cargar el logo:', error);
      }

      // === ENCABEZADO CON LOGOS ===
      addPageHeader(pdf, pageWidth, logoBase64);

      const now = new Date();
      let currentY = 50;
      
      // Fecha de generación
      const dateStr = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generado: ${dateStr}`, pageWidth / 2, currentY, { align: 'center' });
      
      currentY += 15;

      // === TÍTULO DEL GRÁFICO ===
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 51, 102);
      pdf.text(title, pageWidth / 2, currentY, { align: 'center' });
      
      currentY += 15;

      // OBTENER INFORMACIÓN DESCRIPTIVA DEL GRÁFICO
      const chartInfo = getChartInfo(title);
      if (chartInfo) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 51, 102);
        
        // Propósito
        if (chartInfo.purpose) {
          pdf.text('Propósito:', margin, currentY);
          currentY += 5;
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(60, 60, 60);
          const purposeLines = pdf.splitTextToSize(chartInfo.purpose, contentWidth - 4);
          pdf.text(purposeLines, margin + 2, currentY);
          currentY += purposeLines.length * 4 + 3;
        }
        
        // Interpretación
        if (chartInfo.interpretation) {
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(0, 51, 102);
          pdf.text('Interpretación:', margin, currentY);
          currentY += 5;
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(60, 60, 60);
          const interpretationLines = pdf.splitTextToSize(chartInfo.interpretation, contentWidth - 4);
          pdf.text(interpretationLines, margin + 2, currentY);
          currentY += interpretationLines.length * 4 + 3;
        }
        
        // Aplicación
        if (chartInfo.application) {
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(0, 51, 102);
          pdf.text('Aplicación:', margin, currentY);
          currentY += 5;
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(60, 60, 60);
          const applicationLines = pdf.splitTextToSize(chartInfo.application, contentWidth - 4);
          pdf.text(applicationLines, margin + 2, currentY);
          currentY += applicationLines.length * 4 + 5;
        }
      }

      // BUSCAR SOLO EL GRÁFICO (SIN HEADER)
      const chartContainer = chartElement.querySelector('.chart-container') || 
                             chartElement.querySelector('.p-card-content') ||
                             chartElement.querySelector('canvas')?.parentElement ||
                             chartElement;

      // Capturar gráfico con mayor calidad para exportación individual
      const canvas = await html2canvas(chartContainer, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('.chart-container') || 
                               clonedDoc.querySelector('.p-card-content') ||
                               clonedDoc.body.querySelector('canvas')?.parentElement;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.perspective = 'none';
            clonedElement.style.backfaceVisibility = 'visible';
            // Ocultar elementos que no queremos capturar
            const headerElements = clonedElement.querySelectorAll('.chart-header, .chart-footer, .chart-controls');
            headerElements.forEach(el => el.style.display = 'none');
          }
        }
      });

      // Calcular dimensiones optimizadas
      const availableHeight = pageHeight - currentY - 40;
      const imgWidth = contentWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Ajustar si es muy alto
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
      }
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);

      // Pie de página con logos
      addPageFooter(pdf, pageWidth, pageHeight, logoBase64, 1, 1, now);

      const fileName = `grafico_unsis_${title.replace(/\s+/g, '_').toLowerCase()}_${now.getTime()}.pdf`;
      pdf.save(fileName);

      return {
        success: true,
        message: 'PDF generado exitosamente',
        fileName
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al generar el PDF',
        fileName: null
      };
    }
  };

  return {
    exportChartsToPDF,
    exportSingleChartToPDF
  };
}