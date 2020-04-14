function getTime() {
    const d = new Date();

    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

const watchEl = document.querySelector('.watch');

function displayTime() {
    watchEl.innerText = getTime();

    delay(1000)
        .then(displayTime);
    // setTimeout(displayTime, 1000);
}

displayTime();

// setInterval(displayTime, 1000);
// {
//     status: 'rejected', // 'pending' => 'fullfiled' || 'rejected'
//     value: [{}]
// }

// const promise = new Promise(makePromise);

// function makePromise(resolve, reject) {
//     setTimeout(function() {
//         resolve([1, ,2 ,4 ]);
//     }, Math.random()*2000); // 0 ... 2s

//     setTimeout(function() {
//         reject(Math.random());
//     }, 1500); // 1.5s
// }

// console.log(promise);

// promise.then(onResolve, onReject);
// const a = promise
//     .then(onResolve)
//     .catch(onReject);

// function onResolve(value) {
//     console.log('resolved!', value);
// }

// function onReject(error) {
//     console.log('reject', error);
// }

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

const circleEl = document.querySelector('.circle');

function aimateCircleScale(scale, direction, condition, onStop) {
    const newScale = scale + .1*direction; // .3 + .1*1

    circleEl.style.transform = `scale(${newScale})`;

    if (!condition(scale, direction)) {
        delay(1000/25)
            .then(() => aimateCircleScale(newScale, direction, condition, onStop));
    } else {
        onStop();
    }
}

function aimateCircleX(translateX, direction, condition, onStop) {
    const NewTranslateX = translateX + 1*direction;

    circleEl.style.left = `${NewTranslateX}px`;

    if (!condition(translateX, direction)) {
        delay(1000/25)
            .then(() => aimateCircleX(NewTranslateX, direction, condition, onStop));
    } else {
        onStop();
    }
}

function animationPromiseCircleScale(scale, direction, condition) {
    return new Promise(function(resolve) {
        aimateCircleScale(scale, direction, condition, resolve);
    });
}

function animationPromiseCircleX(translateX, direction, condition) {
    return new Promise(function(resolve) {
        aimateCircleX(translateX, direction, condition, resolve);
    });
}

// aimateCircleX(0.2, 1, (translateX) => translateX > 50);
// aimateCircleScale(.2, 1, (scale) => scale > 1.5);
animationPromiseCircleScale(.2, 1, (scale) => scale > 1.5)
    .then(() => animationPromiseCircleX(0.2, 1, (translateX) => translateX > 50))
    .then(() => animationPromiseCircleScale(1.5, -1, (scale) => scale < 0.2));
