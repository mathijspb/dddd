// Vendor
import Mustache from 'mustache';

export default class Component extends HTMLElement {
    constructor({ root, model, style, template }) {
        super();

        // Props
        this.__root = root;
        this.__model = model;

        // Attach
        this.attachShadow({ mode: 'open' });

        // Setup
        this.$el = this.__addTemplate(template);
        this.$refs = this.__getReferences(this.$el);
        this.__addStyle(style);
        this.__addLockedClass();
        this.__bindHandlers();
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
    get $root() {
        return this.__root;
    }

    get model() {
        return this.__model;
    }

    get container() {
        return this.__model.options.container;
    }

    /**
     * Public
     */
    tick() {
        this.__triggerTick();
        if (this.model.options.listen) {
            this.model.updateValueFromObject(); // !this.__root.isDevtools
            this.__triggerOnListen();
        }
    }

    resize() {
        this.__triggerResize();
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
        return this.shadowRoot.firstChild;
    }

    __addStyle(style) {
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    __getLabel() {
        let label = this.__model.options.label ? this.__model.options.label : this.__parsePropertyToLabel(this.__model.property);
        if (this.__model.options.persistent) label += '*';
        return label;
    }

    __parsePropertyToLabel(property) {
        if (property.charAt(0) === '_' || property.charAt(0) === 'u') {
            property = property.substr(1);
            property = property.replace(/([A-Z])/g, ' $1').toLowerCase();
        }
        return property;
    }

    __getReferences(element) {
        const refs = {};
        const elements = element.querySelectorAll('[ref]');

        let item;
        let name;
        for (let i = 0, len = elements.length; i < len; i++) {
            item = elements[i];
            name = item.getAttribute('ref');
            refs[name] = item;
        }
        return refs;
    }

    __addLockedClass() {
        if (this.model.options.locked) {
            this.$el.classList.add('locked');
        }
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

    __triggerTick() {
        if (typeof this.onTick === 'function') {
            this.onTick();
        }
    }

    __triggerOnListen() {
        if (typeof this.onListen === 'function') {
            this.onListen();
        }
    }

    /**
     * Handlers
     */
    __resizeHandler() {
        this.__triggerResize();
    }
}
