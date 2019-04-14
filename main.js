var sidebarTodoItemInput = document.querySelector('.sidebar__form__todo-item-input');
var sidebarTodoItemBtn = document.querySelector('.sidebar__form__todo-item-btn');
var sidebarListItems = document.querySelector('.sidebar__form-list-items');
var makeTaskBtn = document.querySelector('.sidebar__form__make-task-btn');
var taskHub = document.querySelector('.task-hub');
var taskTitleInput = document.querySelector('.sidebar__form__todo-title-input');
var taskCardItems = document.querySelector('.task-card__items');
var sidebar = document.querySelector('.sidebar');
var itemCheckbox = document.querySelector('.item-checkbox');
var taskCard = document.getElementsByClassName('task-card');
var tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
var itemsArray = [];

// ----------Event Listeners------------

makeTaskBtn.addEventListener('click', verifyTaskTitle);
sidebarTodoItemBtn.addEventListener('click', verifyItems);

//-----------Add items to browser-----------

function verifyItems() {
  if(sidebarTodoItemInput.value != "") {
    pushItemsToArray()
  }
}

function pushItemsToArray() {
  var newItem = new Item (Date.now(), sidebarTodoItemInput.value)
  itemsArray.push(newItem);
  addItemToDOM(newItem);
}

 function addItemToDOM(newItem) {
    if (sidebarTodoItemInput.value != "") {
        sidebarListItems.innerHTML += `
       <p class="item-template-literals" data-id="${newItem.id}">
            <span>
                <img class="item-delete-btn" src="images/delete.svg">
            </span> ${newItem.item}
        </p>
    `
    }
    sidebarTodoItemInput.value = "";
};

// ------------ Send elements to local storage ----------------

function addTaskToDOM(newTask) {

    taskHub.innerHTML += `
    <article class="task-card" data-id="${newTask.id}">
      <h3 class="task-card__title">${newTask.title}</h3>
      <div class="task-card__items">
        ${newTask.tasks.map((item) => `
        <div class="item-container">
          <input type="checkbox" class="item-checkbox" data-completed="${item.completed}" data-id="${item.id}"  >
          <p>${item.item}</p>
        </div>
        `
        ).join('')}

      </div>
      <div class="task-card__footer">
        <div class="task-card__footer__container task-card-urgent-container">
          <img class="task-card__footer__urgency-btn" src="images/urgent.svg">
          <p class="task-card__footer__text">URGENT</p>
        </div>
        <div class="task-card__footer__container task-card-delete-container">
          <img class="task-card__footer__close-btn" src="images/delete.svg">
          <p class="task-card__footer__text">DELETE</p>
        </div>
      </div>
    </article>
    `
    itemsArray = [];
}

function verifyTaskTitle(e) {
  e.preventDefault();
  if (taskTitleInput.value != "" && itemsArray.length != 0) {
    createTask(e);
  } else {
    alert('Please add title and item/s!');
  }
  
}

function createTask() {
  var newTask = new Task (Date.now(), taskTitleInput.value, itemsArray);
  tasksArray.push(newTask);
  newTask.saveToStorage(tasksArray)
  addTaskToDOM(newTask);
  clearFields();
}

function clearFields() {
  taskTitleInput.value = "";
  sidebarListItems.innerHTML = "";
}

sidebar.addEventListener("click", function(e) {
  var parentEl = e.target.parentNode.parentNode;
  e.target.className.includes('item-delete-btn') ? removeFromArray(parentEl) : null;
});

function removeFromArray(parentEl) {
  var parentId = parentEl.dataset.id;
  var updatedItemsArray = []
  itemsArray.map(function(item) {
    if(parentId != item.id) {
      updatedItemsArray.push(item);
    }
    parentEl.style.display = "none";
  })
  itemsArray = updatedItemsArray;
}

if (tasksArray.length != 0) {
  reInstantiatingTasks()
}
 
function reInstantiatingTasks() {
  var myArray = JSON.parse(localStorage.getItem('tasks'))

	var newTasksArray = myArray.map(task => {
		task = new Task(task.id, task.title, task.tasks, task.urgent)
    return task;
	}) 
  tasksArray = newTasksArray;
  
  updateDOM(newTasksArray)
}

function updateDOM(newTasksArray) {
  newTasksArray.forEach(item => {
    addTaskToDOM(item)
  });
}

// ------- Remove tasks from  -------

taskHub.addEventListener("click", function(e) {
  var parentId = e.target.parentNode.parentNode.parentNode.dataset.id;
  e.target.className.includes('task-card__footer__close-btn') ? removeTask(parentId) : null;
  e.target.className.includes('item-checkbox') ? itemsCompleted(parentId, e.target) : null;
});

function removeTask(parentId) {
	var newArray = tasksArray.map(item => {
    (item.id == parseInt(parentId)) ? item.deleteFromStorage(): null;
    return item
  })
  taskHub.innerHTML = "";
  reInstantiatingTasks()
}

function itemsCompleted(parentId, childElementId) {
	var newArray = tasksArray.map(item => {
    (item.id == parseInt(parentId)) ? item.updateItem(parentId, childElementId): null;
  })
}
