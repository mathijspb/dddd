// Vendor
import scopeCss from 'scope-css';

class Styles {
    constructor() {
        this._element = this._createElement();
    }

    /**
     * Public
     */
    add(styles) {
        this._element.appendChild(document.createTextNode(styles));
    }

    addScoped(id, styles) {
        const scopedStyles = scopeCss(styles, `[data-scope="${id}"]`);
        this._element.appendChild(document.createTextNode(scopedStyles));
    }

    /**
     * Private
     */
    _createElement() {
        const element = document.createElement('style');
        element.type = 'text/css';
        document.head.appendChild(element);
        return element;
    }
}

export default new Styles();
