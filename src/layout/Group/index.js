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
    constructor({ root, label, parent, collapseGroups, options }) {
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
        this._parent = parent || null;
        this._collapseGroups = collapseGroups;

        // Data
        this._id = this._generateId();
        this._isVisible = true;
        this._isComponentsCreated = false;

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
    get id() {
        return this._id;
    }

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
        options.parent = this;
        return this.$root.add(object, property, options);
    }

    addButton(label, options = {}) {
        options.parent = this;
        return this.$root.addButton(label, options);
    }

    addCanvas(options) {
        options.parent = this;
        return this.$root.addCanvas(options);
    }

    addGroup(label) {
        return this.$root.addGroup(label, {
            // container: this._label,
            parent: this,
        });
    }

    remove() {
        return this.$root.removeGroup(this._id);
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

    _generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    _addSubgroupClass() {
        if (this._parent.tagName !== 'DDDD-LAYER' && this._parent.tagName !== 'DDDD-GLOBAL') this.$el.classList.add('subgroup');
    }

    _updateStartupVisibility() {
        const key = this._getLocalStorageKey();
        const visibility = LocalStorage.get(key, 'visibility');
        if (visibility) {
            if (visibility === 'visible') {
                this._show();
            } else {
                this._hide();
            }
        } else if (this._collapseGroups) {
            this._hide();
        } else {
            this._show();
        }
    }

    _toggleVisibility() {
        this._isVisible ? this._hide() : this._show();
    }

    _show() {
        if (!this._isComponentsCreated) {
            setTimeout(() => {
                this.$root.layout.components.createElementsByGroupId(this._id);
                this._isComponentsCreated = true;
            }, 0);
        }

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

        this.$root.layout.resize();
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
