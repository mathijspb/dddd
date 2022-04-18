import DDDD from 'dddd';

export default {
    intro: {
        title: 'Sliders',
        anchor: 'sliders',
        description: 'A slider is created when a minimum and maximum value is defined \'color\' is defined.',
    },
    api: {
        properties: [
            {
                property: 'min',
                type: 'Number',
                default: 'undefined',
                description: 'Minimum value',
            },
            {
                property: 'max',
                type: 'Number',
                default: 'undefined',
                description: 'Maxiumum value',
            },
            {
                property: 'stepSize',
                type: 'Number',
                default: '0.01',
                description: 'The step size when dragging the slider',
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
    fixed: 0.5,
    stepSize: 0.5,
    uProgress: { value: 0.1 },
};

const dddd = new DDDD();

const group = dddd.addGroup('Sliders');
group.add(data, 'fixed', { min: 0, max: 1 });
group.add(data, 'stepSize', { min: 0, max: 1, stepSize: 0.001 });
group.add(data, 'uProgress', { min: 0, max: 1 });
        `,
        dddd: function(element) {
            const data = {
                fixed: 0.5,
                stepSize: 0.5,
                uProgress: { value: 0.1 },
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('Sliders');
            group.add(data, 'fixed', { min: 0, max: 1 });
            group.add(data, 'stepSize', { min: 0, max: 1, stepSize: 0.001 });
            group.add(data, 'uProgress', { min: 0, max: 1 });
        },
    },
};
