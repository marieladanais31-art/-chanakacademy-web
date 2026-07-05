<?php
/* Sonda TEMPORAL de diagnóstico Brevo — solo booleanos, nunca expone la clave.
   Se elimina tras la verificación. */
declare(strict_types=1);
header('Content-Type: application/json; charset=UTF-8');

$dir  = __DIR__ . '/_private';
$file = $dir . '/brevo-key.php';
$out  = [
    'private_dir_existe' => is_dir($dir),
    'key_file_existe'    => is_file($file),
    'key_formato_ok'     => false,
    'key_valida_en_brevo'=> null,
    'leads_csv_existe'   => is_file($dir . '/leads.csv'),
    'leads_csv_lineas'   => is_file($dir . '/leads.csv') ? count(file($dir . '/leads.csv')) : 0,
    'archivos_private'   => is_dir($dir) ? array_values(array_diff(scandir($dir), ['.', '..'])) : [],
    'curl_disponible'    => function_exists('curl_init'),
];

if ($out['key_file_existe']) {
    $key = @include $file;
    $out['key_formato_ok'] = is_string($key) && strpos(trim($key), 'xkeysib-') === 0;
    if ($out['key_formato_ok'] && $out['curl_disponible']) {
        $ch = curl_init('https://api.brevo.com/v3/account');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => ['accept: application/json', 'api-key: ' . trim($key)],
        ]);
        $body   = (string) curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);
        $out['key_valida_en_brevo'] = ($status === 200);
        $out['brevo_http'] = $status;
        // Motivo exacto que devuelve Brevo (sin exponer la clave)
        $decoded = json_decode($body, true);
        $out['brevo_mensaje'] = is_array($decoded) ? ($decoded['message'] ?? $decoded['code'] ?? null) : substr($body, 0, 120);
        $out['key_longitud'] = strlen(trim((string) $key));
    }
}

echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
