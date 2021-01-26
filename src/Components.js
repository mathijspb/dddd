import LayoutModel from './LayoutModel';
import componentTypes from './components/types';

export default class Components {
    constructor({ layout }) {
        this._layout = layout;
        this._components = [];
    }

    /**
     * Public
     */
    create(model) {
        LayoutModel.addComponent(model);
        const type = model.type;
        const componentClass = componentTypes[type];
        const component = new componentClass(model);
        this._components.push(component);
        this._addComponentToContainer(component);
        return component;
    }

    remove(component) {
        const container = this._layout.getContainer(component.container);
        container.removeChild(component);
        component.destroy();
    }
    
    update(modelData) {
        const component = this._getById(modelData.id);
        component.model.value = modelData.value;
    }

    /**
     * Private
     */
    _addComponentToContainer(component) {
        const containerLabel = component.model.options.container;
        const container = this._layout.getContainer(containerLabel);
        container.appendChild(component);
        this._layout.resize();
    }

    _getById(id) {
        for (const component of this._components) {
            if (component.model.id === id) {
                return component;
            }
        }
    }
}
