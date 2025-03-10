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



//Resizing

window.addEventListener('resize' , () => {

    // Update sizes

    sizes.width = window. innerWidth

    sizes.height = window. innerHeight

    sizes. aspectRatio = window. innerWidth / window. innerHeight



    // Update camera

    camera.aspect = sizes.aspectRatio

    camera.updateProjectionMatrix ()



    // Update renderer

    renderer.setSize(sizes.width, sizes.height)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    

} )





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

 camera.position.set(0, 12, -20)



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

** LIGHTS **

************/

// Directional Light

const directionalLight = new THREE.DirectionalLight(0x404040, 100)

scene.add(directionalLight)





/***********

** MESHES **

************/



// Cube Geometry

const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)



const drawCube = (height, color) =>

{

    // Create cube material

    const material = new THREE.MeshStandardMaterial({

    color: new THREE.Color(color)

    })



    //Create cube

    const cube = new THREE.Mesh (cubeGeometry, material)



    //Position Cube

    cube.position.x = (Math.random() - 0.5) * 10

    cube.position.z = (Math.random() - 0.5) * 10

    cube.position.y = height 



    //Randomize cube rotation

    cube.rotation.x = Math.random() * 2 * Math.PI

    cube.rotation.z = Math.random() * 2 * Math.PI

    cube.rotation.y = Math.random() * 2 * Math.PI



    // Add cube to scene

    scene.add(cube)

}



//drawCube (0, 'red')

//drawCube (1, 'blue')

//drawCube (2, 'green')

//drawCube (3, 'yellow')







/*******

** UI **

********/

// UI

const ui = new dat.GUI()



/******************

** TEXT ANALYSIS **

*******************/

//SourceText

const sourceText = "A playful baby dolphin enjoyed to jump out of the water in a calm, blue lagoon because it wanted to touch the stars. The elder dolphins chuckled and they told her that Dolphins don't reach the sky, little one! The dolphin, however, was not going to give up. She rehearsed her jumps every night in the moonlight, getting higher each time. A shooting star appeared in the sky one evening. For an instant, the dolphin felt weightless, as though she were a part of the sky itself, as she jumped with all her strength. The ocean glistened around her as she splashed back into the water, and the other dolphins applauded. The stars seemed to shine specifically for the dolphin every time she leaped after that night."



//variables

let parsedText, tokenizedText



//Parse and Tokenized Text

const tokenizeSourceText = () =>

{

    // Strip periods and downcase source text

    parsedText = sourceText.replaceAll(".", "").toLowerCase()



    // Tokenize text

    tokenizedText = parsedText.split(/[^\w']+/)

}



// Find Search term in tokenizedText

const findSearchTermInTokenizedText = (term, color) =>

{

    //use a for loop to go through the tokenized text array

    for (let i = 0; i < tokenizedText.length; i++)

    {

        //If tokenized text i matches our search term then we draw a cube

        if(tokenizedText[i] === term){

            //convert i into the height

            const height = (100 / tokenizedText.length) * i * 0.2



            //call draw cube function 100 times using height value

            for(let a = 0; a < 100; a++){

                drawCube(height, color)

            }



        }

    }

}



tokenizeSourceText()

findSearchTermInTokenizedText("the", "blue")

findSearchTermInTokenizedText("dolphin", "aqua")

findSearchTermInTokenizedText("a", "white")

findSearchTermInTokenizedText("sky", "purple")





/********************

** ANIMATION LOOP **

********************/

const clock = new THREE.Clock() 



const animation = () =>

    {

        // Return elapsedTime

        const elapsedTime = clock.getElapsedTime()



        // Update OrbitControls

        controls.update()



        // Renderer

        renderer.render(scene, camera, canvas)



        //Request next frame

        window.requestAnimationFrame(animation)

    }



    animation()