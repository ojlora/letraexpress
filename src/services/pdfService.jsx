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

// Función para dividir texto en múltiples líneas según el ancho máximo permitido
const dividirTextoEnLineas = (doc, texto, maxAncho, tamañoFuente) => {
    const palabras = texto.split(' ');
    let lineaActual = '';
    const lineas = [];
    doc.setFontSize(tamañoFuente);

    palabras.forEach((palabra) => {
        const nuevaLinea = lineaActual ? `${lineaActual} ${palabra}` : palabra;
        if (doc.getTextWidth(nuevaLinea) <= maxAncho) {
            lineaActual = nuevaLinea;
        } else {
            lineas.push(lineaActual);
            lineaActual = palabra;
        }
    });

    if (lineaActual) {
        lineas.push(lineaActual);
    }

    return lineas;
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

        // Ajustar tamaño de fuente para el campo razón social
        const razonSocial = (rucData.razon_social || '').toUpperCase();
        doc.text(razonSocial, 250, 298);

        // Ajustar tamaño de fuente y dividir el texto para el campo dirección
        const direccion = (rucData.direccion || '').toUpperCase();
        const maxAnchoDireccion = 200; // Ancho máximo permitido
        let tamañoFuenteDireccion = 9; // Tamaño inicial de la fuente
        const lineasDireccion = dividirTextoEnLineas(doc, direccion, maxAnchoDireccion, tamañoFuenteDireccion);

        // Reducir el tamaño de la fuente un 25% si hay dos líneas
        if (lineasDireccion.length > 1) {
            tamañoFuenteDireccion *= 0.75; // Reducir un 25%
            doc.setFontSize(tamañoFuenteDireccion);
        }

        // Calcular la posición inicial para centrar las líneas
        const yBaseDireccion = 315; // Posición inicial para una sola línea
        const alturaLetra = tamañoFuenteDireccion * 1.5; // Altura entre líneas (ajustada según el tamaño de la fuente)
        const yInicioDireccion = yBaseDireccion - (lineasDireccion.length > 1 ? (alturaLetra / 2) : 0);

        // Dibujar las líneas de la dirección
        lineasDireccion.slice(0, 2).forEach((linea, index) => {
            const y = yInicioDireccion + index * alturaLetra;
            doc.text(linea, 248, y);
        });

        // Ajustar tamaño de fuente para el campo distrito
        doc.setFontSize(9);
        const distrito = (rucData.distrito || '').toUpperCase();
        doc.text(distrito, 220, 330);

        // Ajustar tamaño de fuente para el campo departamento
        const departamento = (rucData.departamento || '').toUpperCase();
        doc.text(departamento, 368, 330);

        // Restaurar tamaño de fuente para otros campos
        doc.text(`${(rucData.ruc || '').toUpperCase()}`, 250, 348);
        doc.text(`${(rucData.telefono || '').toUpperCase()}`, 365, 348);

        // Agregar datos de la letra en la primera hoja
        doc.text(`${(letra.letra || '').toUpperCase()}`, 240, 230);
        doc.text(`${(letra.referencia || '').toUpperCase()}`, 322, 230);
        doc.text(formatearFecha(letra.giro).toUpperCase(), 392, 230);
        doc.text(formatearFecha(letra.vencimiento).toUpperCase(), 562, 230);
        doc.text(formatearImporte(letra.importe, letra.moneda).toUpperCase(), 650, 230);

        // Agregar importe en texto
        doc.text(numeroALetras(letra.importe, letra.moneda === 'Soles' ? 'SOLES' : 'DÓLARES').toUpperCase(), 240, 268);

        // Agregar texto "LIMA"
        doc.text('LIMA', 483, 230);

        // Sumar el importe total
        totalImporte += parseFloat(letra.importe);
    });

    // Agregar una nueva página para el resumen
    doc.addPage();

    // Configurar el tamaño de fuente
    doc.setFontSize(12);
    doc.text('RESUMEN DE LETRAS EMITIDAS', 40, 40);

    // Configurar la tabla
    const resumenData = letras.map((letra) => [
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
