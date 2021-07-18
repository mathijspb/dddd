// Layout
import Layout, { LAYOUT_TYPE_DEVTOOLS, LAYOUT_TYPE_SIDEBAR } from './Layout';
import LayoutModel from './models/LayoutModel';

export default class DDDD {
    constructor({ devtools, minimized, onChange, onLayerChange } = {}) {
        // Props
        this._isDevtools = devtools;
        this._isMinimized = minimized || false;
        this._onChangeCallback = onChange;
        this._onLayerChangeCallback = onLayerChange;

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

    get onChangeCallback() {
        return this._onChangeCallback;
    }

    /**
     * Public
     */
    add(object, property, options, parentModel = null) {
        return this._layout.addComponent({ object, property, options, parentModel });
    }

    // TODO: Fix
    remove(component) {
        // this._components.remove(component);
    }

    addButton(label, options = {}, parent = null) {
        options.label = label;
        return this._layout.addComponent({ options, type: 'button', parent });
    }

    addCanvas(options, parent = null) {
        return this._layout.addComponent({ options, type: 'canvas', parent });
    }

    addLayer(label) {
        return this._layout.addLayer(label);
    }

    gotoLayer(label) {
        this._layout.gotoLayer(label);
    }

    addGroup(label, options, parent) {
        return this._layout.addGroup(label, options, parent);
    }

    removeGroup(id) {
        return this._layout.removeGroup(id);
    }

    createLayoutFromModel(model, onCompleteCallback) {
        const layers = model.layers;
        const scope = this;

        function addComponents(components, parentModel) {
            for (const component of components) {
                scope._layout.addComponent({
                    object: component.object,
                    property: component.property,
                    options: component.options,
                    parentModel,
                    type: component.type,
                    id: component.id,
                });
            }
        }

        function addGroups(groups, parentModel) {
            for (const group of groups) {
                const groupElement = scope._layout.addGroup(group.label, null, parentModel);

                if (group.components) {
                    addComponents(group.components, groupElement.model);
                }

                if (group.groups) {
                    addGroups(group.groups, groupElement.model);
                }
            }
        }

        for (const layer of layers) {
            const layerElement = this._layout.addLayer(layer.label);
            if (layer.groups) {
                addGroups(layer.groups, layerElement.model);
            }
        }

        // if (typeof onCompleteCallback === 'function') {
        //     onCompleteCallback();
        // }
    }

    isLayoutSidebar() {
        return !this._isDevtools;
    }

    showStats() {}

    toggleVisibility() {
        this._layout.toggleVisibility();
    }

    triggerChange(data) {
        if (typeof this._onChangeCallback === 'function') {
            this._onChangeCallback(data);
        }
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
        const type = this._isDevtools ? LAYOUT_TYPE_DEVTOOLS : LAYOUT_TYPE_SIDEBAR;
        const layout = new Layout({
            root: this,
            type,
            onLayerChange: this._onLayerChangeCallback,
            minimized: this._isMinimized,
        });
        return layout;
    }

    _sendLayoutModel() {
        window.postMessage({
            source: 'dddd-page',
            payload: {
                action: 'setup',
                layoutModel: LayoutModel.serialize(),
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
                    // this._layout.remove();
                    break;
                case 'change':
                    LayoutModel.updateComponent(payload.modelData);
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
