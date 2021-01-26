// Vendor
import Mustache from 'mustache';

import style from './style.css';
import template from './template.html';

// Constants
const ACTIVE_CLASS = 'active';
const GROUP_MIN_WIDTH = 350;

export default class Layer extends HTMLElement {
    constructor({ label }) {
        super();

        // Props
        this._label = label;

        // Attach
        this.attachShadow({ mode: 'open' });

        // Data
        this._containerWidth = 0;
        this._itemWidth = 0;
        this._columnsHeight = [];

        // Setup
        this._element = this._addTemplate(template);
        this._addStyle(style);
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroy() {
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */
    get element() {
        return this._element;
    }

    get label() {
        return this._label;
    }

    /**
     * Public
     */
    activate() {
        this._element.classList.add(ACTIVE_CLASS);
    }

    deactivate() {
        this._element.classList.remove(ACTIVE_CLASS);
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
    
    _addTemplate(template) {
        // TODO: Refactor
        const render = Mustache.render(template);
        this.shadowRoot.innerHTML = render;
        return this.shadowRoot.firstChild;
    }

    _addStyle(style) {
        const element = document.createElement('style');
        const node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
    }

    /**
     * Resize
     */
    _resize() {
        if (this._element.children.length === 0 ) return;
        this._containerWidth = this._element.offsetWidth;
        this._columnCount = this._getColumCount();
        this._itemWidth = this._getItemWidth();
        this._itemGap = this._getItemGap();
        this._resetColumnHeight();
        this._positionGroups();
        this._updateHeight();
    }

    _getColumCount() {
        return Math.floor(this._containerWidth / GROUP_MIN_WIDTH);
    }

    _getItemWidth() {
        const gap = this._itemGap * (this._columnCount - 1);
        const width = Math.floor((this._containerWidth - gap) / this._columnCount);
        return width;
    }

    _getItemGap() {
        const element = this._element.children[0].element;
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
        const columnCount = Math.floor(this._containerWidth / this._itemWidth);
        for (let i = 0; i < columnCount; i++) {
            this._columnsHeight.push(0);
        }
    }

    _positionGroups() {
        for (const item of this._element.children) {
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
        this._element.style.height = `${height}px`;
    }

    /**
     * Handlers
     */
    _resizeHandler() {
        this._resize();
    }
}

window.customElements.define('dddd-layer', Layer);
