FROM php:8.3-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

# Instalar extensões do PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar Node.js 22 (para Laravel Mix/Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Configurar diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do Laravel
COPY . .

# Instalar dependências do Laravel (sem scripts para evitar problemas)
RUN composer install --no-dev --no-scripts --no-autoloader

# Gerar autoloader
RUN composer dump-autoload --optimize

# Argumentos para UID e GID do host
ARG UID=1000
ARG GID=1000

# Criar usuário com UID/GID do host
RUN groupadd -g $GID appuser && useradd -u $UID -g $GID -m appuser


# Dar permissões
RUN chown -R $UID:$GID /var/www/html/storage
RUN chown -R $UID:$GID /var/www/html/bootstrap/cache
RUN chown -R $UID:$GID /var/www/html/vendor
RUN chmod -R 775 /var/www/html/storage
RUN chmod -R 775 /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/vendor

# Mudar para o usuário do host
USER appuser

# Expor porta
EXPOSE 9000

CMD ["php-fpm"]