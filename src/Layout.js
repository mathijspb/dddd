// Layout
import Container from './layout/Container';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Global from './layout/Global';
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
import LocalStorage from './utils/LocalStorage';

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
        this._global = this._createGlobal();
        this._navigation = this._createNavigation();
        // this._stats = this._createStats();
        this._layers = this._createLayers();
        this._components = this._createComponents();
        if (minimized || !LocalStorage.get('visiblity', 'visible')) {
            this._hide();
        }
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
    addLayer(label, group) {
        this._navigation.add(label, group);
        const layer = this._layers.add(label);
        this._layers.resize();
        LayoutModel.addLayer(label);
        this._header.resize();
        this._setLayersHeight();
        return layer;
    }

    removeLayer(label) {
        this._navigation.remove(label);
        this._layers.remove(label);
        LayoutModel.removeLayer(label);
        this._components.removeComponents(label);
        this._header.resize();
        this._setLayersHeight();
    }

    gotoLayer(label) {
        const index = this._layers.getIndexByLabel(label);
        this._navigation.goto(index);
        this._layers.goto(index);

        // TODO: tmp fix..
        this._components.resize();
    }

    addGroup(label, options = {}) {
        const parent = options.parent ? options.parent : this.getParent(options.container);

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

        this._global.resize();

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
        if (label === 'Global') return this._global;

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
        this._global.resize();
        this._setLayersHeight();
    }

    toggleVisibility() {
        if (this._isVisible) {
            this._hide();
        } else {
            this._show();
        }
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

    _createGlobal() {
        const global = new Global({
            root: this._root,
        });
        this._container.addElement(global);
        return global;
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

    _setLayersHeight() {
        console.log(this._global.height);
        const layersHeight = this._container.height - this._header.height - this._global.height;
        this._layers.setHeight(layersHeight);
    }

    _show() {
        this._container.show();
        this._layers.show();
        this._navigation.show();
        this._global.show();
        this._layers.resize();
        this._components.resize();
        this._isVisible = true;
        LocalStorage.set('visiblity', { visible: this._isVisible });
    }

    _hide() {
        this._container.hide();
        this._layers.hide();
        this._navigation.hide();
        this._global.hide();
        this._layers.resize();
        this._components.resize();
        this._isVisible = false;
        LocalStorage.set('visiblity', { visible: this._isVisible });
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
