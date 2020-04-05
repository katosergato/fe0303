const arr1 = [1, 2, 3, 4],
    arr2 = [5, 6, 7, 8];

function concatArrays(...args) {
    const result = [];

    args.forEach(function(arr) {
        arr.forEach(function(el) {
            result.push(el);
        });
    });

    return result;
}

console.log( concatArrays([1, 2], [3, 4], [5, 6]) );
console.log( [1, 2].concat([3, 4], [5, 6]) );
