<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

try {
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

    $_SERVER['SCRIPT_NAME'] = '/index.php';
    $_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';
    $_SERVER['PHP_SELF'] = '/index.php';

    if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'vendor/autoload.php is missing',
            'parent_files' => scandir(__DIR__ . '/..'),
        ]);
        exit;
    }

    require __DIR__ . '/../public/index.php';
} catch (\Throwable $e) {
    header('Content-Type: application/json', true, 500);
    echo json_encode([
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString(),
    ]);
}
