<?php
declare(strict_types=1);

function chanak_normalize(string $value): string {
    return strtolower(strtr(trim($value), ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ñ'=>'n','Á'=>'a','É'=>'e','Í'=>'i','Ó'=>'o','Ú'=>'u','Ñ'=>'n','_'=>'-']));
}
function chanak_route_from_value(string $value): string {
    $v=chanak_normalize($value);
    if (preg_match('/alabama|choose/', $v)) return 'alabama_choose';
    if (preg_match('/florida-heip|florida.*(ema|pep|home|heip)|^florida$|^ema$|^pep$/', $v)) return 'florida_pep_ema';
    if (preg_match('/dual|adult.high.school/', $v)) return 'dual';
    if (preg_match('/off.?campus|homeschool|educacion en casa/', $v)) return 'offcampus';
    if (preg_match('/life.?skills/', $v)) return 'life_skills';
    if (preg_match('/diagnost|evaluacion|academic.assessment/', $v)) return 'diagnostico';
    if (preg_match('/hub|alianza|iglesia|rededucativa/', $v)) return 'hub';
    return '';
}
function chanak_resolve_route(array $data, string $referer): string {
    // State selection wins over generic program names; country is never a program.
    $state = (string)($data['state_program'] ?? $data['programa_estatal'] ?? '');
    $stateRoute=chanak_route_from_value($state);
    if (in_array($stateRoute,['florida_pep_ema','alabama_choose'],true)) return $stateRoute;
    $need=chanak_route_from_value((string)($data['necesidad'] ?? ''));
    if (in_array($need,['florida_pep_ema','alabama_choose'],true)) return $need;
    foreach (['program','programa','service','servicio','programa_ema'] as $key) {
        $route=chanak_route_from_value((string)($data[$key] ?? ''));
        if ($route !== '') return $route;
    }
    if ($need !== '') return $need;
    if (in_array(chanak_normalize((string)($data['necesidad'] ?? '')),['info','general','informacion general'],true)) return 'general';
    return chanak_route_from_value($referer) ?: 'general';
}
function chanak_route_recipients(string $route): array {
    if ($route === 'dual') return ['dualdiploma@chanakacademy.org'];
    if ($route === 'hub') return ['rededucativa@asociacioneducafe.org'];
    return ['offcampus@chanakacademy.org'];
}
function chanak_information_pack(string $route, array $data, string $referer, string $site): ?array {
    $catalog=json_decode((string)file_get_contents(__DIR__.'/../assets/dossiers/catalog.json'),true);
    $entry=$catalog['routes'][$route] ?? null;
    if (!$entry) return null;
    $raw=(string)($data['language'] ?? $data['lang'] ?? $data['lang_pref'] ?? $data['preferred_language'] ?? $data['idioma_preferido'] ?? '');
    $language=strpos(chanak_normalize($raw),'en')===0 || ($raw==='' && strpos($referer,'/en/')!==false) ? 'en' : 'es';
    $rawCountry=(string)($data['country_code'] ?? $data['pais'] ?? $data['country'] ?? $data['detected_country'] ?? '');
    $country=strtoupper(trim($rawCountry));
    $aliases=['espana'=>'ES','spain'=>'ES','espanya'=>'ES','espagne'=>'ES','mexico'=>'MX','panama'=>'PA','colombia'=>'CO','estados unidos'=>'US','united states'=>'US','usa'=>'US','etats-unis'=>'US','estats units'=>'US'];
    $country=$aliases[chanak_normalize($rawCountry)] ?? $country;
    if (in_array($route,['florida_pep_ema','alabama_choose'],true)) $country='US';
    $country=isset($entry['countries'][$country]) ? $country : ($country ?: 'GLOBAL');
    $path=$entry['single'][$language] ?? $entry['countries'][$country][$language] ?? $entry['countries']['GLOBAL'][$language] ?? null;
    if (!$path) return null;
    $url=rtrim($site,'/').$path;
    // Exactly one family dossier. Compatibility keys carry no extra documents.
    return ['language'=>$language,'country'=>$country,'dossier'=>$url,'initial'=>$url,'fees'=>'','complete'=>''];
}
