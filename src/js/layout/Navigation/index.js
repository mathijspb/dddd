import style from './style.cssx';
import template from './template.html';

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._element = this._addTemplate(template);
        this._addStyle(style);

        this._element.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('test'));
        })
    }

    connected() {
    }

    destroy() {
    }

    /**
     * Public
     */
    add(label) {
        const button = document.createElement('button');
        button.classList.add('navigation-button');
        button.innerText = label;

        const li = document.createElement('li');
        li.appendChild(button);

        this._element.appendChild(li);
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

window.customElements.define('dddd-navigation', Navigation);
