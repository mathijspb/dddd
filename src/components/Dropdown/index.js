// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Utils
import ValueHover from '../../utils/ValueHover';

export default class Dropdown extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Setup
        this._isArray = Array.isArray(this.model.options.options);
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
        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
        this._selectChangeHandler = this._selectChangeHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.select.addEventListener('mouseenter', this._mouseEnterHandler);
        this.$refs.select.addEventListener('change', this._selectChangeHandler);
    }

    _removeEventListeners() {
        this.$refs.select.removeEventListener('mouseenter', this._mouseEnterHandler);
        this.$refs.select.removeEventListener('change', this._selectChangeHandler);
    }

    _addOptions() {
        const options = this.model.options.options;
        if (this._isArray) {
            for (let i = 0, len = options.length; i < len; i++) {
                const item = options[i];
                const element = document.createElement('option');
                element.value = item;
                element.textContent = item;
                element.selected = item === this.model.value;
                this.$refs.select.appendChild(element);
            }
        } else {
            for (const key in options) {
                const item = options[key];
                const element = document.createElement('option');
                element.value = key;
                element.textContent = key;
                element.selected = item === this.model.value;
                this.$refs.select.appendChild(element);
            }
        }
    }

    _updateSelectValue(value) {
        this.$refs.select.value = value;
    }

    _getValue() {
        if (this._isArray) {
            return this.$refs.select.value;
        } else {
            return this.model.options.options[this.$refs.select.value];
        }
    }

    /**
     * Handlers
     */
    _mouseEnterHandler() {
        ValueHover.set(this.model.value);
    }

    _selectChangeHandler() {
        this.model.value = this._getValue();
        this.$refs.select.blur();
    }
}

window.customElements.define('dddd-dropdown', Dropdown);
