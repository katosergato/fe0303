'use strict';

function sum(a, b, c, d, ...rest) {
    console.log({a, b, c, d}, this, rest, arguments);
    return a + b + c + d;
}

console.log( sum(1, 2, 3, 4) );

const newSum = sum.bind('hello world!', 1, 2, 3); // f(d)

console.log( newSum(3, 4) ); // 9
console.log( newSum(1, 2) ); // 7

function bind(context, ...args) {
    const f = this;

    return function(...newArgs) {
        return f.apply(context, [].concat(args, newArgs));
    }
}

function make_lazy(f, ...args) {
    // return function (...addArgs) {
    //     return f.apply(this, [].concat(args, addArgs));
    // }
    return f.bind(this, ...args);
}

function add (a, b) {
    return a + b;
}

const lazy_value = make_lazy(add, 2, 3); // { f: add, args: [2, 3]}

console.log( 'lazy_value', lazy_value(5, 6) ); // { addArgs: [5, 6] }
// add.apply(undefined, [2, 3, 5, 6])
// { a: 2, b: 3 } => 2 + 3 => 5
