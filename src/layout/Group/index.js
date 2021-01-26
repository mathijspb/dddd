// Vendor
import Mustache from 'mustache';

import style from './style.css';
import template from './template.html';

// Constants
const CONTENT_CLASS = 'content';

export default class Group extends HTMLElement {
    constructor({ label }) {
        super();

        this.attachShadow({ mode: 'open' });

        this._element = this._addTemplate(template, label);
        this._addStyle(style);
        this._contentElement = this._getContentElement();
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
    _addTemplate(template, label) {
        const templateData = { label };
        const render = Mustache.render(template, templateData);
        this.shadowRoot.innerHTML = render;
        return this.shadowRoot.firstChild;
    }

    _addStyle(style) {
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    _getContentElement() {
        return this.shadowRoot.querySelector(`.${CONTENT_CLASS}`);
    }
}

window.customElements.define('dddd-group', Group);
