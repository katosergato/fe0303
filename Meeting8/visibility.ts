let hidden: string,
    visibilityChange: string;

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

interface IVisibilityChangeProps {
    onChange: (isHidden: boolean) => void;
}

export default class VisibilityChange {
    _props: IVisibilityChangeProps;
    _active: boolean;

    constructor(props: IVisibilityChangeProps) {
        this._props = props;

        this._active = true;
        this.onChange = this.onChange.bind(this);

        document.addEventListener(visibilityChange, this.onChange, false);
    }

    onChange() {
        const isHidden = document[hidden];

        this._props.onChange(isHidden);
    }

    remove() {
        this._active = false;
        document.removeEventListener(visibilityChange, this.onChange, false);
    }

    isActive() {
        return this._active;
    }
}
