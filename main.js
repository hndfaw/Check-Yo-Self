var sidebarTodoItemInput = document.querySelector('.sidebar__form__todo-item-input');
var sidebarTodoItemBtn = document.querySelector('.sidebar__form__todo-item-btn');
var sidebarListItems = document.querySelector('.sidebar__form-list-items');
//-----------Add items to browser-----------

sidebarTodoItemBtn.addEventListener('click', function() {
    sidebarListItems.innerHTML += `
       <p class="item-js">
            <span>
                <img class="item-delete-btn" src="images/delete.svg">
            </span> ${sidebarTodoItemInput.value}
        </p>
    `
    sidebarTodoItemInput.value = "";    
});