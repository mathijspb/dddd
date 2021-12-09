// Base class
import LayoutElement from '../../LayoutElement';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Layer extends LayoutElement {
    constructor({ root }) {
        super({ root, style, template });
    }

    /**
     * Getters & Setters
     */
    get content() {
        return this.$refs.content;
    }

    get height() {
        return this._height;
    }

    /**
     * Public
     */
    addGroup(label) {
        const group = this.$root.addGroup(label, {
            container: this._label,
        });
        this._resize();
        return group;
    }

    show() {
        this.$refs.content.style.display = 'block';
    }

    hide() {
        this.$refs.content.style.display = 'none';
    }

    resize() {
        this._resize();
    }

    /**
     * Resize
     */
    _resize() {
        this._width = this.$el.offsetWidth;
        this._height = this.$el.offsetHeight;
    }
}

window.customElements.define('dddd-global', Layer);
