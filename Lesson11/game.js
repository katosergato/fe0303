function Game( props ) {
    // this = {}
    // this.__proto__ = Game.prototype;

    const {
        board = Game.createRandomBoard(),
        container
    } = props;

    this.container = container;
    this.board = {};
    this.isWin = false;

    this.container.classList.add('board');

    this.move = this.move.bind(this);

    this.init(board);

    document.addEventListener('keyup', this.keyUp.bind(this)); // keydown + keyup === keypress
    // return this;
}

Game.START_BOARD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'empty'];
Game.createRandomBoard = function() {
    return this.converArrayToBoard(
        [...Game.START_BOARD]
            .sort(() => Math.random() - 0.5)
    );
}
Game.converArrayToBoard = function converArrayToBoard( boardArray ) {
    return boardArray.reduce(
        (board, cell, idx) => {
            board[idx] = cell;

            return board;
        },
        {}
    );
}
Game.canBoardWin = function( board ) {
    let N = Math.ceil(board.findIndex(cell => cell === 'empty') / 4);

    for( let i = 0; i < 15; i++) {
        if (board[i] !== 'empty') {
            N += board.filter((number, idx) => number !== 'empty' && idx < i && number < board[i]).length;
        }
    }

    return N % 2 === 1;
}
Game.prototype.keyUp = function( event ) {
    const key = event.key;
    let direction, from;

    switch (key) {
        case 'ArrowUp':
        case 'w':
            direction = 'TOP';
            from = 'BOTTOM';
            break;
        case 'ArrowDown':
        case 's':
            direction = 'DOWN';
            from = 'TOP';
            break;
        case 'ArrowLeft':
        case 'a':
            direction = 'LEFT';
            from = 'RIGHT';
            break;
        case 'ArrowRight':
        case 'd':
            direction = 'RIGHT';
            from = 'LEFT';
    }

    const emptyIndex = this.getIndex('empty'),
        siblings = this.getSiblingsIndex(emptyIndex);

    if (siblings[from] >= 0) {
        this.move( this.board[ siblings[from] ] );
    }

    // console.log( {siblings, direction, from} );
}

Game.prototype.init = function init(board) {
    const cells = [];

    for (let i=0; i<=15; i++) {
        const number = board[i];

        if (number !== 'empty') {
            const cell = new Cell({
                number,
                onMove: this.move
            });

            this.board[i] = cell;
            cells.push( cell.element );
        } else {
            this.board[i] = number;
        }
    }

    this.render();
    render( cells, this.container);
}
Game.prototype.getPosition = function getPosition(index) {
    return {
        row: Math.floor( index / 4 ),
        cell: index % 4
    }
}
Game.prototype.render = function render() {
    for (let i=0; i<=15; i++) {
        const cell = this.board[i];

        if (cell !== 'empty') {
            cell.changeProps({
                canMove: !!this.getMoveData(cell.props.number),
                position: this.getPosition(i)
            });
        }
    }
}
Game.prototype.getMoveData = function canMove( number ) {
    if ( number === 'empty') {
        return ;
    }

    const currentIndex = this.getIndex( number ),
        siblingsItems = this.getSiblingsIndex( currentIndex ),
        possibleMove = ['LEFT', 'RIGHT', 'TOP', 'BOTTOM']
            .find(direction => siblingsItems[direction] !== null && this.board[ siblingsItems[direction] ] === 'empty');

    if (!possibleMove) {
        return ;
    }

    return {
        direction: possibleMove,
        from: currentIndex,
        to: siblingsItems[possibleMove]
    };
}
Game.prototype.getSiblingsIndex = function getSiblingsIndex( currentIndex ) {
    const leftItemIndex = currentIndex % 4 === 0 ? null : currentIndex - 1,
        rightItemIndex = currentIndex % 4 === 3 ? null : currentIndex + 1,
        topItemIndex = currentIndex < 4 ? null : currentIndex - 4,
        bottomItemIndex = currentIndex > 11 ? null : currentIndex + 4;

    return {
        LEFT: leftItemIndex,
        RIGHT: rightItemIndex,
        TOP: topItemIndex,
        BOTTOM: bottomItemIndex
    };
}
Game.prototype.getIndex = function getIndex( number ) {
    for (let index = 0; index < 16; index++) {
        if (this.board[index] === 'empty') {
            if (number === 'empty') {
                return index;
            }
        } else if (this.board[index].props.number === number) {
            return index;
        }
    }
}
Game.prototype.checkWin = function checkWin() {
    return Game.START_BOARD
        .every((number, index) => this.board[index] !== 'empty' ? this.board[index].props.number === number : this.board[index] === number);
}
Game.prototype.move = function move( cell ) {
    if (this.isWin) {
        return ;
    }

    const moveData = this.getMoveData( cell.props.number );

    if (moveData) {
        this.board[moveData.to] = cell;
        this.board[moveData.from] = 'empty';
    }

    this.render();

    if (this.checkWin()) {
        this.win();
    }
}
Game.prototype.win = function win() {
    this.isWin = true;
    console.log('You win!');
}
// Game.prototype.constructor = Game;

console.dir( Game );
