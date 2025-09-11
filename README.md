# Ark Project - Backend

## Sobre o Projeto

**Ark Project** é um aplicativo web desenvolvido para demonstrar alta complexidade de arquitetura, utilizando backend em Laravel e frontend em React. O objetivo principal é criar uma aplicação escalável e altamente personalizável, aplicando padrões de design avançados e boas práticas de desenvolvimento.

### Desenvolvedor
- **Nome**: Rodrigo Serafim
- **Contato**: [GitHub](https://github.com/rdgoserafim) [LinkedIn](https://www.linkedin.com/in/rodrigo-serafim-dev)

## Objetivo
Aplicar alta complexidade de arquitetura em um aplicativo web, com backend em Laravel e frontend em React, de forma a ser escalável e altamente personalizável. O projeto visa explorar conceitos avançados de engenharia de software, como injeção de dependência, serviços modulares, DTOs e uma estrutura limpa e organizada.

## Tecnologias Utilizadas
- **Backend**: Laravel (PHP)
- **Frontend**: React (TypeScript) + Vite + Tailwind CSS
- **Banco de Dados**: PostgreSQL (configurado para produção)
- **Containerização**: Docker e Docker Compose
- **Testes**: PHPUnit

## Instalação

### Pré-requisitos
- Docker e Docker Compose instalados
- Git

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/rdgoserafim/ark_project.git
   cd ark_project
   ```

2. Copie o arquivo de configuração de ambiente do backend:
   ```bash
   cp backend/.env.example backend/.env
   ```

3. Suba a aplicação usando Docker Compose:
   ```bash
   docker compose up --build -d
   ```

4. Execute os comandos de configuração inicial dentro do container do backend:
   ```bash
   # Instalar dependências do PHP
   docker compose exec backend composer install
   
   # Gerar chave da aplicação
   docker compose exec backend php artisan key:generate
   
   # Executar migrações do banco de dados
   docker compose exec backend php artisan migrate
   
   # (Opcional) Executar seeders para popular o banco com dados de exemplo
   docker compose exec backend php artisan db:seed
   ```

## Como Usar a Aplicação

Após a instalação, a aplicação estará disponível através dos seguintes endpoints:

- **Frontend (React)**: `http://localhost:3000`
- **Backend API (Laravel)**: `http://localhost:8001`
- **Nginx (Proxy)**: `http://localhost` (porta 80)

O Docker Compose irá:
- Construir e iniciar os containers do backend (Laravel), frontend (React) e Nginx
- Configurar a rede entre os serviços
- Instalar automaticamente as dependências do frontend (npm)
- Expor as portas necessárias para cada serviço

**Recomendação**: Acesse a aplicação através do Nginx em `http://localhost` para uma experiência completa.


## Executando os Testes

Para executar os testes automatizados, use os comandos dentro do container do backend:

```bash
# Executar todos os testes
docker compose exec backend php artisan test

# Ou usando PHPUnit diretamente
docker compose exec backend ./vendor/bin/phpunit

# Executar testes com relatório de cobertura (se configurado)
docker compose exec backend php artisan test --coverage
```

Os testes estão localizados em `tests/Unit/Services` e `tests/Feature`.

### Comandos Úteis para Desenvolvimento

Durante o desenvolvimento, você pode usar os seguintes comandos para interagir com a aplicação:

```bash
# Acessar o shell do container do backend
docker compose exec backend bash

# Executar comandos Artisan
docker compose exec backend php artisan [comando]

# Ver logs da aplicação
docker compose logs backend
docker compose logs frontend
docker compose logs nginx

# Parar a aplicação
docker compose down

# Rebuild completo (útil após mudanças no Dockerfile)
docker compose down && docker compose up --build -d
```

## Arquitetura do Backend

O backend segue uma arquitetura baseada em Laravel com padrões de design para alta escalabilidade e personalização:

### Estrutura Principal
- **Models**: Representam as entidades do domínio (e.g., `Developer`, `Level`, `User`)
- **Controllers**: Gerenciam as requisições HTTP e coordenam as respostas
- **Services**: Contêm a lógica de negócio, divididos em camadas (e.g., `BaseService`, `DomainService`, `RouterService`)
- **DTOs (Data Transfer Objects)**: Estruturas para transferência de dados (e.g., `DeveloperDTO`, `LevelDTO`)
- **Interfaces**: Definem contratos para serviços (e.g., `ServicesInterface`)
- **Providers**: Configuram injeção de dependência e serviços globais

### Padrões Aplicados
- **Service Layer**: Separação da lógica de negócio dos controllers
- **Repository Pattern**: Abstração do acesso a dados
- **Dependency Injection**: Injeção de dependências via container do Laravel
- **Exception Handling**: Tratamento personalizado de erros
- **Migrations e Seeders**: Controle de versão do banco de dados

Essa arquitetura permite fácil manutenção, testes e expansão do sistema.

## Arquitetura do Frontend

O frontend segue uma arquitetura baseada em React com TypeScript e padrões de design para alta escalabilidade e manutenibilidade:

### Estrutura Principal
- **Components**: Componentes React reutilizáveis organizados por funcionalidade
- **Core**: Camada central contendo:
  - **Models**: Definições de tipos e interfaces TypeScript
  - **Repositories**: Camada de abstração para acesso a dados
  - **Services**: Lógica de negócio do frontend
- **Infrastructure**: Camada de infraestrutura contendo:
  - **API**: Configurações e clients para comunicação com backend
  - **Storage**: Gerenciamento de estado e armazenamento local
  - **UI**: Componentes de interface e design system
- **Assets**: Recursos estáticos como imagens, ícones e fontes

### Tecnologias e Ferramentas
- **React 19**: Framework principal para construção da interface
- **TypeScript**: Tipagem estática para maior segurança e produtividade
- **Vite**: Build tool moderno e rápido para desenvolvimento
- **Tailwind CSS**: Framework CSS utility-first para estilização
- **React Router DOM**: Roteamento SPA (Single Page Application)
- **Axios**: Cliente HTTP para comunicação com APIs
- **ESLint**: Linting e padronização de código

### Padrões Aplicados
- **Component-Based Architecture**: Componentização e reutilização
- **Repository Pattern**: Abstração da camada de dados
- **Service Layer**: Separação da lógica de negócio
- **TypeScript Interfaces**: Contratos e tipagem forte
- **Clean Architecture**: Separação de responsabilidades em camadas
- **Responsive Design**: Interface adaptável a diferentes dispositivos

### Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila a aplicação para produção
- `npm run lint`: Executa verificação de código com ESLint
- `npm run preview`: Visualiza a build de produção

Essa arquitetura garante código limpo, testável e facilmente extensível.

## Contribuição
Contribuições são bem-vindas! Siga os padrões do projeto e abra uma issue ou pull request no repositório.

## Licença
Este projeto está licenciado sob a MIT License.
