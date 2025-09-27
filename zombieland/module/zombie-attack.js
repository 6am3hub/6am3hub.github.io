
////////////////////////////////////////////////////////////////////////////////////////////
///                                                                                      ///
///  Developer Interactive UIUX  2021-2022                                               ///
///  Contact Shane Brumback https://www.shanebrumback.com                                ///
///  Message me for questions about this project                                         ///
///  I am developing this Open World Multi-player AI Concept using                       ///
///  Three.js and AWS Web Services Serverless Technologies                               ///
///                                                                                      ///
///                                                                                      ///
////////////////////////////////////////////////////////////////////////////////////////////


import * as THREE from 'three'; // import the Three.js library
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'; // import the PointerLockControls module
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // import the GLTFLoader module
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js' // import the MeshoptDecoder module
import { loadCharacter } from './genericLoader.js';



let clock = new THREE.Clock() // create a new clock
let time = 0 // variable to store the current time
let delta = 0 // variable to store the delta time (time since last frame)
let mixer; // variable to store animation mixer
let centralCubeBoundingBox // variable to store the bounding box of the central cube
let camera, scene, renderer, controls // variables to store the camera, scene, renderer, and controls objects
const objects = [] // array to store objects that the raycaster should check for intersections with
let cubes = [] // array to store the cubes
let mixers = [] // array to store the animation mixers
let raycaster // variable to store the raycaster
let raycasterGun = new THREE.Raycaster() // create a new raycaster for the gun
let moveForward = false // variable to store whether the player is moving forward
let moveBackward = false // variable to store whether the player is moving backward
let moveLeft = false // variable to store whether the player is moving left
let moveRight = false // variable to store whether the player is moving right
let canJump = false // variable to store whether the player can jump
let villageObject // variable to store the village object   
let prevTime = performance.now() // variable to store the time from the previous frame
let velocity = new THREE.Vector3() // variable to store the player's velocity
let direction = new THREE.Vector3() // variable to store the player's direction
let centralCube // variable to store the central cube
let loader // variable to store the GLTFLoader
let cubeHeight // variable to store the height of the cubes
let controlElevation = 4 // variable to store the height of the player's controls
let manager // variable to store the loading manager
let shotgunObject // variable to store the shotgun object
let ambientLight // variable to store the ambient light
let pointLight // variable to store the point light
let radius = 200 // Set the radius of the circular area
let minDistance = 80 // Set the minimum distance from the center of the circle that
var radiusFlyCam = 100 // the radius of the circular path for the camera
var angleFlyCam = 0 // the current angle of rotation for the camera
var lookAtElevationFlyCam = 40 // the elevation at which the camera should look at the scene
let scoreCount = 0 // variable to store the player's score
let sounds = {} // object to store the sounds in the scene
let backgroundMusic // variable to store the background music
let isMusicPlaying = true // variable to store whether the background music is playing
let trees = [] // array to store the trees in the scene
let treeCount = 40
let cubeCamera; // variable to store the cube camera
let zombieClip; // handles the current animation clip
let zombieCubes = [] // array to store zombies
let zombieCount = 175; // number of zombies to be created
let fps; // frames per second display
let counter = 0; // number for tracking fps
/// Create the origin point
var origin = new THREE.Vector3(0, 0, 0);
// Create an array to store the spheres
var shotGunSpheres = [];
let firing = false;

init();  // initialize threejs

function init() {

    // array of audio sources
    let sources = [
        { name: "sound-zombie-cry", src:"../sounds/zombie-sound-001.mp3" }, // sound for zombie crying
        { name: "sound-fire-shotgun", src: "../sounds/fire-rifle.wav" }, // sound for firing a shotgun
        { name: "sound-wind", src: "../sounds/wind.wav", loop: true }, // sound for wind, set to loop
        { name: "music-game-over", src: "../sounds/background-music-001.wav", loop: true } // background music, set to loop
    ];

    // for each source, create an audio object, set its properties, and load it
    sources.forEach((source) => {
        let sound = new Audio();
        sound.src = source.src;
        sound.loop = source.loop;
        sound.load();
        sounds[source.name] = sound;
    });

    // Set up the scene, camera, fog and fog density
    scene = new THREE.Scene();
    {
        const near = 30;
        const far = 40;
        const color = '#979797';
        const density = 0.01;
        scene.fog = new THREE.FogExp2(color, density);
        scene.background = new THREE.Color(color);
    }

    
    // Create an instance of a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    // Start camera in a random location n the map
    generatRandomXZINsertion(camera, 0, 25, 30)

    // Set up the mouse click event handler
    document.addEventListener('mousedown', onMouseClick, false);

    // Initialize background music and set isMusicPlaying flag to true
    backgroundMusic = sounds["music-game-over"];
    isMusicPlaying = true;

    // Add event listener for keydown events
    window.addEventListener('keydown', function (event) {
        // Check if the "L" key is pressed and set controlElevation to 4
        if (event.key.toLowerCase() === "l") {
            controlElevation = 4
        }
        // Check if the "H" key is pressed and set controlElevation to 25
        if (event.key.toLowerCase() === "h") {
            controlElevation = 25
        }
        // Check if the "M" key is pressed
        if (event.key.toLowerCase() === "m") {
            // Check if music is currently playing
            if (isMusicPlaying) {
                // Pause music and set isMusicPlaying flag to false
                backgroundMusic.pause();
                isMusicPlaying = false;
                // Update music status on screen
                divMusic.innerHTML = "<p>MUSIC OFF</p>"
            } else {
                // Play music and set isMusicPlaying flag to true
                backgroundMusic.play();
                isMusicPlaying = true;
                // Update music status on screen
                divMusic.innerHTML = "<p>MUSIC ON</p>"
            }
        }
        // Check if the "G" key is pressed and opens the link and reload the page
        if (event.key.toLowerCase() === "g") {
            window.open("https://artlist.io/?artlist_aid=shanebrumback_1992&utm_medium=43001dca");
            location.reload()
        }
        // Check if the "Y" key is pressed and opens the link and reload the page
        if (event.key.toLowerCase() === "y") {
            window.open("https://www.youtube.com/channel/UC5kqNYlnPWrL46eTKjTEPHg");
            location.reload()
        }
        // Check if the "P" key is pressed and opens the link and reload the page
        if (event.key.toLowerCase() === "p") {
            window.open("https://amzn.to/3W9JUno");
            location.reload()
        }
        // Check if the "B" key is pressed and opens the link and reload the page
        if (event.key.toLowerCase() === "b") {
            window.open("https://www.shanebrumback.com");
            location.reload()
        }
        // Check if the "C" key is pressed and opens the link and reload the page
        if (event.key.toLowerCase() === "c") {
            window.open("https://shanebrumback.blogspot.com/");
            location.reload()
        }
    });


    // Define a function that will be called on mouse click
    function onMouseClick(event) {

        if (firing == true) {

            // Get the mouse position in normalized device coordinates
            // (-1 to +1) for both components
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            camera.position.x += 2; // Jolt the camera to the right
            camera.position.y += 2; // Jolt the camera up
            camera.position.z -= 2; // Jolt the camera back

            pointLight.intensity += 6;

            // Use setTimeout to restore the camera's position after 0.5 seconds
            setTimeout(function () {
                camera.position.x -= 2; // Restore the camera's position
                camera.position.y -= 2; // Restore the camera's position
                camera.position.z += 2; // Restore the camera's position
                pointLight.intensity = 0;
            }, 100);

            // Setting mousePosition to (0, 0) makes it the center of the screen
            var mousePos = new THREE.Vector2(0, 0);
            raycasterGun.setFromCamera(mousePos, camera);

            fireShotGunSpheres()

            let intersectsGun = raycasterGun.intersectObjects(cubes);
            for (let i = 0; i < intersectsGun.length; i++) {

                const object = intersectsGun[i].object.name;
                let objectColliderName = scene.getObjectByName(object)
                if (objectColliderName) {
                    let zombieModel =
                        scene.getObjectByName(intersectsGun[i].object.name.replace('collider-', ""))
                    scene.remove(zombieModel)
                    origin = objectColliderName.position
                    zombieParts(objectColliderName.position.x, objectColliderName.position.z)
                    scene.remove(objectColliderName)
                    scoreCount += 1
                    divScore.innerHTML = '<p>' + 'SCORE ' + scoreCount + '</p>';
                    zombieCount -= 1
                    divZombieCount.innerHTML = '<p>' + 'ZOMBIES ' + zombieCount + '</p>';
                    if (zombieCount === 0) {
                        var gameOver = document.getElementById("game-over");
                        gameOver.style.display = "block";
                        gameOver.style.boxShadow = "none";
                        setTimeout(function () {
                            location.reload();
                        }, 10000);
                    }
                }
            }
        }

    }

    manager = new THREE.LoadingManager();
    manager.onStart = function () {
        imgPCGame.style.display = 'none'
    };

    var sliderElements = document.querySelectorAll(".slider");
    sliderElements.forEach(function (element) {
        element.style.display = "none";
    });




    // Array of character configurations
    var characterConfigurations = [
        {
            modelFilePath: '../models/glb/knight/knight.glb',
            screenLocation: { left: 10, top: 30 },
            size: { width: 25, height: 60 },
            cameraZoom: 200,
            draggable: true,
            hyperlink: '../blog/3d-mobile-responsive-game-character-controller.html?&army=true&model-filename=knight',
            rotate: true
        },
        {
            modelFilePath: '../models/gltf/minecraft-zombie/zombie-001.glb',
            screenLocation: { left: 75, top: 0 },
            size: { width: 25, height: 50 },
            cameraZoom: 1.5,
            draggable: true,
            hyperlink: '../blog/animating-and-interacting-with-3d-minecraft-models-using-threejs.html',
            rotate: false
        },
        {
            modelFilePath: '../models/gltf/spacex_dragon_2_exterior/scene.gltf',
            screenLocation: { left: 90, top: 30 },
            size: { width: 15, height: 60 },
            cameraZoom: 10,
            draggable: true,
            hyperlink: '../../spacex-falcon-9-launch-complex.html',
            rotate: true
        }
    ];

    // Loop through each configuration and call loadCharacter function
    characterConfigurations.forEach(function (config) {
        loadCharacter(config.modelFilePath, config.screenLocation, config.size, config.cameraZoom, config.draggable, config.hyperlink, config.rotate);
    });



    manager.onLoad = function () { 


        checkScreenSize();

        document.addEventListener('mousedown', function (event) {
            if (instructions.style.display == 'none')
                if (firing == true)
                    sounds["sound-fire-shotgun"].play();;
        });

        document.addEventListener('mouseup', function (event) {
            if (firing == true) {
                if (sounds["sound-fire-shotgun"].duration > 0 && !sounds["sound-fire-shotgun"].paused) {

                    // Audio playing
                    sounds["sound-fire-shotgun"].currentTime = 0;
                    sounds["sound-fire-shotgun"].play();;

                }
            }


        });




        instructions.addEventListener('click', function () {

            if (window.innerWidth >= 800) {

              
                sounds["sound-wind"].play();;
                divZombieCount.innerHTML = '<p>' + 'ZOMBIES ' + zombieCount + '</p>';
                divScore.innerHTML = '<p>' + 'SCORE ' + scoreCount + '</p>';
                divMusic.innerHTML = '<p>' + 'MUSIC ON' + '</p>';
                divFPS.innerHTML = '<p>' + 'FPS ' + fps +  '</p>';
               // controls.lock();
              

            } else {

                imgPlayNow.style.display = 'none'
                imgPCGame.style.display = 'block'
               
            }

        });

        animate();

       

    };

    //show progress from the callback events of the
    //model loader manager
    manager.onProgress = function (url, itemsLoaded, itemsTotal) {

        imgPlayNow.style.display = 'none'
        imgLoading.style.display = 'block'
        camera.lookAt(new THREE.Vector3(0, 0, 0));
       
       
    };

    //track error on the post call back events of the
    //for the model loader manager
    manager.onError = function (url) {

    };

    controls = new PointerLockControls(camera, document.body);

    controls.minAzimuthAngle = -Math.PI / 4; // 45 degrees left
    controls.maxAzimuthAngle = Math.PI / 4; // 45 degrees right


    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');
    const gameTimer = document.getElementById('timer');



    // Define array to hold renderer containers
    var rendererContainers = document.querySelectorAll('#rendererContainer');


    controls.addEventListener('lock', function () {

     
        instructions.style.display = 'none';
        blocker.style.display = 'none';
        divScoreWrapper.style.display = 'block';
        divScoreWrapper.style.position = 'fixed';
        divScoreWrapper.style.top = '0';
        divScoreWrapper.style.left = '0';
        divScoreWrapper.style.textAlign = 'left';
        divScoreWrapper.style.padding = '20px';
        document.getElementById("crosshair").style.display = "block";
        sounds["music-game-over"].play();;
        firing = true;
        gameTimer.style.display = 'block'
        rendererContainers.forEach(function (container) {
            container.style.display = 'none'; // Hide all renderer containers when screen is locked
        });
      

    });

    controls.addEventListener('unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';
        document.getElementById("crosshair").style.display = "none";
        divScoreWrapper.style.display = 'none'
        sounds["music-game-over"].pause();
        firing = false;
        gameTimer.style.display = 'none'
        var divSwat = document.getElementById('rendererContainer')
        divSwat.style.display = 'block'
        rendererContainers.forEach(function (container) {
            container.style.display = 'block'; // Hide all renderer containers when screen is locked
        });

       
    });

    scene.add(controls.getObject());

    const onKeyDown = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };


    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x1c2325, 1); // the default
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.LinearEncoding
    renderer.gammaFactor = 1.3;
    renderer.shadowMap.enabled = false;
    renderer.autoClear = true;
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.top = '0';
    document.body.appendChild(renderer.domElement);


    // Create the spotlight with shadows
    const spotLight = new THREE.PointLight(0xffffff);
    spotLight.position.set(10, 20, 30);
    spotLight.castShadow = true;
    // scene.add(spotLight);

    // Add ambient light
    ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Add point light
    pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

    // Create the plane's geometry
    const planeGeometry = new THREE.PlaneBufferGeometry(400, 400);

    // Create a material to apply to the plane
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: '#0F3325',
        side: THREE.DoubleSide,
        depthWrite: false
    });

    // Create the plane
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);
    //Add a grid helper
    var grid = new THREE.GridHelper(400, 80);
    scene.add(grid);

    // Set up the central target base cube
    const centralCubeGeometry = new THREE.BoxBufferGeometry(75, 5, 75);
    const centralCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });



    centralCube = new THREE.Mesh(centralCubeGeometry, centralCubeMaterial);
    centralCube.position.set(0, 0, 0);
    centralCube.visible = false;
    scene.add(centralCube);

    // Set up the box ground
    const centralGroundGeometry = new THREE.BoxBufferGeometry(400, -.5, 400);
    const centralGroundMaterial = new THREE.MeshBasicMaterial({ color: '#0F3325' });
    let centralGroundCube = new THREE.Mesh(centralGroundGeometry, centralGroundMaterial);
    centralGroundCube.position.set(0, 0, 0);
    scene.add(centralGroundCube);

    // Set up the random cubes
    const cubeGeometry = new THREE.BoxBufferGeometry(3, 6, 3);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });


    function generatRandomXZINsertion(object, i, y, minDistance) {

        // Generate random x and z values within the circular area
        const x = Math.random() * radius * 2 - radius;
        const z = Math.random() * radius * 2 - radius;

        if (Math.sqrt(x * x + z * z) > minDistance) {
            object.position.set(x, y, z);
        } else {
            // Generate new x and z values and try again
            i--;
        }

    }


    // Set up a model loader object
    loader = new GLTFLoader(manager);
    loader.setMeshoptDecoder(MeshoptDecoder);

    // Load a rigid cubes for zombie intersects and tracking
    for (let i = 0; i < zombieCount; i++) { // set the number of cubes to 100

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeHeight = cube.geometry.parameters.height / 2
        cube.position.set(Math.random() * 200 - 100 + 100, cubeHeight, Math.random() * 200 - 100 + 100); // set the cubes further away

        generatRandomXZINsertion(cube, i, cubeHeight, 50)

        cube.visible = false
        cube.name = 'red-cube-collider-' + i
        scene.add(cube)

        loader.load('/models/gltf/minecraft-zombie-2/zombie-001.glb',
            function (gltf) {

                gltf.scene.position.x = cube.position.x;
                gltf.scene.position.y = cubeHeight - 1;
                gltf.scene.position.z = cube.position.z
                gltf.scene.scale.set(2, 2, 2)
                gltf.scene.name = 'red-cube-' + i
                scene.add(gltf.scene)
                cubes.push(cube)
                cubes.push(gltf.scene)
                mixer = new THREE.AnimationMixer(gltf.scene);
                zombieClip = THREE.AnimationUtils.subclip(gltf.animations[1]);
                let actionZombieWalk = mixer.clipAction(zombieClip);
                actionZombieWalk.play()
                mixers.push(mixer);

            },

        )

    }

    // Load village
    loader.load('/models/gltf/minecraft-village/minecraft-village.gltf',
        function (gltf) {
            villageObject = gltf.scene
            gltf.scene.scale.set(4, 4, 4)
            gltf.scene.position.set(0, 21.75, 0)
            gltf.scene.name = 'minecraft-village'
            scene.add(gltf.scene)
            centralCubeBoundingBox = new THREE.Box3().setFromObject(villageObject);
        },


    )


    // Load trees
    for (let i = 0; i < treeCount; i++) {

        // Generate random x and z values within the circular area
        const x = Math.random() * radius * 2 - radius;
        const z = Math.random() * radius * 2 - radius;

        if (Math.sqrt(x * x + z * z) > minDistance) {

            loader.load('/models/gltf/minecraft-tree/minecraft-tree-dark-top.glb',
                function (gltf) {
                    gltf.scene.scale.set(30, 30, 30)
                    gltf.scene.position.set(x, 0, z);
                    const yRotation = Math.random() * 2 * Math.PI; // generate a random y rotation angle between 0 and 2*PI
                    gltf.scene.rotation.y = yRotation
                    scene.add(gltf.scene)
                    const tgeometry = new THREE.BoxGeometry(20, 20, 20);
                    const tmaterial = new THREE.MeshBasicMaterial({
                        color: 0x00ff00,
                        side: THREE.DoubleSide,
                    });
                    //const cubeCamera = new THREE.Mesh(tgeometry, tmaterial);
                    //scene.add(cubeCamera);
                    //cubeCamera.position.set(x, 0, z)
                    //cube.visible = false
                    //cubeCamera.name = 'tree-collider'
                    //scene.add(cube)
                    //trees.push(cube)

                },
            )

        } else {
            // Generate new x and x values and try again
            i--;
        }

    }

    //load shotgun
    loader.load('/models/gltf/minecraft-shotgun/minecraft-shotgun-2.glb',
        function (gltf) {
            gltf.scene.scale.set(4, 4, 4)
            // Set the cube's position to be equal to the camera's position
            gltf.scene.position.set(camera.position.x, camera.position.y, camera.position.z);
            shotgunObject = gltf.scene
            scene.add(gltf.scene)
        },


    )


    window.addEventListener('resize', onWindowResize);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function zombieParts(x, z) {

        for (let i = 0; i < 10; i++) {
            const size = Math.random() * 0.2 + 0.3; // Generates a random number between 0.5 and 0.9
            const zombieCubeGeometry = new THREE.BoxGeometry(size, size, size);
            const zombieCubeMaterial = new THREE.MeshBasicMaterial({ color: getRandomColor() });
            const zombieCube = new THREE.Mesh(zombieCubeGeometry, zombieCubeMaterial);
            // Set the initial position of the cube to 2 units above the origin
            zombieCube.position.set(x, 3, z);
            const zRotation = Math.random() * 2 * Math.PI; // generate a random z rotation angle between 0 and 2*PI
            const xRotation = Math.random() * 2 * Math.PI; // generate a random x rotation angle between 0 and 2*PI
            zombieCube.rotation.z = zRotation;
            zombieCube.rotation.x = xRotation;
            // Translate the cube in a random direction
            zombieCube.translateX(Math.random() * 2 - 1);
            zombieCube.translateY(Math.random() * 2 - 1);
            zombieCube.translateZ(Math.random() * 2 - 1);
            zombieCubes.push(zombieCube);
            scene.add(zombieCube);
        }

    }

    radius = 125;
    minDistance = 50;
    loader = new GLTFLoader(manager);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load('/models/gltf/Ralph/wreck-_it_ralph.glb',
        function (gltf) {

            gltf.scene.scale.set(4, 4, 4);
            gltf.scene.position.copy(new THREE.Vector3(100, 0, 50))
            scene.add(gltf.scene);
            gltf.scene.lookAt(centralCube.position);


        },


    )


 
  
}


function fireShotGunSpheres() {

    // Loop 20 times to create 20 spheres
    for (var i = 0; i < 20; i++) {

        // Create a sphere geometry with a radius of 0.05 units and 32 segments on each axis
        var sphere = new THREE.SphereGeometry(.05, 32, 32);

        // Create a basic mesh material with a yellow color
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        // Combine the sphere geometry and material to create a mesh
        var sphereMesh = new THREE.Mesh(sphere, material);

        // Set the sphere position to a random position within a 0.5 unit cube area relative to the shotgun object position
        sphereMesh.position.x = camera.position.x + (Math.random() * 0.5 - 0.25);
        sphereMesh.position.y = camera.position.y + (Math.random() * 0.5 - 0.25) - 1;
        sphereMesh.position.z = camera.position.z + (Math.random() * 0.5 - 0.25);

        // Add the sphere to the scene
        scene.add(sphereMesh);

        // Add the sphere to the shotGunSpheres array
        shotGunSpheres.push(sphereMesh);
    }
}

function animateShotGunParticles() {

    // Loop through each sphere in the shotGunSpheres array
    for (var i = 0; i < shotGunSpheres.length; i++) {
        // Get the current sphere
        var sphere = shotGunSpheres[i];

        // Copy the rotation of the camera to the sphere
        sphere.rotation.copy(camera.rotation)

        // Calculate the distance between the sphere and the starting position
        var distance = sphere.position.distanceTo(shotgunObject.position);

        // If the distance is less than 10 units, move the sphere in a random direction on the x and y axis and down the -z axis
        if (distance < 10) {
            sphere.translateX(Math.random() * 2 - 1);
            sphere.translateY(Math.random() * 2 - 1);
            sphere.translateZ(-3);
        }

        // If the distance is less than 1 unit, hide the sphere
        if (distance < 1) {
            sphere.visible = false;
        }

        // If the distance is greater than 1 unit, show the sphere
        if (distance > 1) {
            sphere.visible = true;
        }

        // If the distance is greater than or equal to 10 units, remove the sphere from the scene and splice it from the shotGunSpheres array
        if (distance >= 10) {
            scene.remove(sphere);
            shotGunSpheres.splice(i, 1);
        }
    }
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}




function animate() {

    requestAnimationFrame(animate);

    animateShotGunParticles();

    time = performance.now();
    delta = clock.getDelta();
    time += delta;

    //handles the player model animation mixers
    if (mixers.length > 0) {
        for (var i = 0; i < mixers.length; i++) {
            mixers[i].update(delta);
        }
    }

    if (controls.isLocked === true) {

        // Set the origin of the raycaster to the current position of the controls object
        raycaster.ray.origin.copy(controls.getObject().position);
        // Adjust the origin of the raycaster slightly downward
        raycaster.ray.origin.y -= 10;

        // Get the intersections of the raycaster with the objects array
        const intersections = raycaster.intersectObjects(objects, false);

        // Check if the raycaster is intersecting with an object
        const onObject = intersections.length > 0;

        // Get the time delta between the current frame and the previous frame
        const delta = (time - prevTime) / 1000;

        // Apply friction to the x and z velocity
        velocity.x -= velocity.x * 20.0 * delta;
        velocity.z -= velocity.z * 20.0 * delta;

        // Apply gravity to the y velocity
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        // Update the direction based on the moveForward and moveBackward variables
        direction.z = Number(moveForward) - Number(moveBackward);
        // Update the direction based on the moveRight and moveLeft variables
        direction.x = Number(moveRight) - Number(moveLeft);
        // Normalize the direction vector to ensure consistent movement in all directions
        direction.normalize();

        // If the moveForward or moveBackward variables are true, update the z velocity
        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        // If the moveLeft or moveRight variables are true, update the x velocity
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        // If the raycaster is intersecting with an object
        if (onObject === true) {
            // Limit the y velocity to 0
            velocity.y = Math.max(0, velocity.y);
            // Set canJump to true
            canJump = true;
        }

        // Move the controls object to the left based on the x velocity
        controls.moveRight(- velocity.x * delta);
        // Move the controls object forward based on the z velocity
        controls.moveForward(- velocity.z * delta);

        // Update the y position of the controls object based on the y velocity
        controls.getObject().position.y += (velocity.y * delta);

        // Check if the y position of the controls object is below the controlElevation
        if (controls.getObject().position.y < controlElevation) {
            // Set the y velocity to 0
            velocity.y = 0;
            // Set the y position of the controls object to the controlElevation
            controls.getObject().position.y = controlElevation;
            // Set canJump to true
            canJump = true;
        }

        controls.moveRight(- velocity.x * delta);
     


        for (let i = 0; i < cubes.length; i++) {

            const cube = cubes[i];

            /// Check if the central cube and the current cube have collided
            const cubeBoundingBox = new THREE.Box3().setFromObject(cube);
            if (centralCubeBoundingBox.intersectsBox(cubeBoundingBox)) {
                // Check if the camera is within 30 units of the current cube
                if (camera.position.distanceTo(cube.position) < 30) {
                    attackPlayer();
                }

            } else {
                // Check if the camera is within 30 units of the current cube
                if (camera.position.distanceTo(cube.position) < 30) {
                    attackPlayer();
                } else {
                    attackVillage();
                }
            }

            // Keep the cube on the same plane as the central cube
            cube.position.y = cubeHeight / 2 - 1;

            // Check if the cube has collided with any other cubes
            for (let j = 0; j < cubes.length; j++) {
                if (i !== j && cube.position.distanceTo(cubes[j].position) < 1) {
                    // Separate the cubes
                    const separationDirection = new THREE.Vector3().subVectors(cube.position, cubes[j].position).normalize();
                    cube.position.add(separationDirection.multiplyScalar(0.001));

                }
            }



            function attackVillage() {
                // call the moveDirection function and pass the centralCube as parameter
                moveDirection(centralCube, cube)
            }

            function attackPlayer() {
                // check if the "sound-zombie-cry" sound is paused
                if (sounds["sound-zombie-cry"].paused) {
                    // if it is, set the volume to .3 and play the sound
                    sounds["sound-zombie-cry"].volume = .3
                    sounds["sound-zombie-cry"].play()
                }
                // call the moveDirection function and pass the camera as parameter
                moveDirection(camera, cube)

            }


        }


        scene.fog.density = 0.01




    }
    else {


        // Use delta to update the speed of rotation
        angleFlyCam += 0.25 * delta; // Adjust the increment as needed

        // calculate the camera position
        var x = radiusFlyCam * Math.sin(angleFlyCam);
        var z = radiusFlyCam * Math.cos(angleFlyCam);

        // update the camera position and rotation
        controls.getObject().position.set(x, lookAtElevationFlyCam, z);
        controls.getObject().lookAt(new THREE.Vector3(0, lookAtElevationFlyCam, 0));

        scene.fog.density = 0.005

    }

    attachPlayerGun()

    //// update the position of each cube when zombie gets shot
    for (const cube of zombieCubes) {
        // Decrement the y position of the cube by a small amount
        cube.position.y -= 10 * delta;
        // If the y position is less than 0, set it to 0
        if (cube.position.y < 0) {
            cube.position.y = 0;
        }
    }

    updateFPS();

    prevTime = time;

    renderer.render(scene, camera);


}


function moveDirection(object, cube) {

    // Calculate the direction from the current cube to the camera
    // This creates a new Vector3 object that represents the direction from the current cube to the camera
    const direction = new THREE.Vector3().subVectors(object.position, cube.position).normalize();
    // Add some randomness to the direction
    // This adds a random value between -0.1 and 0.9 to the x and z components of the direction vector,
    // which makes the cube move in a more random direction
    direction.x += Math.random() * 1 - 2 * delta;
    direction.z += Math.random() * 1 - 2 * delta;
    // Calculate a random hesitation time between 0.8 and 1 seconds
    // This creates a random value between 0.8 and 1, which will be used to slow down the cube's movement
    const hesitation = Math.random() * 0.2 + 0.8;
    // Move the current cube towards the central cube
    // This moves the current cube towards the central cube by a small amount (0.03) multiplied by the hesitation time
    cube.position.add(direction.multiplyScalar(3 * hesitation * delta));
    // Calculate the direction from the current cube to the central cube
    const target = new THREE.Vector3().subVectors(object.position, cube.position).normalize();
    // Calculate the angle between the current cube and the central cube
    // This uses the atan2 function to calculate the angle of the direction vector in radians
    const angle = Math.atan2(target.x, target.z);
    // Rotate the current cube towards the central cube
    // This uses the lerp function to smoothly rotate the cube towards the target angle over time
    cube.rotation.y = THREE.Math.lerp(cube.rotation.y, angle, 5 * delta);

}

function attachPlayerGun() {


    // Add point light for muzzle flash when firing
    pointLight.position.copy(camera.position);
    pointLight.rotation.copy(camera.rotation);
    pointLight.updateMatrix();
    pointLight.translateZ(- 5);
    pointLight.translateY(- 5);
    pointLight.translateX(2);

    // Attach the shotgun the player camera
    shotgunObject.position.copy(camera.position);
    shotgunObject.rotation.copy(camera.rotation);
    shotgunObject.updateMatrix();
    shotgunObject.translateZ(1);
    shotgunObject.translateY(-5);
    shotgunObject.translateX(2);


}

function checkScreenSize() {
    // Check if the width of the window is greater than or equal to 800
    if (window.innerWidth >= 800) {
        // If the width is 800 or greater, display the "Play Now" image, hide the "Loading" image and hide the "PC Game" image
        imgPlayNow.style.display = 'block'
        imgLoading.style.display = 'none'
        imgPCGame.style.display = 'none'
    } else {
        // If the width is less than 800, display the "PC Game" image, hide the "Play Now" image and hide the "Loading" image
        // also hide the top, middle and bottom game divs
        imgPCGame.style.display = 'block'
        imgPlayNow.style.display = 'none'
        imgLoading.style.display = 'none'
       
    }
}


// Assuming imgPlayNow is the ID of the element you want to click
var imgPlayNowElement = document.getElementById('imgPlayNow');

imgPlayNowElement.addEventListener('click', function () {
    controls.lock();
});

//handles starting the audio processing
function loadBackgroundMusic() {

    // create an AudioListener and add it to the camera
    backgroundMusicListener = new THREE.AudioListener();
    //camera.add(backgroundMusicListener);

    // create the PositionalAudio object (passing in the listener)
    backgroundMusicSound = new THREE.PositionalAudio(backgroundMusicListener);

    // load a sound and set it as the PositionalAudio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/background-music-001.wav', function (buffer) {
        backgroundMusicSound.setBuffer(buffer);
        backgroundMusicSound.setLoop(true);
        backgroundMusicSound.setRefDistance(100);
    });

    //set up the analyser so we can get the audio frequency data
    backgroundMusicAnalyser = new THREE.AudioAnalyser(backgroundMusicSound, 128)


}

function updateFPS() {
    // Get the current time
    let currentTime = performance.now();
    // Calculate the number of frames per second (FPS)
    fps = 1000 / (currentTime - prevTime);
    // Round the FPS value to the nearest whole number
    fps = Math.floor(fps);
    // Update the previous time for the next frame
    prevTime = currentTime;

    counter++;
    // Check if 60 frames have passed (1 second)
    if (counter === 60) {
        // Update the HTML element with the current FPS
       // divFPS.innerHTML = '<p> + ' `FPS: ${fps}` + '</p>';
        // Reset the frame counter
        counter = 0;
    }
}


