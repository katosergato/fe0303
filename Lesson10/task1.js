const user = {
        firstName: 'Vasya',
        lastName: 'Bird',
        getName: getName
    },
    user1 = {
        firstName: 'Petya',
        lastName: 'Volf',
        getName
    };

function getName(key1, key2) {
    return `${this[key1]} ${this[key2]}`;
}

console.log( user.getName('firstName', 'lastName') );
console.log( user1.getName('lastName', 'firstName') );

console.log( getName.call(user, 'firstName', 'lastName') );
console.log( getName.call(user1, 'lastName', 'firstName') );

console.log( getName.apply(user, ['firstName', 'lastName']) );
console.log( getName.apply(user1, ['lastName', 'firstName']) );

const userName = getName.bind(user, 'firstName');
const user1Name = getName.bind(user1, 'lastName');

console.log( userName('lastName') );
console.log( user1Name('firstName') );
