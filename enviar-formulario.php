<?php
declare(strict_types=1);

/**
 * Receptor único de formularios de chanakacademy.org (Hostinger).
 *
 * Garantía de no-pérdida: el lead se escribe PRIMERO en /_private/leads.csv
 * y DESPUÉS se intentan los correos. Si el envío falla, la respuesta al
 * usuario sigue siendo de éxito y el fallo queda en /_private/mail-errors.log.
 *
 * Envío: si existe /_private/brevo-key.php (devuelve la API key de Brevo),
 * se envía por la API de Brevo (mejor entregabilidad, el dominio recibe en
 * Google Workspace). Si no, se usa mail() de Hostinger.
 *
 * PLAN B si mail() de Hostinger da problemas de entregabilidad y no se quiere
 * usar Brevo: Web3Forms (https://web3forms.com) — endpoint POST con access_key,
 * sin backend propio. Sustituir send_email() por una llamada a su API.
 */

ini_set('display_errors', '0');

/* ══════════════════════════════════════════════════════════════════
   CONFIGURACIÓN EDITABLE
   ══════════════════════════════════════════════════════════════════ */

$CONFIG = [
    'from_email'       => 'offcampus@chanakacademy.org',
    'from_name'        => 'Chanak International Academy',
    'site_url'         => 'https://www.chanakacademy.org',
    'whatsapp_link'    => 'https://wa.me/34624703272',
    'whatsapp_display' => '+34 624 70 32 72',
    // Enrutamiento por producto. 'to' admite varios buzones.
    // 'brevo_list' = ID de la lista de contactos en Brevo para ese producto.
    'routes' => [
        'offcampus'   => ['to' => ['offcampus@chanakacademy.org'],   'label' => 'OFF-CAMPUS',          'landing' => '/off-campus/',  'brevo_list' => 3],
        'dual'        => ['to' => ['dualdiploma@chanakacademy.org'], 'label' => 'DUAL DIPLOMA',        'landing' => '/dual-diploma/', 'brevo_list' => 4],
        // CONFIRMADO por Mariela (2026-07-04): diagnóstico va a offcampus@.
        'diagnostico' => ['to' => ['offcampus@chanakacademy.org'],   'label' => 'DIAGNOSTICO',         'landing' => '/diagnostico/', 'brevo_list' => 5],
        'general'     => ['to' => ['offcampus@chanakacademy.org', 'dualdiploma@chanakacademy.org'], 'label' => 'INFO GENERAL', 'landing' => '/', 'brevo_list' => 6],
        // Ruta heredada por si llega tráfico antiguo de alianzas/iglesias.
        // Sin lista propia en Brevo: va a la lista General (6).
        'hub'         => ['to' => ['rededucativa@asociacioneducafe.org'], 'label' => 'ALIANZAS 2027', 'landing' => '/alianzas/', 'brevo_list' => 6],
    ],
    // Lista Brevo "Chanak | Newsletter": se añade ADEMÁS de la lista del
    // producto cuando el formulario trae opt-in de newsletter.
    'brevo_newsletter_list' => 7,
];

/* Autorespuesta al solicitante, por producto. Placeholders: {nombre},
   {landing}, {whatsapp}, {whatsapp_display}. Texto plano. */
$AUTOREPLY = [
    'offcampus' => [
        'subject' => 'Hemos recibido tu solicitud · Off-Campus | Chanak Academy',
        'body' => "Hola {nombre},\n\n"
            . "¡Gracias por tu interés en el programa Off-Campus de Chanak International Academy!\n\n"
            . "Qué pasará ahora:\n"
            . "· En las próximas 24 horas (días laborables) una persona de nuestro equipo te contactará personalmente.\n"
            . "· Revisaremos contigo la situación de tu hijo/a y resolveremos todas tus dudas.\n\n"
            . "Mientras tanto:\n"
            . "· Programa completo: {landing}\n"
            . "· ¿Prefieres hablar ya? WhatsApp {whatsapp_display}: {whatsapp}\n\n"
            . "Un saludo,\nEquipo Chanak International Academy\n\n"
            . "Colegio privado americano · FLDOE #134620 (registro verificable públicamente) · IRS 501(c)(3)\n"
            . "Al finalizar sus estudios, el estudiante obtiene el diploma de High School Americano con certificado apostillado.",
    ],
    'dual' => [
        'subject' => 'Hemos recibido tu solicitud · Dual Diploma | Chanak Academy',
        'body' => "Hola {nombre},\n\n"
            . "¡Gracias por tu interés en el programa Dual Diploma de Chanak International Academy!\n\n"
            . "Qué pasará ahora:\n"
            . "· En las próximas 24 horas (días laborables) una persona de nuestro equipo te contactará personalmente.\n"
            . "· Revisaremos contigo la compatibilidad con el colegio actual y resolveremos todas tus dudas.\n\n"
            . "Mientras tanto:\n"
            . "· Programa completo: {landing}\n"
            . "· ¿Prefieres hablar ya? WhatsApp {whatsapp_display}: {whatsapp}\n\n"
            . "Un saludo,\nEquipo Chanak International Academy\n\n"
            . "Colegio privado americano · FLDOE #134620 (registro verificable públicamente) · IRS 501(c)(3)\n"
            . "Tu hijo no cambia de colegio: añade el diploma de High School Americano con certificado apostillado.",
    ],
    'diagnostico' => [
        'subject' => 'Hemos recibido tu solicitud · Diagnóstico Académico | Chanak Academy',
        'body' => "Hola {nombre},\n\n"
            . "¡Gracias por tu interés en el Diagnóstico Académico de Chanak International Academy!\n\n"
            . "Has elegido el mejor primer paso: la evaluación completa (149 preguntas) muestra el nivel real de tu hijo/a "
            . "y con ella recibirás una propuesta personalizada del programa más adecuado.\n\n"
            . "Qué pasará ahora:\n"
            . "· En las próximas 24 horas (días laborables) te contactaremos para coordinar la evaluación.\n\n"
            . "Mientras tanto:\n"
            . "· Toda la información del Diagnóstico (50€): {landing}\n"
            . "· ¿Prefieres hablar ya? WhatsApp {whatsapp_display}: {whatsapp}\n\n"
            . "Un saludo,\nEquipo Chanak International Academy\n\n"
            . "Colegio privado americano · FLDOE #134620 (registro verificable públicamente) · IRS 501(c)(3)",
    ],
    'general' => [
        'subject' => 'Hemos recibido tu solicitud | Chanak Academy',
        'body' => "Hola {nombre},\n\n"
            . "¡Gracias por escribir a Chanak International Academy!\n\n"
            . "Qué pasará ahora:\n"
            . "· En las próximas 24 horas (días laborables) una persona de nuestro equipo te contactará personalmente para orientarte.\n\n"
            . "¿No sabes qué programa encaja mejor con tu familia?\n"
            . "Nuestro primer paso recomendado es el Diagnóstico Académico (50€): una evaluación completa del nivel real "
            . "de tu hijo/a con propuesta personalizada. Más información: {site}/diagnostico/\n\n"
            . "· ¿Prefieres hablar ya? WhatsApp {whatsapp_display}: {whatsapp}\n\n"
            . "Un saludo,\nEquipo Chanak International Academy\n\n"
            . "Colegio privado americano · FLDOE #134620 (registro verificable públicamente) · IRS 501(c)(3)\n"
            . "Al finalizar sus estudios, el estudiante obtiene el diploma de High School Americano con certificado apostillado.",
    ],
    'hub' => [
        'subject' => 'Hemos recibido tu solicitud · Alianzas | Chanak Academy',
        'body' => "Hola {nombre},\n\n"
            . "Gracias por tu interés en las alianzas educativas de Chanak International Academy.\n\n"
            . "Nuestro equipo institucional revisará tu mensaje y te contactará para abrir la conversación.\n\n"
            . "· ¿Prefieres hablar ya? WhatsApp {whatsapp_display}: {whatsapp}\n\n"
            . "Un saludo,\nEquipo Chanak International Academy",
    ],
    // Autorespuesta específica cuando el lead llega desde /matricula/ (alta intención).
    'matricula' => [
        'subject' => 'Hemos recibido tu solicitud de matrícula 2026-27 | Chanak Academy',
        'body' => "Hola {nombre},\n\n"
            . "¡Gracias por iniciar el proceso de matrícula en Chanak International Academy!\n\n"
            . "Qué pasará ahora:\n"
            . "· En menos de 24 horas (días laborables) el equipo de admisiones te contactará por email o WhatsApp.\n"
            . "· Revisaremos contigo el nivel de entrada del estudiante y confirmaremos la ruta académica y el plan económico final.\n\n"
            . "Mientras tanto:\n"
            . "· Información del programa: {landing}\n"
            . "· ¿Prefieres hablar ya? WhatsApp {whatsapp_display}: {whatsapp}\n\n"
            . "Un saludo,\nEquipo de Admisiones — Chanak International Academy\n\n"
            . "Colegio privado americano · FLDOE #134620 (registro verificable públicamente) · IRS 501(c)(3)\n"
            . "La matrícula se confirma tras la validación del equipo de admisiones.",
    ],
];

/* ══════════════════════════════════════════════════════════════════
   UTILIDADES
   ══════════════════════════════════════════════════════════════════ */

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

function private_dir(): string
{
    $dir = __DIR__ . '/_private';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755);
    }
    // Doble protección: la carpeta también está bloqueada desde el .htaccess raíz.
    $ht = $dir . '/.htaccess';
    if (!file_exists($ht)) {
        @file_put_contents($ht, "Require all denied\nDeny from all\n");
    }
    return $dir;
}

function log_mail_error(string $message): void
{
    $line = '[' . date('Y-m-d H:i:s T') . '] ' . $message . "\n";
    @file_put_contents(private_dir() . '/mail-errors.log', $line, FILE_APPEND | LOCK_EX);
}

function brevo_key(): string
{
    $file = private_dir() . '/brevo-key.php';
    if (is_file($file)) {
        $key = @include $file;
        if (is_string($key) && trim($key) !== '') {
            return trim($key);
        }
    }
    return '';
}

function log_brevo(string $message): void
{
    $line = '[' . date('Y-m-d H:i:s T') . '] ' . $message . "\n";
    @file_put_contents(private_dir() . '/brevo.log', $line, FILE_APPEND | LOCK_EX);
}

/**
 * Crea o actualiza el contacto en Brevo y lo suscribe a las listas indicadas.
 * No bloquea el flujo: el lead ya está en leads.csv; cualquier fallo queda
 * en /_private/brevo.log. Si el teléfono no es válido para Brevo (HTTP 400),
 * se reintenta sin el atributo SMS para no perder el contacto.
 */
function brevo_add_contact(string $email, string $name, string $phone, array $listIds): bool
{
    $key = brevo_key();
    if ($key === '' || !function_exists('curl_init') || !$listIds) {
        return false;
    }

    // Atributos según la cuenta Brevo de Chanak (español): NOMBRE / WHATSAPP / SMS.
    $attributes = [];
    if ($name !== '') {
        $attributes['NOMBRE'] = $name;
    }
    $sms = preg_replace('/[^0-9+]/', '', $phone) ?? '';
    if ($sms !== '' && preg_match('/^\+?[0-9]{9,15}$/', $sms)) {
        $tel = $sms[0] === '+' ? $sms : '+34' . $sms;
        $attributes['SMS']      = $tel;
        $attributes['WHATSAPP'] = $tel;
    }

    $post = function (array $payload) use ($key): array {
        $ch = curl_init('https://api.brevo.com/v3/contacts');
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 12,
            CURLOPT_HTTPHEADER     => [
                'accept: application/json',
                'api-key: ' . $key,
                'content-type: application/json',
            ],
            CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        ]);
        $body   = (string) curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $err    = curl_error($ch);
        curl_close($ch);
        return [$status, $body, $err];
    };

    $payload = [
        'email'         => $email,
        'listIds'       => array_values(array_unique($listIds)),
        'updateEnabled' => true,
    ];
    if ($attributes) {
        $payload['attributes'] = $attributes;
    }

    [$status, $body, $err] = $post($payload);
    if ($status >= 200 && $status < 300) {
        return true;
    }

    // Reintento sin teléfono: Brevo rechaza la petición entera si el número
    // no pasa su validación, y preferimos el contacto sin teléfono a nada.
    if ($status === 400 && isset($payload['attributes']['SMS'])) {
        unset($payload['attributes']['SMS'], $payload['attributes']['WHATSAPP']);
        if (!$payload['attributes']) {
            unset($payload['attributes']);
        }
        [$status, $body, $err] = $post($payload);
        if ($status >= 200 && $status < 300) {
            log_brevo('Contacto ' . $email . ' añadido sin SMS (telefono rechazado por Brevo)');
            return true;
        }
    }

    log_brevo('FALLO contacto ' . $email . ' listas=' . implode(',', $listIds)
        . ' HTTP ' . $status . ' ' . $err . ' ' . substr($body, 0, 300));
    return false;
}

/**
 * Envía un correo de texto plano. Devuelve true si algún método lo aceptó.
 * 1) API de Brevo si hay clave en /_private/brevo-key.php (recomendado:
 *    evita problemas SPF al enviar "desde" un dominio con correo en Google).
 * 2) mail() de Hostinger como respaldo.
 */
function send_email(array $to, string $subject, string $body, string $fromEmail, string $fromName, string $replyTo): bool
{
    $key = brevo_key();
    if ($key !== '' && function_exists('curl_init')) {
        $payload = [
            'sender'      => ['email' => $fromEmail, 'name' => $fromName],
            'to'          => array_map(fn($e) => ['email' => $e], $to),
            'replyTo'     => ['email' => $replyTo],
            'subject'     => $subject,
            'textContent' => $body,
        ];
        $ch = curl_init('https://api.brevo.com/v3/smtp/email');
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 12,
            CURLOPT_HTTPHEADER     => [
                'accept: application/json',
                'api-key: ' . $key,
                'content-type: application/json',
            ],
            CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        ]);
        curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $err    = curl_error($ch);
        curl_close($ch);
        if ($status >= 200 && $status < 300) {
            return true;
        }
        log_mail_error('Brevo fallo (HTTP ' . $status . ' ' . $err . ') para: ' . implode(',', $to) . ' — se intenta mail()');
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $fromName . ' <' . $fromEmail . '>',
        'Reply-To: ' . $replyTo,
        'X-Mailer: PHP/' . phpversion(),
    ]);
    $toHeader = implode(', ', $to);
    return @mail($toHeader, $encodedSubject, $body, $headers);
}

/* ══════════════════════════════════════════════════════════════════
   ENTRADA
   ══════════════════════════════════════════════════════════════════ */

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    respond_json(204, ['ok' => true]);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond_json(200, [
        'ok'      => true,
        'success' => true,
        'message' => 'Endpoint activo para formularios Chanak.',
    ]);
}

$raw         = file_get_contents('php://input') ?: '';
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$data        = [];

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
        'ok'      => false,
        'success' => false,
        'message' => 'No se recibieron datos del formulario.',
    ]);
}

/* Honeypot antispam: si un bot rellena estos campos, respondemos éxito
   sin guardar ni enviar nada. */
$honeypot = first_value($data, ['website', 'url', 'company_website']);
if ($honeypot !== '') {
    respond_json(200, ['ok' => true, 'success' => true, 'message' => 'Solicitud recibida.']);
}

$email = first_value($data, ['email', 'guardianEmail', 'correo', 'mail']);
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond_json(422, [
        'ok'      => false,
        'success' => false,
        'message' => 'Por favor indica un email valido.',
    ]);
}

$name    = first_value($data, ['nombre', 'nombre_padre', 'responsable_nombre', 'guardianFullName', 'guardianName', 'name', 'estudiante_nombre', 'studentFullName']);
$phone   = first_value($data, ['whatsapp', 'telefono', 'phone', 'guardianPhone', 'tel']);
$country = first_value($data, ['pais', 'country', 'pais_residencia', 'pais_responsable', 'estudiante_pais']);

/* ── Enrutamiento por producto ──
   1º el campo explícito 'necesidad' del formulario de la home;
   2º detección por texto (landings compiladas y rutas antiguas). */
$route = '';
$nec   = strtolower(first_value($data, ['necesidad']));
$necMap = ['offcampus' => 'offcampus', 'dual' => 'dual', 'diagnostico' => 'diagnostico', 'info' => 'general'];
if (isset($necMap[$nec])) {
    $route = $necMap[$nec];
}

if ($route === '') {
    $source = strtolower(implode(' ', [
        $_SERVER['REQUEST_URI'] ?? '',
        $_SERVER['HTTP_REFERER'] ?? '',
        first_value($data, ['programa', 'program', 'origen', 'origin', 'intent', 'route']),
    ]));
    if (contains_any($source, ['hub', 'alianza', 'iglesia', 'rededucativa'])) {
        $route = 'hub';
    } elseif (contains_any($source, ['diagnostico', 'diagnostic', 'evaluacion'])) {
        $route = 'diagnostico';
    } elseif (contains_any($source, ['dual', 'panama', 'panamá', 'send-enrollment', 'send-info-request'])) {
        $route = 'dual';
    } elseif (contains_any($source, ['off-campus', 'offcampus', 'brevo-lead'])) {
        $route = 'offcampus';
    } else {
        $route = 'general';
    }
}

$routeCfg = $CONFIG['routes'][$route];
$label    = $routeCfg['label'];
/* Lead de MATRÍCULA (viene de /matricula/): alta intención — se marca en el
   asunto y usa autorespuesta propia. El enrutamiento y la lista Brevo siguen
   siendo los del programa. */
$esMatricula = contains_any(strtolower(implode(' ', [
    first_value($data, ['origen', 'origin']),
    $_SERVER['HTTP_REFERER'] ?? '',
])), ['matricula', 'matrícula']);
if ($esMatricula) {
    $label = 'MATRICULA · ' . $label;
}
$landing  = $CONFIG['site_url'] . $routeCfg['landing'];
$origin   = first_value($data, ['origen', 'origin']) ?: ($_SERVER['HTTP_REFERER'] ?? ($_SERVER['REQUEST_URI'] ?? ''));

/* ── 1) GUARDAR EL LEAD (antes de cualquier correo) ── */
$csvPath = private_dir() . '/leads.csv';
$isNew   = !file_exists($csvPath);
$fh      = @fopen($csvPath, 'ab');
$leadSaved = false;
if ($fh) {
    if (flock($fh, LOCK_EX)) {
        if ($isNew) {
            fputcsv($fh, ['fecha', 'programa', 'nombre', 'email', 'telefono', 'pais', 'origen']);
        }
        fputcsv($fh, [date('Y-m-d H:i:s T'), $label, $name, $email, $phone, $country, clean_value($origin)]);
        fflush($fh);
        flock($fh, LOCK_UN);
        $leadSaved = true;
    }
    fclose($fh);
}
if (!$leadSaved) {
    log_mail_error('AVISO: no se pudo escribir el lead en leads.csv (' . $email . ' / ' . $label . ')');
}

/* ── 1b) CONTACTO EN BREVO (lista del producto + newsletter si hay opt-in) ── */
$brevoLists = [$routeCfg['brevo_list']];
$newsletterOptIn = strtolower(first_value($data, ['newsletter', 'boletin', 'suscripcion', 'subscribe']));
if (in_array($newsletterOptIn, ['si', 'sí', 'yes', 'on', 'true', '1'], true)) {
    $brevoLists[] = $CONFIG['brevo_newsletter_list'];
}
brevo_add_contact($email, $name, $phone, $brevoLists);

/* ── 2) CORREO INTERNO al equipo ── */
$subjectInterno = 'Solicitud web [' . $label . '] — ' . ($name !== '' ? $name : $email) . ($country !== '' ? ' (' . $country . ')' : '');

$lines = [
    'Nueva solicitud recibida desde chanakacademy.org',
    'Fecha: ' . date('Y-m-d H:i:s T'),
    'Programa: ' . $label,
    'Pagina de origen: ' . clean_value($origin),
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? ''),
    '',
    'DATOS DEL FORMULARIO',
];
foreach ($data as $key => $value) {
    if (in_array($key, ['website', 'url', 'company_website'], true)) {
        continue;
    }
    $cleanKey   = clean_value((string) $key);
    $cleanValue = clean_value($value);
    if ($cleanValue === '') {
        continue;
    }
    $lines[] = $cleanKey . ': ' . $cleanValue;
}
$lines[] = '';
$lines[] = 'Responder directamente a este correo escribe a la familia (Reply-To).';
$bodyInterno = implode("\n", $lines);

$sentInterno = send_email(
    $routeCfg['to'],
    $subjectInterno,
    $bodyInterno,
    $CONFIG['from_email'],
    $CONFIG['from_name'],
    $email
);
if (!$sentInterno) {
    log_mail_error('FALLO correo interno [' . $label . '] lead=' . $email . ' destino=' . implode(',', $routeCfg['to']));
}

/* ── 3) AUTORESPUESTA a la familia ── */
$reply = $esMatricula ? $AUTOREPLY['matricula'] : ($AUTOREPLY[$route] ?? $AUTOREPLY['general']);
$replyBody = strtr($reply['body'], [
    '{nombre}'           => $name !== '' ? $name : 'familia',
    '{landing}'          => $landing,
    '{site}'             => $CONFIG['site_url'],
    '{whatsapp}'         => $CONFIG['whatsapp_link'],
    '{whatsapp_display}' => $CONFIG['whatsapp_display'],
]);
$sentAuto = send_email(
    [$email],
    $reply['subject'],
    $replyBody,
    $CONFIG['from_email'],
    $CONFIG['from_name'],
    $routeCfg['to'][0]
);
if (!$sentAuto) {
    log_mail_error('FALLO autorespuesta [' . $label . '] lead=' . $email);
}

/* El lead ya está guardado: la respuesta al usuario es de éxito aunque
   el correo haya fallado (el fallo queda registrado para revisión). */
respond_json(200, [
    'ok'      => true,
    'success' => true,
    'message' => 'Solicitud recibida.',
]);
