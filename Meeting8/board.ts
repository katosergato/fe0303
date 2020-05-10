import { createElement, render } from '../lib/module';
import sudoku from './sudocu.js';
import Cell from './cell';

interface IBoardProps {
    board?: string;
    complexity?: 'easy' | 'medium' | 'hard' | 'very-hard' | 'insane' | 'inhuman';
}

interface IBoardState {
    startBoard: string;
    currentBoard: string;
    cells: Cell[];
    groups: Cell[][];
}

export default class Board {
    _boardEl: HTMLElement;
    _props: IBoardProps;
    _state: IBoardState;

    static DIFFICULTIES = ['easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman'];
    static defaultProps: IBoardProps = {
        complexity: 'medium'
    }
    static HELPERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor(props: IBoardProps = {}) {
        const _props = {...Board.defaultProps, ...props};

        this._props = _props;
        this._boardEl = document.querySelector('.board');

        const startBoard: string = _props.board || sudoku.generate(_props.complexity),
            candidates = sudoku.get_candidates(startBoard);

        this._state = {
            startBoard,
            currentBoard: startBoard,
            cells: startBoard.split('').map((boardItem: string, cellNumber: number) => {
                const value = +boardItem,
                    isEditable = isNaN(value),
                    candidateRow = Math.floor(cellNumber / 9),
                    candidateCell = cellNumber % 9,
                    candidate = candidates[candidateRow][candidateCell];

                return new Cell({
                    id: cellNumber,
                    value: isEditable ? undefined : value,
                    helper: isEditable ? Board.HELPERS.map(v => candidate.includes(v)) : null
                });
            }),
            groups: []
        };

        this.groupCells();
        this.fillBoard();
    }

    groupCells() {
        this._state.groups = [];

        this._state.cells.forEach((cell: Cell, cellIndex: number) => {
            const rowNumber = Math.floor(cellIndex / 9),
                cellNumber = cellIndex % 9,
                groupNumber = Math.floor(cellNumber / 3) + 3 * Math.floor(rowNumber / 3),
                cellInGroup = cellNumber % 3,
                rowInGroup = rowNumber % 3;
            let group = this._state.groups[groupNumber];

            if (!group) {
                group = [];
                this._state.groups[groupNumber] = group;
            }

            group[cellInGroup + 3*rowInGroup] = cell;
        });
    }

    fillBoard() {
        this._boardEl.innerText = '';
        this._boardEl.append(...this._state.groups.map(this.renderGroup));
    }

    renderGroup(group: Cell[]): HTMLElement {
        const groupEl = createElement('div', {className: 'board__group'});

        render(group.map(cell => cell.render()), groupEl);

        return groupEl;
    }

    render() {

    }
}
