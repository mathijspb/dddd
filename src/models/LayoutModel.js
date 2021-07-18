import LayerCollection from '../collections/LayerCollection';

class LayoutModel {
    constructor() {
        this._layers = new LayerCollection();
        this._components = [];
    }

    /**
     * Public
     */
    addLayer(model) {
        this._layers.add(model);
    }

    addComponent(model) {
        this._components.push(model);
    }

    updateComponent(data) {
        const model = this._getComponentById(data.id);
        model.value = data.value;
    }

    serialize() {
        const data = {
            layers: this._layers.serialize(),
        };
        return data;
    }

    /**
     * Private
     */
    _getComponentById(id) {
        let item;
        for (let i = 0, len = this._components.length; i < len; i++) {
            item = this._components[i];
            if (item.id === id) return item;
        }
    }
}

export default new LayoutModel();
