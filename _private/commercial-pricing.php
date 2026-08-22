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
    'Dubai' => [
        'currency'       => 'AED',
        'monthly'        => 895,
        'annual'         => 9845,
        'enrollment_fee' => 750,
        'dossier'        => '/assets/dossiers/Chanak_Dual_Diploma_Dubai_2026-2027.pdf',
        'label'          => 'Dubai',
    ],
];
