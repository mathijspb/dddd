// Base class
import LayoutElement from '../../LayoutElement';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Header extends LayoutElement {
    constructor({ root, options }) {
        super({ root, style, template });

        // Props
        this._options = options;

        // Data

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */

    /**
     * Public
     */
    addElement(element) {
        this.$el.appendChild(element);
    }

    /**
     * Private
     */
    _bindHandlers() {
    }

    _setupEventListeners() {
    }

    _removeEventListeners() {
    }

    /**
     * Handlers
     */
}

window.customElements.define('dddd-header', Header);
