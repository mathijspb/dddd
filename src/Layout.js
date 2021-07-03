// Layout
import Container from './layout/Container';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Stats from './layout/Stats';
import Layers from './layout/Layers';
import Group from './layout/Group';

// Components
import Components from './Components';

// Models
import LayoutModel from './LayoutModel';
import ComponentModel from './ComponentModel';

// Utils
import ValueHover from './utils/ValueHover';

export default class Layout {
    constructor({ root, onLayerChange, minimized }) {
        // Props
        this._root = root;
        this._onLayerChangeCallback = onLayerChange;

        // Setup
        this._isVisible = true;
        this._groups = [];
        this._container = this._createContainer();
        this._header = this._createHeader();
        this._navigation = this._createNavigation();
        // this._stats = this._createStats();
        this._layers = this._createLayers();
        this._components = this._createComponents();
        if (minimized) this.toggleVisibility();
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._container.destroy();
        this._navigation.destroy();
        this._layers.destroy();
        this._components.destroy();
        this._removeContainerElement();
    }

    /**
     * Getters & Setters
     */
    get components() {
        return this._components;
    }

    get stats() {
        return this._stats;
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

        // TODO: tmp fix..
        this._components.resize();
    }

    addGroup(label, options = {}) {
        const parent = this.getParent(options.container);
        const group = new Group({
            root: this._root,
            layout: this,
            parent,
            label,
            options,
        });

        parent.content.appendChild(group);
        this._groups.push(group);

        this._layers.resize();
        LayoutModel.addGroup(group.id, label, options);
        return group;
    }

    removeGroup(id) {
        const group = this._getGroupById(id);
        group.parent.content.removeChild(group);
        this._groups.splice(this._groups.indexOf(group), 1);
        this._layers.resize();
        LayoutModel.removeGroup(id);
    }

    addComponent({ object, property, options, id, type, onChangeCallback }) {
        const model = new ComponentModel({ root: this._root, object, property, options, id, type, onChangeCallback });
        const component = this._components.create(model);
        return component;
    }

    getLayer(label) {
        return this._layers.get(label);
    }

    getParent(label) {
        const layer = this._layers.get(label);
        if (layer) return layer;

        const group = this._getGroupByLabel(label);
        if (group) return group;
    }

    remove() {
        document.body.removeChild(this._container);
    }

    resize() {
        this._layers.resize();
        this._components.resize();
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
        this._components.resize();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._navigationSwitchHandler = this._navigationSwitchHandler.bind(this);
        this._keyUpHandler = this._keyUpHandler.bind(this);
    }

    _setupEventListeners() {
        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
        window.addEventListener('keyup', this._keyUpHandler);
    }

    _removeEventListeners() {
        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
        window.addEventListener('keyup', this._keyUpHandler);
    }

    _createContainer() {
        const container = new Container({
            root: this._root,
        });
        document.body.appendChild(container);
        return container;
    }

    _createHeader() {
        const header = new Header({
            root: this._root,
        });
        this._container.addElement(header);
        return header;
    }

    _createNavigation() {
        const navigation = new Navigation({
            root: this._root,
        });
        this._header.addElement(navigation);
        return navigation;
    }

    _createStats() {
        const stats = new Stats({
            root: this._root,
        });
        this._header.addElement(stats);
        return stats;
    }

    _createLayers() {
        const layers = new Layers({
            root: this._root,
        });
        this._container.addElement(layers);
        return layers;
    }

    _createComponents() {
        const componenents = new Components({
            root: this._root,
            layout: this,
        });
        return componenents;
    }

    _getGroupById(id) {
        for (const group of this._groups) {
            if (group.id === id) return group;
        }
    }

    _getGroupByLabel(label) {
        for (const group of this._groups) {
            if (group.label === label) return group;
        }
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

    _removeContainerElement() {
        document.body.removeChild(this._container);
    }

    /**
     * Handlers
     */
    _navigationSwitchHandler(e) {
        this._layers.goto(e.detail.index);
        this._components.resize();
        if (typeof this._onLayerChangeCallback === 'function') {
            const label = this._layers.getByIndex(e.detail.index).label;
            this._onLayerChangeCallback(label);
        }
    }

    _keyUpHandler(e) {
        if (e.keyCode === 67) ValueHover.copyToClipboard();
    }
}
