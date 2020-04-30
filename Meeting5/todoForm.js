function TodoForm(props) {
    this._formEl = document.querySelector('.header');
    this._completeAllEl = this._formEl.querySelector('.complete-all');
    this._taskInputEl = this._formEl.querySelector('.new-todo');
    this._deadlineEl = this._formEl.querySelector('.deadline');

    this.props = props;

    this._formEl.addEventListener('submit', this.submitForm.bind(this));
    this._completeAllEl.addEventListener('change', this.completeHandler.bind(this));
}

TodoForm.prototype.submitForm = function( event ) {
    event.preventDefault();
    const task = {
        completed: this._completeAllEl.checked,
        text: this._taskInputEl.value,
        deadline: this._deadlineEl.value
    };
    const { onSubmit } = this.props;

    this._taskInputEl.value = '';
    this._deadlineEl.value = '';

    console.log(task);
    if (onSubmit) {
        onSubmit(task);
    }
}

TodoForm.prototype.completeHandler = function() {
    if (this._completeAllEl.checked) {
        this.props.onComplete(this._completeAllEl.checked);
    }
}
