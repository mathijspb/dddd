import Layers from './Layers';

export default class Layout {
    constructor() {
        this._container = this._createContainer();
        this._layers = this._createLayers();
        this._addToBody();
    }

    /**
     * Public
     */
    createLayer(label) {
        this._layers.add(label);
    }

    get(id) {
        return this._layers.get(id);
    }

    /**
     * Private
     */
    _createContainer() {
        const element = document.createElement('div');
        element.classList.add('dddd');
        return element;
    }

    _createLayers() {
        const layers = new Layers();
        this._container.appendChild(layers.element);
        return layers;
    }

    _addToBody() {
        document.body.appendChild(this._container);
    }
}
