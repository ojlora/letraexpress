import $ from 'jquery';

export function fetchRucData(ruc, token, onSuccess, onError) {
    $.ajax({
        method: "GET",
        url: `http://letraexpress.crearte.com.pe/api.php?ruc=${ruc}&token=${token}`,
        dataType: "json",
        success: function (respuesta) {
            if (respuesta !== 'error') {
                onSuccess(respuesta);
            } else {
                onError('Error: El RUC no es válido o la API devolvió un error.');
            }
        },
        error: function (xhr, status, error) {
            onError(`Error al obtener los datos: ${error}`);
        }
    });
}
