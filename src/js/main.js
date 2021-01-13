import Dddd, { Text, Slider, Image, Dropdown, Checkbox } from './dddd';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Texture, SphereGeometry, TorusGeometry, BackSide, FrontSide } from 'three';

class Main {
    constructor() {
        const settings = {
            text: 'test',
            rotationSpeed: 0.2,
            image: null,
            shape: 'box',
            backside: false,
        };

        // const output = document.querySelector('.output');

        // const scene = new Scene();
        // const camera = new PerspectiveCamera(75, output.offsetWidth / output.offsetHeight, 0.1, 1000);
        // camera.position.z = 2;

        // const renderer = new WebGLRenderer({
        //     antialias: true
        // });
        // renderer.setSize(output.offsetWidth, output.offsetHeight);
        // output.appendChild(renderer.domElement);

        // const geometry = new BoxGeometry();
        // const material = new MeshBasicMaterial();
        // const cube = new Mesh(geometry, material);
        // scene.add(cube);

        // function animate() {
        //     cube.rotation.x += 0.1 * settings.rotationSpeed;
        //     cube.rotation.y += 0.1 * settings.rotationSpeed;
        //     cube.rotation.z += 0.1 * settings.rotationSpeed;

        //     requestAnimationFrame(animate);
        //     renderer.render(scene, camera);
        // }
        // animate();

        const dddd = new Dddd();

        dddd.createLayer('Layer #1');
        dddd.createLayer('Layer #2');
        dddd.createLayer('Layer #3');

        dddd.add(settings, 'shape', {
            container: 'Layer #1',
            type: Dropdown,
            options: ['box', 'sphere', 'torus'],
            label: 'shape',
            // onChange: (value) => {
            //     switch (value) {
            //         case 'box':
            //             cube.geometry = new BoxGeometry();
            //             break;
            //         case 'sphere':
            //             cube.geometry = new SphereGeometry();
            //             break;
            //         case 'torus':
            //             cube.geometry = new TorusGeometry();
            //             break;
            //     }
            // },
        });

        dddd.add(settings, 'backside', {
            container: 'Layer #1',
            type: Checkbox,
            // onChange: (value) => {
            //     if (value) {
            //         cube.material.side = BackSide;
            //     } else {
            //         cube.material.side = FrontSide;
            //     }
            // },
        });

        dddd.add(settings, 'text', {
            container: 'Layer #1',
            type: Text,
            label: 'text',
        });

        dddd.add(settings, 'rotationSpeed', {
            container: 'Layer #1',
            type: Slider,
            label: 'speed',
            min: 0,
            max: 1,
        });

        dddd.add(settings, 'image', {
            container: 'Layer #1',
            type: Image,
            // onChange: (value) => {
            //     const image = document.createElement('img');
            //     image.src = value;

            //     const texture = new Texture(image);
            //     texture.needsUpdate = true;
            //     cube.material.map = texture;
            //     cube.material.needsUpdate = true;
            // },
        });

        dddd.addButton({
            container: 'Layer #1',
            label: 'Save',
            onClick: () => {
                console.log('click');
            },
        });
    }

    destroy() {}
}

new Main();
