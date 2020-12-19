// Vendor
import Mustache from 'mustache';

import Styles from './Styles';

export default class Components {
    constructor({ layout }) {
        this._layout = layout;
        this._types = {};
        this._components = [];
    }

    /**
     * Public
     */
    // register(component) {
    //     const type = {};
    //     type.id = this._generateUID();
    //     type.template = this._wrapContainer(type.id, component.template);
    //     Styles.addScoped(type.id, component.style);
    //     this._types[component.name] = type;
    // }

    // register(name, component) {
    //     this._types[name] = component;
    // }

    // create(object, property, options) {
    //     const type = this._types[options.type];
    //     const templateData = {
    //         label: property,
    //     };
    //     const template = Mustache.render(type.template, templateData);
    //     const container = this._layout.get(options.container);
    //     const script = type.script;
    //     container.insertAdjacentHTML('beforeend', template);
    // }

    create(object, property, options) {
        const type = options.type;
        const component = new type({ object, property, options });
        const container = this._layout.get(options.container);
        container.appendChild(component);
    }

    /**
     * Private
     */
    // _wrapContainer(id, template) {
    //     const container = document.createElement('div');
    //     container.dataset.scope = id;
    //     container.insertAdjacentHTML('beforeend', template);
    //     return container.outerHTML;
    // }

    // // TODO: Move to seperate file
    // _generateUID() {
    //     var firstPart = (Math.random() * 46656) | 0;
    //     var secondPart = (Math.random() * 46656) | 0;
    //     firstPart = ('000' + firstPart.toString(36)).slice(-3);
    //     secondPart = ('000' + secondPart.toString(36)).slice(-3);
    //     return firstPart + secondPart;
    // }
}
