import { createElement, render } from '../lib/module';
import sudoku from './sudocu.js';
import Cell from './cell';

interface IBoardProps {
    board?: string;
    complexity?: string;
    onWinGame?: () => void;
    onStartGame?: () => void;
}

interface IBoardState {
    startBoard: string;
    currentBoard: string;
    cells: Cell[];
    groups: Cell[][];
    isWin: boolean;
}

export default class Board {
    _boardEl: HTMLElement;
    _props: IBoardProps;
    _state: IBoardState;

    static DIFFICULTIES = ['easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman'];
    static DEFAULT_COMPLEXITY = 'medium';
    static defaultProps: IBoardProps = {
        complexity: Board.DEFAULT_COMPLEXITY
    }
    static HELPERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor(props: IBoardProps = {}) {
        const _props = {...Board.defaultProps, ...props};

        this._props = _props;
        this._boardEl = document.querySelector('.board');

        this.onChangeCell = this.onChangeCell.bind(this);

        this.createBoard();
    }

    changeProps(newProps: IBoardProps) {
        this._props = {
            ...this._props,
            ...newProps
        }

        if (!Board.DIFFICULTIES.find(difficultie => difficultie === this._props.complexity)) {
            this._props.complexity = Board.DEFAULT_COMPLEXITY;
        }

        this.createBoard();
    }

    createBoard() {
        const startBoard: string = this._props.board || sudoku.generate(this._props.complexity),
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
                    helper: isEditable ? Board.HELPERS.map(v => candidate.includes(v)) : null,
                    onChange: this.onChangeCell
                });
            }),
            groups: [],
            isWin: false
        };

        this.groupCells();
        this.fillBoard();

        if (this._props.onStartGame) {
            this._props.onStartGame();
        }
    }

    onChangeCell(id: number, newValue?: number): void {
        const { currentBoard, startBoard } = this._state,
            newSymbol = isNaN(newValue) ? '.' : newValue.toString(),
            newBoard = currentBoard.slice(0, id) + newSymbol  + currentBoard.slice(id + 1),
            candidates = sudoku.get_candidates(newBoard),
            isWin = newBoard.search(/\./) === -1;

        if (!candidates) {
            return ;
        }

        this._state.currentBoard = newBoard;
        this._state.isWin = isWin;

        if (isWin && this._props.onWinGame) {
            this._props.onWinGame();
        }

        this._state.cells.forEach((cell: Cell, id: number) => {
            const value = parseInt(newBoard[id], 10),
                isEditable = isNaN(parseInt(startBoard[id], 10)),
                candidateRow = Math.floor(id / 9),
                candidateCell = id % 9,
                candidate = candidates[candidateRow][candidateCell];

            cell.changeProps({
                value: isNaN(value) ? undefined : value,
                helper: isEditable ? Board.HELPERS.map(v => candidate.includes(v)) : null,
                disabled: isWin
            });
        });

        this.render();
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
