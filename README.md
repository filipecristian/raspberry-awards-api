# 🎬 Golden Raspberry Awards API
API desenvolvida para consultar os produtores com os maiores intervalos de tempo entre premiações e aqueles que mais frequentemente venceram o prêmio Golden Raspberry Awards.

## 🚀 Tecnologias Utilizadas
- Node.js (v18.19.1 ou superior)

- Express.js

- Docker e Docker Compose

- Jest (para testes)

## ⚙️ Pré-requisitos
Para rodar o projeto, você precisa ter instalado em sua máquina:

- Node.js >= v18.19.1

- NPM >= 9.2.0

💡 Alternativa: Se preferir, pode usar Docker e Docker Compose, eliminando a necessidade de ter Node.js instalado localmente.

## 📦 Instalação e Execução
🔽 Clonar o repositório
```
git clone https://github.com/filipecristian/raspberry-awards-api.git
cd raspberry-awards-api
```
## 🛠️ Rodando com Node.js
1. Instale as dependências:
```
npm install
```
2. Inicie o servidor:

```
npm start
```
ℹ️ A aplicação roda por padrão na porta 3059. Você pode alterar isso no arquivo .env na raiz do projeto.

3. Rodar os testes:

```
npm test
```

## 🐳 Rodando com Docker
1. Suba o container:

```
docker-compose up -d --build
```
ℹ️ Por padrão, a aplicação também roda na porta 3059 via Docker.

2. Para rodar os testes dentro do container:
```
docker exec -it raspberry-api sh
npm test
```

## 🔗 Endpoint Principal
Com a aplicação rodando, você pode acessar o endpoint principal com o comando:

```
curl http://localhost:3059/awards/intervals
```

## ✅ Testes
Os testes cobrem os principais fluxos da aplicação. Para executá-los, use:

```
npm test
```

## ✅ Funcionalidades Implementadas

- [x] Listar produtores com maior intervalo entre vitórias
- [x] Listar produtores com vitórias mais próximas
- [x] Testes de integração
- [x] Docker e Docker Compose para ambiente isolado


Claro! Aqui está somente a parte do **Contato**, pronta para colar no seu README:

---

## 📫 Contato

Caso tenha dúvidas, sugestões ou interesse em saber mais sobre o projeto, fique à vontade para entrar em contato:

**Filipe Cristian**  
💼 [LinkedIn](https://www.linkedin.com/in/filipeecristian/)  
✉️ [filipeecristian@gmail.com](mailto:filipeecristian@gmail.com)

---