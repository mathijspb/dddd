// Based on
// https://github.com/mrdoob/stats.js/

// Base class
import LayoutElement from '../../LayoutElement';

// Utils
import Ticker from '../../utils/Ticker';

// Style
import style from './style.css';

// Template
import template from './template.html';

export default class Stats extends LayoutElement {
    constructor({ root, options }) {
        super({ root, style, template });

        // Props
        this._options = options;

        // Setup
        this._beginTime = window.performance.now();
        this._previousTime = this._beginTime;
        this._fps = 0;
        this._frames = 0;
        this._context = this._getContext();
        this._bindHandlers();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Getters & Setters
     */

    /**
     * Public
     */
    begin() {
        this._beginTime = window.performance.now();
    }

    end() {
        this._update();
        this._draw();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._tickHandler = this._tickHandler.bind(this);
    }

    _setupEventListeners() {
        Ticker.add(this._tickHandler);
    }

    _removeEventListeners() {
        Ticker.remove(this._tickHandler);
    }

    _getContext() {
        return this.$refs.canvas.getContext('2d');
    }

    _update() {
        const time = window.performance.now();
        // const diff = time - this._beginTime;

        this._frames++;

        if (time >= this._previousTime + 1000) {
            this._fps = (this._frames * 1000) / (time - this._previousTime);
            this._previousTime = time;
            this._frames = 0;
            this._drawFps();
        }
    }

    _draw() {

    }

    _drawFps() {
        const height = 50;
        this._context.translate(1, 0);
        this._context.fillRect(0, height, 1, -height * this._fps / 60);
    }

    /**
     * Handlers
     */
    _tickHandler() {
        // this._update();
        // this._draw();
    }
}

window.customElements.define('dddd-stats', Stats);
