// Layout
import Layer from '../Layer/index';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Layers extends HTMLElement {
    constructor() {
        super();

        // Attach
        this.attachShadow({ mode: 'open' });

        // Options
        this._activeIndex = 0;
        this._layers = [];

        // Setup
        this._element = this._addTemplate(template);
        this._addStyle(style);
    }

    /**
     * Public
     */
    add(label) {
        const layer = new Layer({ label });
        if (this._layers.length === this._activeIndex) {
            layer.activate();
        }
        this._layers.push(layer);
        this._element.appendChild(layer);
        return layer.element;
    }

    goto(index) {
        const currentIndex = this._activeIndex;
        const newIndex = index;
        this._layers[currentIndex].deactivate();
        this._layers[newIndex].activate();
        this._activeIndex = newIndex;
    }

    get(label) {
        for (const layer of this._layers) {
            if (layer.label === label) return layer.element;
        }
        return null;
    }

    isEmpty() {
        return this._layers.length === 0;
    }

    resize() {
        this._resizeLayers();
    }

    /**
     * Private
     */
    _addTemplate(template) {
        this.shadowRoot.innerHTML = template;
        return this.shadowRoot.firstChild;
    }

    _addStyle(style) {
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    _resizeLayers() {
        for (const layer of this._layers) {
            layer.resize();
        }
    }
}

window.customElements.define('dddd-layers', Layers);
