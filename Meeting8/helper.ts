import { createElement } from '../lib/module';
import cn from 'classnames';

interface IHelperProps {
    value: boolean[];
    hidden: boolean;
}

export default class Helper {
    _props: IHelperProps;
    _el: HTMLElement;
    _items: HTMLElement[];

    constructor(props: IHelperProps) {
        this._props = props;
        this._items = this.createItems();
        this._el = this.createElement();
    }

    createElement(): HTMLElement {
        const {hidden} = this._props;

        return createElement('div', {
            className: cn({
                'board__cell-helper': true,
                'board__cell-helper--hidden': hidden
            }),
            children: this._items
        })
    }

    createItems(): HTMLElement[] {
        return this._props.value.map((visible, i) => createElement('div', {
            className: cn({
                'board__cell-helper-item': true,
                'board__cell-helper-item--disabled': !visible
            })
        }, i+1));
    }

    render(): HTMLElement {
        return this._el;
    }
}
