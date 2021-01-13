import Layout from './Layout';
import Components from './Components';

// Components
import Slider from './components/Slider';
import Input from './components/Input';
import Image from './components/Image';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
// import Button from './components/Button';

export default class dddd {
    constructor() {
        this._layout = new Layout();
        this._components = new Components({
            layout: this._layout,
        });
    }

    /**
     * Public
     */
    add(object, property, options) {
        this._components.create(object, property, options);
    }

    addButton(options) {
        // this._components
    }

    createLayer(label) {
        this._layout.createLayer(label);
    }
}

export { Input, Slider, Image, Dropdown, Checkbox };