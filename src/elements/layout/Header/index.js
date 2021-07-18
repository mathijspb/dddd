// Base class
import Layout from '../../../baseClasses/Layout';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Header extends Layout {
    constructor({ root, options }) {
        super({ root, style, template });

        // Props
        this._options = options;

        // Setup
        this._width = null;
        this._height = null;
    }

    /**
     * Getters & Setters
     */
    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    /**
     * Public
     */
    addElement(element) {
        this.$el.appendChild(element);
        this._resize();
    }

    resize() {
        this._resize();
    }

    /**
     * Resize
     */
    _resize() {
        this._width = this.$el.offsetWidth;
        this._height = this.$el.offsetHeight;
    }
}

window.customElements.define('dddd-header', Header);
