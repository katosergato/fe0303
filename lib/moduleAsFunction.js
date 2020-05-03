function module() {
    const exports = {};

    function createElement(tagName, props = {}, innerText) {
        const $el = document.createElement(tagName);

        for (const propName in props) {
            if (propName === 'children' && props.children) {
                $el.append(...props.children);
            } else if (typeof props[propName] !== 'undefined') {
                $el[propName] = props[propName];
            }
        }

        if (innerText) {
            $el.innerText = innerText;
        }

        return $el;
    }

    function render(renderItems, rootEl) {
        rootEl.innerText = '';

        if (Array.isArray(renderItems)) {
            rootEl.append(...renderItems);
        } else {
            rootEl.append(renderItems);
        }
    }

    exports.default = createElement;
    exports.createElement = createElement;
    exports.render = render;

    return exports;
}

module(); // {default: createElement, createElement, render}
