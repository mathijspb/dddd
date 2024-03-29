import LayoutModel from './LayoutModel';
import componentTypes from './components/types';
import Ticker from './utils/Ticker';

export default class Components {
    constructor({ root }) {
        // Props
        this._root = root;

        // Data
        this._components = [];

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._destroyComponents();
        this._removeEventListeners();
    }

    /**
     * Public
     */
    create(model) {
        LayoutModel.addComponent(model);
    }

    remove(component) {
        const container = this._root.layout.getContainer(component.container);
        container.removeChild(component);
        component.destroy();
    }

    update(modelData) {
        const component = this._getById(modelData.id);
        component.model.value = modelData.value;
    }

    updateObjects(models) {
        let model;
        let component;
        for (let i = 0, len = models.length; i < len; i++) {
            model = models[i];
            if (model.options.listen) {
                component = this._getById(model.id);
                if (component) {
                    component.model.object = model.object;
                }
            }
        }
    }

    createElementsByGroupId(id) {
        const models = LayoutModel.getModelsByGroupId(id);
        for (let i = 0, len = models.length; i < len; i++) {
            const model = models[i];
            const type = model.type;
            const componentClass = componentTypes[type];
            const component = new componentClass(this._root, model);
            this._components.push(component);
            this._addComponentToContainer(component);
        }
    }

    resize() {
        for (const component of this._components) {
            component.resize();
        }
    }

    removeComponents(label) {
        const _scope = this;
        let item;
        for (let i = this._components.length - 1; i >= 0; i--) {
            item = this._components[i];
            function removeComponent(object) {
                if (object.model && object.model.options && object.model.options.parent) {
                    removeComponent(object.model.options.parent);
                } else if (object.parent) {
                    removeComponent(object.parent);
                } else {
                    _scope._components.splice(_scope._components.indexOf(item), 1);
                }
            }
            removeComponent(item);
        }
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._tickHandler = this._tickHandler.bind(this);
    }

    _setupEventListeners() {
        Ticker.add(this._tickHandler);
    }

    _removeEventListeners() {
        Ticker.remove(this._tickHandler);
    }

    _addComponentToContainer(component) {
        const container = component.model.options.container;
        if (container) {
            const element = this._root.layout.getParent(container).content;
            element.appendChild(component);
        }

        const parent = component.model.options.parent;
        if (parent) {
            const element = parent.content;
            element.appendChild(component);
        }

        this._root.layout.resize();
    }

    _getById(id) {
        for (const component of this._components) {
            if (component.model.id === id) {
                return component;
            }
        }
    }

    _destroyComponents() {
        for (const component of this._components) {
            component.destroy();
        }
    }

    /**
     * Tick
     */

    _tickComponents() {
        for (let i = 0, len = this._components.length; i < len; i++) {
            this._components[i].tick();
        }
    }

    _sendModelsToDevtools() {
        const models = [];
        for (let i = 0, len = this._components.length; i < len; i++) {
            models.push(this._components[i].model.getData());
        }

        window.postMessage({
            source: 'dddd-page',
            payload: {
                action: 'update-objects',
                models,
            },
        });
    }

    /**
     * Handlers
     */
    _tickHandler() {
        this._tickComponents();
        // this._sendModelsToDevtools();
    }
}
