import Component from '../../Component';

import style from './style.cssx';
import template from './template.html';

export default class Slider extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.scrubber.addEventListener('mousedown', this._mouseDownHandler);
    }

    _removeEventListeners() {
        this.$refs.scrubber.removeEventListener('mousedown', this._mouseDownHandler);
    }

    /**
     * Handlers
     */
    _mouseDownHandler(e) {}
}

window.customElements.define('dddd-slider', Slider);
