const company = {
    sales: [{
      name: 'John',
      salary: 1000
    }, {
      name: 'Alice',
      salary: 600
    }],

    development: {
      sites: [{
        name: 'Peter',
        salary: 2000
      }, {
        name: 'Alex',
        salary: 1800
      }],

      internals: [{
        name: 'Jack',
        salary: 1300
      }]
    }
  };

function sumSalaries(department) {
}

console.log( sumSalaries(company) ); // 6700
