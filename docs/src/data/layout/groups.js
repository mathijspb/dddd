import DDDD from 'dddd';

export default {
    intro: {
        title: 'Groups',
        anchor: 'group',
        description: 'You can add a group directly to the \'dddd\' instance or specify to which container you want to add it to.',
    },
    api: {
        parameters: [
            {
                property: 'name',
                type: 'String',
                default: 'undefined',
                description: 'The name of the group',
            },
        ],
        properties: [
            {
                property: 'container',
                type: 'String',
                default: 'undefined',
                description: 'Name of the layer or group you want to add it to',
            },
        ],
    },
    example: {
        code: `
const data = {
    value: 0.5,
};

const dddd = new DDDD();

const group = dddd.addGroup('Group');

const subgroup = group.addGroup('Subgroup');
subgroup.add(data, 'value');

const subsubgroup = subgroup.addGroup('Subsubgroup');
subsubgroup.add(data, 'value');

group.addButton('Remove subsubgroup', {
    fullWidth: true,
    onClick: () => {
        subsubgroup.remove();
    },
});
        `,
        dddd: function(element) {
            const data = {
                value: 0.5,
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('Group');

            const subgroup = group.addGroup('Subgroup');
            subgroup.add(data, 'value');

            const subsubgroup = subgroup.addGroup('Subsubgroup');
            subsubgroup.add(data, 'value');

            group.addButton('Remove subsubgroup', {
                fullWidth: true,
                onClick: () => {
                    subsubgroup.remove();
                },
            });
        },
    },
};
