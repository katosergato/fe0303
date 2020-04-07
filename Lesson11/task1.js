const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log( arr.sort(randomSort) );

function sortFunction(a, b) {
    console.log({a, b, r: b - a, arr});
    return b - a;
}

function randomSort(a, b) {
    return Math.random() - 0.5;
}
