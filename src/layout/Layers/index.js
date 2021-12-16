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

    remove(label) {
        let layer;
        let item;
        for (let i = 0, len = this._layers.length; i < len; i++) {
            item = this._layers[i];
            if (item.label === label) {
                layer = item;
            }
        }
        this.$el.removeChild(layer);
        this._layers.splice(this._layers.indexOf(layer), 1);
    }

    goto(index) {
        const activeLayer = this._layers[this._activeIndex];
        if (activeLayer) activeLayer.deactivate();
        this._layers[index].activate();
        this._activeIndex = index;
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

    setHeight(height) {
        this.$el.style.height = `${height}px`;
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
