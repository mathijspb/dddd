// Base component
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Button extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
    }

    _setupEventListeners() {
        this.$refs.button.addEventListener('click', this._clickHandler);
    }

    _removeEventListeners() {
        this.$refs.button.removeEventListener('click', this._clickHandler);
    }

    // _triggerOnClickCallback(value) {
    //     if (typeof this.model.options.onClick === 'function') {
    //         this.model.options.onClick(value);
    //     }
    // }

    /**
     * Handlers
     */
    _clickHandler() {
        this.model.value = 'click';
        // this._triggerOnClickCallback();
    }
}

window.customElements.define('dddd-button', Button);
