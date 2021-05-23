import { Color, Texture } from 'three';
import DDDD from '../src/DDDD';

const dddd = new DDDD({
    onLayerChange: (label) => {
        console.log('change layer', label);
    },
});

/**
 * Layer
 */
dddd.addLayer('Layer #1');

/**
 * Color
 */
const color = dddd.addGroup('Color', {
    container: 'Layer #1',
});

const colorValues = {
    three: new Color(0xff0000),
    hex: '#00ff00',
    name: 'blue',
};

color.add(colorValues, 'three');
color.add(colorValues, 'hex');
color.add(colorValues, 'name', { type: 'color' });

/**
 * Slider
 */
const slider = dddd.addGroup('Slider', {
    container: 'Layer #1',
});

const sliderValues = {
    fixed: 0.5,
};

slider.add(sliderValues, 'fixed', { min: 0, max: 1 });

/**
 * Number
 */
const number = dddd.addGroup('Number', {
    container: 'Layer #1',
});

const numberValues = {
    infinite: 0.5,
    min: 0.5,
    max: 0.5,
};

number.add(numberValues, 'infinite');
number.add(numberValues, 'min', { min: 0 });
number.add(numberValues, 'max', { max: 1 });

/**
 * MultiInput
 */
const multiInput = dddd.addGroup('MultiInput', {
    container: 'Layer #1',
});

const multiInputValues = {
    xyz: { x: 0, y: 0, z: 0 },
};

multiInput.add(multiInputValues, 'xyz');

/**
 * Dropdown
 */
const dropdown = dddd.addGroup('Dropdown', {
    container: 'Layer #1',
});

const dropdownValues = {
    default: 'Options #3',
};

dropdown.add(dropdownValues, 'default', {
    options: [
        'Options #1',
        'Options #2',
        'Options #3',
        'Options #4',
        'Options #5',
    ],
});

/**
 * Button
 */
const button = dddd.addGroup('Button', {
    container: 'Layer #1',
});

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

/**
 * Image
 */
const image = dddd.addGroup('Image', {
    container: 'Layer #1',
});

const imageValues = {
    image: './image.png',
    three: new Texture(),
};

image.add(imageValues, 'image');
image.add(imageValues, 'three');

/**
 * Canvas
 */
const canvas = dddd.addGroup('Canvas', {
    container: 'Layer #1',
});

const canvasExample = document.createElement('canvas');
const debugContext = canvasExample.getContext('2d');
debugContext.fillStyle = 'red';
debugContext.fillRect(0, 0, 100, 100);

canvas.addCanvas({
    label: 'canvas',
    canvas: canvasExample,
});
