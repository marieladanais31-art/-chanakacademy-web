<?php
declare(strict_types=1);
require __DIR__.'/../_private/dossier-routing.php';
function check(bool $result,string $label): void {if(!$result)throw new RuntimeException($label);}
$cases=[
 [['necesidad'=>'dual','pais'=>'México','language'=>'en'],'dual','MX','en','dual-diploma-mx-en'],
 [['necesidad'=>'info','program'=>'dual_diploma','pais'=>'España'],'dual','ES','es','dual-diploma-es-es'],
 [['necesidad'=>'info','programa'=>'Off-Campus','country_code'=>'PA'],'offcampus','PA','es','off-campus-pa-es'],
 [['program'=>'alabama-tutoring','pais'=>'España'],'alabama_choose','US','es','alabama-choose-es'],
 [['necesidad'=>'florida_home_education','programa'=>'Florida HEIP K-5'],'florida_pep_ema','US','es','florida-heip-es'],
 [['necesidad'=>'florida_pep_ema','programa'=>'Homeschool'],'florida_pep_ema','US','es','florida-heip-es'],
 [['necesidad'=>'info','pais'=>'Panamá'],'general','PA','es','general-es'],
 [['necesidad'=>'diagnostico','pais'=>'Colombia'],'diagnostico','CO','es','diagnostico-co-es'],
 [['necesidad'=>'life_skills','pais'=>'MX'],'life_skills','MX','es','life-skills-es'],
 [['necesidad'=>'offcampus','pais'=>'Estats Units'],'offcampus','US','es','off-campus-us-es'],
 [['necesidad'=>'dual','country_code'=>'ZZ'],'dual','ZZ','es','dual-diploma-global-es'],
];
foreach($cases as [$data,$route,$country,$lang,$file]){
 $actual=chanak_resolve_route($data,'https://www.chanakacademy.org/');
 check($actual===$route,'route '.$file);
 $p=chanak_information_pack($actual,$data,'https://www.chanakacademy.org/','https://www.chanakacademy.org');
 check($p['country']===$country,'country '.$file);
 check($p['language']===$lang,'language '.$file);
 check(str_ends_with((string)parse_url($p['dossier'],PHP_URL_PATH),$file.'.pdf'),'single dossier '.$file);
 check($p['fees']==='' && $p['complete']==='','no extra dossiers '.$file);
 check(file_exists(__DIR__.'/..'.parse_url($p['dossier'],PHP_URL_PATH)),'PDF exists '.$file);
 check(chanak_route_recipients($actual)===[$route==='dual'?'dualdiploma@chanakacademy.org':'offcampus@chanakacademy.org'],'single internal recipient '.$file);
}
check(chanak_resolve_route(['pais'=>'Panama'],'')==='general','country never implies Dual Diploma');
check(chanak_resolve_route([], 'https://www.chanakacademy.org/dual-diploma/en/')==='dual','referer fallback');
echo count($cases)." contextual routing/dossier/recipient cases passed.\n";
