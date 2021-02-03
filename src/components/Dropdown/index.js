import Component from '../../Component';

import style from './style.css';
import template from './template.html';

export default class Dropdown extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._addOptions();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onListen() {
        this._updateSelectValue(this.model.value);
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._selectChangeHandler = this._selectChangeHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.select.addEventListener('change', this._selectChangeHandler);
    }

    _removeEventListeners() {
        this.$refs.select.removeEventListener('change', this._selectChangeHandler);
    }

    _addOptions() {
        const options = this.model.options.options;
        for (let i = 0, len = options.length; i < len; i++) {
            const item = options[i];
            const element = document.createElement('option');
            element.value = item;
            element.textContent = item;
            element.selected = item === this._value;
            this.$refs.select.appendChild(element);
        }
    }

    _updateSelectValue(value) {
        this.$refs.select.value = value; // TODO: Fix precision;
    }

    /**
     * Handlers
     */
    _selectChangeHandler() {
        this.model.value = this.$refs.select.value;
    }
}

window.customElements.define('dddd-dropdown', Dropdown);
