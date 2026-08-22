<?php
/**
 * Configuración comercial centralizada — U.S. Dual Diploma, mercados
 * internacionales con precio en AED (UAE / Dubai).
 *
 * Única fuente de verdad: usada por dual-diploma-uae/index.php (tabla de
 * precios en la landing) y por enviar-formulario.php (email de confirmación
 * y dossier adjunto). Para actualizar precios, edita solo este archivo.
 *
 * annual = 11 mensualidades. dossier = ruta pública del PDF regional.
 */

return [
    'UAE' => [
        'currency'       => 'AED',
        'monthly'        => 795,
        'annual'         => 8745,
        'enrollment_fee' => 650,
        'dossier'        => '/assets/dossiers/Chanak_Dual_Diploma_UAE_2026-2027.pdf',
        'label'          => 'United Arab Emirates',
    ],
    // Dubai = UAE + 30% (confirmado por Mariela 2026-08-22), redondeado a la
    // cifra terminada en 5 más cercana; annual = monthly * 11.
    'Dubai' => [
        'currency'       => 'AED',
        'monthly'        => 1035,
        'annual'         => 11385,
        'enrollment_fee' => 845,
        'dossier'        => '/assets/dossiers/Chanak_Dual_Diploma_Dubai_2026-2027.pdf',
        'label'          => 'Dubai',
    ],
];
