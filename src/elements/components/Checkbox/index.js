// Base component
import Component from '../../../baseClasses/Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Checkbox extends Component {
    constructor() {
        super({ style, template });
    }

    created() {
        // Setup
        this._bindHandlers();
    }

    connected() {
        this._updateChecked();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Hooks
     */
    onListen() {
        this._updateChecked();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._checkboxChangeHandler = this._checkboxChangeHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.checkbox.addEventListener('change', this._checkboxChangeHandler);
    }

    _removeEventListeners() {
        this.$refs.checkbox.removeEventListener('change', this._checkboxChangeHandler);
    }

    _updateChecked() {
        this.$refs.checkbox.checked = this.model.value;
    }

    /**
     * Handlers
     */
    _checkboxChangeHandler() {
        this.model.value = this.$refs.checkbox.checked;
    }
}

window.customElements.define('dddd-checkbox', Checkbox);
