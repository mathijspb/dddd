// Collections
import GroupCollection from '../collections/GroupCollection';
import ComponentCollection from '../collections/ComponentCollection';

export default class GroupModel {
    constructor(options) {
        // Props
        this._label = options.label;
        this._element = options.element;

        // Setup
        this._groups = new GroupCollection();
        this._components = new ComponentCollection();
    }

    /**
     * Getters & Setters
     */
    get label() {
        return this._label;
    }

    get element() {
        return this._element;
    }

    set element(value) {
        this._element = value;
    }

    /**
     * Add GroupModel to GroupCollection
     * @param {GroupModel} model
     */
    addGroup(model) {
        this._groups.add(model);
    }

    /**
     * Add ComponentModel to ComponentCollection
     * @param {ComponentModel} model
     */
    addComponent(model) {
        this._components.add(model);
    }

    serialize() {
        const data = {
            label: this._label,
            groups: this._groups.serialize(),
            components: this._components.serialize(),
        };
        return data;
    }
}
