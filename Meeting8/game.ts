import Board from './board';
import Settings from './settings';
import Timer from './timer';
import VisibilityChange from './visibility';
import Stats from './statistic';

const timer = new Timer({
    selector: '.timer'
});

const settings = new Settings({
    selector: '.settings',
    onChange: changeSettings
});

const stats = {};

settings.getAvailableComplexity().forEach((complexity: string) => {
    stats[complexity] = new Stats(`SudocuStats${complexity}`);
});

const board = new Board({
    complexity: settings.getComplexity(),
    onWinGame,
    onStartGame
});
const winEl = document.querySelector('.winner');

new VisibilityChange({
    onChange: function(isHidden) {
        if (isHidden) {
            timer.pause();
        } else {
            timer.resume();
        }
    }
})

function changeSettings(complexity: string) {
    board.changeProps({
        complexity
    });
    winEl.classList.add('winner--hidden');
}

function onWinGame() {
    winEl.classList.remove('winner--hidden');
    timer.stop();

    const currentStats: Stats = stats[settings.getComplexity()];

    currentStats.addWin(timer.getTime());

    console.log( currentStats.getStats() );
}

function onStartGame() {
    timer.start();
    const currentStats: Stats = stats[settings.getComplexity()];

    currentStats.addGame();
}

console.log( stats );
