// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Constants
const TYPE_THREE = 'TYPE_THREE';
const TYPE_STRING = 'TYPE_STRING';

export default class Color extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Data
        this._type = this._getType();

        // Setup
        this._bindHandlers();
    }

    connected() {
        const value = this._getValue();
        this._setStartColor(value);
        this._setColorCodeValue(value);
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

    _getType() {
        const value = this.model.value;
        if (value.isColor) {
            return TYPE_THREE;
        } else {
            return TYPE_STRING;
        }
    }

    _getValue() {
        if (this._type === TYPE_THREE) {
            return `#${this.model.value.getHexString()}`;
        } else {
            return this.model.value;
        }
    }

    _setStartColor(value) {
        this.$refs.color.value = value;
    }

    _setColorCodeValue(value) {
        this.$refs.colorCode.innerText = value;
    }

    _setModelValue(value) {
        if (this._type === TYPE_THREE) {
            this.model.value.set(value);
            if (typeof this.model.options.onChange === 'function') {
                this.model.options.onChange(this._value);
            }
        } else {
            this.model.value = value;
        }
    }

    /**
     * Handlers
     */
    _inputChangeHandler(e) {
        const value = this.$refs.color.value;
        this._setModelValue(value);
        this._setColorCodeValue(value);
    }
}

window.customElements.define('dddd-color', Color);
