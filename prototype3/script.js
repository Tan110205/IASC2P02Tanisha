import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
 // Canvas
 const canvas = document.querySelector('.webgl')

 // Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('black')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(10, 2, 7.5)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
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

//Cave
const caveGeometry = new THREE.PlaneGeometry( 15.5, 7.5 );
const caveMaterial = new THREE.MeshStandardMaterial( {
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
} );
const cave = new THREE.Mesh( caveGeometry, caveMaterial );
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add( cave );

//Objects
const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
sphere.position.set(7, 1.5, 2)
sphere.castShadow = true
scene.add(sphere);

const eyeGeometry = new THREE.SphereGeometry()
const eyeMaterial = new THREE.MeshNormalMaterial()
const eye = new THREE.Mesh( eyeGeometry, eyeMaterial )
eye.position.set(7, 1.5, -2)
eye.castShadow = true
scene.add(eye);


const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100, Math.PI); 
const material = new THREE.MeshNormalMaterial(); 
const smile = new THREE.Mesh(geometry, material);
smile.rotation.x = Math.PI / 1; 
smile.rotation.y = Math.PI / 2;
smile.position.set (7, 0, 0); 
smile.castShadow = true
scene.add(smile); 

// Ambient Light
//const ambientLight = new THREE.AmbientLight(
    //new THREE.Color('pink')
//)
//scene.add(ambientLight)

//directional light
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
//scene.add(directionalLightHelper)

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')
lightPositionFolder
.add(directionalLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('Y')

lightPositionFolder
.add(directionalLight.position, 'x')
.min(5)
.max(15)
.step(0.1)
.name('X')

lightPositionFolder
.add(directionalLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('Z')


/********************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock() 

const animation = () =>
    {
        // Return elapsedTime
        const elapsedTime = clock.getElapsedTime()

        // Animate Object

        //update directional light helper
        directionalLightHelper.update()

        // Update OrbitControls
        controls.update()

        // Renderer
        renderer.render(scene, camera)

        //Request next frame
        window.requestAnimationFrame(animation)
    }

    animation()
