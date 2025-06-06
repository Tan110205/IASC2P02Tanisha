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
 scene.background = new THREE.Color('grey')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(2, 3, -5)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
 


/***********
** MESHES **
************/
//testSphere

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(plane)
//scene.add(testSphere)
testSphere.position.set(0,0,-5)

const geometry = new THREE.TorusKnotGeometry()
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)


/*******
** UI **
********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1,
    distance: 1,
    rotation: 1
}

// plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
.add(planeMaterial, 'wireframe')
.name("Toggle Wireframe")

// testKnot UI

const meshFolder = ui.addFolder('Torus Knot');

console.log(meshFolder);

meshFolder
//.add(mesh.position, 'x')
.add(mesh.position, 'y')
.min(-5)
.max(5)
.step(1)
.name("Sphere Height")
//.name('Torus Knot Y Position'); 

meshFolder
//.add(mesh.position, 'x')
.add(mesh.position, 'x')
.min(-5)
.max(5)
.step(1)
.name("Sphere Width")

meshFolder
.add(uiObject, 'speed')
.min(0.1)
.max(10)
.name('Speed')

meshFolder
.add(uiObject, 'distance')
.min(0.1)
.max(10)
.name('Distance')

meshFolder
.add(uiObject, 'rotation')
.min(0.1)
.max(10)
.name('Rotation')


/********************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock() 

const animation = () =>
    {
        // Return elapsedTime
        const elapsedTime = clock.getElapsedTime()

        // Animate TogleKnot
        mesh.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

        //Rotation
        mesh.rotation.x += uiObject.rotation * 0.01  // Rotate around X axis
        mesh.rotation.y += uiObject.rotation * 0.01  // Rotate around Y axis
        mesh.rotation.z += uiObject.rotation * 0.01  // Rotate around Z axis

        // Update OrbitControls
        controls.update()

        // Renderer
        renderer.render(scene, camera)

        //Request next frame
        window.requestAnimationFrame(animation)
    }

    animation()
