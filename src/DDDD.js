// Misc
import Layout from './Layout';
import Components from './Components';

import LayoutModel from './LayoutModel';
import ComponentModel from './ComponentModel';

export default class DDDD {
    constructor({ onChange } = {}) {
        this._layout = new Layout();
        this._components = new Components({
            layout: this._layout,
        });

        this._onChangeCallback = onChange;

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._layout.destroy();
    }

    /**
     * Public
     */
    add(object, property, options) {
        const model = new ComponentModel({ object, property, options });
        return this._components.create(model);
    }

    remove(component) {
        this._components.remove(component);
    }

    addButton(options) {
        const model = new ComponentModel({ options, type: 'button' });
        return this._components.create(model);
    }

    createLayer(label) {
        this._layout.createLayer(label);
    }

    createGroup(label, options) {
        this._layout.createGroup(label, options);
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
            const model = new ComponentModel({
                object: modelData.object,
                property: modelData.property,
                options: modelData.options,
                id: modelData.id,
                type: modelData.type,
                onChangeCallback: this._onChangeCallback
            });
            this._components.create(model)
        }

        if (typeof onCompleteCallback === 'function') {
            onCompleteCallback();
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

    _sendLayoutModel() {
        const layoutModel = LayoutModel.get();
        window.postMessage({
            source: 'dddd-page',
            payload: {
                action: 'setup',
                layoutModel
            }
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
                case 'init': {
                    this._sendLayoutModel();
                    break;
                }
                case 'setup-complete': {
                    this._layout.remove();
                    break;
                }
                case 'change': {
                    this._components.update(payload.modelData);
                    break;
                }
            }
        }
    }
}
