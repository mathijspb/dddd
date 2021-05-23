// Base class
import LayoutElement from '../../LayoutElement';

// Utils
import LocalStorage from '../../utils/LocalStorage';

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
        this._parent = options.parent || null;

        // Data
        this._isVisible = true;

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
        this._addSubgroupClass();
        this._updateStartupVisibility();
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

    get options() {
        return this._options;
    }

    /**
     * Public
     */
    add(object, property, options = {}) {
        options.container = this;
        return this.$root.add(object, property, options);
    }

    addButton(label, options = {}) {
        options.container = this;
        return this.$root.addButton(label, options);
    }

    addCanvas(options) {
        options.container = this;
        return this.$root.addCanvas(options);
    }

    addGroup(label) {
        return this.$root.addGroup(label, {
            container: this._label,
            parent: this,
        });
    }

    removeGroup(label) {
        return this.$root.removeGroup(label, {
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

    _updateStartupVisibility() {
        const key = this._getLocalStorageKey();
        const visibility = LocalStorage.get(key, 'visibility');
        if (visibility === 'hidden') this._hide();
    }

    _toggleVisibility() {
        this._isVisible ? this._hide() : this._show();
    }

    _show() {
        this._isVisible = true;
        this._updateLocalStorage('visible');
        this.$el.classList.remove('hidden');

        // TODO: Fix - Should on resize components inside group
        this.$root.layout.resize();
    }

    _hide() {
        this._isVisible = false;
        this._updateLocalStorage('hidden');
        this.$el.classList.add('hidden');
    }

    _updateLocalStorage(visibility) {
        const key = this._getLocalStorageKey();
        LocalStorage.set(key, { visibility });
    }

    _getLocalStorageKey() {
        return `group.${this._options.container}.${this._label}`;
    }

    /**
     * Handlers
     */
    _clickHandler() {
        this._toggleVisibility();
    }
}

window.customElements.define('dddd-group', Group);
