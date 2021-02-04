// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Constants
const DEFAULT_STEP_SIZE = 0.01;

export default class Number extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Options
        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE;
        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

        // Data
        this._activeInput = null;
        this._isPointerLockActive = false;

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
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);
        this._changeHandler = this._changeHandler.bind(this);
        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.input.addEventListener('mousedown', this._mouseDownHandler);
        this.$refs.input.addEventListener('mouseup', this._mouseUpHandler);
        this.$refs.input.addEventListener('change', this._changeHandler);
        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.addEventListener('mousemove', this._mouseMoveHandler);
    }

    _removeEventListeners() {
        this.$refs.input.removeEventListener('mousedown', this._mouseDownHandler);
        this.$refs.input.removeEventListener('mouseup', this._mouseUpHandler);
        this.$refs.input.removeEventListener('change', this._changeHandler);
        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.removeEventListener('mousemove', this._mouseMoveHandler);
    }

    _updateModelValue(value) {
        this.model.value = value;
    }

    _getInputValueBasedOnMouseMovement(movementX) {
        return this.model.value + movementX * this._stepSize;
    }

    _updateInputValue(value) {
        this.$refs.input.value = value.toFixed(this._decimalPlaces); // TODO: Fix precision;
    }

    _getDecimalPlaces(value) {
        const split = value.toString().split('.');
        return split.length > 1 ? split[1].length : 0;
    }

    /**
     * Handlers
     */
    _mouseDownHandler(e) {
        this.$refs.input.requestPointerLock();
    }

    _mouseUpHandler() {
        document.exitPointerLock();
    }

    _changeHandler() {
        this._updateModelValue(this.$refs.input.value);
    }

    _pointerLockHanderHandler() {
        if (document.pointerLockElement) {
            this._isPointerLockActive = true;
        } else {
            this._isPointerLockActive = false;
        }
    }

    _mouseMoveHandler(e) {
        if (this._isPointerLockActive) {
            const value = this._getInputValueBasedOnMouseMovement(e.movementX);
            this._updateInputValue(value);
            this._updateModelValue(value);
        }
    }
}

window.customElements.define('dddd-number', Number);
