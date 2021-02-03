// Base class
import LayoutElement from '../../LayoutElement';

// Style
import styleSidebar from './style-sidebar.css';
import styleDevtools from './style-devtools.css';

// Template
import templateSidebar from './template-sidebar.html';
import templateDevtools from './template-devtools.html';

export default class Group extends LayoutElement {
    constructor({ root, label }) {
        super({
            root,
            style: {
                styleSidebar,
                styleDevtools,
            },
            template: {
                templateSidebar,
                templateDevtools,
            },
            templateData: {
                label,
            },
        });

        // Props
        this._label = label;

        // Data
        this._isContentVisible = true;

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
    get label() {
        return this._label;
    }

    get content() {
        return this.$refs.content;
    }

    /**
     * Public
     */
    add(object, property, options = {}) {
        options.container = this;
        return this.$root.add(object, property, options);
    }

    addButton(options) {
        return this.$root.addButton(options);
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
    }

    _setupEventListeners() {
        if (this.$refs.buttonHeader) this.$refs.buttonHeader.addEventListener('click', this._clickHandler);
    }

    _removeEventListeners() {
        if (this.$refs.buttonHeader) this.$refs.buttonHeader.removeEventListener('click', this._clickHandler);
    }

    _toggleContent() {
        this._isContentVisible = !this._isContentVisible;
        this.$refs.content.style.display = this._isContentVisible ? 'grid' : 'none';
        this.$root.layout.resize();
    }

    /**
     * Handlers
     */
    _clickHandler() {
        this._toggleContent();
    }
}

window.customElements.define('dddd-group', Group);
