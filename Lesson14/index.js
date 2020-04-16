const loginformEl = document.querySelector('.loginform'),
    loginformInputs = loginformEl.querySelectorAll('.loginform__input');

loginformInputs.forEach(function(loginformInput) {
    loginformInput.addEventListener('focus', loginformInputFocusHandler);
    loginformInput.addEventListener('blur', loginformInputBlurHandler);
});

loginformEl.addEventListener('submit', loginFormSubmit);

function loginformInputFocusHandler( event ) {
    const inputEl = event.currentTarget,
        rowEl = inputEl.closest('.loginform__row');

    rowEl.classList.add('loginform__row--active');
}

function loginformInputBlurHandler( event ) {
    const inputEl = event.currentTarget,
        rowEl = inputEl.closest('.loginform__row');

    if (!inputEl.value) {
        rowEl.classList.remove('loginform__row--active');
    }
}

function showError(formEl, inputName, textErr) {
    const inputEl = formEl.elements[inputName], // formEl.querySelector(`[name="${inputName}"]`)
        inputRow = inputEl.closest('.loginform__row'),
        errorEl = inputRow.querySelector('.loginform__input-error');

    errorEl.innerText = textErr;

    if (textErr) {
        inputRow.classList.add('loginform__row--error');
        inputRow.classList.add('loginform__row--active');
        inputEl.focus();
    } else {
        inputRow.classList.remove('loginform__row--error');
    }
}

function loginFormSubmit( event ) {
    event.preventDefault();

    const data = {};

    loginformInputs.forEach(loginformInput => {
        data[loginformInput.name] = loginformInput.value;
    });

    if (data.login === '') {
        showError(loginformEl, 'login', 'Please, say me your login');
        return ;
    } else {
        showError(loginformEl, 'login', '');
    }

    if (data.password === '') {
        showError(loginformEl, 'password', 'Please, say me your password');

        return ;
    } else {
        showError(loginformEl, 'password', '');
    }

    const request = fetch('https://5d9969125641430014051850.mockapi.io/users')
        .then(response => response.json())
        .then(users => {
            console.log(users);

            const user = users.find(userData => userData.login === data.login && userData.password === data.password);

            if (!user) {
                return userRegister(data);
            } else {
                console.log('user found', user);
            }
        })
        .catch((error) => console.log(error));

    console.log(request);
}

function userRegister( user ) {
    fetch(
        'https://5d9969125641430014051850.mockapi.io/users',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(user)
        }
    ).then(resonse => resonse.json())
    .then(user => console.log('user registered', user));
}
