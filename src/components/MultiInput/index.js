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

export default class MultiInput extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Options
        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE;
        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

        // Data
        this._activeInput = null;
        this._isPointerLockActive = false;
        this._inputs = [];

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._createInputs();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onListen() {
        this._updateAllInputValues(this.model.value);
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);
        this._changeHandler = this._changeHandler.bind(this);
        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    }

    _setupEventListeners() {
        for (let i = 0, len = this._inputs.length; i < len; i++) {
            this._inputs[i].addEventListener('mouseenter', this._mouseEnterHandler);
        }
        this.$el.addEventListener('mousedown', this._mouseDownHandler);
        this.$el.addEventListener('mouseup', this._mouseUpHandler);
        this.$el.addEventListener('change', this._changeHandler);
        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.addEventListener('mousemove', this._mouseMoveHandler);
    }

    _removeEventListeners() {
        for (let i = 0, len = this._inputs.length; i < len; i++) {
            this._inputs[i].removeEventListener('mouseenter', this._mouseEnterHandler);
        }
        this.$el.removeEventListener('mousedown', this._mouseDownHandler);
        this.$el.removeEventListener('mouseup', this._mouseUpHandler);
        this.$el.removeEventListener('change', this._changeHandler);
        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.removeEventListener('mousemove', this._mouseMoveHandler);
    }

    _createInputs() {
        for (const key in this.model.value) {
            const value = this.model.value[key];
            if (typeof value === 'number') {
                const input = document.createElement('input');
                input.classList.add('input');
                input.value = value;
                this._inputs.push(input);
                this.$refs.inputContainer.appendChild(input);
            }
        }
    }

    _updateModelValue() {
        if (this.model.value.constructor.name === 'Euler') { // NOTE: TMP fix for Three js rotation
            this.model.value.x = parseFloat(this._inputs[0].value);
            this.model.value.y = parseFloat(this._inputs[1].value);
            this.model.value.z = parseFloat(this._inputs[2].value);
        } else {
            for (const [index, [key]] of Object.entries(Object.entries(this.model.value))) {
                if (this._inputs[index]) {
                    this.model.value[key] = parseFloat(this._inputs[index].value);
                }
            }
        }
    }

    _getInputValueBasedOnMouseMovement(movementX) {
        if (!this._activeInput) return;
        const currentValue = parseFloat(this._activeInput.value);
        return currentValue + movementX * this._stepSize;
    }

    _updateInputValue(value) {
        if (this._activeInput) {
            this._activeInput.value = value.toFixed(this._decimalPlaces); // TODO: Fix precision
        }
    }

    _updateAllInputValues() {
        for (const [index, [key]] of Object.entries(Object.entries(this.model.value))) {
            this._inputs[index].value = this.model.value[key];
        }
    }

    _getDecimalPlaces(value) {
        const split = value.toString().split('.');
        return split.length > 1 ? split[1].length : 0;
    }

    /**
     * Handlers
     */
    _mouseEnterHandler(e) {
        ValueHover.set(e.target.value);
    }

    _mouseDownHandler(e) {
        if (e.target.tagName === 'INPUT') {
            this._activeInput = e.target;
            this.$el.requestPointerLock();
        }
    }

    _mouseUpHandler() {
        this._activeInput = null;
        document.exitPointerLock();
    }

    _changeHandler() {
        this._updateInputValue();
    }

    _pointerLockHanderHandler(e) {
        if (this.shadowRoot.pointerLockElement === this.$el) {
            this._isPointerLockActive = true;
        } else {
            this._isPointerLockActive = false;
        }
    }

    _mouseMoveHandler(e) {
        if (!this._isPointerLockActive) return;

        const delta = Math.max(Math.min(e.movementX, 100), -100); // NOTE: Prevents bug in chrome where movementX spikes to high value
        const value = this._getInputValueBasedOnMouseMovement(delta);
        this._updateInputValue(value);
        this._updateModelValue();
    }
}

window.customElements.define('dddd-multi-input', MultiInput);
