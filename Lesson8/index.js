const ticket = tickets[10],
    $ticket = createTicketItem( ticket ),
    $ticketList = document.querySelector('.tickets-list');

$ticketList.innerText = '';
$ticketList.append(
    ...tickets.map(createTicketItem)
);

console.log( ticket );
console.log( $ticket );
console.dir( $ticket );

function formatPrice(num) {
    const str = 'hello';

    return str;
}

console.log( '1', formatPrice(99) === '99', formatPrice(99) );
console.log( '2', formatPrice(1599) === '1 599', formatPrice(1599) );
console.log( '3', formatPrice(21599) === '21 599', formatPrice(21599) );
console.log( '4', formatPrice(121599) === '121 599', formatPrice(121599) );

function formatTime( d ) {
    return [
        d.getHours().toString().padStart(2, '0'),
        d.getMinutes().toString().padStart(2, '0'),
    ].join(':')
}

function formatDuration( duration ) {
    const
        dd = Math.floor( duration / (60*24) ),
        hh = Math.floor( (duration % (60*24)) / 60),
        mm = duration % 60;

    if (dd > 0) {
        return `${dd}д ${hh}ч ${mm}м`;
    }

    if (hh > 0) {
        return `${hh}ч ${mm}м`;
    }

    if (mm > 0) {
        return `${mm}м`;
    }
}

function createTicketVariant(segment) {
    // const origin = segment.origin,
    //     destination = segment.destination,
    //     date = segment.date,
    const {
        origin,
        destination,
        date,
        stops,
        duration
    } = segment,
    startDate = new Date(date),
    endDate = new Date( startDate.getTime() + duration*60000 ),
    startTime = formatTime(startDate),
    endTime = formatTime(endDate);

    const $destination = createElement(
            'div',
            {
                className: 'ticket__variant-item',
                children: [
                    createElement(
                        'div',
                        {
                            className: 'ticket__variant-item-label'
                        },
                        // origin + ' - ' + destination
                        `${origin} - ${destination}`
                    ),
                    createElement(
                        'div',
                        {
                            className: 'ticket__variant-item-value'
                        },
                        `${startTime} - ${endTime}`
                    )
                ]
            }
        ),
        $roadTime = createElement(
            'div',
            {
                className: 'ticket__variant-item',
                children: [
                    createElement(
                        'div',
                        {
                            className: 'ticket__variant-item-label'
                        },
                        'В пути'
                    ),
                    createElement(
                        'div',
                        {
                            className: 'ticket__variant-item-value'
                        },
                        formatDuration(duration)
                    )
                ]
            }
        ),
        $transplants = createElement(
            'div',
            {
                className: 'ticket__variant-item',
                children: [
                    createElement(
                        'div',
                        {
                            className: 'ticket__variant-item-label'
                        },
                        `${stops.length} пересадки`
                    ),
                    createElement(
                        'div',
                        {
                            className: 'ticket__variant-item-value'
                        },
                        stops.join(', ')
                    )
                ]
            }
        ),
        $variant = createElement(
            'li',
            {
                className: 'ticket__variant',
                children: [$destination, $roadTime, $transplants]
            }
        );

    return $variant;
}

function createTicketItem( ticket ) {
    return createElement(
        'li',
        {
            className: 'tickets-list__item',
            children: [createTicket(ticket)]
        }
    )
}

function createTicket( ticket ) {
    const price = ticket.price,
        $ticketPrice = createElement(
            'div',
            {
                className: 'ticket__price'
            },
            price + ' Р'
        ),
        $ticketLogo = createElement(
            'div',
            {
                className: 'ticket__avia-logo',
                children: [
                    createElement(
                        'img',
                        {
                            className: 'ticket__avia-logo-img',
                            src: 'http://lorempixel.com/800/100',
                            alt: ''
                        }
                    )
                ]
            }
        ),
        $ticketVariants = createElement(
            'ul',
            {
                className: 'ticket__variants',
                children: ticket.segments.map(createTicketVariant)
            }
        ),
        $ticket = createElement(
            'div',
            {
                className: 'ticket',
                children: [$ticketPrice, $ticketLogo, $ticketVariants]
            }
        );

    return $ticket;
}

function createElement(tagName, props = {}, innerText) {
    const $el = document.createElement(tagName);

    for (const propName in props) {
        if (propName === 'children' && props.children) {
            $el.append(...props.children);
        } else if (typeof props[propName] !== 'undefined') {
            $el[propName] = props[propName];
        }
    }

    if (innerText) {
        $el.innerText = innerText;
    }

    return $el;
}
