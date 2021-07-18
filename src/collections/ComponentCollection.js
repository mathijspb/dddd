export default class ComponentCollection {
    constructor() {
        this._components = [];
    }

    /**
     * Public
     */
    add(layer) {
        this._components.push(layer);
    }

    remove(layer) {
        const index = this._components.indexOf(layer);
        if (index > -1) this._components.splice(index, 1);
    }

    serialize() {
        const components = [];
        for (let i = 0, len = this._components.length; i < len; i++) {
            components.push(this._components[i].serialize());
        }
        return components;
    }
}
