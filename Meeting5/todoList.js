function TodoList(props) {
    const { tasks = [], filter } = props; // tasks = props.tasks

    this.props = props;
    this._list = document.querySelector('.todo-list');
    this.tasks = tasks.map(task => this.createTask(task));

    this.render();
}

TodoList.prototype.isTaskHidden = function(taskCompleted, filter) {
    switch(filter) {
        case '#/completed':
            return taskCompleted === true;
        case '#/active':
            return taskCompleted === false;
        default:
            return false;
    }
}

TodoList.prototype.createTask = function(task) {
    return new Task({...task, hidden: this.isTaskHidden(task.completed, this.props.filter) });
}

TodoList.prototype.render = function() {
    render(this.tasks.map(taskObj => taskObj.render()), this._list);
}

TodoList.prototype.addTask = function(task) {
    const taskObj = this.createTask({id: Date.now(), ...task});

    this.tasks.push(taskObj);
    this.render();
}

TodoList.prototype.getLength = function() {
    return this.tasks.length;
}

const filter = new Filter();
const todoList = new TodoList({
    tasks: [
        {
            id: 1,
            completed: false,
            text: 'Task 1'
        },
        {
            id: 2,
            completed: true,
            text: 'Task 2'
        },
        {
            id: 3,
            completed: false,
            text: 'Task 3'
        },
        {
            id: 4,
            completed: true,
            text: 'Task 4'
        }
    ],
    filter: filter.getFilter()
});
const todoForm = new TodoForm({
    onSubmit: todoList.addTask.bind(todoList)
});


console.log( todoList, todoForm, filter );
