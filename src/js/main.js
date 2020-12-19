import Dddd, { Input, Slider } from './dddd';

class Main {
    constructor() {
        const settings = {
            slider: 0.5,
            input: 'test',
            input2: 'test2',
        };

        const dddd = new Dddd();

        dddd.createLayer('Layer #1');
        dddd.createLayer('Layer #2');
        dddd.createLayer('Layer #3');

        // dddd.add(settings, 'slider', {
        //     container: 'Layer #1',
        //     type: 'slider',
        //     min: 0,
        //     max: 1,
        //     step: 0.1,
        // });

        const output = document.querySelector('.output');

        dddd.add(settings, 'input', {
            container: 'Layer #1',
            type: Input,
            label: 'input',
            onChange: (value) => {
                output.prepend(document.createElement('br'));
                output.prepend(document.createTextNode(value));
            },
        });

        dddd.add(settings, 'slider', {
            container: 'Layer #1',
            type: Slider,
            onChange: (value) => {
                output.prepend(document.createElement('br'));
                output.prepend(document.createTextNode(value));
            },
        });
    }

    destroy() {}
}

new Main();
