import LayoutModel from './LayoutModel';
import componentTypes from './components/types';

export default class Components {
    constructor({ root, layout }) {
        // Props
        this._root = root;

        // Data
        this._components = [];

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Public
     */
    create(model) {
        LayoutModel.addComponent(model);
        const type = model.type;
        const componentClass = componentTypes[type];
        const component = new componentClass(this._root, model);
        this._components.push(component);
        this._addComponentToContainer(component);
        return component;
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

    /**
     * Private
     */
    _bindHandlers() {
        this._tick = this._tick.bind(this);
    }

    _setupEventListeners() {
        this._requestAnimationFrame = window.requestAnimationFrame(this._tick);
    }

    _removeEventListeners() {
        window.cancelAnimationFrame(this._requestAnimationFrame);
    }

    _addComponentToContainer(component) {
        const container = component.model.options.container;
        const element = this._root.layout.getContainer(container);
        element.appendChild(component);
        this._root.layout.resize();
    }

    _getById(id) {
        for (const component of this._components) {
            if (component.model.id === id) {
                return component;
            }
        }
    }

    /**
     * Tick
     */
    _tick() {
        window.requestAnimationFrame(this._tick);
        this._tickComponents();
        // this._sendModelsToDevtools();
    }

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
}
