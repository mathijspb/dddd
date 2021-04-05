class Ticker {
    constructor() {
        this._callbacks = [];
        this._tick = this._tick.bind(this);
        this._start();
    }

    destroy() {
        this._stop();
    }

    /**
     * Public
     */
    add(callback) {
        this._callbacks.push(callback);
    }

    remove(callback) {
        this._callbacks.splice(this._callbacks.indexOf(callback), 1);
    }

    /**
     * Private
     */
    _start() {
        this._requestAnimationFrame = window.requestAnimationFrame(this._tick);
    }

    _stop() {
        window.cancelAnimationFrame(this._requestAnimationFrame);
    }

    _tick() {
        window.requestAnimationFrame(this._tick);
        this._triggerCallbacks();
    }

    _triggerCallbacks() {
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
            this._callbacks[i]();
        }
    }
}

export default new Ticker();
