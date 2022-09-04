// definicion de variables
const input = document.getElementById('tareas-anotador');
const addForm = document.querySelector('.tareas-anotador-container');
const tasksList = document.querySelector('.tareas-lista');
const deleteBtn = document.querySelector('.tareas-borrar-boton');

// traigo los elementos del storage en caso de que haya y sino hay nada traigo un array vacio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// a medida que voy agregando tareas, las almaceno en el localStorage
const saveLocalStorage = taskList =>{
  localStorage.setItem('tasks', JSON.stringify(taskList));
};

// crear el elemento a renderizar
const createTask = task =>
  `
    <li>${task.name}
      <img class="delete-btn" src="bin.png" alt="boton de borrar" data-id=${task.taskId} />
    </li>
  `;

// renderizo los elementos del Local Storage
const renderTaskList = todoList =>{
  tasksList.innerHTML = todoList.map(task => createTask(task)).join('');
};

// crear la logica de esconder el boton delete-All
const hideDeleteAll = taskList =>{
  if(!taskList.length){
    deleteBtn.classList.add('hidden');
    return
  }
  deleteBtn.classList.remove('hidden');
}; 

// añadir la tarea
const addTask = e =>{
  e.preventDefault();
  const taskName = input.value.trim();
  if(!taskName.length){
    alert('Por favor ingrese una tarea');
    return;
  } else if(tasks.some(task => task.name.toLowerCase() === taskName.toLowerCase())) {
    alert('Ya existe esa tarea');
    return;
  };

  tasks = [...tasks, {name: taskName, taskId: tasks.length++}];
  input.value = '';

  renderTaskList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};

// remover todas las tareas
const removeAll = ()=>{
  tasks = [];

  renderTaskList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};

// remover de a una tarea
const removeTask = e =>{
  if(!e.target.classList.contains('delete-btn')) return;
  const filterID = Number(e.target.dataset.id);
  tasks = tasks.filter(task => task.taskId !== filterID);
  
  renderTaskList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
}

// crear funcion init()
const init = () =>{
  hideDeleteAll(tasks);
  renderTaskList(tasks);
  addForm.addEventListener('submit', addTask);
  deleteBtn.addEventListener('click', removeAll);
  tasksList.addEventListener('click', removeTask);
};

// llamando a las funciones
init();