

let timer = setInterval(checkSliderVisibility, 1000); // Check every 1 second

window.onload = function () {
    activeSlider()
};


function checkSliderVisibility() {
    var slider = document.querySelector('.slider');
    if (slider && slider.style.display !== 'none') {
        slider.style.display = 'block'; // Make the slider visible
        clearInterval(timer); // Turn off the timer
        activeSlider();
    }
}

let allowOrbit;
window.allowOrbit;

function activeSlider(){

    var sliderButton = document.getElementById('sliderButton');
    if (sliderButton) {
        sliderButton.addEventListener("click", toggleDivVisibility);
        sliderButton.addEventListener('click', function () {
            if (isSliderOpen) {
                closeSlider();
                document.body.style.overflow = 'auto';
            } else {
                openSlider();
                document.body.style.overflow = 'hidden';
            }
        });


        var isSliderOpen = false;

        function openSlider() {
            var sliderWidth = document.querySelector('.slider').offsetWidth;
            var buttonWidth = sliderButton.offsetWidth;
            sliderButton.style.left = (sliderWidth - buttonWidth) + 'px';
            isSliderOpen = true;
            window.allowOrbit = true;
        }

        function closeSlider() {
            sliderButton.style.left = '0';
            isSliderOpen = false;
            window.allowOrbit = false;
        }


        var slider = document.querySelector('.slider');
        slider.style.display = 'block';


        // Get the current page name
        const currentPage = window.location.pathname;

        // Check if the page name contains the word "zombie"
        if (currentPage.includes('zombie')) {
            // Get all elements with the class name "slider"
            const sliders = document.getElementsByClassName('slider');

            // Loop through the sliders and set their display property to "none"
            for (let i = 0; i < sliders.length; i++) {
                sliders[i].style.display = 'none';
            }
        }

    }

}



function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDivVisibility() {

    var divElements = document.getElementsByTagName("div");
    var renderer = document.getElementById('renderer');
    var threeMenu = document.getElementById('3d-menu');
    var sliderContent = document.getElementById('slider-content');
    var slider = document.querySelector('.slider');
    var rendererFocus = document.getElementById('renderer-focus');

    for (var i = 0; i < divElements.length; i++) {
        var div = divElements[i];
        if (div.style.visibility === "hidden") {
            div.style.visibility = "visible";
            if (renderer)
                renderer.style.zIndex = '-1';
            if (rendererFocus) {
                rendererFocus.style.zIndex = '-1';
                renderer.style.zIndex = '-2';
            }
            if(threeMenu)
            threeMenu.style.zIndex = '-1';
        } else {
            div.style.visibility = "hidden";
            if(renderer)
                renderer.style.zIndex = '0';
            if (rendererFocus) {
                rendererFocus.style.zIndex = '0';
                renderer.style.zIndex = '-1';
            }
            if (threeMenu)
                threeMenu.style.zIndex = '-1';

            // Get the current URL
            const currentUrl = window.location.href;

            // Extract the page name from the URL
            const currentPageName = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

            //// Check if the page name is "index" 
            //if (currentPageName == 'index.html') {
            //    // Page name is "index"
            //    renderer.style.zIndex = '-2';
            //    console.log('Current page is index.');
            //} else {
            //    // Page name is not "index"
            //   // renderer.style.zIndex = '-1';
            //    console.log('Current page is not index.');
            //}

        }

        
        

    }


    sliderButton.style.visibility = "visible"
    slider.style.visibility = "visible"

   
}


createPageScrollElement();

// Function to create the page scroll element 
function createPageScrollElement() {
    // Check if divGist exists
    const divGist = document.getElementById('divGist');


    if (!divGist) {
        return; // Exit function if divGist does not exist
    }

    // Create outer circle
    const outerCircle = document.createElement('div');
    outerCircle.id = 'scroll-controller';
    outerCircle.style.width = '18vw'; // Set the width to 22% of viewport width
    outerCircle.style.height = '18vw'; // Set the height to 22% of viewport width
    outerCircle.style.maxWidth = '75px'; // Set the maximum width to 75px
    outerCircle.style.maxHeight = '75px'; // Set the maximum height to 75px
    outerCircle.style.borderRadius = '50%'; // Make the border radius 50% for circular shape
    outerCircle.style.backgroundColor = 'rgba(250, 250, 250, 0.40)'; // Set background color with opacity
    outerCircle.style.position = 'fixed'; // Position the circle fixed within the viewport
    outerCircle.style.top = '13%'; // Set the distance from the bottom to 3%
    outerCircle.style.left = '3%'; // Set the distance from the right to 3%
    outerCircle.style.background = 'radial-gradient(circle at 50% 0px, #ffffff, rgba(255, 255, 255, 0) 88%)'; // Add radial gradient background
    outerCircle.classList.add('ball'); // Add the "ball" class for styling
    outerCircle.style.display = 'flex'; // Apply flexbox to center content
    outerCircle.style.justifyContent = 'center'; // Center content horizontally
    outerCircle.style.alignItems = 'center'; // Center content vertically
    outerCircle.style.boxShadow = '0px 0px 9px 4px #747DE8'; // Add box shadow
    outerCircle.style.animation = 'glowShadow 1.5s linear infinite alternate'; // Add animation effect
    outerCircle.style.zIndex = '3000';

    // Add box-shadow and animation styles
    outerCircle.style.boxShadow = '0px 0px 9px 4px #747DE8'; // Add box shadow
    outerCircle.style.animation = 'glowShadow 1.5s linear infinite alternate'; // Add animation effect

    document.body.appendChild(outerCircle); // Append the outer circle to the document body

    // Create inner circle (Code button)
    const innerCircle = document.createElement('div');
    innerCircle.style.width = '75%'; // Set the width of the inner circle
    innerCircle.style.height = '75%'; // Set the height of the inner circle
    innerCircle.style.borderRadius = '50%'; // Make the border radius 50% for circular shape
    innerCircle.style.position = 'relative'; // Position the circle relative to its parent
    innerCircle.style.cursor = 'pointer'; // Set cursor to pointer
    innerCircle.style.background = 'radial-gradient(circle at 50% 120%, rgba(129, 232, 246, 0.95), rgba(118, 222, 239, 0.75) 10%, rgba(5, 81, 148, 0.75) 80%, rgba(6, 39, 69, 0.75) 100%)'; // Main radial gradient background with opacity

    // Create code icon div
    const codeIcon = document.createElement('i');
    codeIcon.className = 'fas fa-code'; // Set the icon class
    codeIcon.style.fontSize = '25px'; // Set the font size
    codeIcon.style.color = 'rgba(255, 255, 255, 0.5)'; // Set the color to white with 50% opacity
    codeIcon.style.position = 'absolute'; // Position the icon absolutely
    codeIcon.style.top = '50%'; // Set the distance from the top to 50%
    codeIcon.style.left = '50%'; // Set the distance from the left to 50%
    codeIcon.style.transform = 'translate(-50%, -50%)'; // Center the icon both horizontally and vertically

    // Append the icon to the inner circle
    innerCircle.appendChild(codeIcon);

    // Append the inner circle to the outer circle
    outerCircle.appendChild(innerCircle);

    // Function to smoothly scroll to the divGist element
    function scrollToDivGist() {
        const targetPosition = divGist.offsetTop - 150; // Calculate the target scroll position 150px above divGist
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }

    // Function to toggle scroll between divGist and top of the page
    function toggleScroll() {
        const currentPosition = window.scrollY;
        if (currentPosition === 0) {
            scrollToDivGist(); // If at top, scroll to divGist
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // If not at top, scroll to top
        }
    }

    // Add click event listener to innerCircle to toggle scroll
    innerCircle.addEventListener('click', toggleScroll);
}
