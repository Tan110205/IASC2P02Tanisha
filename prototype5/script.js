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
 //scene.background = new THREE.Color('grey')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 camera.position.set(0, 10, -20)
 scene.add(camera)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
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
    cube.position.y = height - 10

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

let preset = {}

const uiObj = {
    sourceText:"The dark blue dolphin had a high jump above the horison at sunset",
    saveSourceText() {
        saveSourceText()
    },
    term1: 'dolphin',
    color1: '#336EFF',
    term2: 'horizon',
    color2: '#33E0FF',
    term3: 'jump',
    color3: '6E33FF',
    saveTerms(){
        saveTerms()
    }
}

//UI Functions
const saveSourceText = () =>
{
    //UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    //Text Analysis
    tokenizeSourceText(uiObj.sourceText)
}

const saveTerms = () => {
    //UI
    preset = ui.save
    visualizeFolder.hide()

    //Testing

    //Text Analysis
    findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
    findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
    findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)

}

//Text folder
const textFolder = ui.addFolder("Source text")

textFolder  
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder  
    .add(uiObj, 'saveSourceText')
    .name("Save")

//Terms and visualize folder
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj, 'term1')
    .name("Term 1")

termsFolder
    .addColor(uiObj, 'color1')
    .name("Term 1 color")

termsFolder
    .add(uiObj, 'term2')
    .name("Term 2")

termsFolder
    .addColor(uiObj, 'color2')
    .name("Term 2 color")

termsFolder
    .add(uiObj, 'term3')
    .name("Term 3")

termsFolder
    .addColor(uiObj, 'color3')
    .name("Term 3 color")
    
visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")


//Terms and visualize folder are hidden by default
termsFolder.hide()
visualizeFolder.hide()


/******************
** TEXT ANALYSIS **
*******************/

//variables
let parsedText, tokenizedText

//Parse and Tokenized Text
const tokenizeSourceText = (sourceText) =>
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


//findSearchTermInTokenizedText("the", "blue")
//findSearchTermInTokenizedText("dolphin", "aqua")
//findSearchTermInTokenizedText("a", "white")
//findSearchTermInTokenizedText("sky", "purple")


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
        renderer.render(scene, camera)

        //Request next frame
        window.requestAnimationFrame(animation)
    }

    animation()
