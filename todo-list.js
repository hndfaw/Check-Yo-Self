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

    // deleteFromStorage() {

    // }

    // updateToDo() {

    // }

    // updateTask() {

    // }

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