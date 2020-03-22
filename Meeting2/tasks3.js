// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
// 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n.
// 4. В первых трех задачах добавить пользователю возможность ввести значения переменных.
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

function task1( n ) {
    let i = 1;

    while (i<=n) {
        console.log(i);

        i++; // i = i + 1;
    }
}

// task1(5);
// task1(10);

function isSimple( n ) {
    for (let k = 2; k < n ; k++) {
        if (n % k === 0) {
            return false;
        }
    }

    return true;
}

// let m = 1;

// do {
//     console.log(m, isSimple(m));
//     m++;
// } while(m < 15);

function getSimple(n) {
    let m = 1;

    do {
        if (isSimple(m)) {
            console.log(m);
        }

        m++;
    } while (m <= n);
}

// getSimple(13);

function getNumbersDeletedBy(n, k) {
    let m = 1;

    while (m <= n) {
        if (m % k === 0) {
            console.log(m);
        }

        m++;
    }
}

getNumbersDeletedBy(100, 5);
