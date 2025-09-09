FROM node:22-alpine

WORKDIR /app

# Copiar arquivos de configuração primeiro
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor porta
EXPOSE 3000

# Comando para desenvolvimento (hot reload)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]