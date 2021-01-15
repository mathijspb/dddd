import Layers from './Layers';
import Navigation from './layout/Navigation';

export default class Layout {
    constructor() {
        this._container = this._createContainer();
        this._navigation = this._createNavigation();

        this._navigation.addEventListener('test', (e) => {
            console.log('k', e);
        })

        // this._layers = this._createLayers();

        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Public
     */
    createLayer(label) {
        // this._layers.add(label);
        this._navigation.add(label);
    }

    createGroup(label, options) {

    }

    get(id) {
        // return this._layers.get(id);
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
    }

    _setupEventListeners() {
        this._container.addEventListener('click', this._clickHandler);
    }

    _removeEventListeners() {
        this._container.removeEventListener('click', this._clickHandler);
    }

    _createContainer() {
        const element = document.createElement('div');
        element.classList.add('dddd');
        document.body.appendChild(element);
        return element;
    }

    _createNavigation() {
        const element = new Navigation();
        this._container.appendChild(element);
        return element;
    }

    _createLayers() {
        // const layers = new Layers();
        // this._container.appendChild(layers.element);
        // return layers;
    }

    _getNavigationButtonIndex(element) {
        return Array.prototype.indexOf.call(this._navigation.children, element);
    }

    /**
     * Handlers
     */
    _clickHandler(e) {
        console.dir(e);
        if (e.target.closest('.navigation-button')) {
            const index = this._getNavigationButtonIndex(e.target.parentElement);
            this._goto(index);
        }
    }
}
