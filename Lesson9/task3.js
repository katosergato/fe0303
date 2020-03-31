let name = "John"; // window.name = 'John'

function sayHi() {
  console.log("Hi, " + name);
}

function sayBy() {
  console.log("By, " + name);
}

function addCounter( f ) {
  function decoratedF() {
    decoratedF.count++;

    return f();
  }

  decoratedF.count = 0;

  return decoratedF;
}

name = "Pete"; // window.name = 'Pete'

const countSayHi = addCounter( sayHi ); // function [[ [[Scope]]: { f: SayHi }, count: 3 ]]
const countSayBy = addCounter( sayBy ); // function [[Scope]]: E2, count: 1

countSayHi(); // что будет показано: "John" или "Pete"?
countSayHi(); // что будет показано: "John" или "Pete"?
countSayHi(); // что будет показано: "John" или "Pete"?
countSayBy();

console.log( countSayHi.count, countSayBy.count );
