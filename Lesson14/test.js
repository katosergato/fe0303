fetch('https://5d9969125641430014051850.mockapi.io/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: 'admin',
            password: 'password'
        })
    })
    .then(response => response.json())
    .then(data => console.log(data));

fetch('https://5d9969125641430014051850.mockapi.io/users/1/puzzles/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            win: 2,
            loose: 0,
            averageTime: 100
        })
    })
    .then(response => response.json())
    .then(data => console.log(data));
