import jsPDF from 'jspdf';
import 'jspdf-autotable';
import templateImage from '../assets/template_letra_mm.png';
import { numeroALetras } from './numberToWords';

// Función para formatear la fecha en DD/MM/AAAA
const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

// Función para formatear el importe con comas en los millares
const formatearImporte = (importe, moneda) => {
    const formattedImporte = parseFloat(importe).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${moneda === 'Soles' ? 'S/' : 'US$'} ${formattedImporte}`;
};

export const generarPDFs = (letras, rucData) => {
    const doc = new jsPDF('landscape', 'pt', 'a4', true);
    let totalImporte = 0;

    letras.forEach((letra, index) => {
        if (index > 0) {
            doc.addPage();
        }

        // Agregar la imagen de fondo de la hoja correspondiente
        doc.addImage(templateImage, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

        // Configurar el tamaño de fuente
        doc.setFontSize(9);

        // Agregar datos del RUC al PDF en las coordenadas específicas de la primera hoja
        doc.text(`${(rucData.ruc || '').toUpperCase()}`, 250, 348); // Coordenadas x, y ajustadas
        doc.text(`${(rucData.razon_social || '').toUpperCase()}`, 250, 298); // Ajusta según la plantilla
        doc.text(`${(rucData.direccion || '').toUpperCase()}`, 250, 315);
        doc.text(`${(rucData.distrito || '').toUpperCase()}`, 230, 330);
        doc.text(`${(rucData.provincia || '').toUpperCase()}`, 280, 330);
        doc.text(`${(rucData.departamento || '').toUpperCase()}`, 365, 330);
        doc.text(`${(rucData.telefono || '').toUpperCase()}`, 365, 348); // Coordenadas para el teléfono

        // Agregar datos de la letra en la primera hoja
        doc.text(`${(letra.letra || '').toUpperCase()}`, 240, 230); // Ajusta según la plantilla
        doc.text(`${(letra.referencia || '').toUpperCase()}`, 322, 230);
        doc.text(formatearFecha(letra.giro).toUpperCase(), 392, 230); // Formato de fecha
        doc.text(formatearFecha(letra.vencimiento).toUpperCase(), 562, 230); // Formato de fecha
        doc.text(formatearImporte(letra.importe, letra.moneda).toUpperCase(), 650, 230); // Importe con moneda

        // Agregar importe en texto
        doc.text(numeroALetras(letra.importe, letra.moneda === 'Soles' ? 'SOLES' : 'DÓLARES').toUpperCase(), 240, 268); // Ajusta según la plantilla

        // Agregar texto "LIMA"
        doc.text('LIMA', 483, 230); // Ajusta las coordenadas según sea necesario

        // Sumar el importe total
        totalImporte += parseFloat(letra.importe);
    });

    // Agregar una nueva página para el resumen
    doc.addPage();
    
    // Configurar el tamaño de fuente
    doc.setFontSize(12);
    doc.text('RESUMEN DE LETRAS EMITIDAS', 40, 40);

    // Configurar la tabla
    const resumenData = letras.map((letra, index) => [
        (letra.letra || '').toUpperCase(),
        (rucData.razon_social || '').toUpperCase(),
        (rucData.ruc || '').toUpperCase(),
        formatearFecha(letra.giro).toUpperCase(),
        formatearFecha(letra.vencimiento).toUpperCase(),
        formatearImporte(letra.importe, letra.moneda).toUpperCase()
    ]);

    doc.autoTable({
        head: [['LETRA', 'RAZÓN SOCIAL', 'RUC', 'EMISION', 'VENCIMIENTO', 'IMPORTE']],
        body: resumenData,
        startY: 60,
        theme: 'grid'
    });

    // Agregar el importe total al final de la tabla
    doc.setFontSize(10);
    doc.text(`TOTAL: ${formatearImporte(totalImporte.toString(), letras[0].moneda).toUpperCase()}`, 40, doc.autoTable.previous.finalY + 20);

    // Guardar el PDF con el nombre de la razón social y RUC
    const fileName = `${(rucData.razon_social || 'Documento').toUpperCase()} ${(rucData.ruc || '').toUpperCase()}.pdf`;
    doc.save(fileName);
};
