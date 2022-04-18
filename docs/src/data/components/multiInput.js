import DDDD from 'dddd';
import { Euler, Vector3 } from 'three';

export default {
    intro: {
        title: 'MultiInput',
        anchor: 'multi-input',
        description: 'If an object has multiple properties with numbers this one is created. It also works with a Vectors and Euler from Three.js.',
    },
    api: {
        properties: [
            {
                property: 'stepSize',
                type: 'Number',
                default: '0.01',
                description: 'The step size when dragging the number',
            },
            {
                property: 'label',
                type: 'String',
                default: 'undefined',
                description: 'Define a custom label',
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
    xyz: { x: 0, y: 0, z: 0 },
    stepSize: { x: 0, y: 0, z: 0 },
    vector: new Vector3(),
    euler: new Euler(),
};

const dddd = new DDDD();

const group = dddd.addGroup('MultiInputs');
group.add(data, 'xyz');
group.add(data, 'stepSize', { stepSize: 1 });
group.add(data, 'vector');
group.add(data, 'euler');
        `,
        dddd: function(element) {
            const data = {
                xyz: { x: 0, y: 0, z: 0 },
                stepSize: { x: 0, y: 0, z: 0 },
                vector: new Vector3(),
                euler: new Euler(),
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('MultiInputs');
            group.add(data, 'xyz');
            group.add(data, 'vector');
            group.add(data, 'euler');
            group.add(data, 'stepSize', { stepSize: 1 });
        },
    },
};
