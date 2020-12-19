// Vendor
import Mustache from 'mustache';

import Styles from './Styles';
import TemplateLayers from './layout/Layers';

export default class Layers {
    constructor() {
        this._layers = [];
        this._activeIndex = 0;
        this._element = this._createElement();
        this._navigationElement = this._element.querySelector('.navigation');
        this._contentElement = this._element.querySelector('.content');
        this._addStyles();
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */
    get element() {
        return this._element;
    }

    /**
     * Public
     */
    add(label) {
        const navigationItem = this._createNavigationItem(label);
        const contentItem = this._createConentItem();
        this._layers.push({
            id: label,
            navigationItem,
            contentItem,
        });
    }

    get(id) {
        for (const layer of this._layers) {
            if (layer.id === id) return layer.contentItem;
        }
        return null;
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
    }

    _setupEventListeners() {
        this._element.addEventListener('click', this._clickHandler);
    }

    _removeEventListeners() {
        this._element.removeEventListener('click', this._clickHandler);
    }

    _createElement() {
        // TODO: Find a nicer way to get a node element from a string
        const container = document.createElement('div');
        const element = Mustache.render(TemplateLayers.layout);
        container.insertAdjacentHTML('beforeend', element);
        return container.firstChild;
    }

    _addStyles() {
        Styles.add(TemplateLayers.style);
    }

    _createNavigationItem(label) {
        const templateData = {
            label,
        };
        const container = document.createElement('div');
        const string = Mustache.render(TemplateLayers.navigationItem, templateData);
        container.insertAdjacentHTML('beforeend', string);
        const element = container.firstChild;
        if (this._layers.length === 0) {
            element.classList.add('active');
        }
        const reference = this._navigationElement.appendChild(element);
        return reference;
    }

    _createConentItem() {
        const container = document.createElement('div');
        const string = Mustache.render(TemplateLayers.contentItem);
        container.insertAdjacentHTML('beforeend', string);
        const element = container.firstChild;
        if (this._layers.length === 0) {
            element.classList.add('active');
        }
        const reference = this._contentElement.appendChild(element);
        return reference;
    }

    _getNavigationButtonIndex(element) {
        return Array.prototype.indexOf.call(this._navigationElement.children, element);
    }

    _goto(index) {
        this._navigationElement.children[this._activeIndex].classList.remove('active');
        this._contentElement.children[this._activeIndex].classList.remove('active');
        this._navigationElement.children[index].classList.add('active');
        this._contentElement.children[index].classList.add('active');
        this._activeIndex = index;
    }

    /**
     * Handlers
     */
    _clickHandler(e) {
        if (e.target.closest('.navigation-button')) {
            const index = this._getNavigationButtonIndex(e.target.parentElement);
            this._goto(index);
        }
    }
}
