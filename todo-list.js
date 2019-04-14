class Task {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks || [];
    this.urgent = false;
  }

  saveToStorage(tasksArray) {
    var strTasksArray = JSON.stringify(tasksArray);
    localStorage.setItem('tasks', strTasksArray);
  }

  deleteFromStorage() {
    var localStorageItems = JSON.parse(localStorage.getItem('tasks'))
    localStorageItems.splice(tasksArray.indexOf(this),1);
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(localStorageItems))
  }


  // updateTask() {

  // }

  updateItem(parentId, childElementId) {
    var localStorageItems = JSON.parse(localStorage.getItem('tasks'))
    this.tasks.map(item => {
        (item.id == parseInt(childElementId.dataset.id)) ? item.completed = !item.completed : null;
      })
    localStorageItems.splice(tasksArray.indexOf(this),1, this);
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(localStorageItems))
    console.log(localStorage)

  }

  // updateUrgency() {
  //  this.urgent = !this.urgent;
  // }
}

class Item {
  constructor(id, item) {
    this.id = id;
    this.item = item;
    this.completed = false;
  }
}