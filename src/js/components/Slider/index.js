import Component from '../../Component';

import style from './style.cssx';
import template from './template.html';

export default class Slider extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        this._object = object;
        this._property = property;
        this._value = object[property];

        this._min = options.min;
        this._max = options.max;
        this._scrubberOffset = 0;
        this._onChangeCallback = options.onChange;
        this._container = { x: 0, width: 0 };
        this._scrubber = { width: 0 };
        this._mouseStartPosition = { x: 0, y: 0 };
        this._mousePosition = { x: 0, y: 0 };
        this._progressWidth = null;
        this._isMouseDown = false;
        this._isShiftDown = false;

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._updateValue(this._value);
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onResize() {
        this._resize();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._scrubberMouseDownHandler = this._scrubberMouseDownHandler.bind(this);
        this._scrubberMouseMoveHandler = this._scrubberMouseMoveHandler.bind(this);
        this._scrubberMouseUpHandler = this._scrubberMouseUpHandler.bind(this);
        this._containerMouseDownHandler = this._containerMouseDownHandler.bind(this);
        this._containerDoubleClickHandler = this._containerDoubleClickHandler.bind(this);
        this._windowClickHandler = this._windowClickHandler.bind(this);
        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._inputBlurHandler = this._inputBlurHandler.bind(this);
        this._windowKeyDownHandler = this._windowKeyDownHandler.bind(this);
        this._windowKeyUpHandler = this._windowKeyUpHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.scrubber.addEventListener('mousedown', this._scrubberMouseDownHandler);
        this.$refs.container.addEventListener('mousedown', this._containerMouseDownHandler);
        this.$refs.container.addEventListener('dblclick', this._containerDoubleClickHandler);
        this.$refs.input.addEventListener('change', this._inputChangeHandler);
        this.$refs.input.addEventListener('blur', this._inputBlurHandler);
        window.addEventListener('mousemove', this._scrubberMouseMoveHandler);
        window.addEventListener('mouseup', this._scrubberMouseUpHandler);
        window.addEventListener('click', this._windowClickHandler);
        window.addEventListener('keydown', this._windowKeyDownHandler);
        window.addEventListener('keyup', this._windowKeyUpHandler);
    }

    _removeEventListeners() {
        this.$refs.scrubber.removeEventListener('mousedown', this._scrubberMouseDownHandler);
        this.$refs.container.removeEventListener('mousedown', this._containerMouseDownHandler);
        this.$refs.container.removeEventListener('dblclick', this._containerDoubleClickHandler);
        this.$refs.input.removeEventListener('change', this._inputChangeHandler);
        this.$refs.input.removeEventListener('blur', this._inputBlurHandler);
        window.removeEventListener('mousemove', this._scrubberMouseMoveHandler);
        window.removeEventListener('mouseup', this._scrubberMouseUpHandler);
        window.removeEventListener('click', this._windowClickHandler);
        window.removeEventListener('keydown', this._windowKeyDownHandler);
        window.removeEventListener('keyup', this._windowKeyUpHandler);
    }

    _updateValue(value) {
        this._value = Math.max(Math.min(value, this._max), this._min);
        this._translateScrubber(this._value);
        this._updateInputValue(this._value);
        this._triggerOnChangeCallback(this._value);
        this._object[this._property] = this._value;
    }

    _triggerOnChangeCallback(value) {
        if (typeof this._onChangeCallback === 'function') {
            this._onChangeCallback(value);
        }
    }

    _calcValue(mouseX) {
        const modifier = this._isShiftDown ? 0.3 : 1;
        const delta = (mouseX - this._mouseStartPosition.x) * modifier;
        const x = this._mouseStartPosition.x - this._container.x + delta - this._scrubberOffset;
        const value = x / this._progressWidth;
        return value;
    }

    _getScrubberOffset(mouseX) {
        const position = this._progressWidth * this._value;
        const offset = mouseX - (this._container.x + position);
        return offset;
    }   

    // TODO: Translate on tick
    _translateScrubber(value) {
        const x = this._progressWidth * value;
        this.$refs.scrubber.style.transform = `translateX(${x}px)`;
    }

    _updateInputValue(value) {
        const output = (Math.round(value * 100) / 100).toFixed(2);
        this.$refs.input.value = output;
    }

    /**
     * Resize
     */
    _resize() {
        this._container = this._getContainerData();
        this._scrubber = this._getScrubberData();
        this._progressWidth = this._container.width - this._scrubber.width;
        this._translateScrubber(this._value);
    }

    _getContainerData() {
        const bcr = this.$refs.container.getBoundingClientRect();
        const x = bcr.left; 
        const width = bcr.width;
        return { x, width };
    }

    _getScrubberData() {
        const bcr = this.$refs.scrubber.getBoundingClientRect();
        const width = bcr.width;
        return { width };
    }

    _hideScrubber() {
        this.$refs.scrubber.style.opacity = 0;
        this.$refs.scrubber.style.visibility = 'hidden';
    }

    _showScrubber() {
        this.$refs.scrubber.style.opacity = 1;
        this.$refs.scrubber.style.visibility = 'visible';
    }

    _selectInput() {
        this._isInputSelected = true;
        this.$refs.input.select();
    }

    _deselectInput() {
        this._isInputSelected = false;
        this.$refs.input.blur();
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
        clearTimeout(this._mouseDownClickTimeout);
    }

    _containerMouseDownHandler(e) {
        if (this._isMouseDown || this._isInputSelected) return;
        clearTimeout(this._mouseDownClickTimeout);
        this._mouseStartPosition.x = e.clientX;
        this._mousePosition.x = e.clientX;
        this._mouseDownClickTimeout = setTimeout(() => {
            this._isMouseDown = true;
            this._scrubberOffset = this._scrubber.width * 0.5;
            const value = this._calcValue(e.clientX);
            this._updateValue(value);
        }, 150);
    }

    _containerDoubleClickHandler(e) {
        clearTimeout(this._mouseDownClickTimeout);
        this._hideScrubber();
        this._selectInput();
    }

    _windowClickHandler(e) {
        if (e.target !== this) {
            // this._showScrubber();
        }
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
        switch(e.keyCode) {
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
