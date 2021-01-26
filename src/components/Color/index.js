// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Color extends Component {
    constructor(model) {
        super({ style, template, model });

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setStartColor();
        this._setColorCodeValue(this.model.value);
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
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
        this.$refs.color.value = this.model.value;
    }

    _setColorCodeValue(value) {
        this.$refs.colorCode.innerText = value;
    }

    /**
     * Handlers
     */
    _inputChangeHandler(e) {
        const value = this.$refs.color.value;
        this.model.value = value;
        this._setColorCodeValue(value);
    }
}

window.customElements.define('dddd-color', Color);
