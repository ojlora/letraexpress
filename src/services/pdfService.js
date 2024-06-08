import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generarPDF = (letras) => {
    const doc = new jsPDF();
    const tableColumn = ["Letra", "Referencia", "Giro", "Vencimiento", "Moneda", "Importe"];
    const tableRows = [];

    letras.forEach((letra, index) => {
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

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`letras_${new Date().toLocaleDateString()}.pdf`);
};
