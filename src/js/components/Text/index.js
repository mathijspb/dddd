import Component from '../../Component';

import style from './style.cssx';
import template from './template.html';

export default class Text extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        // Props
        this._object = object;
        this._property = property;
        this._value = object[property];

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setStartValue();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._keyUpHandler = this._keyUpHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.input.addEventListener('keyup', this._keyUpHandler);
    }

    _removeEventListeners() {
        this.$refs.input.removeEventListener('keyup', this._keyUpHandler);
    }

    _setStartValue() {
        this.$refs.input.value = this._value;
    }

    _triggerOnChangeCallback(value) {
        if (typeof this._onChangeCallback === 'function') {
            this._onChangeCallback(value);
        }
    }

    /**
     * Handlers
     */
    _keyUpHandler() {
        this._triggerOnChangeCallback(this.$refs.input.value);
    }
}

window.customElements.define('dddd-input', Text);
