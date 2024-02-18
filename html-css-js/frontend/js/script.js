const tbody = document.querySelector('tbody');                     // Seleciona o elemento HTML <tbody> dentro do documento.
const addForm = document.querySelector('.add-form');               // Seleciona o formulário HTML com a classe 'add-form'.
const inputTask = document.querySelector('.input-task');           // Seleciona o input HTML com a classe 'input-task'.

const fetchTasks = async () => {                                   // Função assíncrona que busca as tarefas no servidor.
  const response = await fetch('http://localhost:3333/tasks')      // Faz uma requisição assíncrona para a URL 'http://localhost:3333/tasks'.
  const tasks = await response.json()                              // Extrai o corpo da resposta como JSON.
  return tasks;                                                    // Extrai o corpo da resposta como JSON.
}

const addTask = async (event) => {                                 // Função assíncrona para adicionar uma nova tarefa.
  event.preventDefault();                                          // Prevenir o comportamento padrão do formulário de ser submetido.

  const task = { title: inputTask.value };                         // Cria um objeto 'task' com o título extraído do valor do input.

  await fetch('http://localhost:3333/tasks', {                     // Faz uma requisição assíncrona para adicionar uma nova tarefa no servidor.  
    method: 'post',                                                // Método HTTP POST.
    headers: { 'Content-Type': 'application/json' },               // Cabeçalhos da requisição.
    body: JSON.stringify(task),                                    // Corpo da requisição convertido para JSON.
  });


  loadTasks();                                                     // Recarrega as tarefas após adicionar uma nova.
  inputTask.value = '';                                            // Limpa o valor do input.
}

const deleteTask = async (id) => {                                 // Função assíncrona para excluir uma tarefa.
  await fetch(`http://localhost:3333/tasks/${id}`, {               // Faz uma requisição assíncrona para excluir a tarefa com o ID fornecido.
    method: 'delete',                                              // Método HTTP DELETE.
  });

  loadTasks();                                                     // Recarrega as tarefas após excluir uma.
}

const updateTask = async ({ id, title, status }) => {              // Função assíncrona para atualizar uma tarefa.

  await fetch(`http://localhost:3333/tasks/${id}`, {               // Faz uma requisição assíncrona para atualizar a tarefa com o ID fornecido.
    method: 'put',                                                 // Método HTTP PUT.
    headers: { 'Content-Type': 'application/json' },               // Cabeçalhos da requisição.
    body: JSON.stringify({ title, status }),                       // Corpo da requisição convertido para JSON.
  });

  loadTasks();                                                     // Recarrega as tarefas após atualizar uma.
}



const formatDate = (dateUTC) => {                                  // Função para formatar uma data.
  const options = { dateStyle: 'long', timeStyle: 'short' };       // Opções para o formato da data.
  const date = new Date(dateUTC).toLocaleString('pt-br', options); // Converte uma data UTC para uma data local formatada de acordo com as opções.
  return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {   // Função para criar um elemento HTML com opções de texto e HTML.
  const element = document.createElement(tag);                     // Cria um novo elemento com a tag especificada.

  if (innerText) {                                                 // Define o texto interno do elemento se fornecido.
    element.innerText = innerText; 
  }

  if (innerHTML) {                                                 // Define o HTML interno do elemento se fornecido.
    element.innerHTML = innerHTML;
  }

  return element;
}

const createSelect = (value) => {                                  // Função para criar um elemento 'select' HTML com opções pré-definidas.

  // Opções pré-definidas para o elemento select.
  const options = `                           
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
  `;

  const select = createElement('select', '', options);             // Cria um elemento 'select' com as opções definidas.

  select.value = value;                                            // Define o valor selecionado com base no valor fornecido.

  return select;
}
 
const createRow = (task) => {                                      // Função para criar uma linha (tr) na tabela HTML com os dados da tarefa.

  const { id, title, created_at, status } = task;                  // Extrai os dados da tarefa.

  // Cria elementos HTML para cada coluna na linha da tabela.
  const tr = createElement('tr');                                  // Cria uma linha (tr).              
  const tdTitle = createElement('td', title);                      // Cria uma célula (td) para o título da tarefa.
  const tdCreatedAt = createElement('td', formatDate(created_at)); // Cria uma célula (td) para a data de criação da tarefa formatada.
  const tdStatus = createElement('td');                            // Cria uma célula (td) para o status da tarefa.
  const tdActions = createElement('td');                           // Cria uma célula (td) para as ações relacionadas à tarefa.

  const select = createSelect(status);                             // Cria um elemento 'select' para o status da tarefa.

  // Adiciona um ouvinte de evento para atualizar a tarefa quando o status for alterado.
  select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }));

  // Cria botões de edição e exclusão.
  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
  
  // Cria um formulário de edição para o título da tarefa.
  const editForm = createElement('form');                           // Formulário de edição.
  const editInput = createElement('input');                         // Input para o título da tarefa.

  // Define o valor do input de edição como o título da tarefa.
  editInput.value = title;                                          // Define o valor do input de edição como o título da tarefa.
  editForm.appendChild(editInput);                                  // Adiciona o input ao formulário.
  
  // Adiciona um ouvinte de evento para exibir o formulário de edição quando o botão de edição for clicado.
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    updateTask({ id, title: editInput.value, status });             // Atualiza a tarefa com o novo título.
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';                                         // Limpa o texto interno da célula do título.
    tdTitle.appendChild(editForm);                                  // Adiciona o formulário de edição à célula do título.
  });

  editButton.classList.add('btn-action');                           // Adiciona uma classe CSS ao botão de edição.
  deleteButton.classList.add('btn-action');                         // Adiciona uma classe CSS ao botão de exclusão.

  deleteButton.addEventListener('click', () => deleteTask(id));     // Adiciona um ouvinte de evento para excluir a tarefa quando o botão de exclusão for clicado.
  
  // Adiciona os elementos criados à linha (tr) da tabela.
  tdStatus.appendChild(select);                                     // Adiciona o elemento 'select' à célula do status.
  tdActions.appendChild(editButton);                                // Adiciona o botão de edição à célula de ações.
  tdActions.appendChild(deleteButton);                              // Adiciona o botão de exclusão à célula de ações.

  // Adiciona as células à linha (tr) da tabela.
  tr.appendChild(tdTitle);                                          // Adiciona as células à linha (tr) da tabela.
  tr.appendChild(tdCreatedAt);                                      // Adiciona a célula da data de criação
  tr.appendChild(tdStatus);                                         // Adiciona a célula do status à linha.
  tr.appendChild(tdActions);                                        // Adiciona a célula de ações à linha.

  return tr;
}

 
const loadTasks = async () => {                                     // Declaração de uma função assíncrona chamada loadTasks que carrega as tarefas e as exibe na tabela HTML.
  const tasks = await fetchTasks();                                 // Carrega as tarefas.

  tbody.innerHTML = '';                                             // Limpa o conteúdo do corpo (tbody) da tabela HTML.

  tasks.forEach((task) => {                                         // Para cada tarefa...
    const tr = createRow(task);                                     // Cria uma linha na tabela com os dados da tarefa.
    tbody.appendChild(tr);                                          // Adiciona a linha ao corpo da tabela.
  });
}

addForm.addEventListener('submit', addTask);                        // Adiciona a linha ao corpo da tabela.

loadTasks();                                                        // Carrega as tarefas quando a página é carregada.