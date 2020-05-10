import { createElement } from '../lib/module';
import Helper from './helper';

interface ICellProps {
    id: number;
    value?: number;
    helper: boolean[] | null;
}

interface ICellState {
    value?: number;
    isEditable: boolean;
}

export default class Cell {
    _props: ICellProps;
    _state: ICellState;
    _el: HTMLElement;
    _helper?: Helper;

    constructor(props: ICellProps) {

        this._props = props;
        this._state = {
            value: props.value,
            isEditable: isNaN(props.value)
        };

        if (props.helper) {
            this._helper = new Helper({
                value: props.helper,
                hidden: false
            });
        }

        this._el = this.createElement();
    }

    createElement(): HTMLElement {
        if (this._state.isEditable) {
            return this.createEditableElement();
        }

        return this.createPredefinedElement();
    }

    createEditableElement(): HTMLElement {
        const input = createElement('input', {className: 'board__cell-input', type: 'text'});

        return createElement(
            'div', {
                className: 'board__cell board__cell--editable',
                children: [input, this._helper.render()]
            });
    }

    createPredefinedElement(): HTMLElement {
        return createElement('div', {className: 'board__cell'}, this._state.value);
    }

    render() {
        return this._el;
    }
}
