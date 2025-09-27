// Your JSON data containing button information
const buttonsData = [
    { label: 'Home', url: '/index.html', iconClass: 'fas fa-home' },
    { label: '3D Menu', url: '/blog/how-to-program-a-3d-menu.html', iconClass: 'fas fa-bars' },
    { label: '3D Games', url: '/3d-games.html', iconClass: 'fas fa-play' },
    { label: 'Simulation', url: '/blog/building-3d-medical-simulations.html', iconClass: 'fas fa-play' },
    { label: 'FPS Starter', url: '/threejs-examples/first-person-shooter-game-starter.html', iconClass: 'fas fa-play' },
    { label: '3D Worlds', url: '/spacex-falcon-9-launch-complex.html', iconClass: 'fas fa-play' },
   
    { label: 'Search', url: '/links.html', iconClass: 'fas fa-search' },
    { label: 'Projects', url: '/projects.html', iconClass: 'fas fa-folder-open' },
    
    { label: 'Videos', url: '/videos.html', iconClass: 'fas fa-video' },
    { label: 'Contact Me', url: '/contact-me.html', iconClass: 'fas fa-envelope' },
    { label: 'Resume', url: '/resume/shane-brumback-resume.pdf', iconClass: 'fas fa-file-alt' }
];

const buttonContainer = document.getElementById('buttonContainer');
buttonContainer.style.justifyContent = 'center'; // Center the buttons
buttonContainer.style.flexGrow = 1; // Allow buttons to grow and evenly space across the container

// Function to smoothly scroll to the target element with a static offset
function scrollToElement(elementId) {
    const offset = -300; // Adjust the offset as needed
    const element = document.getElementById(elementId);

    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition + offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateButtonWidths() {
    const buttonCount = buttonsData.length;

    buttonsData.forEach(buttonInfo => {
        const button = document.getElementById(`btn${buttonInfo.label.replace(/\s+/g, '')}`);
        if (button) {
            button.style.width = `calc(100% / ${buttonCount} - 20px)`; // Adjust 20px as per your margin requirements
            button.style.backgroundColor = 'navy'; // Reset to default background color
            button.style.whiteSpace = 'nowrap';
        }
    });
}

buttonsData.forEach(buttonInfo => {
    const button = document.createElement('button');
    button.id = `btn${buttonInfo.label.replace(/\s+/g, '')}`;
    button.innerHTML = `<i class="${buttonInfo.iconClass}"></i> ${buttonInfo.label}`;

    // Check if the button label is 'Recent Blogs' before adding the click event listener
    if (buttonInfo.label === 'Blogs') {
        button.addEventListener('click', () => {
            // Smooth scroll to 100 pixels before the 'divRecentBlogPosts' element
            const divRecentBlogPosts = document.getElementById('divRecentBlogPosts');
            if (divRecentBlogPosts) {
                const offset = -300; // Adjust the offset as needed
                const targetPosition = divRecentBlogPosts.offsetTop + offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    } else if (buttonInfo.label === 'Resume') {
        button.addEventListener('click', () => {
            // Smooth scroll to the 'contactMe' element
            const contactMeElement = document.getElementById('contactMe');
            if (contactMeElement) {
                const offset = -300; // Adjust the offset as needed
                const targetPosition = contactMeElement.offsetTop + offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    } else if (buttonInfo.label === 'Example') {
        button.addEventListener('click', () => {
            // Smooth scroll to the 'contactMe' element
            const contactMeElement = document.getElementById('divGist');
            if (contactMeElement) {
                const offset = -300; // Adjust the offset as needed
                const targetPosition = contactMeElement.offsetTop + offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    } else {
        // For other buttons, open a new page on button click
        button.addEventListener('click', () => {
            window.open(buttonInfo.url, '_self');
        });
    }

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'white';
        button.style.color = 'yellow';
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'navy';
        button.style.color = 'white';
    });

    buttonContainer.appendChild(button);
});

// Update button widths on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1000) {
        buttonContainer.style.display = 'none';
    } else {
        buttonContainer.style.display = 'flex';
        updateButtonWidths();
    }
});

// Initial orientation check
if (window.matchMedia("(orientation: portrait)").matches) {
    buttonContainer.style.display = 'none';
} else if (window.matchMedia("(orientation: landscape)").matches) {
    buttonContainer.style.display = 'flex';
    updateButtonWidths();
}


// Initial update on page load
updateButtonWidths();

const stickyTitle = document.getElementById('stickyTitle');

// Function to handle the mouse wheel event
function handleMouseWheel(event) {
    // Prevent the default behavior of the mouse wheel event
    event.preventDefault();
}

// Add event listeners to disable mouse wheel on the stickyTitle div
stickyTitle.addEventListener('wheel', handleMouseWheel, { passive: false });


const menuItems = [
    { id: '3', url: '/index.html', position: '30', label: 'Home', icon: 'fas fa-home', fontSize: '4vh' },
    { id: '1', url: '/links.html', position: '10', label: 'Search Site', icon: 'fas fa-search', fontSize: '4vh' },
    { id: '1', url: '/blog/3d-mobile-responsive-game-character-controller.html?&army=true', position: '10', label: 'Mobile 3D Game Character Controller', icon: 'fas fa-cube', fontSize: '4vh' },
    { id: '1', url: '/blog/how-to-program-a-3d-menu.html', position: '10', label: 'Program a 3D Menu', icon: 'fas fa-cube', fontSize: '4vh' },
    { id: '1', url: '/threejs-examples/first-person-shooter-game-starter.html', position: '10', label: 'FPS Shooter Demo', icon: 'fas fa-running', fontSize: '4vh' },
    { id: '1', url: '/blog/threejs-examples-exploring-interactive-visual-particle-systems.html', position: '10', label: 'Interactive Particle Systems', icon: 'fas fa-cube', fontSize: '4vh' },
    { id: '2', url: '/3d-games.html', position: '20', label: '3D Games & Effects', icon: 'fas fa-gamepad', fontSize: '4vh' },
    { id: '2', url: '/blog/enhancing-your-website-with-threejs-star-field-particle-systems.html', position: '20', label: 'Star Field Particle System', icon: 'fas fa-cube', fontSize: '4vh' },
    { id: '2', url: '/blog/how-to-program-a-fire-fountain-particle-system.html', position: '20', label: 'Fire Fountain Particle System', icon: 'fas fa-cube', fontSize: '4vh' },
    { id: '2', url: '/blog/how-to-select-multiple-3d-objects-with-threejs-raycaster.html', position: '20', label: 'Select Objects With a Raycaster', icon: 'fas fa-cube', fontSize: '4vh' },
    { id: '3', url: '/videos.html', position: '30', label: 'Videos', icon: 'fab fa-youtube fa-lg', fontSize: '4vh' },
    { id: '3', url: 'https://github.com/shanebrumback', position: '30', label: 'GitHub', icon: 'fab fa-github fa-lg', fontSize: '4vh' },
    { id: '3', url: '/rss-viewer.html', position: '30', label: 'Subscribe RSS', icon: 'fas fa-rss', fontSize: '4vh' },
    { id: '3', url: '/contact-me.html', position: '30', label: 'Contact Me', icon: 'fas fa-envelope', fontSize: '4vh' },
    { id: '1', url: '/about-me.html', position: '10', label: 'Profile', icon: 'fas fa-user', fontSize: '4vh' },
    { id: '3', url: '/projects.html', position: '30', label: 'Projects', icon: 'fas fa-project-diagram', fontSize: '4vh' }
    
];



// Function to generate mobile menu
function generateMobileMenu() {


    // Get the element with the id 'content' using querySelector
    const content = document.querySelector('.content');
    
    // Check screen width
    if (window.innerWidth < 800) {

        // Create menu icon
        const menuIcon = document.createElement('div');
        menuIcon.id = 'mobile-menu-icon';
        menuIcon.innerHTML = '<i class="fas fa-bars" style="font-size: 5vh;"></i>';
        menuIcon.style.position = 'fixed';
        menuIcon.style.left = '4%';
        menuIcon.style.top = '2.5%'; // Top 10
        menuIcon.style.zIndex = '50000';
        menuIcon.style.cursor = 'pointer';
        document.body.appendChild(menuIcon);
     
        // Toggle menu visibility on icon click
        menuIcon.addEventListener('click', () => {

            if (menuContainer.style.width === '0px' || menuContainer.style.width === '') {
                menuContainer.style.width = '100vw'; // Expand
                document.getElementById('mobile-menu-container').style.display = 'block';
                if(content)
                content.setAttribute('onclick', 'preventDefaultOnClick()');

            } else {
                menuContainer.style.width = '0px'; // Collapse
                document.getElementById('mobile-menu-container').style.display = 'none';
                if(content)
                content.removeAttribute('onclick');
            }
           
        });

    }


    function preventDefaultOnClick() {
        // Prevent default action
        event.preventDefault();

        // You can add your custom logic here
        console.log('Default click action prevented for element with ID "content"');
    }


    // Get the stickyTitle element
    const stickyTitle = document.getElementById('stickyTitle');

    // Get its height
    const stickyTitleHeight = stickyTitle.offsetHeight;

    // Create menu container
    const menuContainer = document.createElement('div');
    menuContainer.id = 'mobile-menu-container';
    menuContainer.style.position = 'fixed';
    menuContainer.style.top = stickyTitleHeight+ 'px';
    menuContainer.style.left = '0'; // Initially on-screen
    menuContainer.style.width = '0px'; // Initially collapsed width
    menuContainer.style.maxHeight = (window.innerHeight - stickyTitleHeight + 10) + 'px'; // Set maximum height to ensure visibility while scrolling
    menuContainer.style.overflowY = 'auto'; // Enable vertical scrolling if content overflows
    menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 1)'; // Set background color to black with 50% opacity
    menuContainer.style.zIndex = '9000';
    menuContainer.style.display = 'none'; // Set default display to none
    document.body.appendChild(menuContainer);
    

    // Create menu list
    const menuList = document.createElement('ul');
    menuList.style.listStyle = 'none';
   
    menuContainer.appendChild(menuList);

    // Populate menu list from array
    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.innerHTML = `<a href="${item.url}" id="${item.id}"></a>`; // No text added
        menuItem.style.marginBottom = '10px';
        menuItem.style.position = 'absolute';
        menuItem.style.top = `${item.position}px`;
        menuList.appendChild(menuItem);
    });


    // Create buttons inside menu container for each URL
    menuItems.forEach(item => {
        const button = document.createElement('button');

        // Create a table element
        const table = document.createElement('table');
        table.style.minWidth = '100%'; // Set table width to 100%

        // Create a single row for the table
        const row = document.createElement('tr');

        // Create the first column for the table (icon column)
        const iconCol = document.createElement('td');
        iconCol.style.width = '1%'; // Set width of the icon column
        const icon = document.createElement('i');
        icon.className = item.icon; // Set icon class directly from menuItems array
        icon.style.fontSize = item.fontSize || 'inherit'; // Set icon font size, fallback to 'inherit' if no fontSize is provided
        icon.style.padding= '10px'; // Add padding to the right of the icon
        iconCol.appendChild(icon);

        // Create the second column for the table (text column)
        const textCol = document.createElement('td');
        textCol.style.textAlign = 'left'; // Align text to the left
        const buttonText = document.createTextNode(item.label.toUpperCase());
        textCol.appendChild(buttonText);

        // Append icon column and text column to the row
        row.appendChild(iconCol);
        row.appendChild(textCol);

        // Append the row to the table
        table.appendChild(row);

        // Append the table to the button
        button.appendChild(table);

        // Set button styles and event listener
        button.style.display = 'block';
        button.style.minWidth = window.innerWidth + 'px'; 
        button.style.minHeight = '75px'
        button.style.cursor = 'pointer';
        button.style.borderWidth = '0';
        button.addEventListener('click', () => {
            window.location.href = item.url;
        });

        // Append the button to the menu container
        menuContainer.appendChild(button);

    });



}



window.addEventListener('load', function () {
    generateMobileMenu();
});
