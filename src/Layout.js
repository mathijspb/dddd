import Container from './layout/Container/index';
import Navigation from './layout/Navigation/index';
import Layers from './layout/Layers/index';
import Group from './layout/Group/index';

import LayoutModel from './LayoutModel';
window.LayoutModel = LayoutModel;

export default class Layout {
    constructor() {
        this._container = this._createContainer();
        this._navigation = this._createNavigation();
        this._layers = this._createLayers();
        this._groups = {};

        this._elements = [];

        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        // TODO: Quick and dirty
        document.body.removeChild(this._container)
        
        this._removeEventListeners();
    }

    /**
     * Public
     */
    createLayer(label) {
        this._navigation.add(label);
        this._layers.add(label);
        this._layers.resize();
        LayoutModel.addLayer(label);
    }

    createGroup(label, options) {
        const group = new Group({ label });
        const container = this._getGroupContainer(label, options.container);
        container.appendChild(group);
        this._groups[label] = group;
        this._layers.resize();
        LayoutModel.addGroup(label, options);
        return group;
    }

    getLayer(label) {
        return this._layers.get(label);
    }

    getContainer(label) {
        const layer = this._layers.get(label);
        if (layer) return layer;

        const group = this._groups[label];
        // TODO: Refactor
        if (group) return group._contentElement;
    }

    remove() {
        document.body.removeChild(this._container)
    }

    resize() {
        this._layers.resize();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._navigationSwitchHandler = this._navigationSwitchHandler.bind(this);
    }

    _setupEventListeners() {
        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
    }

    _removeEventListeners() {
        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
    }

    _createContainer() {
        const container = new Container();
        document.body.appendChild(container);
        return container;
    }

    _createNavigation() {
        const navigation = new Navigation();
        this._container.element.appendChild(navigation);
        return navigation;
    }

    _createLayers() {
        const layers = new Layers();
        this._container.element.appendChild(layers);
        return layers;
    }

    _getGroupContainer(label, containerLabel) {
        let container;
        if (containerLabel) {
            container = this._layers.get(containerLabel);
            if (!container){
                throw new Error(`Layer '${containerLabel}' not found`);
            }
        } else {
            if (this._layers.isEmpty()) {
                container = this._layers.add();
            } else {
                throw new Error(`No 'container' defined for group '${label}'`);
            }
            
        }
        return container;
    }

    /**
     * Handlers
     */
    _navigationSwitchHandler(e) {
        this._layers.goto(e.detail.index);
    }
}
