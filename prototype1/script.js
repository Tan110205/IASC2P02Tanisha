import * as THREE from "three"

/***********
 ** SCENE **
 ***********/
 // Canvas
 const canvas = document.querySelector('.webgl')

 // Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('beige')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(0, 0, 5)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)

/***********
** MESHES **
************/
//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)
testSphere.position.set(0,0,-5)

const testSphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(testSphere2)
testSphere2.position.set(2, 0, -5)


/********************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock() 

const animation = () =>
    {
        // Return elapsedTime
        const elapsedTime = clock.getElapsedTime()

        // Animate testSphere
        console.log(Math.sin(elapsedTime))
        testSphere.position.y = Math.sin(elapsedTime)
        testSphere2.position.z = Math.cos(elapsedTime)

        // Renderer
        renderer.render(scene, camera)

        //Request next frame
        window.requestAnimationFrame(animation)
    }

    animation()
