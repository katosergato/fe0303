const userPossibility = {
        checkAccess
    },
    users = [
        createUser('a', 'b'),
        createUser('b', 'c'),
        createUser('c', 'd'),
    ],
    registrationForm = document.querySelector('.registration'),
    loginForm = document.querySelector('.login');

registrationForm.addEventListener('submit', function( event ) {
    event.preventDefault();

    const {login, password} = registrationForm.elements,
        newUser = createUser(login.value, password.value);

    users.push(newUser);

    alert('USER REGISTERED');

    login.value = '';
    password.value = '';
});

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const {login, password} = loginForm.elements;

    getAccess(login.value, password.value);
});

function createUser(login, password) {
    const user = {
        login,
        password,
    };

    user.__proto__ = userPossibility;

    return user;
}

function getAccess(login, password) {
    const user = users.find(user => user.checkAccess(login, password));

    if (user) {
        console.info('Welcome', user);
    } else {
        console.error('Access Denided', users);
    }
}

function checkAccess(login, password) {
    return this.login === login && this.password === password;
}
