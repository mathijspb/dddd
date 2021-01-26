// Style
import style from './style.css';

// Template
import template from './template.html';

const NAVIGATION_BUTTON_CLASS = 'navigation-button';
const ACTIVE_CLASS = 'active';

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        // Attach
        this.attachShadow({ mode: 'open' });

        // Data
        this._activeIndex = 0;
        this._elements = [];

        // Setup
        this._element = this._addTemplate(template);
        this._addStyle(style);
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Public
     */
    add(label) {
        if (this._elements.length === 0) {
            this._show();
        }

        const button = document.createElement('button');
        button.classList.add(NAVIGATION_BUTTON_CLASS);
        if (this._element.children.length === this._activeIndex) {
            button.classList.add(ACTIVE_CLASS);
        }
        button.innerText = label;

        const li = document.createElement('li');
        li.appendChild(button);

        this._elements.push(li);
        this._element.appendChild(li);
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

    _show() {
        this._element.style.display = 'block';
    }

    _getNavigationButtonIndex(element) {
        return Array.prototype.indexOf.call(this._element.children, element);
    }

    _switch(index) {
        this._element.children[this._activeIndex].firstChild.classList.remove(ACTIVE_CLASS);
        this._activeIndex = index;
        this._element.children[this._activeIndex].firstChild.classList.add(ACTIVE_CLASS);
        this._triggerSwitchEvent(this._activeIndex);
    }

    _triggerSwitchEvent(index) {
        this._activeIndex = index;
        const event = new CustomEvent('switch', {
            detail: { 
                index: this._activeIndex
            }
        });
        this.dispatchEvent(event);
    }

    /**
     * Handlers
     */
    _clickHandler(e) {
        if (e.target.closest(`.${NAVIGATION_BUTTON_CLASS}`)) {
            const index = this._getNavigationButtonIndex(e.target.parentElement);
            this._switch(index);
        }
    }
}

window.customElements.define('dddd-navigation', Navigation);
