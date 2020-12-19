import Layout from './Layout';
import Components from './Components';

// Components
import Slider from './components/Slider';
import Input from './components/Input';

export default class dddd {
    constructor() {
        this._layout = new Layout();
        this._components = new Components({
            layout: this._layout,
        });
        // this._registerComponents();
    }

    /**
     * Public
     */
    add(object, property, options) {
        this._components.create(object, property, options);
    }

    createLayer(label) {
        this._layout.createLayer(label);
    }

    /**
     * Private
     */
    // _registerComponents() {
    //     this._components.register(Input);
    // }
}

export { Input, Slider };
