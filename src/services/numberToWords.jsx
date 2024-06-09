const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const centenas = ['cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

const convert = (n) => {
    if (n < 10) return unidades[n];
    if (n < 100) return decenas[Math.floor(n / 10) - 1] + (n % 10 ? ' y ' + unidades[n % 10] : '');
    if (n < 1000) return centenas[Math.floor(n / 100) - 1] + (n % 100 ? ' ' + convert(n % 100) : '');
    if (n < 1000000) return convert(Math.floor(n / 1000)) + ' mil ' + (n % 1000 ? convert(n % 1000) : '');
    return 'Número muy grande';
};

export const numeroALetras = (num, moneda) => {
    const entero = Math.floor(num);
    const decimal = Math.round((num - entero) * 100);

    const letras = `${convert(entero)} y ${decimal}/100 ${moneda}`.toUpperCase();
    return letras;
};
