import DDDD from 'dddd';
import { Texture } from 'three';

import image from '../../assets/image.png';

export default {
    intro: {
        title: 'Images',
        anchor: 'images',
        description: 'Shows an image when the value has one of the following extensions gif|jpe?g|tiff?|png|webp|bmp. You can click on the image to change it or drag a file on top of it.',
    },
    api: {
        properties: [
            {
                property: 'contain',
                type: 'Boolean',
                default: 'false',
                description: 'Contains the image within the input box',
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
    image: './image.png',
    contain: './image.png',
    three: new Texture(),
};

const dddd = new DDDD();

const group = dddd.addGroup('Images');
group.add(data, 'image');
group.add(data, 'contain', { contain: true });
group.add(data, 'three', {
    onChange: () => {
        console.log('three image changed');
    },
});
        `,
        dddd: function(element) {
            const data = {
                image: image,
                contain: image,
                three: new Texture(),
            };

            const dddd = new DDDD({
                wrapper: element,
            });

            const group = dddd.addGroup('Images');
            group.add(data, 'image');
            group.add(data, 'contain', { contain: true });
            group.add(data, 'three', {
                onChange: () => {
                    console.log('three image changed');
                },
            });
        },
    },
};
