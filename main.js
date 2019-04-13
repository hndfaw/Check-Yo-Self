var sidebarTodoItemInput = document.querySelector('.sidebar__form__todo-item-input');
var sidebarTodoItemBtn = document.querySelector('.sidebar__form__todo-item-btn');
var sidebarListItems = document.querySelector('.sidebar__form-list-items');
var makeTaskBtn = document.querySelector('.sidebar__form__make-task-btn');
var taskHub = document.querySelector('.task-hub');
var taskInput = document.querySelector('.sidebar__form__todo-title-input');
var taskCardItems = document.querySelector('.task-card__items');
var sidebar = document.querySelector('.sidebar');
var tasksArray = [];
var itemsArray = [];

// ----------Event Listeners------------

makeTaskBtn.addEventListener('click', createTask);
sidebarTodoItemBtn.addEventListener('click', pushItemsToArray)

//-----------Add items to browser-----------

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
    <article class="task-card">
      <h3 class="task-card__title">${newTask.title}</h3>
      <div class="task-card__items">

        ${newTask.tasks.map((item) => `
        <input type="checkbox" class="item-checkbox">
        <div>${item.item}</div>`).join('')}

      </div>
      <div class="task-card__footer">
        <div class="task-card__footer__container">
          <img class="task-card__footer__urgency-btn" src="images/urgent.svg">
          <p class="task-card__footer__text">URGENT</p>
        </div>
        <div class="task-card__footer__container">
          <img class="task-card__footer__close-btn" src="images/delete.svg">
          <p class="task-card__footer__text">DELETE</p>
        </div>
      </div>
    </article>
    `
    itemsArray = [];
}

function createTask(e) {
  e.preventDefault();
  var newTask = new Task (Date.now(), taskInput.value, itemsArray);
  tasksArray.push(newTask);
  newTask.saveToStorage(tasksArray)
  addTaskToDOM(newTask);
  clearFields();
}

function clearFields() {
  taskInput.value = "";
  sidebarListItems.innerHTML = "";
}

sidebar.addEventListener("click", function(e) {
  var parentEl = e.target.parentNode.parentNode;
  e.target.className.includes('item-delete-btn') ? removeFromArray(parentEl) : null;
  
});

function removeFromArray(parentEl) {
  var parentId = parentEl.dataset.id;
  console.log(itemsArray)
  var updatedItemsArray = []
  itemsArray.map(function(item) {
    if(parentId != item.id) {
      updatedItemsArray.push(item);
    }
    parentEl.style.display = "none";
  })

  itemsArray = updatedItemsArray;
  console.log(itemsArray)
  
}

