function Game( board = Game.createRandomBoard() ) {
    // this = {}
    // this.__proto__ = Game.prototype;

    this.board = board;

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
};
Game.canBoardWin = function( board ) {
    let N = Math.ceil(board.findIndex(cell => cell === 'empty') / 4);

    for( let i = 0; i < 15; i++) {
        if (board[i] !== 'empty') {
            N += board.filter((number, idx) => number !== 'empty' && idx < i && number < board[i]).length;
        }
    }

    return N % 2 === 1;
}

Game.prototype.render = function render() {
    console.log('--- board ---');
    for (let row=0; row < 4; row++) {
        let rowStr = '';

        for (let col=0; col < 4; col++) {
            const el = this.board[col + row*4];

            if ( el === 'empty') {
                rowStr += 'ee ';
            } else {
                rowStr += el.toString().padStart(2, '0') + ' ';
            }
        }

        console.log(rowStr);
    }
    console.log('--- board ---');
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
        if (this.board[index] === number) {
            return index;
        }
    }
}
Game.prototype.checkWin = function checkWin() {
    return Game.START_BOARD
        .every((number, index) => this.board[index] === number);
}
Game.prototype.move = function move( number ) {
    const moveData = this.getMoveData( number );

    if (moveData) {
        this.board[moveData.to] = number;
        this.board[moveData.from] = 'empty';
    }

    if (this.checkWin()) {
        this.win();
    } else {
        this.render();
    }
}
Game.prototype.win = function win() {
    console.log('You win!');
}
// Game.prototype.constructor = Game;

const startBoard = Game.createRandomBoard();
const game = new Game( startBoard );

console.log( game );

game.render(); // this = board

console.log(
    Game.START_BOARD.map(
        number => ({
            number,
            index: game.getIndex(number),
            canMove: game.getMoveData(number)
        })
    )
);

console.log( Game.canBoardWin([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 'empty', 15]), true );
console.log( Game.canBoardWin([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 14, 13, 'empty']), false );
