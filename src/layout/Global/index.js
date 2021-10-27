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

    /**
     * Public
     */
    addGroup(label) {
        return this.$root.addGroup(label, {
            container: this._label,
        });
    }

    show() {
        this.$refs.content.style.display = 'block';
    }

    hide() {
        this.$refs.content.style.display = 'none';
    }
}

window.customElements.define('dddd-global', Layer);
