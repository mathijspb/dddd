// Base class
import Layout from '../../../baseClasses/Layout';

// Style
import styleSidebar from './style-sidebar.css';
import styleDevtools from './style-devtools.css';

// Template
import templateSidebar from './template-sidebar.html';
import templateDevtools from './template-devtools.html';

export default class Container extends Layout {
    constructor({ root }) {
        super({ root, style: { styleSidebar, styleDevtools }, template: { templateSidebar, templateDevtools } });

        // Data
        this._isMouseDown = false;
        this._width = 0;
        this._height = 0;
        this._customWidth = 0;
        this._customHeight = 0;
        this._axis = { x: 0, y: 0 };

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Public
     */
    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    /**
     * Public
     */
    show() {
        this.$el.style.width = `${this._customWidth}px`;
        if (this._height) {
            this.$el.style.height = `${this._height}px`;
        } else {
            this.$el.style.height = '100%';
        }
    }

    hide() {
        this._customWidth = this.$el.offsetWidth;
        this.$el.style.width = 'auto';
        this.$el.style.height = 'auto';
    }

    addElement(element) {
        this.$refs.content.appendChild(element);
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

    /**
     * Resize
     */
    onResize() {
        this._width = this._customWidth ? this._customWidth : this.$el.offsetWidth;
        this._height = this._customHeight ? this._customHeight : window.innerHeight;
        this.$root.layout?.resize();
    }

    _setDimensions(x, y) {
        if (this._axis.x) {
            this._customWidth = window.innerWidth - x;
            this.$el.style.width = `${this._customWidth}px`;
        }

        if (this._axis.y) {
            this._customHeight = y;
            this.$el.style.height = `${this._customHeight}px`;
        }

        this.onResize();
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
            this._setDimensions(e.clientX, e.clientY);
        }
    }
}

window.customElements.define('dddd-container', Container);
