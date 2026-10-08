<?php
declare(strict_types=1);

function chanak_information_pack(string $route, array $data, string $referer, string $site): ?array
{
    $catalog = json_decode((string) file_get_contents(__DIR__ . '/../assets/dossiers/catalog.json'), true);
    $entry = $catalog['routes'][$route] ?? null;
    if (!$entry) {
        return null;
    }
    $rawLanguage = strtolower(trim((string) ($data['language'] ?? $data['lang'] ?? $data['lang_pref'] ?? $data['preferred_language'] ?? '')));
    $language = strpos($rawLanguage, 'en') === 0 || ($rawLanguage === '' && strpos($referer, '/en/') !== false) ? 'en' : 'es';
    $country = strtoupper(trim((string) ($data['country_code'] ?? $data['pais'] ?? $data['country'] ?? '')));
    $aliases = [
        'ESPAÑA' => 'ES', 'ESPANA' => 'ES', 'SPAIN' => 'ES',
        'MÉXICO' => 'MX', 'MEXICO' => 'MX',
        'PANAMÁ' => 'PA', 'PANAMA' => 'PA',
        'COLOMBIA' => 'CO', 'ESTADOS UNIDOS' => 'US', 'UNITED STATES' => 'US', 'USA' => 'US',
    ];
    $country = $aliases[$country] ?? $country;
    $absolute = static function (?string $path) use ($site): string {
        return $path ? rtrim($site, '/') . $path : '';
    };
    return [
        'language' => $language,
        'country' => $country,
        'initial' => $absolute($entry['initial'][$language] ?? $entry['initial']['es']),
        'fees' => $absolute($language === 'en' ? ($entry['fees_en'][$country] ?? null) : ($entry['fees'][$country] ?? null)),
        'complete' => $absolute($entry['complete'][$language] ?? null),
    ];
}
