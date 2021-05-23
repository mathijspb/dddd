class LayoutModel {
    constructor() {
        this._layers = [];
        this._groups = [];
        this._components = [];
    }

    /**
     * Public
     */
    addLayer(label) {
        this._layers.push(label);
    }

    addGroup(id, label, options = {}) {
        this._groups.push({ id, label, options });
    }

    removeGroup(id) {
        const index = this._getGroupIndex(id);
        this._groups.splice(index, 1);
    }

    addComponent(model) {
        this._components.push(model);
    }

    get() {
        const structure = {
            layers: this._layers,
            groups: this._groups,
            components: this._getComponents(),
        };
        return structure;
    }

    /**
     * Private
     */
    _getComponents() {
        const components = [];
        for (const model of this._components) {
            components.push(model.getData());
        }
        return components;
    }

    _getGroupIndex(id) {
        for (const [index, group] of this._groups.entries()) {
            if (group.id === id) return index;
        }
        return null;
    }
}

export default new LayoutModel();
