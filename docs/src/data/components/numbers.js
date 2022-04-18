import DDDD from 'dddd';

export default {
    intro: {
        title: 'Numbers',
        anchor: 'numbers',
        description: 'When the value is a number this component is created. Keep in mind that when both \'min\' and \'max\' properties are defined it will turn into a slider.',
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
    _infinite: 0.5,
    stepSize: 0.5,
    min: 0.5,
    max: 0.5,
    uProgress: { value: 0.1 },
};

const dddd = new DDDD();

const group = dddd.addGroup('Numbers');
group.add(data, '_infinite');
group.add(data, 'stepSize', { stepSize: 0.5 });
group.add(data, 'min', { min: 0 });
group.add(data, 'max', { max: 1 });
group.add(data, 'uProgress');
        `,
        dddd: function(element) {
            const data = {
                _infinite: 0.5,
                stepSize: 0.5,
                min: 0.5,
                max: 0.5,
                uProgress: { value: 0.1 },
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('Numbers');
            group.add(data, '_infinite');
            group.add(data, 'stepSize', { stepSize: 0.5 });
            group.add(data, 'min', { min: 0 });
            group.add(data, 'max', { max: 1 });
            group.add(data, 'uProgress');
        },
    },
};
