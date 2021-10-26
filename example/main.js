import { Color, Texture, Object3D, Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import DDDD from '../src/DDDD';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();

const dddd = new DDDD({
    minimized: false,
    onLayerChange: (label) => {
        console.log('change layer', label);
    },
});

window.dddd = dddd;

/**
 * Layers
 */
dddd.addLayer('Layer #1');
dddd.addLayer('Layer #2');

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
 * Color in Layer #2
 */
const color2 = dddd.addGroup('Color', {
    container: 'Layer #2',
});

const colorValues2 = {
    hex: '#00ff00',
    name: 'blue',
};

color2.add(colorValues2, 'hex');

const color2Subgroup = color2.addGroup('Subcolor');
color2Subgroup.add(colorValues, 'name', { type: 'color' });

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
    stepSize: 0.5,
    min: 0.5,
    max: 0.5,
};

number.add(numberValues, 'infinite');
number.add(numberValues, 'stepSize', { stepSize: 0.5 });
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
    stepSize: { x: 0, y: 0, z: 0 },
};

multiInput.add(multiInputValues, 'xyz');
multiInput.add(multiInputValues, 'stepSize', { stepSize: 1 });
multiInput.add(cube, 'position', { label: 'position' });
multiInput.add(cube, 'rotation', { label: 'rotation' });

/**
 * Dropdown
 */
const dropdown = dddd.addGroup('Dropdown', {
    container: 'Layer #1',
});

const dropdownValues = {
    array: 'Options #3',
    object: 'Option #4',
};

dropdown.add(dropdownValues, 'array', {
    options: [
        'Options #1',
        'Options #2',
        'Options #3',
        'Options #4',
        'Options #5',
    ],
});

dropdown.add(dropdownValues, 'object', {
    options: {
        Option1: 'Option #1',
        Option2: 'Option #2',
        Option3: 'Option #3',
        Option4: 'Option #4',
        Option5: 'Option #5',
    },
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
    contain: './image.png',
    three: new Texture(),
};

image.add(imageValues, 'image');
image.add(imageValues, 'contain', { contain: true });
image.add(imageValues, 'three');

/**
 * Canvas
 */
const canvas = dddd.addGroup('Canvas', {
    container: 'Layer #1',
});

const canvasExample = document.createElement('canvas');
canvasExample.width = 100;
canvasExample.height = 100;
const debugContext = canvasExample.getContext('2d');
debugContext.fillStyle = 'red';
debugContext.fillRect(0, 0, canvasExample.width, canvasExample.height);

canvas.addCanvas({
    label: 'canvas',
    canvas: canvasExample,
});

/**
 * Group
 */
const group = dddd.addGroup('Group', {
    container: 'Layer #1',
});

const groupValues = {
    value: 0.5,
};

const subgroup = group.addGroup('Subgroup');
subgroup.add(groupValues, 'value');
subgroup.add(groupValues, 'value');
subgroup.add(groupValues, 'value');

const subsubgroup = subgroup.addGroup('Subsubgroup');
subsubgroup.add(groupValues, 'value');
subsubgroup.add(groupValues, 'value');
subsubgroup.add(groupValues, 'value');

group.addButton('Remove subgroup', {
    fullWidth: true,
    onClick: () => {
        group.remove();
    },
});

/**
 * Global
 */
const globalValues = {
    value: 0.5,
};

const global = dddd.addGroup('Global group', {
    container: 'Global',
});
global.add(globalValues, 'value');
