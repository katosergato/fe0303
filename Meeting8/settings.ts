interface ISettingsProps {
    selector: string;
    onChange(complexity: string): void;
}

interface ISettingsState {
    complexity: string;
}

export default class Settings {
    _el: HTMLElement;
    _props: ISettingsProps;
    _items: NodeList;
    _state: ISettingsState;
    _availableComplexity: string[];

    constructor(props: ISettingsProps) {
        this._props = props;
        this._el = document.querySelector(props.selector);
        this._items = this._el.querySelectorAll(`[name='complexity']`);
        this._availableComplexity = [];

        let complexity = 'medium';

        this._items.forEach((item: HTMLInputElement) => {
            if (item.checked) {
                complexity = item.value;
            }

            this._availableComplexity.push(item.value);
        });

        this._state = {
            complexity
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this._el.addEventListener('change', this.onChangeHandler);

        this.render();
    }

    getComplexity() {
        return this._state.complexity;
    }

    getAvailableComplexity() {
        return [...this._availableComplexity];
    }

    onChangeHandler(event: Event) {
        const changedItem = event.target as HTMLInputElement,
            complexity = changedItem.value;

        if (complexity !== this._state.complexity) {
            this._state.complexity = complexity;

            this.render();
            this._props.onChange(complexity);
        }
    }

    render() {
        this._items.forEach((item: HTMLInputElement) => {
            item.checked = item.value === this._state.complexity;
        });

        return this._el;
    }
}
