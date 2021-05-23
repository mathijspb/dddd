import { Color, Euler, Texture } from 'three';
import DDDD from '../src/DDDD';

const width = 500;
const height = 500;

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = width;
canvas.height = height;

const context = canvas.getContext('2d');

const textureImage = new Image();

/**
 * Colors
 * new Color()
 * #ff00000
 * rgb(255, 255, 255)
 */

const settings = {
    text: 'test',
    font: 'Verdana',
    fontSize: 48,
    color: new Color(0xff0000),
    texture: new Texture(),
    capitals: false,
    rotation: new Euler(),
    image: '',
    position: {
        x: 20,
        y: 50,
    },
    time: 0,
};

window.settings = settings;

let imageElement = null;

const dddd = new DDDD({
    onLayerChange: (label) => {
        console.log('change layer', label);
    },
});

function update() {
    window.requestAnimationFrame(update);

    // dddd.stats.begin();

    context.clearRect(0, 0, width, height);

    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);

    if (imageElement) {
        context.drawImage(imageElement, 0, 0, width, height);
    }

    context.font = `${settings.fontSize}px ${settings.font}`;
    context.fillStyle = settings.color;

    const text = settings.capitals ? settings.text.toUpperCase() : settings.text;
    context.fillText(text, settings.position.x, settings.position.y);

    // settings.time += 0.01;

    // settings.fontSize = 30 + (70 * ((1 + Math.sin(settings.time)) / 2));

    // settings.position.x += 0.01;
    // settings.position.y += 0.01;

    // if (Math.random() > 0.95) {
    //     settings.capitals = !settings.capitals;

    //     const options = [
    //         'Arial',
    //         'Verdana',
    //         'Times New Roman',
    //     ];

    //     const option = options[Math.floor(options.length * Math.random())];
    //     settings.font = option;
    // }

    // dddd.stats.end();
}
window.requestAnimationFrame(update);

function loadImage(url) {
    const image = new Image();
    image.src = url;
    imageElement = image;
}
// loadImage(settings.image);

window.dddd = dddd;

dddd.addLayer('Layer #1');
const layer2 = dddd.addLayer('Layer #2');

const shape1 = dddd.addGroup('Shape #1', {
    container: 'Layer #1',
});

shape1.add(settings, 'time');
dddd.add(settings, 'fontSize', {
    container: 'Shape #1',
    min: 30,
    max: 100,
});

dddd.add(settings, 'position', {
    container: 'Shape #1',
    stepSize: 1,
});

const subgroup = shape1.addGroup('Subgroup');
subgroup.add(settings, 'text');
subgroup.add(settings, 'font', {
    container: 'Shape #1',
    options: [
        'Arial',
        'Verdana',
        'Times New Roman',
    ],
});

const subgroup2 = subgroup.addGroup('Subgroup2');
subgroup2.add(settings, 'fontSize', {
    container: 'Shape #1',
    min: 30,
    max: 100,
});

const shape2 = dddd.addGroup('Shape #2', {
    container: 'Layer #1',
});

const subgroup3 = shape1.addGroup('Subgroup3');
subgroup3.add(settings, 'color', {
    container: 'Shape #1',
    onChange: () => {
        console.log(settings.color);
    },
});
subgroup3.add(settings, 'capitals', {
    container: 'Shape #1',
});

dddd.add(settings, 'image', {
    type: 'image',
    container: 'Shape #1',
    onChange() {
        loadImage(settings.image);
    },
});
dddd.addButton({
    container: 'Shape #1',
    label: 'Remove group',
    onClick: () => {
        dddd.removeGroup('Subgroup3');
    },
});
dddd.addButton({
    container: 'Shape #1',
    label: 'Add group',
    onClick: () => {
        const sub = shape1.addGroup('Subgroup3');
        sub.add(settings, 'capitals', {
            container: 'Shape #1',
        });
    },
});
dddd.add(settings, 'rotation', {
    container: 'Shape #1',
});

const debugCanvas = document.createElement('canvas');
const debugContext = debugCanvas.getContext('2d');
debugContext.fillStyle = 'red';
debugContext.fillRect(0, 0, 100, 100);

dddd.addCanvas({
    label: 'canvas',
    canvas: debugCanvas,
    container: 'Shape #1',
});

dddd.add(settings, 'texture', {
    label: 'canvas',
    container: 'Shape #1',
});

dddd.showStats();

/**
 * Colors
 */
const colorValues = {
    three: new Color(0xff0000),
    hex: '#00ff00',
    name: 'blue',
};

const colors = dddd.addGroup('Colors', {
    container: 'Layer #1',
});

colors.add(colorValues, 'three');
colors.add(colorValues, 'hex');
colors.add(colorValues, 'name', { type: 'color' });

/**
 * Sliders
 */
const sliderValues = {
    fixed: 0.5,
    infinite: 0.5,
    min: 0.5,
    max: 0.5,
};

const sliders = dddd.addGroup('Sliders', {
    container: 'Layer #1',
});

sliders.add(sliderValues, 'fixed', { min: 0, max: 1 });
sliders.add(sliderValues, 'infinite');
sliders.add(sliderValues, 'min', { min: 0 });
sliders.add(sliderValues, 'max', { max: 1 });
