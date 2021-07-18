// Layout
import Container from './elements/layout/Container';
import Header from './elements/layout/Header';
import Navigation from './elements/layout/Navigation';
import Stats from './elements/layout/Stats';
import Layers from './elements/layout/Layers';
import Group from './elements/layout/Group';

// Components
// import Components from './Components';
import componentTypes from './componentTypes';

// Models
import LayoutModel from './models/LayoutModel';
import LayerModel from './models/LayerModel';
import ComponentModel from './models/ComponentModel';
import GroupModel from './models/GroupModel';

// Utils
import ValueHover from './utils/ValueHover';

// Layout types
export const LAYOUT_TYPE_SIDEBAR = 'LAYOUT_TYPE_SIDEBAR';
export const LAYOUT_TYPE_DEVTOOLS = 'LAYOUT_TYPE_DEVTOOLS';

export default class Layout {
    constructor({ root, type, onLayerChange, minimized }) {
        // Props
        this._root = root;
        this._type = type;
        this._onLayerChangeCallback = onLayerChange;

        // Setup
        this._isVisible = true;
        this._layers = [];
        this._groups = [];
        this._components = [];

        // Elements
        this._container = this._createContainer();
        this._header = this._createHeader();
        this._navigation = this._createNavigation();
        // this._stats = this._createStats();
        this._layers = this._createLayers();

        if (minimized) this.toggleVisibility();
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._container.destroy();
        this._navigation.destroy();
        this._layers.destroy();
        // this._components.destroy();
        this._removeContainerElement();
    }

    /**
     * Getters & Setters
     */
    get stats() {
        return this._stats;
    }

    /**
     * Public
     */
    addLayer(label) {
        // Create layer model
        const model = new LayerModel({
            label,
        });

        // Add layer model to the layour model
        LayoutModel.addLayer(model);

        // Create layer element
        const layer = this._layers.add(model);

        // Link element to model
        model.element = layer;

        // Add layer to navigation
        this._navigation.add(model);

        // FIX: Find a better solution for all this resize shit
        this._layers.resize();
        this._header.resize();
        this._setLayersHeight();

        return layer;
    }

    gotoLayer(label) {
        const index = this._layers.getIndexByLabel(label);
        this._navigation.goto(index);
        this._layers.goto(index);
    }

    addGroup(label, options = {}, parentModel) {
        // Get parent model if not present
        parentModel = parentModel || this._getParentModelByContainer(options.container);

        // Create group model
        const model = new GroupModel({
            label,
        });

        // Add model to parent model
        parentModel.addGroup(model);

        // Create group element
        const group = new Group({
            root: this._root,
            parentModel,
            options,
            model,
        });

        // Link element to model
        model.element = group;

        // Add element to parent
        parentModel.element.addElement(group);

        // Store group reference
        this._groups.push(group);

        // Resize..
        this._layers.resize();

        return group;
    }

    removeGroup(id) {
        const group = this._getGroupById(id);
        group.parent.content.removeChild(group);
        this._groups.splice(this._groups.indexOf(group), 1);
        this._layers.resize();
        LayoutModel.removeGroup(id);
    }

    addComponent({ object, property, options, parentModel, id, type }) {
        // Get parent model if not present
        parentModel = parentModel || this._getParentModelByContainer(options.container);

        // Create component model
        const model = new ComponentModel({
            object,
            property,
            options,
            parent: parentModel,
            id,
            type,
            onChange: (data) => {
                this._root.triggerChange(data);
            },
        });

        // Add model to parent model
        parentModel.addComponent(model);

        // Add model reference to layout model
        LayoutModel.addComponent(model);

        // Get component class
        const componentClass = componentTypes[model.type];

        // Create component
        const component = new componentClass();
        component.setup({
            model,
            root: this._root,
            parentModel,
        });

        // Store component reference
        this._components.push(component);

        // Add component to container
        parentModel.element.addElement(component);

        // Return created component
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

    getParentById(id) {
        const layer = this._layers.getById(id);
        if (layer) return layer;

        const group = this._getGroupById(id);
        if (group) return group;
    }

    remove() {
        document.body.removeChild(this._container);
    }

    resize() {
        this._layers.resize();
        // this._components.resize();
        this._setLayersHeight();
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
        // this._components.resize();
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

    // _createComponents() {
    //     const componenents = new Components({
    //         root: this._root,
    //         layout: this,
    //     });
    //     return componenents;
    // }

    _getGroupById(id) {
        for (const group of this._groups) {
            if (group.id === id) return group;
        }
    }

    _getGroupByLabel(label) {
        for (const group of this._groups) {
            if (group.model.label === label) return group;
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
        const layersHeight = this._container.height - this._header.height;
        this._layers.setHeight(layersHeight);
    }

    _addComponentToContainer(component) {
        const container = component.model.options.container;
        if (container) {
            const element = this._root.layout.getParent(container).content;
            element.appendChild(component);
        }

        const parentId = component.model.parentId;
        if (parentId) {
            const element = this._root.layout.getParentById(parentId).content;
            element.appendChild(component);
        }

        const parent = component.model.parent;
        if (parent) {
            const element = parent.content;
            element.appendChild(component);
        }

        this._root.layout.resize();
    }

    _getParentModelByContainer(container) {
        const layer = this._layers.get(container);
        if (layer) return layer.model;

        const group = this._getGroupByLabel(container);
        if (group) return group.model;
    }

    /**
     * Handlers
     */
    _navigationSwitchHandler(e) {
        this._layers.goto(e.detail.index);
        // this._components.resize();
        if (typeof this._onLayerChangeCallback === 'function') {
            const label = this._layers.getByIndex(e.detail.index).label;
            this._onLayerChangeCallback(label);
        }
    }

    _keyUpHandler(e) {
        if (e.keyCode === 67) ValueHover.copyToClipboard();
    }
}
