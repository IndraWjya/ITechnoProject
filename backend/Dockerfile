FROM php:8.4-cli-alpine

# Install dependencies & PostgreSQL PDO extension
RUN apk add --no-cache \
    postgresql-dev \
    curl \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application files
COPY . .

# Set permissions for storage & cache
RUN chmod -R 777 storage bootstrap/cache

# Install dependencies without dev packages
RUN composer install --no-dev --optimize-autoloader --no-interaction

ENV PORT=8000
EXPOSE 8000

# Run migrations and start Laravel server
CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host 0.0.0.0 --port ${PORT:-8000}"]
