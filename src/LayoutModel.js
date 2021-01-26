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
        this._layers.push(label)
    }

    addGroup(label, options = {}) {
        this._groups.push({ label, options });
    }

    addComponent(model) {
        this._components.push(model);
    }

    get() {
        const structure = {
            layers: this._layers,
            groups: this._groups,
            components: this._getComponents()
            // components: this._components
        };
        return structure;
    }

    /**
     * Private
     */
    _getComponents() {
        const components = [];
        for (const model of this._components) {
            let data = model.getData();
            data = this._removeFunctions(data);
            components.push(data);
        }

        return components;
    }

    _removeFunctions(data) {
        const object = JSON.parse(JSON.stringify(data));
        function eachRecursive(object) {
            for (var key in object) {
                if (typeof object[key] === "object" && object[key] !== null) {
                    eachRecursive(object[key]);
                } else if (typeof object[key] === 'function') {
                    delete object[key];
                }
            }
        }
        eachRecursive(object);
        return object;
    }
}

export default new LayoutModel();