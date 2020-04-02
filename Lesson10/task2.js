function checkAccess( password ) {
    return this.password === password;
}

const admins = [
    {
        firstName: 'Adm8',
        lastName: 'In',
        password: '12345678'
    },
    {
        firstName: 'Adm9',
        lastName: 'In',
        password: '12345679'
    },
    {
        firstName: 'Adm0',
        lastName: 'In',
        password: '12345670'
    },
    {
        firstName: 'Adm7',
        lastName: 'In',
        password: '12345677'
    },
].map(user => {
    user.checkAccess = checkAccess;

    return user
});

function getAccess() {
    const password = prompt('Get password:'),
        admin = admins.find(user => user.checkAccess(password));

    if (admin) {
        console.info('Welcome!', admin);
    } else {
        console.error('Access Denided');
    }
}

console.log( admins );
getAccess();
