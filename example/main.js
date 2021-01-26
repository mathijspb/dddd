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
        y: 50
    }
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
}
window.requestAnimationFrame(update);

function loadImage(url) {
    const image = new Image();
    image.src = url;
    imageElement = image;
}
loadImage(settings.image);

const dddd = new DDDD();

// dddd.createLayer('Layer #1');

dddd.createGroup('Shape #1', {
    // container: 'Layer #1'
});

dddd.add(settings, 'text', {
    container: 'Shape #1'
});
dddd.add(settings, 'font', {
    container: 'Shape #1',
    options: [
        'Arial',
        'Verdana',
        'Times New Roman'
    ]
});
dddd.add(settings, 'fontSize', {
    container: 'Shape #1',
    min: 30,
    max: 100
});
dddd.add(settings, 'position', {
    container: 'Shape #1',
    stepSize: 1
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
    }
});
dddd.addButton({
    container: 'Shape #1',
    label: 'Log text',
    onClick: () => {
        console.log(settings.text);
    }
});
