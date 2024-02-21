const app = require('./app');                                           // Importa o módulo 'app' do arquivo './app.js' e atribui a constante 'app'
require('dotenv').config();                                             // Importa o módulo 'dotenv' que é usado para carregar variáveis de ambiente de um arquivo '.env' para process.env

const PORT = process.env.PORT || 3333;                                  // Define a porta do servidor como a variável de ambiente PORT, se estiver definida, caso contrário, usa a porta 3333
 
app.listen(PORT, () => console.log(`Server running or port ${PORT}`));  // O método 'listen' é chamado no objeto 'app', que é uma instância de um servidor HTTP, para começar a escutar as solicitações HTTP na porta especificada
