const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const especiales = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const centenas = ['cien', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

const convert = (n) => {
    if (n < 10) return unidades[n];
    if (n >= 11 && n <= 19) return especiales[n - 11];
    if (n >= 10 && n < 20) return decenas[0];
    if (n < 30) return decenas[1] + (n % 10 ? ' y ' + unidades[n % 10] : ''); // veinte y uno, veinte y dos, etc.
    if (n < 100) return decenas[Math.floor(n / 10) - 1] + (n % 10 ? ' y ' + unidades[n % 10] : '');
    if (n < 200) return centenas[1] + (n % 100 ? ' ' + convert(n % 100) : '');
    if (n < 1000) return centenas[Math.floor(n / 100)] + (n % 100 ? ' ' + convert(n % 100) : '');
    if (n < 1000000) {
        const miles = Math.floor(n / 1000);
        const resto = n % 1000;
        let milesTexto = convert(miles);
        if (miles === 1) {
            milesTexto = 'un';
        }
        return milesTexto + ' mil ' + (resto ? convert(resto) : '');
    }
    return 'Número muy grande';
};

export const numeroALetras = (num, moneda) => {
    const entero = Math.floor(num);
    const decimal = Math.round((num - entero) * 100);

    // Verificar si es un número entero (sin decimales)
    const decimalTexto = decimal === 0 ? '00/100' : `${decimal.toString().padStart(2, '0')}/100`;

    // Construir el texto completo
    const letras = `${convert(entero)} y ${decimalTexto} ${moneda}`.toUpperCase();
    return letras;
};
