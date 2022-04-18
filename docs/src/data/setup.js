// import DDDD from 'dddd';

export default {
    intro: {
        title: 'DDDD',
        anchor: 'dddd',
        description: '',
    },
    api: {
        properties: [
            {
                property: 'wrapper',
                type: 'HTMLElement',
                default: 'undefined',
                description: 'Custom element where DDDD will get added to, by default it will be append to the body',
            },
            {
                property: 'minimized',
                type: 'Boolean',
                default: 'false',
                description: 'Minimizes DDDD on startup',
            },
            {
                property: 'collapseGroups',
                type: 'Boolean',
                default: 'false',
                description: 'Collapses groups on startup. This can help performance in a big project with a lot of components',
            },
        ],
    },
    example: {
        code: `
const dddd = new DDDD();

const dddd = new DDDD({
    wrapper: element,
    minimized: false,
    collapseGroups: false,
});
        `,
        dddd: function(element) {
            // const dddd = new DDDD({
            //     wrapper: element,
            //     minimized: false,
            //     collapseGroups: false,
            // });
        },
    },
};
