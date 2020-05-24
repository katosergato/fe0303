import { createElement } from '../lib/module';
import Helper from './helper';

interface ICellProps {
    id?: number;
    value?: number;
    helper: boolean[] | null;
    onChange?(id: number, newValue?: number): void;
    disabled?: boolean;
}

interface ICellState {
    isEditable: boolean;
}

export default class Cell {
    _props: ICellProps;
    _state: ICellState;
    _el: HTMLElement;
    _input: HTMLInputElement;
    _helper?: Helper;

    constructor(props: ICellProps) {

        this._props = props;
        this._state = {
            isEditable: isNaN(props.value)
        };

        if (props.helper) {
            this._helper = new Helper({
                value: props.helper,
                hidden: false
            });
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this._el = this.createElement();
    }

    onChangeHandler(event: Event): void {
        const input = event.target as HTMLInputElement,
            { value } = input,
            number = parseInt(value, 10),
            { helper } = this._props;

        if (!isNaN(number) && (number > 10 || !helper[number - 1])) {
            input.value = (this._props.value || '').toString();

            return ;
        }

        this._props.onChange(this._props.id, number);
    }

    changeProps(newProps: ICellProps) {
        this._props = {
            ...this._props,
            ...newProps
        };

        if (this._state.isEditable) {
            this._helper.changeProps({
                hidden: !!this._props.value,
                value: this._props.helper,
            });

            this.render();
        }
    }

    createElement(): HTMLElement {
        if (this._state.isEditable) {
            return this.createEditableElement();
        }

        return this.createPredefinedElement();
    }

    createEditableElement(): HTMLElement {
        const input = createElement('input', {className: 'board__cell-input', type: 'text'});

        input.addEventListener('input', this.onChangeHandler);

        this._input = input;

        return createElement(
            'div', {
                className: 'board__cell board__cell--editable',
                children: [input, this._helper.render()]
            });
    }

    createPredefinedElement(): HTMLElement {
        return createElement('div', {className: 'board__cell'}, this._props.value);
    }

    render() {
        if (this._input) {
            this._input.value = (this._props.value || '').toString();
            this._input.disabled = !!this._props.disabled;
        }

        return this._el;
    }
}
