import { createElement, render } from '../lib/module';

interface ITimerProps {
    selector: string;
}

interface ITimerState {
    startTime: number | null;
    stopTime?: number;
    pauseTime?: number;
    pause: boolean;
}

export default class Timer {
    _props: ITimerProps;
    _state: ITimerState;
    _el: HTMLElement;
    _timer: number;

    constructor(props: ITimerProps) {
        this._props = props;
        this._state = {
            startTime: null,
            pause: false
        };

        this.render = this.render.bind(this);
        this._el = document.querySelector(this._props.selector);
    }

    start() {
        this._state.startTime = Date.now();
        this._state.pause = false;
        delete this._state.stopTime;
        delete this._state.pauseTime;

        this._activateTimer();
    }

    _activateTimer() {
        this._timer = setInterval(this.render, 1000);
    }

    _deactivateTimer() {
        if (this._timer) {
            clearInterval(this._timer);
        }
    }

    stop() {
        this._state.stopTime = Date.now();
        this._deactivateTimer();
    }

    pause() {
        if (!this._state.pause) {
            this._state.pause = true;
            this._state.pauseTime = Date.now();
            this._deactivateTimer();
        }
    }

    resume() {
        if (this._state.pause && this._state.startTime) {
            this._state.startTime = Date.now() - this._state.pauseTime + this._state.startTime;
            this._state.pause = false;
            delete this._state.pauseTime;
            this._activateTimer();
        }
    }

    getTimeString() {
        const { startTime, stopTime } = this._state,
            timerEnd = stopTime || Date.now();

        if (!startTime) {
            return '--:--';
        }

        const timeDiff = (timerEnd - startTime) / 1000,
            mm = Math.floor(timeDiff / 60),
            ss = Math.floor(timeDiff % 60);

        return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    }

    getTime() {
        const { startTime, stopTime } = this._state,

        return stopTime - startTime;
    }

    render() {
        this._el.innerText = this.getTimeString();

        return this._el;
    }
}
