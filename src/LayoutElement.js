// Vendor
import Mustache from 'mustache';

export default class LayoutElement extends HTMLElement {
    constructor({ root, style, template, templateData }) {
        super();

        // Props
        this.__root = root;

        // Attach
        this.attachShadow({ mode: 'open' });

        // Setup
        this.__element = this.__addTemplate(template, templateData);
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
    get $root() {
        return this.__root;
    }

    get element() {
        return this.__element;
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

    __addTemplate(template, templateData = {}) {
        if (typeof template === 'object') {
            template = this.$root.isLayoutSidebar() ? template.templateSidebar : template.templateDevtools;
        }
        const render = Mustache.render(template, templateData);
        this.shadowRoot.innerHTML = render;
        return this.shadowRoot.firstChild;
    }

    __addStyle(style) {
        if (typeof style === 'object') {
            style = this.$root.isLayoutSidebar() ? style.styleSidebar : style.styleDevtools;
        }
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    __getRootElement() {
        return this.shadowRoot.firstChild;
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

    /**
     * Handlers
     */
    __resizeHandler() {
        this.__triggerResize();
    }
}
