import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generarPDF = (letras, rucData) => {
    const doc = new jsPDF();

    // Agregar datos del RUC al PDF
    doc.setFontSize(12);
    doc.text('Datos del RUC', 14, 20);
    doc.text(`RUC: ${rucData.ruc || ''}`, 14, 30);
    doc.text(`Razón Social: ${rucData.razon_social || ''}`, 14, 40);
    doc.text(`Dirección: ${rucData.direccion || ''}`, 14, 50);
    doc.text(`Ubigeo: ${rucData.ubigeo || ''}`, 14, 60);
    doc.text(`Estado: ${rucData.estado || ''}`, 14, 70);
    doc.text(`Condición: ${rucData.condicion || ''}`, 14, 80);
    doc.text(`Departamento: ${rucData.departamento || ''}`, 14, 90);
    doc.text(`Provincia: ${rucData.provincia || ''}`, 14, 100);
    doc.text(`Distrito: ${rucData.distrito || ''}`, 14, 110);

    // Espacio para la tabla
    const startY = 120;

    // Agregar tabla de letras
    const tableColumn = ["Letra", "Referencia", "Giro", "Vencimiento", "Moneda", "Importe"];
    const tableRows = [];

    letras.forEach((letra) => {
        const letraData = [
            letra.letra,
            letra.referencia,
            letra.giro,
            letra.vencimiento,
            letra.moneda,
            `${letra.moneda === 'Soles' ? 'S/' : 'US$'} ${letra.importe}`
        ];
        tableRows.push(letraData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
    });

    doc.save(`letras_${new Date().toLocaleDateString()}.pdf`);
};
