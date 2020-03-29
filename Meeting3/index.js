// Init { getCountdownData: function }

const i18n = {
    weeks: 'недель',
    days: 'дней',
    hours: 'часов',
    minutes: 'минут',
    seconds: 'секунд'
};

function makeCounterElement(counterProps) {
    // console.log(counterProps.data);
    // console.log( Object.entries(counterProps.data) );
    const store = {},
        title = createElement(
            'h2',
            {
                className: 'countdown__title'
            },
            counterProps.title
        ),
        counter = createElement(
            'div',
            {
                className: 'countdown__counter',
                children: Object.entries(counterProps.data)
                    .map(([name, value]) => {
                        // [el0, el1, , el3] = arr
                        // el0 = arr[0],
                        // el1 = arr[1]

                        // console.log({name, value});

                        store[name] = createElement(
                            'span',
                            {
                                className: 'countdown__value'
                            },
                            value
                        );

                        return createElement(
                            'div',
                            {
                                className: 'countdown__item',
                                children: [
                                    store[name],
                                    createElement(
                                        'span',
                                        {
                                            className: 'countdown__label'
                                        },
                                        i18n[name] || name
                                    )
                                ]
                            }
                        )
                    })
            }
        ),
        countdown = createElement(
            'div',
            {
                className: 'countdown',
                children: [
                    title,
                    counter
                ]
            }
        );

    store.title = title;
    store.container = createElement(
        'div',
        {
            className: 'section',
            children: [
                countdown
            ]
        }
    );

    store.update = function(newProps) {
        if ('title' in newProps) {
            store.title.innerText = newProps.title;
        }

        if ('data' in newProps) {
            Object.entries(newProps.data)
                .forEach(([name, value]) => {
                    if (store[name]) {
                        store[name].innerText = value;
                    }
                });
        }
    }

    return store;
}

function getCountdownData( destinationDate ) {
    let diff = destinationDate.getTime() - Date.now();

    return [
        ['weeks', getCountdownData.TIME_IN_WEEK],
        ['days', getCountdownData.TIME_IN_DAY],
        ['hours', getCountdownData.TIME_IN_HOUR],
        ['minutes', getCountdownData.TIME_IN_MIN],
        ['seconds', getCountdownData.TIME_IN_SEC]
    ].reduce(
        (result, [nameKey, timeInKey]) => {

            result[nameKey] = Math.floor(diff / timeInKey);
            diff = diff % timeInKey;

            return result;
        },
        {}
    );
}

getCountdownData.TIME_IN_SEC = 1000;
getCountdownData.TIME_IN_MIN = 60*getCountdownData.TIME_IN_SEC;
getCountdownData.TIME_IN_HOUR = 60*getCountdownData.TIME_IN_MIN;
getCountdownData.TIME_IN_DAY = 24*getCountdownData.TIME_IN_HOUR;
getCountdownData.TIME_IN_WEEK = 7*getCountdownData.TIME_IN_DAY;

const rootEl = document.querySelector('#root');
const newYear = new Date(2021, 0, 1);
const counter1 = makeCounterElement({
    title: 'До нового года осталось',
    data: getCountdownData( newYear )
});

render( counter1.container, rootEl );

setInterval(
    function() {
        counter1.update({
            data: getCountdownData( newYear )
        });
    },
    1000
);

// Придумать еще несколько счетчиков
// Сделать так, что бы они одновременно рисовались на экране.
