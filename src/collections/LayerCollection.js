export default class LayerCollection {
    constructor() {
        this._layers = [];
    }

    /**
     * Public
     */
    add(layer) {
        this._layers.push(layer);
    }

    remove(layer) {
        const index = this._layers.indexOf(layer);
        if (index > -1) this._layers.splice(index, 1);
    }

    serialize() {
        const layers = [];
        for (let i = 0, len = this._layers.length; i < len; i++) {
            layers.push(this._layers[i].serialize());
        }
        return layers;
    }
}
