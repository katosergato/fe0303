const arr = [1, 2, 3, 4, 5, ,6 ,7, 8, 9, 0, 12, 34, 45];

// const wantStore = el => el < 15 && el > 3;
// function wantStore(el) {
//     return el < 15 && el > 3;
// }
const wantStore = inBeetwen(3, 15); // f {min: 3, max: 15}

console.log(
    arr.filter(inBeetwen(7, 12)) // E : { min: 7, max: 12 }
 );

 function inBeetwen(min, max) {
    return function(el) {
        return el < max && el > min;
    }
 }

 const arr2 = [ 4, 6, 7, 8, 9, 12, 15, 2, 44, 45];

 console.log(
    // arr.filter(el => arr2.includes(el))
    arr.filter(inArray([1, 2, 3, 4]))
 );

 function inArray( arr ) {
     return function(el) {
         return arr.includes(el);
     }
 }
