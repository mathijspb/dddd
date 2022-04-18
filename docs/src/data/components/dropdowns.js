import DDDD from 'dddd';

export default {
    intro: {
        title: 'Dropdowns',
        anchor: 'dropdowns',
        description: 'When some options are defined it will turn into a dropdown!',
    },
    api: [
        {
            property: 'options',
            type: 'Array | Object',
            default: 'undefined',
            description: 'Options for the dropdown',
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
    example: {
        code: `
const data = {
    array: 'Options #3',
    object: 'Option #4',
};

const dddd = new DDDD();

const dropdown = dddd.addGroup('Dropdown');
dropdown.add(data, 'array', {
    options: [
        'Options #1',
        'Options #2',
        'Options #3',
        'Options #4',
        'Options #5',
    ],
});
dropdown.add(data, 'object', {
    options: {
        Option1: 'Option #1',
        Option2: 'Option #2',
        Option3: 'Option #3',
        Option4: 'Option #4',
        Option5: 'Option #5',
    },
});
        `,
        dddd: function(element) {
            const data = {
                array: 'Options #3',
                object: 'Option #4',
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const dropdown = dddd.addGroup('Dropdowns');
            dropdown.add(data, 'array', {
                options: [
                    'Options #1',
                    'Options #2',
                    'Options #3',
                    'Options #4',
                    'Options #5',
                ],
            });
            dropdown.add(data, 'object', {
                options: {
                    Option1: 'Option #1',
                    Option2: 'Option #2',
                    Option3: 'Option #3',
                    Option4: 'Option #4',
                    Option5: 'Option #5',
                },
            });
        },
    },
};
