import DDDD from 'dddd';

export default {
    intro: {
        title: 'Layers',
        anchor: 'layers',
        description: 'Create a layer the can group components for example per page',
    },
    parameters: [
        {
            property: 'name',
            type: 'String',
            default: 'undefined',
            description: 'The name of the layer',
        },
        {
            property: 'group',
            type: 'String',
            default: 'undefined',
            description: 'Optional group of the layer',
        },
    ],
    example: {
        code: `
const data = {
    value: 0.5,
};

const dddd = new DDDD();

dddd.addLayer('Layer #1');
const groupLayer1 = dddd.addGroup('Group', { container: 'Layer #1' });
groupLayer1.add(data, 'value');

dddd.addLayer('Layer #2');
const groupLayer2 = dddd.addGroup('Group', { container: 'Layer #2' });
groupLayer2.add(data, 'value');

dddd.addLayer('Layer #3', 'Group');
const groupLayer3 = dddd.addGroup('Group', { container: 'Layer #3' });
groupLayer3.add(data, 'value');

dddd.addLayer('Layer #4', 'Group');
const groupLayer4 = dddd.addGroup('Group', { container: 'Layer #4' });
groupLayer4.add(data, 'value');
        `,
        dddd: function(element) {
            const data = {
                value: 0.5,
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            dddd.addLayer('Layer #1');
            dddd.addLayer('Layer #2');
            dddd.addLayer('Layer #3', 'Group');
            dddd.addLayer('Layer #4', 'Group');

            const groupLayer1 = dddd.addGroup('Group', { container: 'Layer #1' });
            groupLayer1.add(data, 'value');

            const groupLayer2 = dddd.addGroup('Group', { container: 'Layer #2' });
            groupLayer2.add(data, 'value');

            const groupLayer3 = dddd.addGroup('Group', { container: 'Layer #3' });
            groupLayer3.add(data, 'value');

            const groupLayer4 = dddd.addGroup('Group', { container: 'Layer #4' });
            groupLayer4.add(data, 'value');
        },
    },
};
