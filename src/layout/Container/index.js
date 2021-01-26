import style from './style.css';
import template from './template.html';

export default class Container extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._element = this._addTemplate(template);
        this._addStyle(style);
    }

    /**
     * Public
     */
    get element() {
        return this._element;
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
}

window.customElements.define('dddd-container', Container);
