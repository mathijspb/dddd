// Vendor
import Mustache from 'mustache';

export default class Component extends HTMLElement {
    constructor({ style, template, object, property, options }) {
        super();

        this.__object = object;
        this.__property = property;
        this.__options = options;

        this.attachShadow({ mode: 'open' });

        this.__addTemplate(template);
        this.__addStyle(style);
        this.__bindHandlers();

        this.$el = this.__getRootElement();
        this.$refs = this.__getReferences();
    }

    connectedCallback() {
        this.__setupEventListeners();
        this.__triggerResize();
        this.__triggerConnected();
    }

    destroy() {
        this.__removeEventListeners();
    }

    /**
     * Private
     */
    __bindHandlers() {
        this.__resizeHandler = this.__resizeHandler.bind(this);
    }

    __setupEventListeners() {
        window.addEventListener('resize', this.__resizeHandler);
    }

    __removeEventListeners() {
        window.removeEventListener('resize', this.__resizeHandler);
    }

    __addTemplate(template) {
        const templateData = {
            label: this.__getLabel(),
        };
        const render = Mustache.render(template, templateData);
        this.shadowRoot.innerHTML = render;
    }

    __addStyle(style) {
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    __getLabel() {
        return this.__options.label ? this.__options.label : this.__property;
    }

    __getRootElement() {
        const element = this.shadowRoot.querySelector('div');
        return element;
    }

    __getReferences() {
        const refs = {};
        const elements = this.shadowRoot.querySelectorAll('[ref]');

        let item;
        let name;
        for (let i = 0, len = elements.length; i < len; i++) {
            item = elements[i];
            name = item.getAttribute('ref');
            refs[name] = item;
        }
        return refs;
    }

    __triggerConnected() {
        if (typeof this.connected === 'function') {
            this.connected();
        }
    }

    __triggerResize() {
        if (typeof this.onResize === 'function') {
            this.onResize();
        }
    }

    /**
     * Handlers
     */
    __resizeHandler() {
        this.__triggerResize();
    }
}
