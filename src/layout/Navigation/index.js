// Base class
import LayoutElement from '../../LayoutElement';

// Style
import styleSidebar from './style-sidebar.css';
import styleDevtools from './style-devtools.css';

// Template
import templateSidebar from './template-sidebar.html';
import templateDevtools from './template-devtools.html';

// Constants
const NAVIGATION_BUTTON_CLASS = 'navigation-button';
const ACTIVE_CLASS = 'active';

export default class Navigation extends LayoutElement {
    constructor({ root }) {
        super({
            root,
            style: {
                styleSidebar,
                styleDevtools,
            },
            template: {
                templateSidebar,
                templateDevtools,
            },
        });

        // Data
        this._isMinimized = false;
        this._activeIndex = 0;
        this._elements = [];

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Public
     */
    add(label, options) {
        if (this._elements.length === 0) {
            this._setVisible();
        }

        if (this.$root.isLayoutSidebar()) {
            const option = document.createElement('option');
            option.innerText = label;
            option.value = this._elements.length;
            this._elements.push(option);
            this.$refs.select.appendChild(option);
        } else {
            const button = document.createElement('button');
            button.classList.add(NAVIGATION_BUTTON_CLASS);
            if (this.$el.children.length === this._activeIndex) {
                button.classList.add(ACTIVE_CLASS);
            }
            button.innerText = label;

            const li = document.createElement('li');
            li.appendChild(button);

            this._elements.push(li);
            this.$el.appendChild(li);
        }
    }

    remove(label) {
        let element;
        let item;
        for (let i = 0, len = this._elements.length; i < len; i++) {
            item = this._elements[i];
            if (item.innerText === label) {
                element = item;
            }
        }
        if (element) element.remove();
        this._elements.splice(this._elements.indexOf(element), 1);
    }

    goto(label) {
        this.$refs.select.value = label;
    }

    show() {
        this._isMinimized = false;
        this.$refs.selectContainer.style.display = 'block';
        this.$el.style.display = 'grid';
    }

    hide() {
        this._isMinimized = true;
        this.$refs.selectContainer.style.display = 'none';
        this.$el.style.display = 'block';
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
        this._selectChangeHandler = this._selectChangeHandler.bind(this);
        this._clickButtonToggle = this._clickButtonToggle.bind(this);
    }

    _setupEventListeners() {
        this.$el.addEventListener('click', this._clickHandler);
        if (this.$refs.select) this.$refs.select.addEventListener('change', this._selectChangeHandler);
        if (this.$refs.buttonToggle) this.$refs.buttonToggle.addEventListener('click', this._clickButtonToggle);
    }

    _removeEventListeners() {
        this.$el.removeEventListener('click', this._clickHandler);
        if (this.$refs.select) this.$refs.select.removeEventListener('change', this._selectChangeHandler);
        if (this.$refs.buttonToggle) this.$refs.buttonToggle.removeEventListener('click', this._clickButtonToggle);
    }

    _setVisible() {
        this.$el.style.display = this._isMinimized ? 'block' : 'grid';
    }

    _getNavigationButtonIndex(element) {
        return Array.prototype.indexOf.call(this.$el.children, element);
    }

    _switch(index) {
        this.$el.children[this._activeIndex].firstChild.classList.remove(ACTIVE_CLASS);
        this._activeIndex = index;
        this.$el.children[this._activeIndex].firstChild.classList.add(ACTIVE_CLASS);
        this._triggerSwitchEvent(this._activeIndex);
    }

    _triggerSwitchEvent(index) {
        this._activeIndex = index;
        const event = new CustomEvent('switch', {
            detail: {
                index: this._activeIndex,
            },
        });
        this.dispatchEvent(event);
    }

    /**
     * Handlers
     */
    _clickHandler(e) {
        if (e.target.closest(`.${NAVIGATION_BUTTON_CLASS}`)) {
            const index = this._getNavigationButtonIndex(e.target.parentElement);
            this._switch(index);
        }
    }

    _selectChangeHandler() {
        const index = parseInt(this.$refs.select.value);
        this._triggerSwitchEvent(index);
        this.$refs.select.blur();
    }

    _clickButtonToggle() {
        this.$root.layout.toggleVisibility();
    }
}

window.customElements.define('dddd-navigation', Navigation);
