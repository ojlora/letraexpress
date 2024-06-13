<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$token = "47c41ee6abf123efed099d536963a80d"; // Reemplaza esto con tu token
$ruc = isset($_REQUEST['ruc']) ? $_REQUEST['ruc'] : '';

if (!$ruc) {
    echo json_encode('error');
    exit;
}

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://api.apifacturacion.com/ruc/'.$ruc,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => array('token' => $token),
    CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_CAINFO => dirname(__FILE__)."/cacert.pem" // Comentar si sube a un hosting
    // para ejecutar los procesos de forma local en windows
    // enlace de descarga del cacert.pem https://curl.haxx.se/docs/caextract.html
));

$response = curl_exec($curl);

if (curl_errno($curl)) {
    echo json_encode('error');
    curl_close($curl);
    exit;
}

curl_close($curl);

$empresa = json_decode($response);

if (isset($empresa->ruc)) {
    $datos = array(
        'ruc' => $empresa->ruc,
        'razon_social' => $empresa->razon_social,
        'estado' => $empresa->estado,
        'condicion' => $empresa->condicion,
        'direccion' => $empresa->direccion,
        'ubigeo' => $empresa->ubigeo,
        'departamento' => $empresa->departamento,
        'provincia' => $empresa->provincia,
        'distrito' => $empresa->distrito
    );
    echo json_encode($datos);
} else {
    echo json_encode('error');
}
?>
