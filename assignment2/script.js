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

/*
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
/*/

// Torus KNot geometry 
const torusKnotGeometry = new THREE.TorusKnotGeeometry( 10, 3, 100, 16 ); 

const drawTorusKnot = (height, color) =>
{
// materials
const material = new THREE.MeshStandardMaterial( { 
    color: new THREE.Color(color)
} )

// create torus knot
const torusKnot = new THREE.Mesh (torusKnotGeometry, material)

//Position Cube
//torusKnot.position.x = (Math.random() - 0.5) * 10
//torusKnot.position.z = (Math.random() - 0.5) * 10
//torusKnot.position.y = height - 10
torusKnot.position.set(Math.random() * 10, height, Math.random() * 10);

//Randomize rotation
torusKnot.rotation.x = 0
torusKnot.rotation.z = 0
torusKnot.rotation.y = 0

// Add cube to scene
scene.add(torusKnot)

}




/*******
** UI **
********/
// UI
const ui = new dat.GUI()

let preset = {}

const uiObj = {
    sourceText:"Tris Prior, standing on the edge of a speeding train, feels the wind rush past her face as her heart pounds in her chest. The train barrels forward at a terrifying speed, its metal body rattling along the tracks. Below her, the ground is distant and unforgiving, and the platform she’s about to leap onto seems like a mere speck. The sky above is overcast, the clouds swirling ominously, adding to the weight of the moment. Around her, the other initiates of the Dauntless faction stand at a distance, watching with eager eyes, their faces a mix of anticipation, excitement, and judgment. As Tris steels herself for the jump, the world around her seems to go silent. Her feet shift, her body tensing as she grips the metal railing in front of her. The leap isn’t just a test of physical strength; it’s a test of courage, a defining moment that will determine her place in Dauntless. Her palms are sweaty, and her breath comes in shallow gasps. She can feel the pulse of fear in her veins, but beneath that fear is an undeniable surge of adrenaline. The eyes of the initiates are on her—expecting, waiting. Every inch of her being screams to hesitate, to back out, but Tris knows there’s no turning back. With one final, deep breath, she pushes off the train, her body hurtling through the air, a brief moment of weightlessness before gravity takes hold. The platform below grows larger with every passing second, and for that moment, time seems to slow down, her thoughts racing as she faces the unknown. The jump is a leap not only into the physical danger of the moment but also into her own courage, into her identity, and the strength she must find within herself to thrive in a world that demands nothing less than bravery.",
    saveSourceText() {
        saveSourceText()
    },
    term1: 'tris',
    color1: '#336EFF',
    term2: 'her',
    color2: '#33E0FF',
    term3: 'she',
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
//const cameraFolder = ui.addFolder("Camera")

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

//cameraFolder
    //.add(uiObj, 'rotateCamera')
   // .name("Turnable")

//Terms and visualize folder are hidden by default
termsFolder.hide()
visualizeFolder.hide()
//cameraFolder.hide()



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
                drawTorusKnot(height, color)
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
