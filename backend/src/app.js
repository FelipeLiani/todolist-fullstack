const express = require('express'); // Importa o framework Express, que é utilizado para construir aplicações web em Node.js
const cors = require('cors');       // Importa o módulo CORS, que é utilizado para habilitar o acesso a recursos de diferentes origens em aplicações web
const router = require('./router'); // Importa o módulo 'router' definido em outro arquivo (presumivelmente, 'router.js')

const app = express();              // Cria uma instância do aplicativo Express

app.use(express.json());            // Adiciona um middleware para permitir o parsing de dados JSON nas requisições
app.use(cors());                    // Adiciona um middleware para habilitar o CORS (Cross-Origin Resource Sharing)
app.use(router);                    // Adiciona o middleware do roteador definido no arquivo 'router.js' para tratar as rotas da 
 
module.exports = app;               // Exporta o aplicativo Express para ser utilizado em outros arquivos
 