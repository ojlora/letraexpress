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

        // Ajustar tamaño de fuente para el campo razón social
        const razonSocial = (rucData.razon_social || '').toUpperCase();
        doc.text(razonSocial, 250, 298);

        // Ajustar tamaño de fuente para el campo dirección
        const direccion = (rucData.direccion || '').toUpperCase();
        let tamañoFuenteDireccion = 9; // Tamaño inicial de la fuente
        const maxAnchoDireccion = doc.getTextWidth(razonSocial); // Usar el ancho del campo razón social como referencia

        // Reducir el tamaño de la fuente si el texto no entra en el ancho máximo
        while (doc.getTextWidth(direccion) > maxAnchoDireccion && tamañoFuenteDireccion > 6.75) { // Reducir hasta un 25%
            tamañoFuenteDireccion -= 0.25;
            doc.setFontSize(tamañoFuenteDireccion);
        }

        // Dibujar la dirección en la posición correspondiente
        doc.text(direccion, 250, 315);

        // Restaurar tamaño de fuente para el resto de campos
        doc.setFontSize(9);

        // Ajustar tamaño de fuente para el campo distrito
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
