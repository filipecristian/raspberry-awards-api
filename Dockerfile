# Usa imagem base oficial do Node
FROM node:18

# Cria o diretório da aplicação
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando padrão para iniciar o app
CMD ["npm", "start"]
