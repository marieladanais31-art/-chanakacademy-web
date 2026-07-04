<?php
declare(strict_types=1);

ini_set('display_errors', '0');

function respond_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_value($value): string
{
    if (is_bool($value)) {
        return $value ? 'Si' : 'No';
    }

    if (is_array($value)) {
        $value = implode(', ', array_map('clean_value', $value));
    }

    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? $value;
    return substr($value, 0, 4000);
}

function first_value(array $data, array $keys): string
{
    foreach ($keys as $key) {
        if (isset($data[$key]) && clean_value($data[$key]) !== '') {
            return clean_value($data[$key]);
        }
    }

    return '';
}

function contains_any(string $text, array $needles): bool
{
    foreach ($needles as $needle) {
        if (strpos($text, $needle) !== false) {
            return true;
        }
    }

    return false;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    respond_json(204, ['ok' => true]);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond_json(200, [
        'ok' => true,
        'success' => true,
        'message' => 'Endpoint activo para formularios Chanak.'
    ]);
}

$raw = file_get_contents('php://input') ?: '';
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$data = [];

if (stripos($contentType, 'application/json') !== false && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
} else {
    $data = $_POST;
    if (!$data && $raw !== '') {
        parse_str($raw, $parsed);
        if (is_array($parsed)) {
            $data = $parsed;
        }
    }
}

if (!is_array($data) || !$data) {
    respond_json(422, [
        'ok' => false,
        'success' => false,
        'message' => 'No se recibieron datos del formulario.'
    ]);
}

$honeypot = first_value($data, ['website', 'url', 'company_website']);
if ($honeypot !== '') {
    respond_json(200, [
        'ok' => true,
        'success' => true,
        'message' => 'Solicitud recibida.'
    ]);
}

$email = first_value($data, ['email', 'guardianEmail', 'correo', 'mail']);
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond_json(422, [
        'ok' => false,
        'success' => false,
        'message' => 'Por favor indica un email valido.'
    ]);
}

$name = first_value($data, [
    'nombre',
    'nombre_padre',
    'guardianFullName',
    'guardianName',
    'name',
    'studentFullName'
]);

$sourceParts = [
    $_SERVER['REQUEST_URI'] ?? '',
    first_value($data, ['programa', 'program', 'origen', 'origin', 'intent', 'necesidad', 'route'])
];
$source = strtolower(implode(' ', $sourceParts));

$routes = [
    'offcampus' => [
        'email' => 'offcampus@chanakacademy.org',
        'label' => 'Off-Campus / solicitud general'
    ],
    'dual' => [
        'email' => 'dualdiploma@chanakacademy.org',
        'label' => 'Dual Diploma'
    ],
    'hub' => [
        'email' => 'rededucativa@asociacioneducafe.org',
        'label' => 'Alianzas / Red educativa'
    ],
    'diagnostico' => [
        'email' => 'offcampus@chanakacademy.org',
        'label' => 'Diagnostico academico'
    ],
];

$route = 'offcampus';
if (contains_any($source, ['hub', 'alianza', 'iglesia', 'rededucativa'])) {
    $route = 'hub';
} elseif (contains_any($source, ['diagnostico', 'diagnostic', 'evaluacion'])) {
    $route = 'diagnostico';
} elseif (contains_any($source, ['dual', 'panama', 'panamá', 'send-enrollment', 'send-info-request', 'brevo-lead'])) {
    $route = 'dual';
}

$to = $routes[$route]['email'];
$label = $routes[$route]['label'];
$subjectText = 'Nueva solicitud web - ' . $label;
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$fromEmail = 'offcampus@chanakacademy.org';

$lines = [
    'Nueva solicitud recibida desde chanakacademy.org',
    'Fecha: ' . date('Y-m-d H:i:s T'),
    'Destino interno: ' . $label,
    'Ruta solicitada: ' . ($_SERVER['REQUEST_URI'] ?? ''),
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? ''),
    '',
    'DATOS DEL FORMULARIO',
];

foreach ($data as $key => $value) {
    if (in_array($key, ['website', 'url', 'company_website'], true)) {
        continue;
    }

    $cleanKey = clean_value($key);
    $cleanValue = clean_value($value);

    if ($cleanValue === '') {
        continue;
    }

    $lines[] = $cleanKey . ': ' . $cleanValue;
}

$body = implode("\n", $lines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Chanak Academy <' . $fromEmail . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond_json(500, [
        'ok' => false,
        'success' => false,
        'message' => 'No se pudo enviar el formulario. Por favor escribe directamente a ' . $to . '.'
    ]);
}

respond_json(200, [
    'ok' => true,
    'success' => true,
    'message' => 'Solicitud recibida.'
]);
