import DDDD from 'dddd';

export default {
    intro: {
        title: 'Buttons',
        anchor: 'buttons',
        description: 'Use .addButton to add a ...!',
    },
    api: [
        {
            property: 'fullWidth',
            type: 'Boolean',
            default: 'false',
            description: 'This will make the button the full width of DDDD.',
        },
        {
            property: 'onClick',
            type: 'Callback',
            default: 'undefined',
            description: 'Callback that is triggered when the button is clicked',
        },
    ],
    example: {
        code: `
const dddd = new DDDD();

const button = dddd.addGroup('Button');
button.addButton('Button', {
    onClick: () => {
        console.log('click');
    },
});
button.addButton('Button - Full width', {
    fullWidth: true,
    onClick: () => {
        console.log('click');
    },
});
        `,
        dddd: function(element) {
            const dddd = new DDDD({
                wrapper: element,
            });

            const button = dddd.addGroup('Buttons');
            button.addButton('Button', {
                onClick: () => {
                    console.log('click');
                },
            });
            button.addButton('Button - Full width', {
                fullWidth: true,
                onClick: () => {
                    console.log('click');
                },
            });
        },
    },
};
