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
    this.props.beforeFetch();
    fetch(this.props.tasksGetUrl)
        .then(response => response.json())
        .then(tasks => {
            this.tasks = tasks.map(task => this.createTask(task));
            this.render();
        })
        .then(this.props.onTasksUpdate)
        .then(this.props.afterFetch);
}

TodoList.prototype.createTaskOnServer = function(task) {
    const currentTime = new Date();

    this.props.beforeFetch();
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
    .then(task => this.addTask(task))
    .then(this.props.onTasksUpdate)
    .then(this.props.afterFetch);
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
    this.props.beforeFetch();
    fetch(`${this.props.tasksGetUrl}/${taskObj.task.id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => this.tasks = this.tasks.filter(task => task !== taskObj))
    .then(this.props.onTasksUpdate)
    .then(this.props.afterFetch);
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

TodoList.prototype.getUncompletedViewedTasks = function() {
    return this.tasks.filter(taskObj => taskObj.isViewedAndUncompleted());
}

TodoList.prototype.updateTask = function(task) {
    const taskObj = this.tasks.find(t => t.task.id === task.id);

    if (taskObj) {
        taskObj.updateProps({...task, hidden: this.isTaskHidden(task.completed, this.props.filter)});
    }
}

const loader = document.querySelector('.loader');
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
    tasksGetUrl: 'https://5d9969125641430014051850.mockapi.io/users/1/tasks',
    onTasksUpdate: () => filter.updateProps({ itemsCount: todoList.getLength() }),
    beforeFetch,
    afterFetch
});
const todoForm = new TodoForm({
    onSubmit: addTask,
    onComplete: completeAllViewvedTask
});

filter.updateProps({ itemsCount: todoList.getLength() });

function beforeFetch() {
    loader.classList.add('loader--active');
}

function afterFetch() {
    loader.classList.remove('loader--active');
}

function changeFilter(newFilter) {
    todoList.updateProps({ filter: newFilter });
    filter.updateProps({ itemsCount: todoList.getLength() });
}

function udateTaskOnServer(task) {
    return fetch(`${todoList.props.tasksGetUrl}/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
}

function taskChangeHandler(taskObj) {
    beforeFetch();

    udateTaskOnServer(taskObj.task)
    .then(updatedTask => todoList.updateTask(updatedTask))
    .then(todoList.props.onTasksUpdate)
    .then(afterFetch);
}

function addTask(task) {
    todoList.createTaskOnServer(task);
}

function completeAllViewvedTask() {
    const tasks = todoList.getUncompletedViewedTasks(),
        tasksFetch = tasks.map(tasksObj => udateTaskOnServer({
            ...tasksObj.task,
            completed: true
        }));

    beforeFetch();
    Promise.all(tasksFetch)
        .then(updatedTasks => {
            updatedTasks.forEach(task => {
                todoList.updateTask(task);
            })
        })
        .then(todoList.props.onTasksUpdate)
        .then(afterFetch);
}
