<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Pastikan direktori storage di /tmp ada (Vercel Serverless)
$storageDir = '/tmp/storage';
$subDirs = [
    '/framework/views',
    '/framework/cache/data',
    '/framework/sessions',
    '/logs',
];

foreach ($subDirs as $sub) {
    $target = $storageDir . $sub;
    if (!is_dir($target)) {
        @mkdir($target, 0777, true);
    }
}

putenv('APP_STORAGE=' . $storageDir);
$_ENV['APP_STORAGE'] = $storageDir;
putenv('VIEW_COMPILED_PATH=' . $storageDir . '/framework/views');
$_ENV['VIEW_COMPILED_PATH'] = $storageDir . '/framework/views';

// Normalisasi variabel server
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';
$_SERVER['PHP_SELF'] = '/index.php';

// Teruskan ke Laravel
require __DIR__ . '/../public/index.php';
