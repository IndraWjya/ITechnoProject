<?php

// Pastikan struktur direktori storage sementara di /tmp tersedia (Vercel Serverless)
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

// Teruskan request ke entrypoint Laravel public/index.php
require __DIR__ . '/../public/index.php';
