import DDDD from 'dddd';

export default {
    intro: {
        title: 'Checkboxes',
        anchor: 'checkboxes',
        description: 'A simple checkbox that is created when the value is a boolean',
    },
    api: [
        {
            property: 'onChange',
            type: 'Callback',
            default: 'undefined',
            description: 'Callback that is triggered when the value changes',
        },
    ],
    example: {
        code: `
const data = {
    boolean: true,
};

const dddd = new DDDD();

const group = dddd.addGroup('Checkboxes');
group.add(data, 'boolean');
        `,
        dddd: function(element) {
            const data = {
                boolean: true,
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('Checkboxes');
            group.add(data, 'boolean');
        },
    },
};
