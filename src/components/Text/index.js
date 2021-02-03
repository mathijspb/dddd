import Component from '../../Component';

import style from './style.css';
import template from './template.html';

export default class Text extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._updateInputValue(this.model.value);
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onListen() {
        this._updateInputValue(this.model.value);
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

    _updateInputValue(value) {
        this.$refs.input.value = value;
    }

    /**
     * Handlers
     */
    _keyUpHandler() {
        this.model.value = this.$refs.input.value;
    }
}

window.customElements.define('dddd-input', Text);
