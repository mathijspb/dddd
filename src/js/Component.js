// Vendor
import Mustache from 'mustache';

export default class Component extends HTMLElement {
    constructor({ style, template, object, property, options }) {
        super();

        this._object = object;
        this._property = property;
        this._options = options;

        this.attachShadow({ mode: 'open' });
        this._addTemplate(template);
        this._addStyle(style);
        this.$refs = this._getReferences();
    }

    _addTemplate(template) {
        const templateData = {
            label: this._getLabel(),
        };
        const render = Mustache.render(template, templateData);
        this.shadowRoot.innerHTML = render;
    }

    _addStyle(style) {
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    _getLabel() {
        return this._options.label ? this._options.label : this._property;
    }

    _getReferences() {
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
}
