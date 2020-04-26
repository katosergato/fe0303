function TodoForm(props) {
    this._formEl = document.querySelector('.header');
    this._completeAllEl = this._formEl.querySelector('.complete-all');
    this._taskInputEl = this._formEl.querySelector('.new-todo');

    this.props = props;

    this._formEl.addEventListener('submit', this.submitForm.bind(this));
}

TodoForm.prototype.submitForm = function( event ) {
    event.preventDefault();
    const task = {
        completed: this._completeAllEl.checked,
        text: this._taskInputEl.value
    };
    const { onSubmit } = this.props;

    this._taskInputEl.value = '';

    if (onSubmit) {
        onSubmit(task);
    }
}
