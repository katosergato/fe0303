import Board from './board';
import Settings from './settings';

const board = new Board();
const settings = new Settings({
    selector: '.settings',
    onChange: changeSettings
});

function changeSettings(complexity: string) {
    board.changeProps({
        complexity
    });
}

console.log( {settings, board} );
