import Group from './layout/Group/index';

export default class ComponentModel {
    constructor({ root, object, property, options, id, type, value, onChangeCallback }) {
        // Props
        this._root = root;
        this._object = object || {};
        this._property = property;
        this._options = options || {};
        this._id = id || this._generateId();
        this._type = type || this._detectType();
        this._value = value || this._object[this._property];
        this._onChangeCallback = onChangeCallback;

        // TODO: Refactor
        if (this._options.container instanceof Group) {
            this._options.container = this._options.container.label;
        }
    }

    /**
     * Getters & Setters
     */
    set value(value) {
        this._value = value;
        this._object[this._property] = this._value;

        if (typeof this._options.onChange === 'function') {
            this._options.onChange(this._value);
        }

        // TODO: Refactor..
        if (this._type === 'button' && this._value === 'click') {
            if (typeof this._options.onClick === 'function') {
                this._options.onClick(value);
            }
        }

        // TODO: Refactor function name
        if (this._root.isDevtools && typeof this._onChangeCallback === 'function') {
            this._onChangeCallback(this.getData());
        }
    }

    get value() {
        return this._value;
    }

    get object() {
        return this._object;
    }

    set object(value) {
        this._object = value;
    }

    get options() {
        return this._options;
    }

    get property() {
        return this._property;
    }

    get type() {
        return this._type;
    }

    get id() {
        return this._id;
    }

    /**
     * Public
     */
    getData() {
        return {
            object: this._object,
            property: this._property,
            options: this._removeFunctions(this._options),
            id: this._id,
            type: this._type,
            value: this._value,
        };
    }

    updateValueFromObject() {
        this._value = this._object[this._property];
        // console.log(this._value);

        // // TODO: Refactor function name
        // if (this._root.isDevtools && typeof this._onChangeCallback === 'function') {
        //     this._onChangeCallback(this.getData());
        // }
    }

    /**
     * Private
     */
    _generateId() {
        // uuidv4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    _detectType() {
        if (!(this._property in this._object)) {
            throw new Error(`Property '${this._property}' does not exists`);
        }

        const value = this._object?.[this._property];
        const type = null;

        // Image
        if (this._options.type === 'image') {
            return 'image';
        }

        if (this._options.type === 'canvas') {
            return 'canvas';
        }

        if (this._options.options &&
            typeof this._options.options === 'object') {
            return 'dropdown';
        }

        // Slider
        if (typeof value === 'number' &&
            typeof this._options.min === 'number' &&
            typeof this._options.max === 'number') {
            return 'slider';
        }

        // Three.js Color
        if (value.constructor.name === 'Color') {
            return 'color';
        }

        // Color
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            return 'color';
        }

        // MultiInput
        if (typeof value === 'object') {
            return 'multiInput';
        }

        // Checkbox
        if (typeof value === 'boolean') {
            return 'checkbox';
        }

        // Number
        if (typeof value === 'number') {
            return 'number';
        }

        // Text
        if (typeof value === 'string') {
            return 'text';
        }

        if (!type) {
            throw new Error('Input type not detected');
        }
    }

    _removeFunctions(data) {
        const object = JSON.parse(JSON.stringify(data));
        function eachRecursive(object) {
            for (const key in object) {
                if (typeof object[key] === 'object' && object[key] !== null) {
                    eachRecursive(object[key]);
                } else if (typeof object[key] === 'function') {
                    delete object[key];
                }
            }
        }
        eachRecursive(object);
        return object;
    }
}
