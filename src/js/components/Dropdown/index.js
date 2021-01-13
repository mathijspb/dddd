import Component from '../../Component';

import style from './style.cssx';
import template from './template.html';

export default class Dropdown extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        this._object = object;
        this._property = property;
        this._value = object[property];

        // Options
        this._options = options.options;
        this._onChangeCallback = options.onChange;

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._addOptions();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onResize() {
        this._resize();
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
        for (let i = 0, len = this._options.length; i < len; i++) {
            const item = this._options[i];
            const element = document.createElement('option');
            element.value = item;
            element.textContent = item;
            element.selected = item === this._value;
            this.$refs.select.appendChild(element);
        }
    }

    _triggerOnChangeCallback(value) {
        if (typeof this._onChangeCallback === 'function') {
            this._onChangeCallback(value);
        }
    }

    /**
     * Resize
     */
    _resize() {
    }

    /**
     * Handlers
     */
    _selectChangeHandler(e) {
        this._triggerOnChangeCallback(this.$refs.select.value);
    }
}

window.customElements.define('dddd-dropdown', Dropdown);
