function Task(props) {
    const { id, completed, text, isEdit = false, hidden = false } = props;

    this.hidden = hidden;
    this.isEdit = isEdit;
    this.task = { id, completed, text };
    this.createElement();
}

Task.prototype.createElement = function() {
    const completeEl = createElement('input', {
            className: "toggle",
            type: "checkbox"
        }),
        taskText = createElement('span', {}, this.task.text),
        destroyBtn = createElement('button', { className: 'destroy'}),
        viewEl = createElement('div', {
            className: 'view',
            children: [completeEl, taskText, destroyBtn]
        }),
        editEl = createElement('input', {
            className: "edit",
            value: this.task.text
        }),
        changeBtn = createElement('button', {className: "visually-hidden", type: "submit"}, 'Изменить'),
        editForm = createElement('form', { children: [editEl, changeBtn]}),
        taskEl = createElement('li', { children: [viewEl, editForm]});

    completeEl.checked = this.task.completed;

    if (this.isEdit) {
        taskEl.classList.add('editing');
    }

    taskEl.hidden = this.hidden;
    this._el = taskEl;
}

Task.prototype.render = function() {
    this._el.hidden = this.hidden;

    return this._el;
}
