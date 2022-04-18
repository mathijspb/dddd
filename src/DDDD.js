// Layout
import Layout from './Layout';
import LayoutModel from './LayoutModel';

export default class DDDD {
    constructor(options = {}) {
        // Props
        this._isDevtools = options.devtools;
        this._isMinimized = options.minimized || false;
        this._collapseGroups = options.collapseGroups;
        this._onChangeCallback = options.onChange;
        this._onLayerChangeCallback = options.onLayerChange;
        this._wrapper = options.wrapper;

        // Setup
        this._layout = this._createLayout();
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._layout.destroy();
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */
    get isDevtools() {
        return this._isDevtools;
    }

    get layout() {
        return this._layout;
    }

    get stats() {
        return this._layout.stats;
    }

    get container() {
        return this._container;
    }

    /**
     * Public
     */
    add(object, property, options) {
        return this._layout.addComponent({ object, property, options });
    }

    // TODO: Fix
    remove(component) {
        // this._components.remove(component);
    }

    addButton(label, options = {}) {
        options.label = label;
        return this._layout.addComponent({ options, type: 'button' });
    }

    addCanvas(options) {
        return this._layout.addComponent({ options, type: 'canvas' });
    }

    addLayer(label, group) {
        return this._layout.addLayer(label, group);
    }

    removeLayer(label) {
        this._layout.removeLayer(label);
    }

    gotoLayer(label) {
        this._layout.gotoLayer(label);
    }

    addGroup(label, options) {
        return this._layout.addGroup(label, options);
    }

    removeGroup(id) {
        return this._layout.removeGroup(id);
    }

    createLayoutFromModel(model, onCompleteCallback) {
        const layers = model.layers;
        for (const layer of layers) {
            this.createLayer(layer);
        }

        const groups = model.groups;
        for (const group of groups) {
            this.createGroup(group.label, group.options);
        }

        const components = model.components;
        for (const modelData of components) {
            this._layout.createComponent({
                object: modelData.object,
                property: modelData.property,
                options: modelData.options,
                id: modelData.id,
                type: modelData.type,
                onChangeCallback: this._onChangeCallback,
            });
        }

        if (typeof onCompleteCallback === 'function') {
            onCompleteCallback();
        }
    }

    isLayoutSidebar() {
        return !this._isDevtools;
    }

    showStats() {}

    toggleVisibility() {
        this._layout.toggleVisibility();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._messageHandler = this._messageHandler.bind(this);
    }

    _setupEventListeners() {
        window.addEventListener('message', this._messageHandler);
    }

    _removeEventListeners() {
        window.removeEventListener('message', this._messageHandler);
    }

    _createLayout() {
        const layout = new Layout({
            root: this,
            onLayerChange: this._onLayerChangeCallback,
            minimized: this._isMinimized,
            collapseGroups: this._collapseGroups,
            wrapper: this._wrapper,
        });
        return layout;
    }

    _sendLayoutModel() {
        const layoutModel = LayoutModel.get();
        window.postMessage({
            source: 'dddd-page',
            payload: {
                action: 'setup',
                layoutModel,
            },
        });
    }

    /**
     * Handlers
     */
    _messageHandler(e) {
        const source = e.data.source;
        const payload = e.data.payload;

        if (source === 'dddd-devtools-proxy' && payload) {
            switch (payload.action) {
                case 'init':
                    this._sendLayoutModel();
                    break;
                case 'setup-complete':
                    this._layout.remove();
                    break;
                case 'change':
                    this._layout.components.update(payload.modelData);
                    break;
            }
        }

        if (this._isDevtools && source === 'dddd-page' && payload) {
            switch (payload.action) {
                case 'update-objects':
                    if (payload.models[0]) {
                        // console.log(payload.models[0].value);
                    }
                    // this._layout.components.updateObjects(payload.models);
                    break;
            }
        }
    }
}
