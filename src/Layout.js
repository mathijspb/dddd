import Container from './layout/Container/index';
import Navigation from './layout/Navigation/index';
import Layers from './layout/Layers/index';
import Group from './layout/Group/index';
import Components from './Components';

import LayoutModel from './LayoutModel';
import ComponentModel from './ComponentModel';

export default class Layout {
    constructor({ root, onLayerChange }) {
        // Props
        this._root = root;
        this._onLayerChangeCallback = onLayerChange;

        this._container = this._createContainer();
        this._navigation = this._createNavigation();
        this._layers = this._createLayers();
        this._components = this._createComponents();

        this._isVisible = true;

        this._groups = {};

        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        // TODO: Quick and dirty
        document.body.removeChild(this._container);

        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */
    get components() {
        return this._components;
    }

    /**
     * Public
     */
    addLayer(label) {
        this._navigation.add(label);
        const layer = this._layers.add(label);
        this._layers.resize();
        LayoutModel.addLayer(label);
        return layer;
    }

    gotoLayer(label) {
        const index = this._layers.getIndexByLabel(label);
        this._navigation.goto(index);
        this._layers.goto(index);
    }

    addGroup(label, options = {}) {
        const group = new Group({ root: this._root, layout: this, label, options });
        const container = this.getContainer(options.container);
        container.appendChild(group);
        this._groups[label] = group;
        this._layers.resize();
        LayoutModel.addGroup(label, options);
        return group;
    }

    addComponent({ object, property, options, id, type, onChangeCallback }) {
        const model = new ComponentModel({ root: this._root, object, property, options, id, type, onChangeCallback });
        const component = this._components.create(model);
        return component;
    }

    getLayer(label) {
        return this._layers.get(label);
    }

    getContainer(label) {
        const layer = this._layers.get(label);
        if (layer) return layer;

        const group = this._groups[label];
        if (group) return group.content;
    }

    remove() {
        document.body.removeChild(this._container);
    }

    resize() {
        this._layers.resize();
    }

    toggleVisibility() {
        if (this._isVisible) {
            this._container.hide();
            this._layers.hide();
            this._navigation.hide();
            this._isVisible = false;
        } else {
            this._container.show();
            this._layers.show();
            this._navigation.show();
            this._isVisible = true;
        }
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
        const container = new Container({
            root: this._root,
        });
        document.body.appendChild(container);
        return container;
    }

    _createNavigation() {
        const navigation = new Navigation({
            root: this._root,
        });
        this._container.content.appendChild(navigation);
        return navigation;
    }

    _createLayers() {
        const layers = new Layers({
            root: this._root,
        });
        this._container.content.appendChild(layers);
        return layers;
    }

    _createComponents() {
        const componenents = new Components({
            root: this._root,
            layout: this,
        });
        return componenents;
    }

    _getGroupContainer(label, container) {
        let groupContainer;
        if (container) {
            groupContainer = this._layers.get(container);
            if (!groupContainer) {
                throw new Error(`Layer '${container}' not found`);
            }
        } else {
            if (this._layers.isEmpty()) {
                groupContainer = this._layers.add();
            } else {
                throw new Error(`No 'container' defined for group '${label}'`);
            }
        }
        return groupContainer;
    }

    /**
     * Handlers
     */
    _navigationSwitchHandler(e) {
        this._layers.goto(e.detail.index);
        if (typeof this._onLayerChangeCallback === 'function') {
            const label = this._layers.getByIndex(e.detail.index).label;
            this._onLayerChangeCallback(label);
        }
    }
}
