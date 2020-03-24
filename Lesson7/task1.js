/**
 * Напишите код, выполнив задание из каждого пункта отдельной строкой:

    1.  Создайте пустой объект user.
    2.  Добавьте свойство name со значением Kato.
    3.  Добавьте свойство group со значением fe0303.
    4.  Измените значение свойства name на Julia.
    5.  Удалите свойство name из объекта.
    6.  Создайте копию обьекта user.
    7.  Проверьте, что созданный обьект не пустой.
    8.  Узнайте количество свойств в нем.
    9.  Измените в копии свойство name на Kato.
    10. Сравните свойства этих двух обьектов и придумайте структуру данных для отображения их разницы.
*/

const propName = 'age';
const user = {
    name: 'Kato',
    group: 'fe0303',
    'user group': true,
    [propName]: 18
};
// const user = new Object();

user.name = 'Julia';
// user[propName] = 20;

console.log( user );
console.log(propName);
console.log( user[propName] );
console.log( user['age'] );
console.log( user.name );

delete user[propName];

console.log( user );
console.log( user.propName );

user.propName = 99;

console.log( user );

const userCopy = {};

for (const key in user) {
    console.log(key);
    userCopy[key] = user[key];
}

userCopy.name = 'Kato';

console.log(userCopy);
console.log(user);
console.log( user === userCopy );

const dUser = user;

console.log( dUser === user, dUser, user );

dUser.name = 'Maxim';

console.log( user );

const userCopy2 = Object.assign({}, user);

console.log(userCopy2 === user, userCopy2);

function isEmpty( obj ) {
    for ( const key in obj ) {
        return false;
    }

    return true;
}

console.log( isEmpty( userCopy2 ) === false ); // true
console.log( isEmpty( {} ) === true ); // true
console.log( isEmpty( {vlad: true} ) === false ); // true

function objLength( obj ) {
    let count = 0;

    for (const key in obj) {
        count++; // count = count + 1;
        // console.log(key, count);
    }

    return count;
}

console.log('objLength');
console.log( objLength( userCopy2 ), objLength( userCopy2 ) === 4 ); // true
console.log( objLength( {} ), objLength( {} ) === 0 ); // true
console.log( objLength( {vlad: true} ), objLength( {vlad: true} ) === 1 ); // true


// const arr = {
//     0: 'hello',
//     1: 'buy',
//     2: 'qwerty',
//     3: true,
//     4: 12,
//     length: 5
// };

const arr = ['hello', 'buy', 'qwerty', true, 12];

console.log(arr);
console.log(arr.length);
console.log( arr[0] );
console.log( arr[1] );
console.log( arr[4] );

user['5'] = 'this is 5';
user['0'] = 'this is 0';
user[2] = 'this is 2';
user[-8] = 'this is -8';
console.log( user );


arr.push('apple');

console.log( arr, arr.length );

const deletedEl = arr.pop();

console.log( arr, arr.length, deletedEl);

const firstElOld = arr.shift();

console.log( arr, arr.length, firstElOld);

arr.unshift(deletedEl);

console.log( arr, arr.length);

// arr.length = 2;

// console.log( arr, arr.length);

delete arr[2];

console.log( arr, arr.length);

arr[99] = 99;

console.log( arr, arr.length);
console.log( '3' in arr );
console.log( '2' in arr );

// for (const idx in arr) {
//     console.log({idx});
// }

function includes(arr, value) {
    for(let i=0; i<arr.length; i++) {
        if (arr[i] === value) {
            return true;
        }
    }

    return false;
}

console.log( includes(arr, 12) ); // true
console.log( includes(arr, 15) ); // false

console.log( arr.includes(12) ); // true
console.log( arr.includes(15) ); // false

console.log( user, userCopy);

function getDiff( obj1, obj2) {
    const result = [];

    for (const key in obj1) {
        if (key in obj2) {
            if (obj2[key] !== obj1[key]) {
                result.push(key);
            }
        } else {
            result.push(key);
        }
    }

    for (const key in obj2) {
        if (!(key in obj1)) {
            result.push(key);
        }
    }

    return result;
}

console.log( getDiff(user, userCopy) );
