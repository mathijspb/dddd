export default class Components {
    constructor({ layout }) {
        this._layout = layout;
        this._components = [];
    }

    /**
     * Public
     */
    create(object, property, options) {
        const type = options.type;
        const component = new type({ object, property, options });
        const container = this._layout.get(options.container);
        container.appendChild(component);
    }
}
