class ValueHover {
    constructor() {
        this._value = null;
    }

    /**
     * Public
     */
    set(value) {
        this._value = value;
    }

    get() {
        return this._value;
    }

    copyToClipboard() {
        navigator.clipboard.writeText(this._value).then();
    }
}

export default new ValueHover();
