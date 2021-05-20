// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Constants
const TYPE_THREE = 'TYPE_THREE';
const TYPE_STRING = 'TYPE_STRING';
const TYPE_HEX = 'TYPE_HEX';
const CLASS_NAME_ERROR = 'error';

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
        this._setColorValue(value);
        this._setColorString(value);
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
        this._colorStringFocusHandler = this._colorStringFocusHandler.bind(this);
        this._colorStringBlurHandler = this._colorStringBlurHandler.bind(this);
        this._colorStringKeyUpHandler = this._colorStringKeyUpHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.color.addEventListener('input', this._inputChangeHandler);
        this.$refs.colorString.addEventListener('focus', this._colorStringFocusHandler);
        this.$refs.colorString.addEventListener('blur', this._colorStringBlurHandler);
        this.$refs.colorString.addEventListener('keyup', this._colorStringKeyUpHandler);
    }

    _removeEventListeners() {
        this.$refs.color.removeEventListener('input', this._inputChangeHandler);
        this.$refs.colorString.removeEventListener('focus', this._colorStringFocusHandler);
        this.$refs.colorString.removeEventListener('blur', this._colorStringBlurHandler);
        this.$refs.colorString.removeEventListener('keyup', this._colorStringKeyUpHandler);
    }

    _getType() {
        const value = this.model.value;
        if (value.isColor) {
            return TYPE_THREE;
        } else if (this._isHex(value)) {
            return TYPE_HEX;
        } else {
            return TYPE_STRING;
        }
    }

    _getValue() {
        switch (this._type) {
            case TYPE_THREE:
                return `#${this.model.value.getHexString()}`;
            case TYPE_STRING:
                return this._convertColorNameToHex(this.model.value);
            default:
                return this.model.value;
        }
    }

    _setColorValue(value) {
        this.$refs.color.value = value;
    }

    _setColorString(value) {
        this.$refs.colorString.value = value;
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

    _updateValueFromStringInput() {
        let value = this.$refs.colorString.value;
        if (value.charAt(0) !== '#') value = '#' + value;

        if (this._isHex(value)) {
            this._hideError();
            this._setColorString(value);
            this._setModelValue(value);
            this._setColorValue(value);
        } else {
            this._showError();
            this._setColorValue('#000000');
        }
    }

    _showError() {
        this.$el.classList.add(CLASS_NAME_ERROR);
    }

    _hideError() {
        this.$el.classList.remove(CLASS_NAME_ERROR);
    }

    /**
     * Helpers
     */
    _isHex(value) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(value);
    }

    _convertColorNameToHex(colorName) {
        const context = document.createElement('canvas').getContext('2d');
        context.fillStyle = colorName;
        return context.fillStyle;
    }

    /**
     * Handlers
     */
    _inputChangeHandler() {
        const value = this.$refs.color.value;
        this._setModelValue(value);
        this._setColorString(value);
        this._hideError();
    }

    _colorStringFocusHandler() {
        this.$refs.colorString.select();
    }

    _colorStringBlurHandler() {
        this._updateValueFromStringInput();
    }

    _colorStringKeyUpHandler(e) {
        if (e.keyCode === 13) {
            this._updateValueFromStringInput();
            this.$refs.colorString.blur();
        }
    }
}

window.customElements.define('dddd-color', Color);
