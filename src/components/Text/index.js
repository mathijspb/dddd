import Component from '../../Component';

import style from './style.css';
import template from './template.html';

export default class Text extends Component {
    constructor(model) {
        super({ style, template, model });

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setStartValue();
        this._setupEventListeners();
    }

    destroyed() {
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
        this.$refs.input.value = this.model.value;
    }

    /**
     * Handlers
     */
    _keyUpHandler() {
        this.model.value = this.$refs.input.value;
    }
}

window.customElements.define('dddd-input', Text);
