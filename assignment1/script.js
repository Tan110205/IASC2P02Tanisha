import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
//sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight 
}

/***********
 ** SCENE **
 ***********/
 // Canvas
 const canvas = document.querySelector('.webgl')

 // Scene
 const scene = new THREE.Scene()

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75*1.4,
    sizes.aspectRatio,
    0.1*1.4,
    100*1.4
 )
 scene.add(camera)
 camera.position.set(10, 2, 7.5)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true  
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/

// Cave
const caveGeometry = new THREE.PlaneGeometry( 15.5, 7.5 );
const caveMaterial = new THREE.MeshStandardMaterial( {
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
} );
const cave = new THREE.Mesh( caveGeometry, caveMaterial );
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add( cave );

// Spheres for Clouds
const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
sphere.position.set(8, 0.2, 3)
sphere.castShadow = true
scene.add(sphere);

const sphereeGeometry = new THREE.SphereGeometry()
const sphereeMaterial = new THREE.MeshNormalMaterial()
const spheree = new THREE.Mesh( sphereeGeometry, sphereeMaterial )
spheree.position.set(8, 0.5, 2)
spheree.castShadow = true
scene.add(spheree);

const sphereeeGeometry = new THREE.SphereGeometry()
const sphereeeMaterial = new THREE.MeshNormalMaterial()
const sphereee = new THREE.Mesh( sphereeeGeometry, sphereeeMaterial )
sphereee.position.set(7, 0.2, 1)
sphereee.castShadow = true
scene.add(sphereee);

// Other Spheres
const eyeGeometry = new THREE.SphereGeometry()
const eyeMaterial = new THREE.MeshNormalMaterial()
const eye = new THREE.Mesh( eyeGeometry, eyeMaterial )
eye.position.set(8, 0.5, -2)
eye.castShadow = true
scene.add(eye);

const sphereeeeGeometry = new THREE.SphereGeometry()
const sphereeeeMaterial = new THREE.MeshNormalMaterial()
const sphereeee = new THREE.Mesh( sphereeeeGeometry, sphereeeeMaterial )
sphereeee.position.set(6, 0.2, -1)
sphereeee.castShadow = true
scene.add(sphereeee);

const sphereeeeeGeometry = new THREE.SphereGeometry()
const sphereeeeeMaterial = new THREE.MeshNormalMaterial()
const sphereeeee = new THREE.Mesh( sphereeeeeGeometry, sphereeeeeMaterial )
sphereeeee.position.set(12, 0.2, -3)
sphereeeee.castShadow = true
scene.add(sphereeeee);

// Torus Knot (Smile)
const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100, Math.PI); 
const material = new THREE.MeshNormalMaterial(); 
const smile = new THREE.Mesh(geometry, material);
smile.rotation.x = Math.PI / 1 * 2; 
smile.rotation.y = Math.PI / 2;
smile.position.set(7, 1, 0); 
smile.castShadow = true
scene.add(smile); 

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(30, 2, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 300
directionalLight.shadow.mapSize.height = 300

// directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

// DOM INTERACTIONS
let rotateSphere = false;
let moveSpheres = false; 
const rotationSpeed = 0.02; 
const moveSpeed = 0.05; 
let moveDirection = 1;

// First Change
document.querySelector('#first-change').onclick = function() {
    sphere.position.set(5, 0.5, -2);
    spheree.position.set(4, 0.2, -1);
    sphereee.position.set(8, 0.2, -3);
    eye.position.set(5, 0.2, 3);
    sphereeee.position.set(7, 0.5, 2);
    sphereeeee.position.set(6, 0.2, 1);
};

// Second Change
document.querySelector('#second-change').onclick = function() {
    sphere.position.set(10, 0.5, -4);
    spheree.position.set(9, 0.2, -1);
    sphereee.position.set(19, 0.5, -6);
    eye.position.set(10, 0.5, 6);
    sphereeee.position.set(11, 0.3, 4);
    sphereeeee.position.set(8, 0.4, 2);
};

// Third Change
document.querySelector('#third-change').onclick = function() {
    rotateSphere = true;
};

// Fourth Change 
document.querySelector('#fourth-change').onclick = function() {
    moveSpheres = true;
};

/***************
** ANIMATION LOOP **
****************/

const clock = new THREE.Clock();

const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate the smile 
    if (rotateSphere) {
        smile.rotation.y += rotationSpeed; 
    }

    //Movement of spheres
    if (moveSpheres) {
        
        sphere.position.x += moveSpeed * moveDirection;
        spheree.position.x += moveSpeed * moveDirection;
        sphereee.position.x += moveSpeed * moveDirection;
        eye.position.x += moveSpeed * moveDirection;
        sphereeee.position.x += moveSpeed * moveDirection;
        sphereeeee.position.x += moveSpeed * moveDirection;

        
        if (sphere.position.x > 10 || sphere.position.x < -10) {
            moveDirection *= -1; 
        }
    }

    // Update directional light helper
    directionalLightHelper.update();

    // Update OrbitControls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);

    // Request next frame
    window.requestAnimationFrame(animation);
};

animation();
