class Filter {
    constructor(props = {}) {
        const currentHash = location.hash;

        this.props = props;
        this._el = document.querySelector('footer');
        this._filters = this._el.querySelectorAll('.filters a');
        this._itemCounter = this._el.querySelector('.todo-count strong');
        this._possibleFilters = Array.prototype.map.call(this._filters, this.foundFilterName);
        this._currentFilter = this._possibleFilters.find(filterName => filterName === currentHash) || this._possibleFilters[0];

        this._filters.forEach(this.setFilterFlag.bind(this));
        this.render();
    }

    foundFilterName(_linkEl) {
        return _linkEl.hash;
    }

    setFilterFlag(_filterEl) {
        if (_filterEl.hash === this._currentFilter) {
            _filterEl.classList.add('selected');
        } else {
            _filterEl.classList.remove('selected');
        }
    }

    getFilter() {
        return this._currentFilter;
    }

    render() {
        this._itemCounter.innerText = this.props.itemsCount || 0;
    }
}
