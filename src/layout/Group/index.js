// Base class
import LayoutElement from '../../LayoutElement';

// Style
import styleSidebar from './style-sidebar.css';
import styleDevtools from './style-devtools.css';

// Template
import templateSidebar from './template-sidebar.html';
import templateDevtools from './template-devtools.html';

export default class Group extends LayoutElement {
    constructor({ root, label, options }) {
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
        this._options = options;
        this._parent = options.parent;

        // Data
        this._isContentVisible = true;

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
        this._addSubgroupClass();
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

    get parent() {
        return this._parent;
    }

    /**
     * Public
     */
    add(object, property, options = {}) {
        options.container = this;
        return this.$root.add(object, property, options);
    }

    addButton(options) {
        options.container = this;
        return this.$root.addButton(options);
    }

    addGroup(label) {
        return this.$root.addGroup(label, {
            container: this._label,
            parent: this,
        });
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

    _addSubgroupClass() {
        if (this.parent) this.$el.classList.add('subgroup');
    }

    _toggleContent() {
        this._isContentVisible = !this._isContentVisible;
        if (this._isContentVisible) {
            this.$el.classList.remove('hidden');
        } else {
            this.$el.classList.add('hidden');
        }
        // this.$refs.content.style.display = this._isContentVisible ? 'grid' : 'none';
    }

    /**
     * Handlers
     */
    _clickHandler() {
        this._toggleContent();
    }
}

window.customElements.define('dddd-group', Group);
