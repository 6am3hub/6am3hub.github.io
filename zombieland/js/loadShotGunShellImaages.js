// Function to create a container and load images into it
function createImageContainer(parentId, containerId, imageCount, imagePath) {
    // Create a container div with initial display set to 'none'
    const container = document.createElement('div');
    container.id = containerId;
    container.style.position = 'fixed';
    container.style.bottom = '0';
    container.style.left = '0';
    container.style.padding = '10px';
    container.style.display = 'none'; // Initially hide the container

    // Append the container to the specified parent element
    const parent = document.getElementById(parentId) || document.body;
    parent.appendChild(container);

    // Load images into the container
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imagePath}/shot-gun-shell.png`;
        img.alt = `Image ${i}`;
        img.style.width = '50px'; // Set the width as needed

        container.appendChild(img);
    }

    // Set interval to continuously check the visibility of the element with ID 'timer' and 'imgPlayNow'
    setInterval(function () {
        const timerElement = document.getElementById('timer');
        const blocker = document.getElementById('blocker');

        if (
            timerElement &&
            window.getComputedStyle(timerElement).display === 'block' &&
            blocker &&
            window.getComputedStyle(blocker).display === 'none'
        ) {
            container.style.display = 'block'; // Show the container
        } else {
            container.style.display = 'none'; // Hide the container
        }
    }, 10); // Adjust the interval as needed
}

let totalShells = 10; // Initial count of shotgun shells

// Function to subtract one shotgun shell from the screen on each mouse click
function subtractShotgunShell() {
    const shotgunShells = document.querySelectorAll('#imageContainer img');

    // Check if there are any shotgun shells left
    if (shotgunShells.length > 0) {
        // Remove the first shotgun shell
        const firstShell = shotgunShells[0];
        firstShell.remove();

        // Decrement the total count of shells
        totalShells--;

        // If no shells are left, add them back when the total count reaches 2
        if (totalShells === 0) {
            totalShells = 10
            createImageContainer('body', 'imageContainer', 10, '../zombieland/images');
        }
    }
}

// Add a click event listener to the document to trigger the subtraction on each click
document.addEventListener('click', subtractShotgunShell);

// Call the function to create the container and load images
createImageContainer('body', 'imageContainer', 10, '../zombieland/images');
