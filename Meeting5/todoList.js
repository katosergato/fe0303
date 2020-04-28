function TodoList(props) {
    const { tasks = [], filter } = props; // tasks = props.tasks

    this.props = props;
    this._list = document.querySelector('.todo-list');
    this.destroyTask = this.destroyTask.bind(this);

    if (props.tasksGetUrl) {
        this.tasks = [];
        this.getTasks();
    } else {
        this.tasks = tasks.map(task => this.createTask(task));
    }

    this.render();
}

TodoList.prototype.getTasks = function() {
    fetch(this.props.tasksGetUrl)
        .then(response => response.json())
        .then(tasks => {
            this.tasks = tasks.map(task => this.createTask(task));
            this.render();
        });
}

TodoList.prototype.createTaskOnServer = function(task) {
    const currentTime = new Date();

    fetch(this.props.tasksGetUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...task,
            createdAt: currentTime.toJSON()
        })
    }).then(response => response.json())
    .then(task => this.addTask(task));
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
    return new Task({
        ...task,
        hidden: this.isTaskHidden(task.completed, this.props.filter),
        onTaskChange: taskChangeHandler,
        onDestroy: this.destroyTask
     });
}

TodoList.prototype.destroyTask = function(taskObj) {
    this.tasks = this.tasks.filter(task => task !== taskObj);
    filter.updateProps({ itemsCount: todoList.getLength() });
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
    return this.tasks.filter(taskObj => !taskObj.hidden).length;
}

TodoList.prototype.updateProps = function(newProps) {
    this.props = {
        ...this.props,
        ...newProps
    };

    this.updateTasksProps();
}

TodoList.prototype.updateTasksProps = function() {
    this.tasks.forEach(taskObj => taskObj.updateProps({
        hidden: this.isTaskHidden(taskObj.task.completed, this.props.filter)
    }));
}

const filter = new Filter({
    onChangeFilter: changeFilter
});
const todoList = new TodoList({
    // tasks: [
    //     {
    //         id: 1,
    //         completed: false,
    //         text: 'Task 1'
    //     },
    //     {
    //         id: 2,
    //         completed: true,
    //         text: 'Task 2'
    //     },
    //     {
    //         id: 3,
    //         completed: false,
    //         text: 'Task 3'
    //     },
    //     {
    //         id: 4,
    //         completed: true,
    //         text: 'Task 4'
    //     }
    // ],
    filter: filter.getFilter(),
    tasksGetUrl: 'https://5d9969125641430014051850.mockapi.io/users/1/tasks'
});
const todoForm = new TodoForm({
    onSubmit: addTask
});

filter.updateProps({ itemsCount: todoList.getLength() });

function changeFilter(newFilter) {
    todoList.updateProps({ filter: newFilter });
    filter.updateProps({ itemsCount: todoList.getLength() });
}

function taskChangeHandler() {
    todoList.updateTasksProps();
    filter.updateProps({ itemsCount: todoList.getLength() });
}

function addTask(task) {
    todoList.createTaskOnServer(task);
}
