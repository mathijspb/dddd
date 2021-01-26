export default class ComponentModel {
    constructor({ object, property, options, id, type, value, onChangeCallback }) {
        // Props
        this._object = object || {};
        this._property = property;
        this._options = options;
        this._id = id || this._generateId();
        this._type = type || this._detectType();
        this._value = value || this._object[this._property];
        this._onChangeCallback = onChangeCallback;
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
        if (typeof this._onChangeCallback === 'function') {
            this._onChangeCallback(this.getData());
        }
    }

    get value() {
        return this._value;
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
            options: this._options,
            id: this._id,
            type: this._type,
            value: this._value
        }
    }

    /**
     * Private
     */
    _generateId() {
        // uuidv4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    _detectType() {
        if (!this._object.hasOwnProperty(this._property)) {
            throw new Error(`Property '${this._property}' does not exists`);
        }

        const value = this._object?.[this._property];
        let type = null;

        // Image
        if (this._options.type === 'image') {
            return 'image';
        }

        if (this._options.options &&
            typeof this._options.options === 'object') {
            return 'dropdown'
        }

        // Slider
        if (typeof value === 'number' && 
            typeof this._options.min === 'number' &&
            typeof this._options.max === 'number') {
            return 'slider';
        }

        // MultiInput
        if (typeof value === 'object') {
            return 'multiInput'
        }

        // Checkbox
        if (typeof value === 'boolean') {
            return 'checkbox'
        }

        // Color
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            return 'color'
        }

        // Text
        if (typeof value === 'string') {
            return 'text';
        }

        if (!type) {
            throw new Error('Input type not detected');
        }
    }
}