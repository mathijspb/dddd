import Component from '../../Component';

import style from './style.css';
import template from './template.html';

// Constants
const ACTIVE_CLASS = 'active';

// TODO: On change is triggered twice
export default class Slider extends Component {
    constructor(model) {
        super({ style, template, model });

        // Data
        this._scrubberOffset = 0;
        this._inputContainer = { x: 0, width: 0 };
        this._scrubber = { width: 0 };
        this._mouseStartPosition = { x: 0, y: 0 };
        this._mousePosition = { x: 0, y: 0 };
        this._inputContainerWidth = null;
        this._isMouseDown = false;
        this._isShiftDown = false;

        // Setup
        this._bindHandlers();
    }

    connected() {
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

    onUpdate() {
        this._scaleScrubber(this.model.value);
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._scrubberMouseDownHandler = this._scrubberMouseDownHandler.bind(this);
        this._scrubberMouseMoveHandler = this._scrubberMouseMoveHandler.bind(this);
        this._scrubberMouseUpHandler = this._scrubberMouseUpHandler.bind(this);
        this._inputContainerMouseDownHandler = this._inputContainerMouseDownHandler.bind(this);
        this._inputContainerDoubleClickHandler = this._inputContainerDoubleClickHandler.bind(this);
        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._inputBlurHandler = this._inputBlurHandler.bind(this);
        this._windowKeyDownHandler = this._windowKeyDownHandler.bind(this);
        this._windowKeyUpHandler = this._windowKeyUpHandler.bind(this);
        
    }

    _setupEventListeners() {
        this.$refs.scrubber.addEventListener('mousedown', this._scrubberMouseDownHandler);
        this.$refs.inputContainer.addEventListener('mousedown', this._inputContainerMouseDownHandler);
        this.$refs.inputContainer.addEventListener('dblclick', this._inputContainerDoubleClickHandler);
        this.$refs.input.addEventListener('change', this._inputChangeHandler);
        this.$refs.input.addEventListener('blur', this._inputBlurHandler);
        window.addEventListener('mousemove', this._scrubberMouseMoveHandler);
        window.addEventListener('mouseup', this._scrubberMouseUpHandler);
        window.addEventListener('keydown', this._windowKeyDownHandler);
        window.addEventListener('keyup', this._windowKeyUpHandler);
    }

    _removeEventListeners() {
        this.$refs.scrubber.removeEventListener('mousedown', this._scrubberMouseDownHandler);
        this.$refs.inputContainer.removeEventListener('mousedown', this._inputContainerMouseDownHandler);
        this.$refs.inputContainer.removeEventListener('dblclick', this._inputContainerDoubleClickHandler);
        this.$refs.input.removeEventListener('change', this._inputChangeHandler);
        this.$refs.input.removeEventListener('blur', this._inputBlurHandler);
        window.removeEventListener('mousemove', this._scrubberMouseMoveHandler);
        window.removeEventListener('mouseup', this._scrubberMouseUpHandler);
        window.removeEventListener('keydown', this._windowKeyDownHandler);
        window.removeEventListener('keyup', this._windowKeyUpHandler);
        
    }

    _updateValue(value) {
        this.model.value = Math.max(Math.min(value, this.model.options.max), this.model.options.min);
        this._updateInputValue(this.model.value);
    }

    _calcValue(mouseX) {
        // TODO: Add modifier to constants
        const modifier = this._isShiftDown ? 0.3 : 1;
        const delta = (mouseX - this._mouseStartPosition.x) * modifier;
        const x = this._mouseStartPosition.x - this._inputContainer.x + delta;
        const percentage = (x / this._inputContainerWidth);
        const value = this._map(percentage, 0, 1, this.model.options.min, this.model.options.max);
        return value;
    }

    _getScrubberOffset(mouseX) {
        const position = this._inputContainerWidth * this._currentValu;
        const offset = mouseX - (this._inputContainer.x + position);
        return offset;
    }

    _scaleScrubber(value) {
        const scaleX = this._map(value, this.model.options.min, this.model.options.max, 0, 1);
        this.$refs.scrubber.style.transform = `scaleX(${scaleX})`;
    }

    _updateInputValue(value) {
        const output = (Math.round(value * 100) / 100).toFixed(2);
        this.$refs.input.value = output;
    }

    _map(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    /**
     * Resize
     */
    _resize() {
        this._inputContainer = this._getContainerData();
        this._scrubber = this._getScrubberData();
        this._inputContainerWidth = this._inputContainer.width;
        this._scaleScrubber(this.model.value);
    }

    _getContainerData() {
        const bcr = this.$refs.inputContainer.getBoundingClientRect();
        const x = bcr.left;
        const width = bcr.width;
        return { x, width };
    }

    _getScrubberData() {
        const bcr = this.$refs.scrubber.getBoundingClientRect();
        const width = bcr.width;
        return { width };
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

    /**
     * Handlers
     */
    _scrubberMouseDownHandler(e) {
        this._isMouseDown = true;
        this._scrubberOffset = this._getScrubberOffset(e.clientX);
    }

    _scrubberMouseMoveHandler(e) {
        if (this._isMouseDown) {
            this._mousePosition.x = e.clientX;
            const value = this._calcValue(e.clientX);
            this._updateValue(value);
        }
    }

    _scrubberMouseUpHandler(e) {
        this._isMouseDown = false;
        this._removeActiveClass();
        clearTimeout(this._mouseDownClickTimeout);
    }

    _inputContainerMouseDownHandler(e) {
        if (this._isMouseDown || this._isInputSelected) return;
        clearTimeout(this._mouseDownClickTimeout);
        this._addActiveClass();
        this._mouseStartPosition.x = e.clientX;
        this._mousePosition.x = e.clientX;
        this._mouseDownClickTimeout = setTimeout(() => {
            this._isMouseDown = true;
            this._scrubberOffset = this._scrubber.width * 0.5;
            const value = this._calcValue(e.clientX);
            this._updateValue(value);
        }, 150);
    }

    _inputContainerDoubleClickHandler(e) {
        clearTimeout(this._mouseDownClickTimeout);
        this._selectInput();
    }

    _inputChangeHandler(e) {
        const value = parseFloat(this.$refs.input.value);
        this._updateValue(value);
        this._deselectInput();
    }

    _inputBlurHandler() {
        this._isInputSelected = false;
    }

    _windowKeyDownHandler(e) {
        switch (e.keyCode) {
            case 16:
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
