import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Utiliza jsPDF para generar el documento y html2canvas para capturar los gráficos
 */
export function usePdfExport() {
  
  /**
   * Exporta todos los gráficos visibles en la página a un PDF
   * Muestra 2 gráficos por página con información de filtros y metadatos
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
      
      // Buscar todos los elementos de gráficos en el DOM actual
      const chartElements = document.querySelectorAll('.chart-card');
      
      if (chartElements.length === 0) {
        throw new Error('No se encontraron gráficos para exportar en la página actual');
      }

      // === OBTENER INFORMACIÓN ADICIONAL DEL FRONTEND ===
      const now = new Date();
      const totalGraphs = chartElements.length;
      const currentUrl = window.location.href;
      const userAgent = navigator.userAgent;
      const screenInfo = `${screen.width}x${screen.height}`;
      
      // Obtener información de la ruta actual
      const pathName = window.location.pathname;
      const sectionName = pathName.includes('datos-demograficos') ? 'Datos Demográficos' :
                         pathName.includes('distribucion-geografica') ? 'Distribución Geográfica' :
                         pathName.includes('formacion-academica') ? 'Formación Académica' :
                         pathName.includes('informacion-socioeconomica') ? 'Información Socioeconómica' :
                         pathName.includes('preguntas-personalizadas') ? 'Preguntas Personalizadas' :
                         'Panel Principal';

      // Obtener información adicional del viewport
      const windowInfo = `${window.innerWidth}x${window.innerHeight}`;
      const language = navigator.language || 'es-ES';
      
      // HEADER DEL DOCUMENTO
      // Título principal
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Reporte de Gráficos - DATA-UNSIS', pageWidth / 2, 30, { align: 'center' });
      
      // Fecha y hora de generación
      const dateStr = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generado el: ${dateStr}`, pageWidth / 2, 40, { align: 'center' });
      
      // Sección actual
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text(`Sección: ${sectionName}`, pageWidth / 2, 48, { align: 'center' });

      // INFORMACIÓN DE METADATOS Y FILTROS
      let currentY = 60;
      
      // Información general
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Información del Reporte:', margin, currentY);
      currentY += 6;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`• Sección actual: ${sectionName}`, margin + 5, currentY);
      currentY += 5;
      pdf.text(`• Total de gráficos: ${totalGraphs}`, margin + 5, currentY);
      currentY += 5;
      pdf.text(`• Resolución: ${screenInfo} (Ventana: ${windowInfo})`, margin + 5, currentY);
      currentY += 5;
      pdf.text(`• Idioma del navegador: ${language}`, margin + 5, currentY);
      currentY += 8;
      
      // Información de filtros si están disponibles
      if (filters) {
        pdf.setFont('helvetica', 'bold');
        pdf.text('Filtros Aplicados:', margin, currentY);
        currentY += 6;
        
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
        currentY += 6;
        pdf.setFont('helvetica', 'italic');
        pdf.text('• Sin filtros específicos aplicados (vista completa)', margin + 5, currentY);
        currentY += 5;
      }

      // Línea separadora
      currentY += 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      // PROCESAMIENTO DE GRÁFICOS
      let graphsInCurrentPage = 0;
      const maxGraphsPerPage = 2;

      for (let i = 0; i < chartElements.length; i++) {
        const chartElement = chartElements[i];
        
        if (graphsInCurrentPage >= maxGraphsPerPage) {
          pdf.addPage();
          currentY = margin;
          graphsInCurrentPage = 0;
        }
        
        try {
          // OBTENER EL TÍTULO DEL GRÁFICO
          const titleElement = chartElement.querySelector('.chart-title');
          const chartTitle = titleElement ? titleElement.textContent.trim() : `Gráfico ${i + 1}`;

          // BUSCAR SOLO EL GRÁFICO (SIN HEADER)
          const chartContainer = chartElement.querySelector('.chart-container') || 
                                chartElement.querySelector('.p-card-content') ||
                                chartElement.querySelector('canvas')?.parentElement ||
                                chartElement;
          
          // CAPTURA DEL GRÁFICO CON HTML2CANVAS 
          const canvas = await html2canvas(chartContainer, {
            scale: 2,
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

          // CÁLCULO DE DIMENSIONES NATURALES PARA EL PDF
          const imgWidth = contentWidth;
          let imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Calcular espacio total necesario para título + imagen + espaciado
          const titleHeight = 12; // Altura del título
          const titleSpacing = 8; // Espaciado después del título
          const imageSpacing = 15; // Espaciado después de la imagen
          const totalContentHeight = titleHeight + titleSpacing + imgHeight + imageSpacing;
          
          // Verificar si TODO el contenido (título + imagen) cabe en la página actual
          const availableSpace = pageHeight - currentY - 40; // Espacio disponible menos margen inferior
          
          // Si no cabe el contenido completo Y no es el primer gráfico de la página, crear nueva página
          if (totalContentHeight > availableSpace && graphsInCurrentPage > 0) {
            pdf.addPage();
            currentY = margin;
            graphsInCurrentPage = 0;
          }
          
          // AGREGAR TÍTULO COMO TEXTO EN EL PDF (UNA SOLA VEZ)
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(0, 0, 0);
          pdf.text(chartTitle, pageWidth / 2, currentY, { align: 'center' });
          currentY += titleHeight;
          
          // AGREGAR IMAGEN AL PDF CON TAMAÑO NATURAL
          pdf.addImage(canvas.toDataURL('image/png', 0.9), 'PNG', margin, currentY, imgWidth, imgHeight);
          
          currentY += imgHeight + imageSpacing; // Espaciado después del gráfico
          graphsInCurrentPage++;

        } catch (error) {
          console.error(`Error al capturar el gráfico ${i + 1}:`, error);
          
          // Agregar mensaje de error en el PDF
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(220, 38, 127);
          pdf.text(`Error al capturar gráfico ${i + 1}: ${error.message}`, margin, currentY);
          pdf.setTextColor(0, 0, 0);
          currentY += 15;
          graphsInCurrentPage++;
        }
      }

      // PIE DE PÁGINA EN TODAS LAS PÁGINAS
      const totalPages = pdf.internal.getNumberOfPages();
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.setPage(pageNum);
        
        // Línea separadora en el pie de página
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
        
        // Información del pie de página
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        
        // Texto izquierdo - Sistema y navegador
        const browserInfo = userAgent.includes('Chrome') ? 'Chrome' : 
                           userAgent.includes('Firefox') ? 'Firefox' : 
                           userAgent.includes('Safari') ? 'Safari' : 'Browser';
        const systemInfo = `DATA-UNSIS | ${browserInfo} | ${screenInfo}`;
        pdf.text(systemInfo, margin, pageHeight - 15);
        
        // Texto centro - Número de página
        const pageText = `Página ${pageNum} de ${totalPages}`;
        pdf.text(pageText, pageWidth / 2, pageHeight - 15, { align: 'center' });
        
        // Texto derecho - Fecha y hora
        const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        pdf.text(`${now.toLocaleDateString('es-ES')} - ${timeStr}`, pageWidth - margin, pageHeight - 15, { align: 'right' });
        
        // Segunda línea del pie de página
        pdf.setTextColor(120, 120, 120);
        const footerText = `Total: ${totalGraphs} gráficos | Reporte generado automáticamente`;
        pdf.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });
      }

      // GENERAR NOMBRE DE ARCHIVO Y DESCARGAR
      const fileName = `reporte_graficos_${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}.pdf`;
      
      // Descargar el PDF
      pdf.save(fileName);
      
      return {
        success: true,
        message: `PDF generado exitosamente con ${chartElements.length} gráficos distribuidos en ${totalPages} páginas`,
        fileName,
        chartsCount: chartElements.length,
        pagesCount: totalPages,
        timestamp: now.toISOString(),
        filtersApplied: filters
      };

    } catch (error) {
      console.error('Error al generar PDF:', error);
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
   * Muestra solo el gráfico con su título, sin filtros
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

      // === HEADER DEL DOCUMENTO ===
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Reporte de Gráfico - DATA-UNSIS', pageWidth / 2, 30, { align: 'center' });

      // Fecha de generación
      const now = new Date();
      const dateStr = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generado el: ${dateStr}`, pageWidth / 2, 40, { align: 'center' });

      // === TÍTULO DEL GRÁFICO ===
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(title, pageWidth / 2, 60, { align: 'center' });

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

      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      pdf.addImage(imgData, 'PNG', margin, 70, imgWidth, imgHeight);

      // Pie de página
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text('DATA-UNSIS - Sistema de Análisis de Datos', pageWidth / 2, pageHeight - 5, { align: 'center' });

      const fileName = `${title.replace(/\s+/g, '_').toLowerCase()}_${now.getTime()}.pdf`;
      pdf.save(fileName);

      return {
        success: true,
        message: 'PDF generado exitosamente',
        fileName
      };

    } catch (error) {
      console.error('Error al generar PDF del gráfico:', error);
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