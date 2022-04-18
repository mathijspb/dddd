import DDDD from 'dddd';
import { Color } from 'three';

export default {
    intro: {
        title: 'Colors',
        anchor: 'colors',
        description: 'The color component is created when the value is hexadecimal, an instance of Three.js Color module or when the type \'color\' is defined.',
    },
    api: {
        properties: [
            {
                property: 'label',
                type: 'String',
                default: 'undefined',
                description: 'Define a custom label',
            },
            {
                property: 'type',
                type: 'String',
                default: 'undefined',
                description: 'Force the color component',
            },
            {
                property: 'onChange',
                type: 'Callback',
                default: 'undefined',
                description: 'Callback that is triggered when the value changes',
            },
        ],
    },
    example: {
        code: `
const data = {
    three: new Color(0xff0000),
    hex: '#00ff00',
    name: 'blue',
};

const dddd = new DDDD();

const group = dddd.addGroup('Colors');
group.add(data, 'three');
group.add(data, 'hex');
group.add(data, 'name', { type: 'color' });
        `,
        dddd: function(element) {
            const data = {
                three: new Color(0xff0000),
                hex: '#00ff00',
                name: 'blue',
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('Colors');
            group.add(data, 'three');
            group.add(data, 'hex');
            group.add(data, 'name', { type: 'color' });
        },
    },
};
