// Base class
import LayoutElement from '../../LayoutElement';

// Layout
import Layer from '../Layer/index';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Layers extends LayoutElement {
    constructor({ root }) {
        super({ root, style, template });

        // Options
        this._activeIndex = 0;
        this._layers = [];
    }

    destroyed() {
        this._destroyLayers();
    }

    /**
     * Public
     */
    add(label) {
        const layer = new Layer({ root: this.$root, label });
        if (this._layers.length === this._activeIndex) {
            layer.activate();
        }
        this._layers.push(layer);
        this.$el.appendChild(layer);
        return layer;
    }

    goto(index) {
        const currentIndex = this._activeIndex;
        const newIndex = index;
        this._layers[currentIndex].deactivate();
        this._layers[newIndex].activate();
        this._activeIndex = newIndex;
        this._resizeLayers();
    }

    get(container) {
        for (const layer of this._layers) {
            if (layer.label === container) return layer;
        }
        return null;
    }

    getByIndex(index) {
        return this._layers[index];
    }

    // TODO: Refactor..
    getIndexByLabel(label) {
        for (let i = 0, len = this._layers.length; i < len; i++) {
            if (this._layers[i].label === label) return i;
        }
        return null;
    }

    isEmpty() {
        return this._layers.length === 0;
    }

    resize() {
        this._resizeLayers();
    }

    show() {
        this.$el.style.display = 'block';
    }

    hide() {
        this.$el.style.display = 'none';
    }

    /**
     * Private
     */
    _destroyLayers() {
        for (const layer of this._layers) {
            layer.destroy();
        }
    }

    _resizeLayers() {
        for (const layer of this._layers) {
            layer.resize();
        }
    }
}

window.customElements.define('dddd-layers', Layers);
