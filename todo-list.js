class Task {
  constructor(id, title, tasks, urgent, urgentImg) {
    this.id = id;
    this.title = title;
    this.tasks = tasks || [];
    this.urgent = urgent || false;
    this.urgentImg = urgentImg || "images/urgent.svg";
  }

  saveToStorage(tasksArray) {
    var strTasksArray = JSON.stringify(tasksArray);
    localStorage.setItem('tasks', strTasksArray);
  }

  updateStorage(array) {
    localStorage.removeItem('tasks');
    this.saveToStorage(array)
  }

  deleteFromStorage() {
    var items = JSON.parse(localStorage.getItem('tasks'))
    items.splice(tasksArray.indexOf(this),1);
    this.updateStorage(items)
  }

  updateItem(parentId, childElementId) {
    var items = JSON.parse(localStorage.getItem('tasks'))
    this.tasks.map(item => {
        (item.id == parseInt(childElementId.dataset.id)) ? item.completed = !item.completed : null;
      })
    items.splice(tasksArray.indexOf(this),1, this);
    this.updateStorage(items)
  }

  updateUrgency() {
    var items = JSON.parse(localStorage.getItem('tasks'))
    this.urgent = !this.urgent;
    (this.urgent === false) ? this.urgentImg = "images/urgent.svg" : this.urgentImg = "images/urgent-active.svg";
    items.splice(tasksArray.indexOf(this),1, this);
    this.updateStorage(items)
    console.log(this)
  }

   // updateTask() {

  // }
}

class Item {
  constructor(id, item) {
    this.id = id;
    this.item = item;
    this.completed = false;
  }
}