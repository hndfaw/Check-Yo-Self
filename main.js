// -----------------Querie Selectors-----------------

              //-----Inputs----
var sidebarTodoItemInput = document.querySelector('.sidebar__form__todo-item-input');
var taskTitleInput = document.querySelector('.sidebar__form__todo-title-input');
var searchInput = document.querySelector('.header__form__search-input');
              //-----Buttons----
var itemMakerBtn = document.querySelector('.sidebar__form__todo-item-btn');
var taskMakerBtn = document.querySelector('.sidebar__form__make-task-btn');
var clearAllbtn = document.querySelector('.sidebar__form__clear-all-btn');
var urgencyFilterBtn = document.querySelector('.sidebar__form__urgency-fulter-btn');
var searchBtn = document.querySelector('.header__form__search-btn');
              //----Sections----
var taskHub = document.querySelector('.task-hub');
var sidebar = document.querySelector('.sidebar');
              //----Items ------
var sidebarListItems = document.querySelector('.sidebar__form-list-items');
var taskCard = document.getElementsByClassName('task-card');
var taskTitle = document.getElementsByClassName('task-card__title');
              //----Arrays -----
var tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
var itemsArray = [];

// ---------- On Load ------------------

 (tasksArray.length != 0) ? reInstantiatingTasks() : null;


// ----------Event Listeners--------------

itemMakerBtn.addEventListener('click', verifyItems);
taskMakerBtn.addEventListener('click', verifyTaskTitle);
clearAllbtn.addEventListener('click', clearFields);
urgencyFilterBtn.addEventListener('click', verifyUrgentTasks);
searchBtn.addEventListener('click', searchFunction);
searchInput.addEventListener('keyup', clearSearch);

// ----------Event Bubbling------------

sidebar.addEventListener("click", function(e) {
  e.preventDefault();
  var parentEl = e.target.parentNode.parentNode;
  e.target.className.includes('item-delete-btn') ? removeFromArray(parentEl) : null;
});

taskHub.addEventListener("click", function(e) {
  var parentId = e.target.parentNode.parentNode.parentNode.dataset.id;
  e.target.className.includes('task-card__footer__close-btn') ? verifyRemoveTask(parentId, e.target) : null;
  e.target.className.includes('item-checkbox') ? itemsCompleted(parentId, e.target) : null;
  e.target.className.includes('task-card__footer__urgency-btn') ? urgentBtn(parentId, e.target) : null;
});

/*------------Enters Activating Functions------*/

searchInput.addEventListener("keyup", function(e) {
   (e.keyCode === 13) ? searchFunction() : null;
});

sidebarTodoItemInput.addEventListener("keyup", function(e) {
   (e.keyCode === 13) ? verifyItems() : null;
  
});

taskTitleInput.addEventListener("keyup", function(e) {
  (e.keyCode === 13) ? verifyTaskTitle() : null;
});

/*----------------Add Items------------------*/

function verifyItems() {
  (sidebarTodoItemInput.value != "") ? pushItemsToArray() : null;
}

var pushItemsToArray = () => {
  var newItem = new Item (Date.now(), sidebarTodoItemInput.value)
  itemsArray.push(newItem);
  addItemToDOM(newItem);
}

 var addItemToDOM = newItem => {
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

function verifyTaskTitle() {
  (taskTitleInput.value != "" && itemsArray.length != 0) ? createTask() : alert('Please add title and item/s!');
  }
  
var createTask = () => {
  var newTask = new Task (Date.now(), taskTitleInput.value, itemsArray);
  tasksArray.push(newTask);
  newTask.saveToStorage(tasksArray)
  addTaskToDOM(newTask);
  clearFields();
}

function clearFields() {
  taskTitleInput.value = "";
  sidebarListItems.innerHTML = "";
  sidebarTodoItemInput.value = "";
}

function addTaskToDOM(newTask) {

  taskHub.innerHTML = `
  <article class="task-card task-card-${newTask.urgent}" data-id="${newTask.id}">
    <h3 class="task-card__title task-card-title-item-${newTask.urgent}">${newTask.title}</h3>
    <div class="task-card__items task-card-title-item-${newTask.urgent}">
      ${newTask.tasks.map((item) => `
      <div class="item-container">
        <img src="${item.completedImg}" class="item-checkbox" data-id="${item.id}">
        <p class="text-${item.completed} item-checkbox-text" data-id="${item.id}" >${item.item}</p>
      </div>
      `
      ).join('')}
    </div>
    <div class="task-card__footer">
      <div class="task-card__footer__container task-card-urgent-container">
        <img class="task-card__footer__urgency-btn" src="${newTask.urgentImg}">
        <p class="task-card__footer__text task-card__footer__text-${newTask.urgent}">URGENT</p>
      </div>
      <div class="task-card__footer__container task-card-delete-container">
        <img class="task-card__footer__close-btn" src="images/delete.svg">
        <p class="task-card__footer__text">DELETE</p>
      </div>
    </div>
  </article>
  `
  + taskHub.innerHTML;
    itemsArray = [];
}

/*------------Remove Items-------------------*/

var removeFromArray = parentEl => {
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
 
function reInstantiatingTasks() {
  var myArray =  JSON.parse(localStorage.getItem('tasks'))

	var newTasksArray = myArray.map(task => {
		task = new Task(task.id, task.title, task.tasks, task.urgent, task.urgentImg)
    return task;
	}) 
  tasksArray = newTasksArray;
  updateDOM(newTasksArray)
}

function updateDOM(array) {
  array.forEach(item => {
    addTaskToDOM(item)
  });
}


function verifyRemoveTask(parentId) {
  var numTrue = 0;
  var numTasks = 0;
  tasksArray.map(item => {
    if (item.id == parseInt(parentId)) {
      numTasks = item.tasks.length
      item.tasks.map(item => {
        if(item.completed === true) {
          numTrue++
        }
      })
    }
  })
  runRemoveTask(numTrue, numTasks, parentId);
}

var runRemoveTask = (numTrue, numTasks, parentId) => {
  (numTrue === numTasks) ? removeTask(parentId) : alert('All items need to be finished...')
}

var removeTask = parentId => {
  var updatedArray = [];
tasksArray.map(item => {
    (item.id == parseInt(parentId)) ? item.deleteFromStorage(): updatedArray.push(item);
  })
  updatePage(updatedArray)
}

var itemsCompleted = (parentId, childElementId) => {
	tasksArray.map(item => {
    (item.id == parseInt(parentId)) ? item.updateItem(parentId, childElementId): null;
    return item
  })
  updatePage(tasksArray)
}

var urgentBtn = (parentId, element) => {
  tasksArray.map(item => {
      (item.id == parseInt(parentId)) ? item.updateUrgency() : null;
    })
    updatePage(tasksArray)
  }

/*-----------Update Page------------*/

function updatePage(updatedTasksArray) {
  taskHub.innerHTML = ""
  updateDOM(updatedTasksArray);
}

/*---------------urgency filter-------------*/

function verifyUrgentTasks() {
  var numUrgents = 0
  tasksArray.map(function(item) {
    item.urgent === true ? numUrgents++ : null;
  })
  runUrgencyFilterVlue(numUrgents)
}

var runUrgencyFilterVlue = numUrgents => {numUrgents > 0 ? urgencyFilterValue() : null;}

var urgencyFilterValue = () => {
  var dataValue = urgencyFilterBtn.dataset;
  if (dataValue.value == "false") {
    dataValue.value = "true";
    urgencyFilter()
  } else {
    dataValue.value = "false";
    updatePage(tasksArray)
  }
}

var urgencyFilter = () => {  
  var filteredArray = [];
  tasksArray.map(item => {
    (item.urgent === true) ? filteredArray.push(item) : null;   
  })
  updatePage(filteredArray)
}

/*------------------Search function-----------------*/

function searchFunction() {
  var inputValue = searchInput.value.toUpperCase();
  console.log(inputValue)
  for (i = 0; i < taskTitle.length; i++) {
      if (taskTitle[i].textContent.toUpperCase().indexOf(inputValue) < 0) {
        taskTitle[i].parentNode.style.display = 'none';
    }
  }
}

function clearSearch() {
  if(searchInput.value == "") {
    updatePage(tasksArray);
  }
}