const express = require('express');                                 // Importa o módulo 'express' para a variável 'express'
const tasksController = require('./controllers/tasksController');   // Importa o controlador de tarefas do arquivo './controllers/tasksController' e o armazena na variável 'tasksController'
const tasksMiddleware = require('./middlewares/tasksMiddleware');   // Importa o middleware de tarefas do arquivo './middlewares/tasksMiddleware' e o armazena na variável 'tasksMiddleware'

const router = express.Router();                                    // Inicializa um objeto roteador do Express e o armazena na variável 'router'

router.get('/tasks', tasksController.getAll);                       // Define uma rota GET '/tasks' que será manipulada pelo método 'getAll' do controlador de tarefas
router.post('/tasks',                                               // Define uma rota POST '/tasks' que será primeiro passada pelo middleware 'validateFieldTitle' e depois manipulada pelo método 'createTask' do controlador de tarefas
            tasksMiddleware.validateFieldTitle, 
            tasksController.createTask
          );
router.delete('/tasks/:id', tasksController.deleteTask);             // Define uma rota DELETE '/tasks/:id' que será manipulada pelo método 'deleteTask' do controlador de tarefas
router.put('/tasks/:id',                                             // Define uma rota PUT '/tasks/:id' que será primeiro passada pelos middlewares 'validateFieldTitle' e 'validateFieldStatus' e depois manipulada pelo método 'updateTask' do controlador de tarefas
  tasksMiddleware.validateFieldTitle,
  tasksMiddleware.validateFieldStatus,
  tasksController.updateTask,
);

module.exports = router;                                             // Exporta o roteador para que possa ser utilizado em outros arquivos