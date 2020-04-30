function Task(props) {
    const {
        id,
        completed = false,
        text,
        deadline,
        isEdit = false,
        hidden = false
    } = props;

    this.props = props;
    this.hidden = hidden;
    this.isEdit = isEdit;
    this.task = {
        id,
        completed,
        text,
        deadline
    };
    this._clickCount = 0;
    this.createElement();
}

Task.prototype.createElement = function () {
    const completeEl = createElement('input', {
            className: "toggle",
            type: "checkbox"
        }),
        taskText = createElement('span', {}, this.task.text),
        deadline = createElement('span', {}, `(${this.task.deadline.split('T')[0]})`),
        destroyBtn = createElement('button', {
            className: 'destroy'
        }),
        viewEl = createElement('div', {
            className: 'view',
            children: [completeEl, taskText, deadline, destroyBtn]
        }),
        editEl = createElement('input', {
            className: "edit",
            value: this.task.text
        }),
        changeBtn = createElement('button', {
            className: "visually-hidden",
            type: "submit"
        }, 'Изменить'),
        editForm = createElement('form', {
            children: [editEl, changeBtn]
        }),
        taskEl = createElement('li', {
            children: [viewEl, editForm]
        });

    completeEl.checked = this.task.completed;

    if (this.isEdit) {
        taskEl.classList.add('editing');
    }

    taskEl.hidden = this.hidden;
    taskText.addEventListener('click', this.dbClick.bind(this));
    editForm.addEventListener('submit', this.changeTask.bind(this));
    completeEl.addEventListener('click', this.toggleComplete.bind(this));
    destroyBtn.addEventListener('click', this.destroy.bind(this));
    this._el = taskEl;
    this._editEl = editEl;
    this._taskText = taskText;
    this._completeEl = completeEl;
}

Task.prototype.destroy = function(e) {
    e.preventDefault();

    this._el.remove();
    this.props.onDestroy(this);
}

Task.prototype.toggleComplete = function(e) {
    this.task.completed = this._completeEl.checked;

    this.render();
    this.props.onTaskChange(this);
}

Task.prototype.changeTask = function(e) {
    e.preventDefault();
    const { value: newText} = this._editEl;

    this.task.text = newText;
    this.isEdit = false;

    this.render();
    this.props.onTaskChange(this);
}

Task.prototype.dbClick = function dbClick(e) {
    e.preventDefault();
    this._clickCount = this._clickCount + 1;

    setTimeout(() => {
        this._clickCount = Math.max(0, this._clickCount - 1);
    }, 300);

    if (this._clickCount === 2) {
        this._clickCount = 0;

        this.isEdit = true;
        this.render();
    }
}

Task.prototype.render = function () {
    this._el.hidden = this.hidden;

    if (this.isEdit) {
        this._el.classList.add('editing');
    } else {
        this._el.classList.remove('editing');
    }

    this._editEl.value = this.task.text;
    this._taskText.innerText = this.task.text;
    this._completeEl.checked = this.task.completed;

    return this._el;
}

Task.prototype.updateProps = function (newProps) {
    const {
        hidden,
    } = newProps;
    let taskChanged = false;

    if (hidden !== this.hidden) {
        this.hidden = hidden;
        taskChanged = true;
    }

    ['id', 'completed', 'text'].forEach(key => {
        if (key in newProps && newProps[key] !== this.task[key]) {
            this.task[key] = newProps[key];
            taskChanged = true;
        }
    });

    if (taskChanged) {
        this.render();
    }
}

Task.prototype.isViewedAndUncompleted = function() {
    return !this.hidden && !this.task.completed; // this.hidden === false && this.task.completed === false
}

//                              this.hidden === false       vs     !this.hidden
// if this.hidden is false  =>  false       === false => true   => !false
// this.hidden is true      =>  true        === false => false  => !true
