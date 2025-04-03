import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "OrbitControls";

/***********
 ** SETUP **
 ***********/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = sizes.aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/***********
 ** SCENE **
 ***********/
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio, 0.1, 100);
camera.position.set(0, 10, -20);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/***********
 ** LIGHTS **
 ***********/
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

/***********
 ** MESHES **
 ***********/
const drawTorus = (height, color, radius = 2, tube = 0.8, group) => {
    if (!color.startsWith("#")) color = `#${color}`;

    const torusGeometry = new THREE.TorusGeometry(radius, tube, 16, 100);
    let material;

    if (group === group2) { 
        material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.5,
            wireframe: false
        });
    } else if (group === group3) { 
        material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            wireframe: true
        });
    } else { 
        material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            wireframe: false
        });
    }

    const torus = new THREE.Mesh(torusGeometry, material);
    torus.position.set(
        (Math.random() - 0.5) * 50,
        height - 5,
        (Math.random() - 0.5) * 50
    );
    torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    if (uiObj.dynamicScale) {
        torus.scale.set(height * 0.1, height * 0.1, height * 0.1);
    }

    group.add(torus);
};


/*******
 ** UI **
 ********/
const ui = new dat.GUI();
let preset = {};

// Groups 
const group1 = new THREE.Group();
scene.add(group1);
const group2 = new THREE.Group();
scene.add(group2);
const group3 = new THREE.Group();
scene.add(group3);

const uiObj = {
    dynamicScale: true,
    sourceText: "She showed me a few more places: the metal shop (where kids were forging their own swords), the arts-and-crafts room (where satyrs were sandblasting a giant marble statue of a goat-man), and the climbing wall, which actually consisted of two facing walls that shook violently, dropped boulders, sprayed lava, and clashed together if you didn’t get to the top fast enough. Finally we returned to the canoeing lake, where the trail led back to the cabins.“I’ve got training to do,” Annabeth said flatly. “Dinner’s at seven-thirty. Just follow your cabin to the mess hall.” “Annabeth, I’m sorry about the toilets.” “Whatever.” “It wasn’t my fault.” She looked at me skeptically, and I realized it was my fault. I’d made water shoot out of the bathroom fixtures. I didn’t understand how. But the toilets had responded to me. I had become one with the plumbing. “You need to talk to the Oracle,” Annabeth said. “Who?” “Not who. What. The Oracle. I’ll ask Chiron.” I stared into the lake, wishing somebody would give me a straight answer for once. I wasn’t expecting anybody to be looking back at me from the bottom, so my heart skipped a beat when I noticed two teenage girls sitting cross-legged at the base of the pier, about twenty feet below. They wore blue jeans and shimmering green T-shirts, and their brown hair floated loose around their shoulders as minnows darted in and out. They smiled and waved as if I were a long-lost friend. I didn’t know what else to do. I waved back. “Don’t encourage them,” Annabeth warned. “Naiads are terrible flirts.” “Naiads,” I repeated, feeling completely overwhelmed. “That’s it. I want to go home now.” Annabeth frowned. “Don’t you get it, Percy? You are home. This is the only safe place on earth for kids like us.”",
    saveSourceText() { saveSourceText(); },
    term1: 'percy', color1: '#336EFF', group: group1, diameter: 10, nToruses: 100,
    randomized: true, scale: 1, wireframe: false, emmisive: false,
    term2: 'annabeth', color2: '#33E0FF', group: group2, diameter: 10, nToruses: 100,
    randomized: true, scale: 1, wireframe: false, emissive: true,
    term3: 'kids', color3: '#6E33FF', group: group3, diameter: 10, nToruses: 100,
    randomized: true, scale: 1, wireframe: false, emissive: false,
    saveTerms() { saveTerms(); },
    rotateCamera: false,
    clearVisualization() { clearVisualization(); }
};

const saveSourceText = () => {
    preset = ui.save();
    textFolder.hide(); termsFolder.show(); visualizeFolder.show(); cameraFolder.show();
    tokenizeSourceText(uiObj.sourceText);
};

const saveTerms = () => {
    preset = ui.save();
    visualizeFolder.hide();
    findSearchTermInTokenizedText(uiObj.term1, uiObj.color1, group1);
    findSearchTermInTokenizedText(uiObj.term2, uiObj.color2, group2);
    findSearchTermInTokenizedText(uiObj.term3, uiObj.color3, group3);
    clearFolder.show();
};

const clearVisualization = () => {
    group1.clear();
    group2.clear();
    group3.clear();

    uiObj.term1 = '';
    uiObj.term2 = '';
    uiObj.term3 = '';
    uiObj.color1 = '#336EFF';
    uiObj.color2 = '#33E0FF';
    uiObj.color3 = '#6E33FF';
    uiObj.sourceText = "";

    termsFolder.hide();
    visualizeFolder.hide();
    clearFolder.hide();
    textFolder.show();
};

const textFolder = ui.addFolder("Source text");
textFolder.add(uiObj, 'sourceText').name("Source Text");
textFolder.add(uiObj, 'saveSourceText').name("Save");

const termsFolder = ui.addFolder("Search Terms");
const visualizeFolder = ui.addFolder("Visualize");
const clearFolder = ui.addFolder("Clear");
const cameraFolder = ui.addFolder("Camera");

termsFolder.add(uiObj, 'term1').name("Term 1");
termsFolder.add(group1, 'visible').name("Term 1 Visibility");
termsFolder.addColor(uiObj, 'color1').name("Term 1 color");
termsFolder.add(uiObj, 'term2').name("Term 2");
termsFolder.add(group2, 'visible').name("Term 2 Visibility");
termsFolder.addColor(uiObj, 'color2').name("Term 2 color");
termsFolder.add(uiObj, 'term3').name("Term 3");
termsFolder.add(group3, 'visible').name("Term 3 Visibility");
termsFolder.addColor(uiObj, 'color3').name("Term 3 color");
visualizeFolder.add(uiObj, 'saveTerms').name("Visualize");
clearFolder.add(uiObj, 'clearVisualization').name("Clear Visualization");

cameraFolder.add(uiObj, 'rotateCamera').name("Turnable");

// ✅ Fixed: UI Toggle Updates Scaling
termsFolder.add(uiObj, 'dynamicScale').name("Enable Dynamic Scale").onChange(() => {
    clearVisualization();
    saveTerms();
});

termsFolder.hide();
visualizeFolder.hide();
clearFolder.hide();
cameraFolder.hide();

/******************
 ** TEXT ANALYSIS **
 *******************/
let tokenizedText;
const tokenizeSourceText = (sourceText) => {
    tokenizedText = sourceText.replaceAll(".", "").toLowerCase().split(/[^\w']+/);
};

const findSearchTermInTokenizedText = (term, color, group) => {
    console.log(`Searching for term: "${term}" with color: ${color}`);
    for (let i = 0; i < tokenizedText.length; i++) {
        if (tokenizedText[i] === term) {
            const height = Math.max((100 / tokenizedText.length) * i * 0.2, 0.5);
            for (let a = 0; a < 100; a++) drawTorus(height, color, 2, 0.8, group);
        }
    }
};

/********************
 ** PAUSE/RESUME **
 ********************/
let paused = false;
let previousTime = 0;

// Add pause button to UI
cameraFolder.add({ togglePause: () => {
    paused = !paused;
    if (paused) {
        previousTime = clock.getElapsedTime(); // Store elapsed time when pausing
    } else {
        clock.start(); // Restart clock when resuming
    }
}}, 'togglePause').name("Pause Rotation");

/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock();

const animation = () => {
    let elapsedTime = paused ? previousTime : clock.getElapsedTime();
    controls.update();

    if (!paused) {
        group3.rotation.y = elapsedTime;
        group3.rotation.z = elapsedTime;
        group1.rotation.z = elapsedTime;
        group2.rotation.z = elapsedTime;
    }

    if (uiObj.rotateCamera) {
        camera.position.x = Math.sin(elapsedTime) * 20;
        camera.position.z = Math.cos(elapsedTime) * 20;
        camera.position.y = 70;
        camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(animation);
};
animation();