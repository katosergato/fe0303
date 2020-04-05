function add(...args) {
    return args.reduce(
        function(accumulator, el, idx) {
            // accumulator = 1, el = 2, idx = 1
            return accumulator + el * (idx + 1);
        },
        0
    );
}

console.log( add() ); //=> 0
console.log( add(1,2) ); //=> 5
console.log( add(1,2,3) ); //=> 14
console.log( add(1,4,-5,5) ); //=> 14
