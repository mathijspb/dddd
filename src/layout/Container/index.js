// Base class
import LayoutElement from '../../LayoutElement';

// Style
import styleSidebar from './style-sidebar.css';
import styleDevtools from './style-devtools.css';

// Template
import templateSidebar from './template-sidebar.html';
import templateDevtools from './template-devtools.html';

export default class Container extends LayoutElement {
    constructor({ root }) {
        super({ root, style: { styleSidebar, styleDevtools }, template: { templateSidebar, templateDevtools } });

        // Data
        this._isMouseDown = false;
        this._width = 0;
        this._height = 0;
        this._axis = { x: 0, y: 0 };

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */
    get content() {
        return this.$refs.content;
    }

    /**
     * Public
     */
    show() {
        this.$el.style.width = `${this._width}px`;
        if (this._height) {
            this.$el.style.height = `${this._height}px`;
        } else {
            this.$el.style.height = '100%';
        }
    }

    hide() {
        this._width = this.$el.offsetWidth;
        this.$el.style.width = 'auto';
        this.$el.style.height = 'auto';
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._resizeHandleSideMouseDownHandler = this._resizeHandleSideMouseDownHandler.bind(this);
        this._resizeHandleBottomMouseDownHandler = this._resizeHandleBottomMouseDownHandler.bind(this);
        this._resizeHandleCornerMouseDownHandler = this._resizeHandleCornerMouseDownHandler.bind(this);
        this._windowMouseUpHandler = this._windowMouseUpHandler.bind(this);
        this._windowMouseMoveHandler = this._windowMouseMoveHandler.bind(this);
    }

    _setupEventListeners() {
        if (!this.$root.isDevtools) {
            this.$refs.resizeHandleSide.addEventListener('mousedown', this._resizeHandleSideMouseDownHandler);
            this.$refs.resizeHandleBottom.addEventListener('mousedown', this._resizeHandleBottomMouseDownHandler);
            this.$refs.resizeHandleCorner.addEventListener('mousedown', this._resizeHandleCornerMouseDownHandler);
            window.addEventListener('mouseup', this._windowMouseUpHandler);
            window.addEventListener('mousemove', this._windowMouseMoveHandler);
        }
    }

    _removeEventListeners() {
        if (!this.$root.isDevtools) {
            this.$refs.resizeHandleCorner.removeEventListener('mousedown', this._resizeHandleCornerMouseDownHandler);
            window.removeEventListener('mouseup', this._windowMouseUpHandler);
            window.removeEventListener('mousemove', this._windowMouseMoveHandler);
        }
    }

    _resize(x, y) {
        if (this._axis.x) {
            this._width = window.innerWidth - x;
            this.$el.style.width = `${this._width}px`;
        }

        if (this._axis.y) {
            this._height = y;
            this.$el.style.height = `${this._height}px`;
        }

        this.$root.layout.resize();
    }

    /**
     * Handlers
     */
    _resizeHandleSideMouseDownHandler() {
        this._isMouseDown = true;
        this._axis.x = 1;
        this._axis.y = 0;
    }

    _resizeHandleBottomMouseDownHandler() {
        this._isMouseDown = true;
        this._axis.x = 0;
        this._axis.y = 1;
    }

    _resizeHandleCornerMouseDownHandler() {
        this._isMouseDown = true;
        this._axis.x = 1;
        this._axis.y = 1;
    }

    _windowMouseUpHandler() {
        this._isMouseDown = false;
    }

    _windowMouseMoveHandler(e) {
        if (this._isMouseDown) {
            this._resize(e.clientX, e.clientY);
        }
    }
}

window.customElements.define('dddd-container', Container);
