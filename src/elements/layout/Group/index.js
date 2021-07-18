// Base class
import Layout from '../../../baseClasses/Layout';

// Utils
import LocalStorage from '../../../utils/LocalStorage';

// Style
import styleSidebar from './style-sidebar.css';
import styleDevtools from './style-devtools.css';

// Template
import templateSidebar from './template-sidebar.html';
import templateDevtools from './template-devtools.html';

export default class Group extends Layout {
    constructor({ root, parentModel, options, model, id }) {
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
                label: model.label,
            },
        });

        // Props
        this._model = model;
        this._options = options;
        this._parentModel = parentModel || null;

        // Data
        this._id = id || this._generateId();
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
    get id() {
        return this._id;
    }

    get $parent() {
        return this._parentModel.element;
    }

    get options() {
        return this._options;
    }

    get model() {
        return this._model;
    }

    /**
     * Public
     */
    addElement(element) {
        this.$refs.content.appendChild(element);
    }

    add(object, property, options = {}) {
        return this.$root.add(object, property, options, this._model);
    }

    addButton(label, options = {}) {
        return this.$root.addButton(label, options, this);
    }

    addCanvas(options) {
        return this.$root.addCanvas(options, this);
    }

    addGroup(label, options) {
        return this.$root.addGroup(label, options, this._model);
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
        if (this._parentModel.element.tagName !== 'DDDD-LAYER') this.$el.classList.add('subgroup');
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
        return `group.${this._parentModel.label}.${this._model.label}`;
    }

    /**
     * Handlers
     */
    _clickHandler() {
        this._toggleVisibility();
    }
}

window.customElements.define('dddd-group', Group);
