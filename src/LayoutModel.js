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

    addGroup(label, options = {}) {
        this._groups.push({ label, options });
    }

    removeGroup(label) {
        const index = this._getGroupIndex(label);
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

    _getGroupIndex(label) {
        for (let i = 0, len = this._groups.length; i < len; i++) {
            if (this._groups[i].label === label) return i;
        }
        return null;
    }
}

export default new LayoutModel();
