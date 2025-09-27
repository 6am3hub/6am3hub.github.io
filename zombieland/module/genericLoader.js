// Import necessary modules
import * as THREE from 'three'; // import the Three.js library
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // import the GLTFLoader module

// Define the function to load a character model
export function loadCharacter(modelFilePath, screenLocation, size, cameraZoom, draggable, hyperlink, rotate) {


    // Check if the screen width is less than 800 pixels
    if (window.innerWidth > 800) {

        // Create a new scene, camera, and clock
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var clock = new THREE.Clock();
        camera.position.z = cameraZoom;
        camera.position.y = 1;

        // Create a renderer
        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(size.width + '%', size.height + '%'); // Set renderer size using percentage
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.shadowMap.enabled = true;
        renderer.gammaOutput = true;
        renderer.setClearColor(0x000000, 0);

        // Create a container div for the renderer
        var divContainer = document.createElement('div');
        divContainer.id = 'rendererContainer';
        divContainer.style.width = size.width + '%'; // Use percentage for width
        divContainer.style.height = size.height + '%'; // Use percentage for height
        divContainer.style.position = 'fixed';


        // Add text message element
        var textMessage = document.createElement('div');
        textMessage.textContent = 'Interactive 3D Object Drag Model Rotate Mouse Wheel Double Click to Load Mobile Controller or Hyperlink to another page.';
        textMessage.style.position = 'absolute';
        textMessage.style.width = '250px'; // Set width to 250px
        textMessage.style.height = '40px'; // Set height to 100px
        textMessage.style.bottom = '0';
        textMessage.style.left = '50%';
        textMessage.style.display = 'none';
        textMessage.style.transform = 'translateX(-50%)';
        textMessage.style.color = 'white';
        textMessage.style.fontFamily = 'Arial, sans-serif';
        textMessage.style.fontSize = '12px';
        textMessage.style.textAlign = 'center';
        textMessage.style.padding = '5px';
        textMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        textMessage.style.pointerEvents = 'none'; // Ensure the message doesn't interfere with mouse events

        // Append the text message to the renderer container
        divContainer.appendChild(textMessage);


        // Event listener to hide the text message on mouse leave
        divContainer.addEventListener('mouseleave', function () {
            hideTextMessage();
        });

        // Function to hide the text message
        function hideTextMessage() {
            textMessage.style.display = 'none'; // Hide the message
        }

        // Event listener to show the text message on mouse enter
        divContainer.addEventListener('mouseenter', function () {
            showTextMessage();
        });

        // Flag to track if the message has been displayed
        var messageDisplayed = false;

        // Function to show the text message for 5 seconds, only once
        function showTextMessage() {
            if (!messageDisplayed) {
                textMessage.style.display = 'block'; // Show the message
                setTimeout(hideTextMessage, 10000); // Hide the message after 5 seconds
                messageDisplayed = true; // Set the flag to true
            }
        }


        // Event listener to update message position when mouse moves over the renderer container
        divContainer.addEventListener('mousemove', function (event) {
            updateMessagePosition(event);
        });


        /// Event listener to update message position when mouse moves over the renderer container
        divContainer.addEventListener('mousemove', function (event) {
            updateMessagePosition(event);
        });

        // Function to update the text message position based on mouse movement
        function updateMessagePosition(event) {

            // Calculate mouse position relative to the renderer container
            const containerRect = divContainer.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            // Set message position to the right of the mouse, centered vertically
            const messageWidth = textMessage.offsetWidth;
            const messageHeight = textMessage.offsetHeight;
            const messageX = mouseX + messageWidth / 2; // Shift by half the width of the text message
            const messageY = mouseY - messageHeight; // Place above the mouse

            // Ensure the message is not positioned outside the container
            const maxX = containerRect.width - messageWidth;
            const maxY = containerRect.height - messageHeight;
            textMessage.style.left = messageX;
            textMessage.style.top = `${Math.min(messageY, Math.max(0, messageY))}px`;

        }


        // Append the renderer to the container and the container to the document body
        document.body.appendChild(divContainer);

        // Calculate left position based on percentage
        divContainer.style.left = `calc(${screenLocation.left}% - ${size.width / 2}%)`;

        // Calculate top position based on percentage
        divContainer.style.top = screenLocation.top + '%';
        divContainer.style.zIndex = '9999';


        // Check if the renderer should be clickable to navigate to a hyperlink
        if (hyperlink) {
            var clickedOnce = false; // Flag to track if the renderer was clicked once

            // Single-click event handler
            divContainer.onclick = function () {
                if (!clickedOnce) {
                    // If not clicked once, set the flag and start a timer to reset it
                    clickedOnce = true;
                    setTimeout(function () {
                        clickedOnce = false;
                    }, 300); // Adjust the delay (in milliseconds) as needed for your double-click interval
                } else {
                    // If clicked twice (double-click), open the hyperlink in a new window
                    window.open(hyperlink, '_blank');
                    clickedOnce = false; // Reset the flag
                }
            };

            // Prevent the default action for double-click (selecting text)
            divContainer.ondblclick = function (event) {
                event.preventDefault();
            };
        }

        // Append the renderer to the container and the container to the document body
        divContainer.appendChild(renderer.domElement);
        document.body.appendChild(divContainer);

        // Add ambient light to the scene
        var ambientLight = new THREE.AmbientLight(0xffffff, 1); // Default intensity
        scene.add(ambientLight);


        var model; // Variable to hold the loaded model


        let animations = []
        let animationsData = []
        let animationMixer;
        let mixer;
        let mixers;

        var loader = new GLTFLoader();

        // Load the GLB model
        loader.load(modelFilePath, function (gltf) {

            model = gltf.scene;// Get the loaded 3D model scene

            model.position.set(0, 0, 0);  // Set the position of the model

            scene.add(model); // Add the model to the scene

            animationsData = gltf.animations

            animationMixer = new THREE.AnimationMixer(model); // Create an AnimationMixer for the model
            animations = []; // Initialize an array to store animation clips
            animationsData.forEach((animationClip, index) => { // Iterate over animation clips
                const action = animationMixer.clipAction(animationClip); // Create an action for the clip
                const name = animationClip.name || `Animation ${index + 1}`; // Get animation name or set a default name
                animations.push({ clip: action, name: name }); // Store the animation clip and name in the array
               // console.log(animationClip.name)
            });

          
            // Play idle animation when inner circle touch ends
            playAnimation('idle', 1, 1);

            // Prototype to control stances when character stops
            // Requires character animation clip names to contain 'stand'
            function randomStance() {

                // Array to store animations that include 'stand'
                var standAnimations = [];

                // Loop through the animationsData array to find animations that include 'stand'
                animationsData.forEach(function (animationClip, index) {
                   // if (animationClip.name.includes('stand')) {
                        standAnimations.push(animationClip.name);
                   // }
                });

                // If no animations with 'stand' are found, return
                if (standAnimations.length === 0) {
                    console.log("No animations with 'stand' found.");
                    return;
                }

                // Pick a random index from the standAnimations array
                var randomIndex = Math.floor(Math.random() * standAnimations.length);

                // Get the random animation name from standAnimations
                var randomAnimation = standAnimations[randomIndex];

                // Output the random animation name
               // console.log("Random animation with 'stand': " + randomAnimation);

                // Play random animation clip
                playAnimation(randomAnimation, 1, 1);
            }

            

            // Animation player
            function playAnimation(animationName, speed, duration) {
                //console.log('test ' + animationName);
                const animation = animations.find(anim => anim.name.toLowerCase().includes(animationName.toLowerCase()));

                if (animation) {
                    // Stop all other animations
                    animations.forEach(anim => {
                        if (anim.clip !== animation.clip && anim.clip.isRunning()) {
                            // Cross-fade to the new animation
                            anim.clip.crossFadeTo(animation.clip, .25, duration, true);
                        }
                    });

                    // Play the selected animation
                    animation.clip.reset();
                    animation.clip.timeScale = speed;
                    animation.clip.play();
                }
            }



            // Add event listener to change model orientation when mouse over the scene
            divContainer.addEventListener('mouseover', function () {
              //  playAnimations(); // Play animations again

                randomStance();

                // Create a new vector based on camera position but with the same y-coordinate as the model
                var targetPosition = new THREE.Vector3(camera.position.x, model.position.y, camera.position.z);

                // Smoothly rotate the model towards the camera using quaternions
                var quaternion = new THREE.Quaternion();
                model.lookAt(targetPosition);
                model.getWorldQuaternion(quaternion);
                model.quaternion.slerp(quaternion, 0.1); // Adjust the interpolation factor (0.1 in this example) for smoother or faster rotation
            });



            // Add event listeners to change ambient light intensity when mouse over the scene
            divContainer.addEventListener('mouseleave', function () {

                // Play idle animation when inner circle touch ends
                playAnimation('idle', 1, 1);

            });
          

            if (modelFilePath.includes('bot')) { //testing
                // Adjust material properties for specific models
                if (modelFilePath.includes('heavy-bot')) {
                    model.traverse(function (child) {
                        if (child.isMesh) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.5;
                            child.frustumCulled = true;
                        }
                    });
                }
            }

            // Define the animate function to render the scene
            function animate() {
                requestAnimationFrame(animate);
                var delta = clock.getDelta(); // Get time elapsed since last frame

                if (animationMixer) {
                    animationMixer.update(delta);
                }

                if (rotate && !divContainer.matches(':hover')) {
                    // Rotate the model using delta time only if the rotate parameter is true and the mouse is not over the renderer
                    model.rotation.y += 0.5 * delta; // Adjust the rotation speed as needed
                }

                renderer.render(scene, camera);
            }
            animate(); // Call the animate function

            // Define function to handle window resize
            window.addEventListener('resize', onWindowResize);

            // Call onWindowResize to set initial sizes
            onWindowResize();

            // Function to handle window resizing
            function onWindowResize() {
                const aspectRatio = divContainer.clientWidth / divContainer.clientHeight;
                camera.aspect = aspectRatio;
                renderer.setSize(divContainer.clientWidth, divContainer.clientHeight);
                camera.updateProjectionMatrix();

                // Hide or show renderer containers based on screen width
                const screenWidth = window.innerWidth;
                var rendererContainers = document.querySelectorAll('#rendererContainer');
                rendererContainers.forEach(function (container) {
                    container.style.display = screenWidth < 700 ? 'none' : 'block';
                });
            }
        });


        // Functionality for draggable renderers
        if (draggable) {
            var offsetX, offsetY;
            var isDragging = false;
            var isMouseOver = false; // Flag to track if mouse is over the renderer

            function startDrag(event) {
                offsetX = event.clientX - divContainer.getBoundingClientRect().left;
                offsetY = event.clientY - divContainer.getBoundingClientRect().top;
                isDragging = true;
                isMouseOver = true; // Set mouse over to true when dragging starts
            }

            function drag(event) {
                if (!isDragging) return;
                var newX = event.clientX - offsetX;
                var newY = event.clientY - offsetY;
                divContainer.style.left = newX + 'px';
                divContainer.style.top = newY + 'px';
            }

            function endDrag() {
                isDragging = false;
                isMouseOver = false; // Reset mouse over flag when dragging ends
            }

            divContainer.addEventListener('mousedown', startDrag);
            divContainer.addEventListener('mousemove', drag);
            divContainer.addEventListener('mouseup', endDrag);

            // Add event listeners to track mouse entering and leaving the renderer
            divContainer.addEventListener('mouseenter', function () {
                isMouseOver = true;
            });

            divContainer.addEventListener('mouseleave', function () {
                isMouseOver = false;
            });
        }

        // Add event listener to rotate the model on mouse wheel scroll
        divContainer.addEventListener('wheel', function (event) {
            if (isMouseOver) {
                // Check if the mouse is over the renderer
                event.preventDefault(); // Prevent default scrolling behavior
                var targetRotationY = model.rotation.y + event.deltaY * 0.016; // Determine the target rotation based on wheel delta
                smoothRotateModel(targetRotationY); // Call function to smoothly rotate the model
            }
        });

      
        // Add event listeners to change ambient light intensity when mouse over the scene
        divContainer.addEventListener('mouseover', function () {
            ambientLight.intensity = 2; // Increase intensity
           
        });

        divContainer.addEventListener('mouseout', function () {
            ambientLight.intensity = .5; // Revert to default intensity
        });

        // Add event listener to rotate the model on mouse wheel scroll
        divContainer.addEventListener('wheel', function (event) {
            if (divContainer.matches(':hover')) {
                // Check if the mouse is over the renderer
                event.preventDefault(); // Prevent default scrolling behavior
                var targetRotationY = model.rotation.y + event.deltaY * 0.01; // Determine the target rotation based on wheel delta
                smoothRotateModel(targetRotationY); // Call function to smoothly rotate the model
            }
        });


        // Add event listener to rotate the model on mouse wheel scroll
        divContainer.addEventListener('wheel', function (event) {
            if (divContainer.matches(':hover')) {
                // Check if the mouse is over the renderer
                event.preventDefault(); // Prevent default scrolling behavior
                var targetRotationY = model.rotation.y + event.deltaY * 0.016; // Determine the target rotation based on wheel delta
                smoothRotateModel(targetRotationY); // Call function to smoothly rotate the model
            }
        });

        // Function to smoothly rotate the model towards the target rotation
        function smoothRotateModel(targetRotationY) {
            var startRotationY = model.rotation.y;
            var duration = 0.5; // Duration of the rotation animation in seconds
            var startTime = performance.now(); // Get the start time of the animation

            function update() {
                var currentTime = performance.now();
                var deltaTime = (currentTime - startTime) / 1000; // Convert milliseconds to seconds
                var t = Math.min(1, deltaTime / duration); // Calculate the interpolation factor (clamped between 0 and 1)
                var lerpRotationY = THREE.MathUtils.lerp(startRotationY, targetRotationY, t); // Perform linear interpolation
                model.rotation.y = lerpRotationY;

                if (t < 1) {
                    // Continue the animation if interpolation factor is less than 1
                    requestAnimationFrame(update);
                }
            }

            // Start the animation
            update();
        }


        // Function to move renderer containers based on screen width
        function moveRendererContainers() {
            if (window.innerWidth < 700) {
                var contentDiv = document.getElementsByClassName('content')[0];
                var rendererContainers = document.querySelectorAll('#rendererContainer');
                rendererContainers.forEach(function (container) {
                    contentDiv.insertBefore(container, contentDiv.firstChild);
                    makeDraggable(container);
                });
            }
        }

        // Function to make renderer containers draggable
        function makeDraggable(container) {
            var offsetX, offsetY;
            var isDragging = false;

            function startDrag(event) {
                offsetX = event.clientX - container.getBoundingClientRect().left;
                offsetY = event.clientY - container.getBoundingClientRect().top;
                isDragging = true;
            }

            function drag(event) {
                if (!isDragging) return;
                var newX = event.clientX - offsetX;
                var newY = event.clientY - offsetY;
                container.style.left = newX + 'px';
                container.style.top = newY + 'px';
            }

            function endDrag() {
                isDragging = false;
            }

            container.addEventListener('mousedown', startDrag);
            container.addEventListener('mousemove', drag);
            container.addEventListener('mouseup', endDrag);
        }

        // Call the function once on load and add a resize listener
        moveRendererContainers();
        window.addEventListener('resize', moveRendererContainers);

        // Save the original camera position
        var originalCameraPosition = camera.position.clone();

        // Add event listener to zoom camera when mouse is over the model
        divContainer.addEventListener('mouseenter', function () {
            var targetZoomedPosition = originalCameraPosition.clone().multiplyScalar(0.95); // Calculate the zoomed position
            lerpCameraPosition(originalCameraPosition, targetZoomedPosition, 0.5); // Call the lerp function to smoothly move the camera to the zoomed position
        });

        // Add event listener to lerp camera back to original position when mouse leaves the model
        divContainer.addEventListener('mouseleave', function () {
            lerpCameraPosition(camera.position, originalCameraPosition, 0.5); // Call the lerp function to smoothly move the camera back to the original position
        });

        // Function to lerp camera position
        function lerpCameraPosition(startPosition, endPosition, duration) {
            var startTime = performance.now();
            var currentPosition = new THREE.Vector3().copy(startPosition);

            function update() {
                var currentTime = performance.now();
                var elapsed = (currentTime - startTime) / 1000; // Convert milliseconds to seconds
                var t = elapsed / duration;
                t = t > 1 ? 1 : t; // Ensure t does not exceed 1
                currentPosition.lerp(endPosition, t);
                camera.position.copy(currentPosition);

                if (t < 1) {
                    requestAnimationFrame(update);
                }
            }

            update();
        }

    }

}
