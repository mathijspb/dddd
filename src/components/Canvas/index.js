// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Canvas extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Options

        // Data

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._addCanvas();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onListen() {
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

    _addCanvas() {
        this.$refs.inputContainer.appendChild(this.model.options.canvas);
    }

    /**
     * Handlers
     */
}

window.customElements.define('dddd-canvas', Canvas);
