// Base class
import Layout from '../../../baseClasses/Layout';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Constants
const ACTIVE_CLASS = 'active';
const GROUP_MIN_WIDTH = 250;

export default class Layer extends Layout {
    constructor({ root, model }) {
        super({ root, style, template, templateData: { label: model.label } });

        // Props
        this._model = model;

        // Data
        this._containerWidth = 0;
        this._itemWidth = 0;
        this._columnsHeight = [];

        // Setup
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */
    get label() {
        return this._model.label;
    }

    get model() {
        return this._model;
    }

    /**
     * Public
     */
    addElement(element) {
        this.element.appendChild(element);
    }

    addGroup(label) {
        return this.$root.addGroup(label, {
            parent: this,
        });
    }

    activate() {
        this.$el.classList.add(ACTIVE_CLASS);
    }

    deactivate() {
        this.$el.classList.remove(ACTIVE_CLASS);
    }

    resize() {
        this._resize();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._resizeHandler = this._resizeHandler.bind(this);
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
    }

    _removeEventListeners() {
        window.removeEventListener('resize', this._resizeHandler);
    }

    /**
     * Resize
     */
    _resize() {
        if (this.$el.children.length === 0) return;
        this._containerWidth = this.$el.offsetWidth;
        this._columnCount = this._getColumCount();
        this._itemGap = this._getItemGap();
        this._itemWidth = this._getItemWidth();
        this._resetColumnHeight();
        if (!this.$root.isLayoutSidebar()) {
            this._positionGroups();
            this._updateHeight();
        }
    }

    _getColumCount() {
        return Math.max(Math.floor(this._containerWidth / GROUP_MIN_WIDTH), 1);
    }

    _getItemWidth() {
        const gap = this._itemGap * (this._columnCount - 1);
        const width = Math.floor((this._containerWidth - gap) / this._columnCount);
        return width;
    }

    _getItemGap() {
        const element = this.$el.children[0].element;
        const computedStyles = window.getComputedStyle(element);
        const gap = parseInt(computedStyles.marginRight);
        return gap;
    }

    _getItemHeight(element) {
        const computedStyles = window.getComputedStyle(element);
        let height = element.offsetHeight;
        height += parseInt(computedStyles.marginBottom);
        return height;
    }

    _resetColumnHeight() {
        this._columnsHeight = [];
        for (let i = 0; i < this._columnCount; i++) {
            this._columnsHeight.push(0);
        }
    }

    _positionGroups() {
        for (const item of this.$el.children) {
            const columnIndex = this._getNexColumnIndex();
            const gap = (columnIndex < this._columnCount ? this._itemGap : 0) * columnIndex;
            const x = columnIndex * this._itemWidth + gap;
            const y = this._columnsHeight[columnIndex];
            const height = this._getItemHeight(item.element);
            this._columnsHeight[columnIndex] += height;
            item.element.style.position = 'absolute';
            item.element.style.transform = `translate(${x}px, ${y}px)`;
            item.element.style.width = `${this._itemWidth}px`;
        }
    }

    _getNexColumnIndex() {
        const column = this._columnsHeight
            .slice(0)
            .sort((a, b) => a - b)
            .shift();
        const index = this._columnsHeight.indexOf(column);
        return index;
    }

    _updateHeight() {
        const height = Math.max(...this._columnsHeight);
        this.$el.style.height = `${height}px`;
    }

    /**
     * Handlers
     */
    _resizeHandler() {
        this._resize();
    }
}

window.customElements.define('dddd-layer', Layer);
