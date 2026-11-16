<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'php_version' => PHP_VERSION,
    'vendor_exists' => file_exists(__DIR__ . '/../vendor/autoload.php'),
    'files_in_parent' => scandir(__DIR__ . '/..'),
]);
