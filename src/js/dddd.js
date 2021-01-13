import Layout from './Layout';
import Components from './Components';

// Components
import Slider from './components/Slider';
import Text from './components/Text';
import Image from './components/Image';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
import Button from './components/Button';

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
        options.type = Button;
        this._components.create(null, null, options);
    }

    createLayer(label) {
        this._layout.createLayer(label);
    }
}

export { Text, Slider, Image, Dropdown, Checkbox, Button };
