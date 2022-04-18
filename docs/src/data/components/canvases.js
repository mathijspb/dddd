import DDDD from 'dddd';

export default {
    intro: {
        title: 'Canvases',
        anchor: 'canvases',
        description: '',
    },
    api: {
        properties: [
            {
                property: 'label',
                type: 'String',
                default: 'undefined',
                description: 'Defines a label',
            },
            {
                property: 'canvas',
                type: 'CanvasRenderingContext2D',
                default: 'undefined',
                description: 'The canvas',
            },
        ],
    },
    example: {
        code: `
const canvasElement = document.createElement('canvas');
canvasElement.width = 100;
canvasElement.height = 100;

const context = canvasElement.getContext('2d');
context.fillStyle = 'red';
context.fillRect(0, 0, canvasElement.width, canvasElement.height);

const dddd = new DDDD();

const canvas = dddd.addGroup('Canvas');
canvas.addCanvas({
    label: 'canvas',
    canvas: canvasElement,
});
        `,
        dddd: function(element) {
            const canvasElement = document.createElement('canvas');
            canvasElement.width = 100;
            canvasElement.height = 100;

            const context = canvasElement.getContext('2d');
            context.fillStyle = 'red';
            context.fillRect(0, 0, canvasElement.width, canvasElement.height);

            const dddd = new DDDD({
                wrapper: element,
            });

            const canvas = dddd.addGroup('Canvas');
            canvas.addCanvas({
                label: 'canvas',
                canvas: canvasElement,
            });
        },
    },
};
