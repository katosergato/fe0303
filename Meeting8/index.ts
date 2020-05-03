import { createElement, render } from '../lib/module';

type TRows = string[];

const board: string = "52...6.........7.13...........4..8..6......5...........418.........3..2...87.....";

function getBoardRows(board: string): TRows {
    const rows: TRows = [];

    for (let i = 0; i < 9; i++) {
        rows.push( board.slice(i*9, (i+1)*9) );
    }

    return rows;
}

function getBoardRowGroups( row: string ): TRows {
    const groups: TRows = [];

    for(let i=0; i < 3; i++) {
        groups.push( row.slice(i*3, 3*(i+1) ) );
    }

    return groups;
}

function getGroups( board: string ): TRows {
    const groups: TRows = [],
        rowsGroups = getBoardRows(board).map(getBoardRowGroups);

    for (let row = 0; row < 3; row++) {
        for (let cell = 0; cell < 3; cell++) {
            groups.push(
                [rowsGroups[3*row][cell], rowsGroups[3*row+1][cell], rowsGroups[3*row+2][cell]].join('')
            );
        }
    }

    return groups;
}

function getColumns( board: string ): TRows {
    const rows = getBoardRows(board),
        columns: TRows = [];

    for (let i=0; i <9; i++) {
        columns.push(
            rows.reduce((column, row) => {
                // console.log({column, i, el: row[i]});
                return column + row[i];
            }, '')
        );
    }

    return columns;
}

console.log( 'board', board );
console.log( 'rows', getBoardRows(board) );
console.log( 'rowGroups', getBoardRows(board).map(getBoardRowGroups) );
console.log( 'groups', getGroups(board) );
console.log( 'columns', getColumns(board) );

const boardEl: HTMLElement = document.querySelector('.board');

function renderPredefinedCell( number: string ): HTMLElement {
    return createElement('div', {className: 'board__cell'}, number);
}

function renderUndefinedCell() {
    const input = createElement('input', {className: 'board__cell-input', type: 'text'});

    return createElement('div', {className: 'board__cell board__cell--editable', children: [input]});
}

function renderGroup( group: string ) {
    const board__group = createElement('div', {className: 'board__group'}),
        elements = [];

    for (let i=0; i < group.length; i++) {
        const number = group[i];

        if (number === '.') {
            elements.push( renderUndefinedCell() );
        } else {
            elements.push( renderPredefinedCell(number) );
        }
    }

    render(elements, board__group);

    return board__group;
}

function renderBoard( board: string, boardEl: HTMLElement): void {
    const groups = getGroups(board),
        groupEls = groups.map(renderGroup);

    render(groupEls, boardEl);
}

renderBoard(board, boardEl);

function renderHelper(helper: boolean[]): HTMLElement {
    return createElement('div', {
        className: 'board__cell-helper',
        children: helper.map((visible, i) => createElement('div', {
            className: [
                'board__cell-helper-item',
                !visible && 'board__cell-helper-item--disabled'
            ].filter(Boolean).join(' ')
        }, i+1))
    })
}

console.log( renderHelper([true, false, false, true, true, false, true, false, true]) );

function getHelper(board: string, i: number): boolean[] {

}

console.log( getHelper(board, 10) ); // [false, false, false, false, false, true, false, true, true ]
console.log( getHelper(board, 37) ); // [true, true, false, false, false, false, true, true, true ]
