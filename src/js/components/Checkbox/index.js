// Base component
import Component from '/js/Component';

// Style
import style from './style.cssx';

// Template
import template from './template.html';

export default class Checkbox extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        this._object = object;
        this._property = property;
        this._value = object[property];

        // Options
        this._onChangeCallback = options.onChange;

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._updateChecked();
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
        this._checkboxChangeHandler = this._checkboxChangeHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.checkbox.addEventListener('change', this._checkboxChangeHandler);
    }

    _removeEventListeners() {
        this.$refs.checkbox.removeEventListener('change', this._checkboxChangeHandler);
    }

    _updateChecked() {
        this.$refs.checkbox.checked = this._value;
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
    _checkboxChangeHandler(e) {
        this._triggerOnChangeCallback(this.$refs.checkbox.checked);
    }
}

window.customElements.define('dddd-checkbox', Checkbox);
