class Filter {
    constructor(props = {}) {
        const currentHash = location.hash;

        this.props = props;
        this._el = document.querySelector('footer');
        this._filters = this._el.querySelectorAll('.filters a');
        this._itemCounter = this._el.querySelector('.todo-count strong');
        this._possibleFilters = Array.prototype.map.call(this._filters, this.foundFilterName);
        this._currentFilter = this._possibleFilters.find(filterName => filterName === currentHash) || this._possibleFilters[0];
        this.clickFilterHandler = this.clickFilterHandler.bind(this);
        this.setFilterFlag = this.setFilterFlag.bind(this);

        this._filters.forEach((_filterEl) => {
            _filterEl.addEventListener('click', this.clickFilterHandler);
            this.setFilterFlag(_filterEl);
        });

        this.render();
    }

    updateProps(newProps) {
        this.props = {
            ...this.props,
            ...newProps
        };

        this.render();
    }

    clickFilterHandler(e) {
        const _filterEl = e.currentTarget;

        this._currentFilter = _filterEl.hash;
        this._filters.forEach(this.setFilterFlag);
        this.props.onChangeFilter(this._currentFilter);
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
