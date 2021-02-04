import DDDD from '../src/DDDD';

const width = 500;
const height = 500;

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = width;
canvas.height = height;

const context = canvas.getContext('2d');

const settings = {
    text: 'test',
    font: 'Arial',
    fontSize: 48,
    color: '#ffff00',
    capitals: false,
    image: 'http://localhost:3003/image.png',
    position: {
        x: 20,
        y: 50,
    },
    time: 0,
};

let imageElement = null;

function update() {
    window.requestAnimationFrame(update);

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
}
window.requestAnimationFrame(update);

function loadImage(url) {
    const image = new Image();
    image.src = url;
    imageElement = image;
}
loadImage(settings.image);

const dddd = new DDDD();

dddd.addLayer('Layer #1');
const layer2 = dddd.addLayer('Layer #2');

const shape1 = dddd.addGroup('Shape #1', {
    container: 'Layer #1',
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

const subsubgroup = subgroup.addGroup('sub-subgroup');
subsubgroup.add(settings, 'fontSize', {
    container: 'Shape #1',
    min: 30,
    max: 100,
});

shape1.add(settings, 'time');

const shape2 = dddd.addGroup('Shape #2', {
    container: 'Layer #1',
});

dddd.add(settings, 'fontSize', {
    container: 'Shape #1',
    min: 30,
    max: 100,
});
dddd.add(settings, 'position', {
    container: 'Shape #1',
    stepSize: 1,
});
dddd.add(settings, 'color', {
    container: 'Shape #1',
});
dddd.add(settings, 'capitals', {
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
    label: 'Log text',
    onClick: () => {
        console.log(settings.text);
    },
});
