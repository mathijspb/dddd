import Component from '../../Component';

import style from './style.cssx';
import template from './template.html';

export default class Input extends Component {
    constructor({ object, property, options }) {
        super({ style, template, object, property, options });

        // const proxy = new Proxy(object, {
        //     set(object, property, value) {
        //         console.log(value);

        //         object[property] = value;
        //         return true;
        //     },
        // });

        // proxy.input = 'kk';

        const input = this.shadowRoot.querySelector('input');
        input.value = object[property];

        input.addEventListener('keyup', () => {
            object[property] = input.value;

            if (typeof options.onChange === 'function') {
                options.onChange(input.value);
            }
        });
    }
}

window.customElements.define('dddd-input', Input);
