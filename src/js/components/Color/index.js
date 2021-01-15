// Base component
import Component from '/js/Component';

// Style
import style from './style.cssx';

// Template
import template from './template.html';

export default class Color extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        // Props
        this._object = object;
        this._property = property;
        this._value = object[property];

        // Options
        this._onChangeCallback = options.onChange;

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setStartColor();
        this._setColorCodeValue(this._value);
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
        this._inputChangeHandler = this._inputChangeHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.color.addEventListener('input', this._inputChangeHandler);
    }

    _removeEventListeners() {
        this.$refs.color.removeEventListener('input', this._inputChangeHandler);
    }

    _setStartColor() {
        this.$refs.color.value = this._value;
    }

    _setColorCodeValue(value) {
        this.$refs.colorCode.innerText = value;
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
    _inputChangeHandler(e) {
        const hex = this.$refs.color.value;
        this._triggerOnChangeCallback(hex);
        this._setColorCodeValue(hex);
    }
}

window.customElements.define('dddd-color', Color);
