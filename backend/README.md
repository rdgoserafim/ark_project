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

2. Navegue para o diretório do backend:
   ```bash
   cd backend
   ```

3. Instale as dependências do PHP (via Composer):
   ```bash
   composer install
   ```

4. Copie o arquivo de configuração de ambiente:
   ```bash
   cp .env.example .env
   ```

5. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

6. Execute as migrações do banco de dados:
   ```bash
   php artisan migrate
   ```

## Subindo a Aplicação

Para subir a aplicação usando Docker Compose, execute o comando a partir da raiz do projeto:

```bash
docker compose up --build -d
```

Isso irá:
- Construir e iniciar os containers do backend (Laravel), frontend (React) e Nginx
- Configurar a rede entre os serviços
- Expor as portas necessárias (geralmente 8000 para backend, 3000 para frontend, 80 para Nginx)

Acesse a aplicação em `http://localhost:3000` (através do Nginx).

## Executando os Testes

Para executar os testes automatizados:

1. Navegue para o diretório do backend:
   ```bash
   cd backend
   ```

2. Execute o PHPUnit:
   ```bash
   ./vendor/bin/phpunit
   ```

Ou, se preferir usar o comando do Artisan:
```bash
php artisan test
```

Os testes estão localizados em `tests/Feature/` e `tests/Unit/`.

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
