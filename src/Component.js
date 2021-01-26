// Vendor
import Mustache from 'mustache';

export default class Component extends HTMLElement {
    constructor({ model, style, template }) {
        super();
        
        // Props
        this.__model = model;

        // Attach
        this.attachShadow({ mode: 'open' });

        // Setup
        this.__addTemplate(template);
        this.__addStyle(style);
        this.__bindHandlers();

        // Elements
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
        this.__triggerDestroyed();
    }

    /**
     * Getters & Setters
     */
    get model() {
        return this.__model;
    }

    get container() {
        return this.__model.options.container;
    }

    /**
     * Private
     */
    __bindHandlers() {
        this.__resizeHandler = this.__resizeHandler.bind(this);
        this.__update = this.__update.bind(this);
    }

    __setupEventListeners() {
        window.addEventListener('resize', this.__resizeHandler);
        window.requestAnimationFrame(this.__update);
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
        return this.__model.options.label ? this.__model.options.label : this.__model.property;
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

    __triggerDestroyed() {
        if (typeof this.destroyed === 'function') {
            this.destroyed();
        }
    }

    __triggerResize() {
        if (typeof this.onResize === 'function') {
            this.onResize();
        }
    }

    __triggerUpdate() {
        if (typeof this.onUpdate === 'function') {
            this.onUpdate();
        }
    }

    /**
     * Update
     */
    __update() {
        window.requestAnimationFrame(this.__update);
        this.__triggerUpdate();
    }

    /**
     * Handlers
     */
    __resizeHandler() {
        this.__triggerResize();
    }
}
