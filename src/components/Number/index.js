// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Utils
import ValueHover from '../../utils/ValueHover';

// Constants
const DEFAULT_STEP_SIZE = 0.01;

export default class NumberComponent extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Options
        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE;
        this._min = typeof this.model.options.min === 'number' ? this.model.options.min : null;
        this._max = typeof this.model.options.max === 'number' ? this.model.options.max : null;
        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

        // Data
        this._activeInput = null;
        this._isPointerLockActive = false;
        this._isMouseMoved = false;

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
        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);
        this._changeHandler = this._changeHandler.bind(this);
        this._mouseWheelHandler = this._mouseWheelHandler.bind(this);
        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.input.addEventListener('mouseenter', this._mouseEnterHandler);
        this.$refs.input.addEventListener('mousedown', this._mouseDownHandler);
        this.$refs.input.addEventListener('mouseup', this._mouseUpHandler);
        this.$refs.input.addEventListener('change', this._changeHandler);
        this.$refs.input.addEventListener('mousewheel', this._mouseWheelHandler);
        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.addEventListener('mousemove', this._mouseMoveHandler);
    }

    _removeEventListeners() {
        this.$refs.input.removeEventListener('mouseenter', this._mouseEnterHandler);
        this.$refs.input.removeEventListener('mousedown', this._mouseDownHandler);
        this.$refs.input.removeEventListener('mouseup', this._mouseUpHandler);
        this.$refs.input.removeEventListener('change', this._changeHandler);
        this.$refs.input.removeEventListener('mousewheel', this._mouseWheelHandler);
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
    _mouseEnterHandler() {
        ValueHover.set(this.model.value);
    }

    _mouseDownHandler(e) {
        this.$refs.input.requestPointerLock();
        this._isPointerLockActive = true;
        this._isMouseMoved = false;
    }

    _mouseUpHandler(e) {
        document.exitPointerLock();
        if (this._isMouseMoved) {
            this.$refs.input.blur();
        } else {
            this.$refs.input.select();
        }
    }

    _changeHandler() {
        const value = Number(this.$refs.input.value);
        this._updateModelValue(value);
        this.$refs.input.blur();
    }

    _mouseWheelHandler(e) {
        const value = this.model.value + this._stepSize * Math.sign(e.wheelDelta);
        this._updateInputValue(value);
        this._updateModelValue(value);
    }

    _pointerLockHanderHandler() {
        if (document.pointerLockElement) {
            // this._isPointerLockActive = true;
        } else {
            this._isPointerLockActive = false;
        }
    }

    _mouseMoveHandler(e) {
        if (!this._isPointerLockActive) return;

        const delta = Math.max(Math.min(e.movementX, 100), -100); // NOTE: Prevents bug in chrome where movementX spikes to high value
        if (Math.abs(delta) > 0) {
            this._isMouseMoved = true;
        }

        let value = this._getInputValueBasedOnMouseMovement(delta);
        if (typeof this._min === 'number') value = Math.max(value, this._min);
        if (typeof this._max === 'number') value = Math.min(value, this._max);
        this._updateInputValue(value);
        this._updateModelValue(value);
    }
}

window.customElements.define('dddd-number', NumberComponent);
