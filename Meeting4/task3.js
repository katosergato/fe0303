function getFullName(firstName, secondName) {
    return firstName + ' ' + secondName;
}

console.log( getFullName('Vasya', 'Ivanov') ); // ?

const user = {
    firstName: 'Vasya',
    lastName: 'Ivanov',
    born: 1990,
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    getAgeAt( year ) {
        return year - this.born;
    },
    yearAfter( ...moments ) {
        return this.born + moments.reduce((sum, el) => el + sum, 0);
    }
};

console.log( user.getFullName() ); // Vaysa Ivanov
console.log( user.getAgeAt( 2000 ) ); // 10
console.log( user.getAgeAt( 2020 ) ); // 30
console.log( user.yearAfter( 10, 5 ) ); // 2005
console.log( user.yearAfter( 10, 5, 15 ) ); // 2020


function getFullName2(firstName, lastName) {
    return user.getFullName.call({firstName, lastName});
}

console.log( getFullName2('Petya', 'Vasilev')); // Petya, Vasilev

function getAge( born, year ) {
    return user.getAgeAt.call( {born}, year );
}

console.log( getAge( 1990, 2000 ) ); // 10

function yearAfter( born, ...moments) {
    return user.yearAfter.apply( {born}, moments );
}

console.log( yearAfter( 2000, 5, 10) ); // 2015
console.log( yearAfter( 2000, 5, 10, 15) ); // 2015
