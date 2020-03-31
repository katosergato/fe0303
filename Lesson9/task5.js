function spy(f) {
    function decoratedF(...args) {
        // console.log( arguments );
        // console.log( args );
        decoratedF.count++;

        // return f.apply(this, arguments);
        // return f.call(this, ...args);
        const result = f(...args);

        decoratedF.calls.push({
            args,
            result
        });

        return result;
    }

    decoratedF.count = 0;
    decoratedF.calls = [];

    return decoratedF;
}

function sum(a, b) {
    return a + b;
}

const countedSum = spy( sum );

console.log( countedSum(1, 2) ); // E1 { arguments: [1, 2], this }
console.log( countedSum(2, 5) ); // E2 { arguments: [2, 5], this }
console.log( countedSum(4, 8) ); // E3 { arguments: [4, 8] }
console.log( countedSum(5, 18) );

console.log( countedSum.count ); // count sum ?
console.log( countedSum.calls ); // count sum ?
