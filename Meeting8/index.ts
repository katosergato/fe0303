import { createElement, render } from '../lib/module';
// import './sudocu';
// import sudoku from './sudocu';

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

const boardEl: HTMLElement = document.querySelector('.board');

function renderPredefinedCell( number: string ): HTMLElement {
    return createElement('div', {className: 'board__cell'}, number);
}

function renderUndefinedCell(numberInGroup: number, groupNumber: number, board: string): HTMLElement {
    const input = createElement('input', {className: 'board__cell-input', type: 'text'}),
        groupRowsNumber = Math.floor(numberInGroup / 3),
        groupColsNumber = numberInGroup % 3,
        firstColNumber = (groupNumber % 3)*3,
        firstRowNumber = 3*Math.floor(groupNumber / 3),
        helper = renderHelper(getHelper(board, groupColsNumber + firstColNumber +(firstRowNumber + groupRowsNumber)*9));

    return createElement('div', {className: 'board__cell board__cell--editable', children: [input, helper]});
}

function renderGroup( group: string, groupNumber: number, board: string ) {
    const board__group = createElement('div', {className: 'board__group'}),
        elements = [];

    for (let i=0; i < group.length; i++) {
        const number = group[i];

        if (number === '.') {
            elements.push( renderUndefinedCell(i, groupNumber, board) );
        } else {
            elements.push( renderPredefinedCell(number) );
        }
    }

    render(elements, board__group);

    return board__group;
}

function renderBoard( board: string, boardEl: HTMLElement): void {
    const groups = getGroups(board),
        groupEls = groups.map((group, groupNumber) => renderGroup(group, groupNumber, board));

    render(groupEls, boardEl);
}

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

function getHelper(board: string, i: number): boolean[] {
    const colNumber = i % 9,
        rowNumber = Math.floor(i / 9),
        groupNumber = Math.floor(colNumber / 3) + 3*Math.floor(rowNumber / 3),
        rows = getBoardRows(board),
        groups = getGroups(board),
        columns = getColumns(board),
        row = rows[rowNumber],
        col = columns[colNumber],
        group = groups[groupNumber],
        unexpectedNumbers = getNumbersFromBoard(row).concat(getNumbersFromBoard(col), getNumbersFromBoard(group));

    function getNumbersFromBoard(board: string): string[] {
        return board.replace(/\./g, '').split('');
    }

    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n:string) => !unexpectedNumbers.includes(n));
}

const game = {
    board,
    render() {
        const {board} = this;

        renderBoard(board, boardEl);
    }
};

console.log( game );

game.render();
