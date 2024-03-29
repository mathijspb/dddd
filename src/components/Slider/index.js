// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Utils
import ValueHover from '../../utils/ValueHover';

// Constants
const ACTIVE_CLASS = 'active';
const PRECISION_MODIFIER = 0.3;
const DEFAULT_STEP_SIZE = 0.01;

// TODO: On change is triggered twice
export default class Slider extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Options
        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE;
        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

        // Data
        this._isPointerLockActive = false;
        this._scrubberOffset = 0;
        this._inputContainer = { x: 0, width: 0 };
        this._scrubber = { width: 0 };
        this._mouseStartPosition = { x: 0, y: 0 };
        this._mousePosition = { x: 0, y: 0 };
        this._isMouseDown = false;
        this._isShiftDown = false;
        this._isSlideStarted = false;

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._resize();
        this._updateValue(this.model.value);
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onResize() {
        this._resize();
    }

    onTick() {
        this._scaleScrubber(this.model.value);
    }

    onListen() {
        this._updateInputValue(this.model.value);
        this._scaleScrubber(this.model.value);
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._inputContainerMouseEnterHandler = this._inputContainerMouseEnterHandler.bind(this);
        this._inputContainerMouseDownHandler = this._inputContainerMouseDownHandler.bind(this);
        this._inputContainerMouseUpHandler = this._inputContainerMouseUpHandler.bind(this);
        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._inputBlurHandler = this._inputBlurHandler.bind(this);
        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
        this._windowMouseMoveHandler = this._windowMouseMoveHandler.bind(this);
        this._windowMouseUpHandler = this._windowMouseUpHandler.bind(this);
        this._windowKeyDownHandler = this._windowKeyDownHandler.bind(this);
        this._windowKeyUpHandler = this._windowKeyUpHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.inputContainer.addEventListener('mouseenter', this._inputContainerMouseEnterHandler);
        this.$refs.inputContainer.addEventListener('mousedown', this._inputContainerMouseDownHandler);
        this.$refs.inputContainer.addEventListener('mouseup', this._inputContainerMouseUpHandler);
        this.$refs.input.addEventListener('change', this._inputChangeHandler);
        this.$refs.input.addEventListener('blur', this._inputBlurHandler);
        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
        window.addEventListener('mousemove', this._windowMouseMoveHandler);
        window.addEventListener('mouseup', this._windowMouseUpHandler);
        window.addEventListener('keydown', this._windowKeyDownHandler);
        window.addEventListener('keyup', this._windowKeyUpHandler);
    }

    _removeEventListeners() {
        this.$refs.inputContainer.removeEventListener('mouseenter', this._inputContainerMouseEnterHandler);
        this.$refs.inputContainer.removeEventListener('mousedown', this._inputContainerMouseDownHandler);
        this.$refs.inputContainer.removeEventListener('mouseup', this._inputContainerMouseUpHandler);
        this.$refs.input.removeEventListener('change', this._inputChangeHandler);
        this.$refs.input.removeEventListener('blur', this._inputBlurHandler);
        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
        window.removeEventListener('mousemove', this._windowMouseMoveHandler);
        window.removeEventListener('mouseup', this._windowMouseUpHandler);
        window.removeEventListener('keydown', this._windowKeyDownHandler);
        window.removeEventListener('keyup', this._windowKeyUpHandler);
    }

    _updateValue(value) {
        this.model.value = Math.max(Math.min(value, this.model.options.max), this.model.options.min);
        this._updateInputValue(this.model.value);
        ValueHover.set(this.model.value);
    }

    _calcStartValue(mouseX) {
        const modifier = this._isShiftDown ? PRECISION_MODIFIER : 1;
        const delta = (mouseX - this._mouseStartPosition.x) * modifier;
        const x = this._mouseStartPosition.x - this._inputContainer.x + delta;
        const percentage = (x / this._inputContainer.width);
        const value = this._map(percentage, 0, 1, this.model.options.min, this.model.options.max);
        return value;
    }

    _scaleScrubber(value) {
        const scaleX = this._map(value, this.model.options.min, this.model.options.max, 0, 1);
        this.$refs.scrubber.style.transform = `scaleX(${scaleX})`;
    }

    _showScrubber() {
        this.$refs.scrubber.style.display = 'block';
    }

    _hideScrubber() {
        this.$refs.scrubber.style.display = 'none';
    }

    _updateInputValue(value) {
        const output = value.toFixed(this._decimalPlaces);
        this.$refs.input.value = output;
    }

    _map(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    _getDecimalPlaces(value) {
        const split = value.toString().split('.');
        return split.length > 1 ? split[1].length : 0;
    }

    /**
     * Resize
     */
    _resize() {
        this._inputContainer = this._getContainerData();
        this._scaleScrubber(this.model.value);
    }

    _getContainerData() {
        const bcr = this.$refs.inputContainer.getBoundingClientRect();
        const x = bcr.left;
        const width = bcr.width;
        return { x, width };
    }

    _selectInput() {
        this._isInputSelected = true;
        this.$refs.input.select();
    }

    _deselectInput() {
        this._isInputSelected = false;
        this.$refs.input.blur();
    }

    _addActiveClass() {
        this.$refs.inputContainer.classList.add(ACTIVE_CLASS);
    }

    _removeActiveClass() {
        this.$refs.inputContainer.classList.remove(ACTIVE_CLASS);
    }

    _getInputValueBasedOnMouseMovement(movementX) {
        const modifier = this._isShiftDown ? PRECISION_MODIFIER : 1;
        return this.model.value + movementX * this._stepSize * modifier;
    }

    /**
     * Handlers
     */
    _pointerLockHanderHandler() {
        if (this.shadowRoot.pointerLockElement === this.$refs.input) {
            this._isPointerLockActive = true;
        } else {
            this._isPointerLockActive = false;
        }
    }

    _windowMouseMoveHandler(e) {
        if (!this._isMouseDown) return;

        let delta = e.movementX;

        // NOTE: Prevents bug in chrome where movementX spikes to high value
        if (Math.abs(delta) > 100) delta = 1 * Math.sign(delta);

        if (delta % 2 === 0) delta *= 0.5;

        if (!this._isSlideStarted) {
            const startValue = this._calcStartValue(e.clientX);
            this._updateValue(startValue);
        }

        if (Math.abs(delta) > 0) this._isSlideStarted = true;

        const value = this._getInputValueBasedOnMouseMovement(delta);
        this._updateValue(value);
    }

    _windowMouseUpHandler(e) {
        this._isMouseDown = false;
        this._isSlideStarted = false;
        this._removeActiveClass();
    }

    _inputContainerMouseUpHandler() {
        document.exitPointerLock();

        if (this._isSlideStarted) return;
        this._selectInput();
        this._hideScrubber();
    }

    _inputContainerMouseEnterHandler() {
        ValueHover.set(this.model.value);
    }

    _inputContainerMouseDownHandler(e) {
        if (this._isMouseDown || this._isInputSelected) return;

        this.$refs.input.requestPointerLock();

        this._addActiveClass();
        this._mouseStartPosition.x = e.clientX;
        this._isMouseDown = true;
    }

    _inputChangeHandler(e) {
        const value = parseFloat(this.$refs.input.value);
        this._updateValue(value);
        this._deselectInput();
        this._showScrubber();
    }

    _inputBlurHandler() {
        this._isInputSelected = false;
        this._showScrubber();
    }

    _windowKeyDownHandler(e) {
        switch (e.keyCode) {
            case 16: // Shift
                if (!this._isShiftDown) {
                    this._isShiftDown = true;
                    this._mouseStartPosition.x = this._mousePosition.x;
                }
                break;
        }
    }

    _windowKeyUpHandler() {
        this._isShiftDown = false;
    }
}

window.customElements.define('dddd-slider', Slider);
