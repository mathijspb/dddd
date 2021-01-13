import Component from '../../Component';

import style from './style.cssx';
import template from './template.html';

export default class Button extends Component {
    constructor({ options }) {
        super({ style, template, options });

        // Options
        this._onClickCallback = options.onClick;

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.button.addEventListener('click', this._clickHandler);
    }

    _removeEventListeners() {
        this.$refs.button.removeEventListener('click', this._clickHandler);
    }

    _setStartValue() {
        this.$refs.input.value = this._value;
    }

    _triggerOnClickCallback(value) {
        if (typeof this._onClickCallback === 'function') {
            this._onClickCallback(value);
        }
    }

    /**
     * Handlers
     */
    _clickHandler() {
        this._triggerOnClickCallback();
    }
}

window.customElements.define('dddd-button', Button);
