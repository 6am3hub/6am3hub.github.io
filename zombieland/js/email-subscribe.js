// Create a new div element
var emailFormDiv = document.createElement('div');

// Set the HTML content with CSS styles for centering and z-index
var emailFormDiv = document.createElement('div');
emailFormDiv.innerHTML = `
<div id="emailForm" style="padding: 25px;display: none; position: fixed; top:  50%; left: 50%; transform: translate(-50%, -50%); width: 30%; z-index: 5000; background-color: rgba(0, 0, 0, 0.95); text-align: left;">
    <h2 style="padding-top: 25px;line-height: .005; text-align: center; width: 100%">Hi Thanks for Visiting!</h3>
    <p style="padding-left: 25px; padding-right: 25px;">I develop 3D interactive web applications, content, online games and optimize technical SEO to enhance website performance and visitor engagement. Subscribe to receive updates on example code, 3D game demos and tutorials. Contact me if you need help with your web development project.</p>
    <input id="emailInput" style="text-align: center; display: block; max-width: 700px; margin-bottom: 10px; margin-left: auto; margin-right: auto;" value="Enter Email Address">
    <button id="submitButton" style="display: block; width: 75%;height: 50px; padding: 10px;;;margin-left: auto; margin-right: auto;"">SUBSCRIBE</button>
    <button id="maybeLaterButton" style="display: block; width: 75%; padding: 10px; height: 50px; margin-top: 10px;margin-left: auto; margin-right: auto;"">MAYBE LATER</button>
    <button id="contactMeButton" style="display: block; width: 75%; padding: 10px; height: 50px; margin-top: 10px; margin-left: auto; margin-right: auto;" onclick="window.location.href = '../contact-me.html';">CONTACT ME</button>
    <p id="serverMessage" style="margin-top: 10px; width: 100% text-align: justify"></p>
</div>
`;

// Append the email form div to the body
document.body.appendChild(emailFormDiv);


// Function to set styles for email input field, submit button, and "Maybe Later" button based on screen size
function setStylesForScreenSize() {  

    var emailForm = document.getElementById('emailForm');
    var emailInput = document.getElementById('emailInput');
    var submitButton = document.getElementById('submitButton');
    var maybeLaterButton = document.getElementById('maybeLaterButton'); 
    var contactMeButton = document.getElementById('contactMeButton'); 

    // Check if screen width is smaller than 800 pixels
    if (window.innerWidth < 800) {
        emailForm.style.padding = '5px';
        emailForm.style.width = '100%';
        emailForm.style.height = '100%';
        emailInput.style.width = '80%';
        submitButton.style.width = '80%';
        submitButton.style.height = '100px;';
        maybeLaterButton.style.width = '80%';
        contactMeButton.style.width = '80%';
        emailForm.style.textAlign = 'left;';
    } else {
        // Reset styles to default for larger screens
        emailForm.style.width = '30%';
        emailInput.style.width = '75%';
        emailInput.style.padddingBottom = '25px';
        submitButton.style.width = '75%';
        submitButton.style.height = '50px';
        maybeLaterButton.style.width = '75%';
        maybeLaterButton.style.height = '50px';
        contactMeButton.style.width = '75%';
    }
}

setStylesForScreenSize()

// Append the email form div to the body
document.body.appendChild(emailFormDiv);

// Function to send email to Google Script
function sendEmailToGoogleScript() {

    var emailInput = document.getElementById('emailInput');
    var submitButton = document.getElementById('submitButton');
    var maybeLaterButton = document.getElementById('maybeLaterButton');
    var serverMessage = document.getElementById('serverMessage');
    var emailForm = document.getElementById('emailForm');
    var contactMeButton = document.getElementById('contactMeButton');
    serverMessage.style.width = '100%%';
    serverMessage.style.textAlign = 'center';
    serverMessage.style.color = 'white';
    if (!emailInput.value.toLowerCase().includes("enter email address")) {
        if (emailInput.value.toLowerCase().includes("@")) {
            var emailAddress = emailInput.value;
            var endpoint = "https://script.google.com/macros/s/AKfycbypTsgO9Sxd4YIQix5E5atFiw2YFbRgGBEG5EfbmrriIr3QWV_GAJA0tg-KeNHMhwLC8Q/exec?" +
                "&email=" + encodeURIComponent(emailAddress);
            serverMessage.innerHTML = '<br>One Moment.....';
            emailInput.style.display = 'none';
            submitButton.style.display = 'none';
            emailInput.style.display = 'block';
            maybeLaterButton.style.display = 'none';
            contactMeButton.style.display = 'none';
            fetch(endpoint)
                .then(function (response) {
                    return response.text();
                })
                .then(function (text) {
                    console.log(text);
                    if (text.toLowerCase().includes('error')) {
                        submitButton.style.display = 'block';
                        maybeLaterButton.style.display = 'block';
                        serverMessage.innerHTML = '<br>' + text;
                        emailInput.style.display = 'block';
                        serverMessage.style.color = 'red'
                        contactMeButton.style.display = 'block';
                    } else {
                        emailInput.style.display = 'none';
                        serverMessage.innerHTML = '<br>' + text + '<br>' + 'I just sent you a confirmation email.';
                        if (text === "Thanks for joining my email list!") {
                            // Hide the email form immediately
                            setTimeout(function () {
                                if (!localStorage.getItem('hideEmailForm')) {
                                    localStorage.setItem('hideEmailForm', 'true');
                                    emailForm.style.display = 'none';
                                    serverMessage.style.display = 'none';
                                }
                            }, 5000);
                        }
                    }
                })
                .catch(function (err) {
                    console.warn('Something went wrong.', err);
                });
        }
    }

}

// Function for "Maybe Later" button
function maybeLater() {
    // Set a local storage item to hide the email form
    localStorage.setItem('hideEmailForm', 'false');
    // Hide the email form
    document.getElementById('emailForm').style.display = 'none';
    // You can add your logic here for what happens when the user clicks "Maybe Later"
    console.log("Maybe Later clicked");
}

// Add click event listener to the submit button
document.getElementById('submitButton').addEventListener('click', sendEmailToGoogleScript);

// Add click event listener to the "Maybe Later" button
document.getElementById('maybeLaterButton').addEventListener('click', maybeLater);

// Add click event listener to the "Maybe Later" button
document.getElementById('contactMeButton').addEventListener('click', maybeLater);

// Function to check local storage and show/hide email form accordingly
function checkLocalStorage() {
    var hideEmailForm = localStorage.getItem('hideEmailForm');
    if (hideEmailForm === 'true') {
        document.getElementById('emailForm').style.display = 'none';
    } else {
        document.getElementById('emailForm').style.zIndex = '5000';
        document.getElementById('emailForm').style.display = 'block';
    }
}


// Function to delete the hideEmailForm variable from local storage
function deleteHideEmailForm() {
    localStorage.removeItem('hideEmailForm');
    localStorage.removeItem('hideEmailFormUntil');
}


// Check if the URL parameter clear-storage is set to true
const urlParams = new URLSearchParams(window.location.search);
const clearStorageParam = urlParams.get('clear-storage');
if (clearStorageParam === 'true') {
    // Call deleteHideEmailForm function to remove hideEmailForm variable from local storage
    deleteHideEmailForm();
}

// Function for "Maybe Later" button
function maybeLater() {
    // Set a local storage item to hide the email form for 1 hour
    var hideEmailFormUntil = new Date().getTime() + 1 * 60 * 60 * 1000; // 1 hour from now
    localStorage.setItem('hideEmailFormUntil', hideEmailFormUntil);

    // Hide the email form
    document.getElementById('emailForm').style.display = 'none';
    // You can add your logic here for what happens when the user clicks "Maybe Later"
    console.log("Maybe Later clicked");
}

// Add click event listener to the "Maybe Later" button
document.getElementById('maybeLaterButton').addEventListener('click', maybeLater);

// Function to check local storage and show/hide email form accordingly
function checkLocalStorage() {
    var hideEmailForm = localStorage.getItem('hideEmailForm');
    if (hideEmailForm === 'true') {
        document.getElementById('emailForm').style.display = 'none';
    } else {
        var hideEmailFormUntil = localStorage.getItem('hideEmailFormUntil');
        var currentTime = new Date().getTime();
        if (hideEmailFormUntil && currentTime < parseInt(hideEmailFormUntil)) {
            // Hide the email form if the hideEmailFormUntil time has not passed yet
            document.getElementById('emailForm').style.display = 'none';
        } else {
            // Show the email form if the hideEmailFormUntil time has passed or if the variable doesn't exist
            document.getElementById('emailForm').style.display = 'block';
        }
    }

}


// Hide the email form immediately
setTimeout(function () {
    checkLocalStorage();
}, 10000);


// Get the email input element
const emailInput = document.getElementById('emailInput');

// Boolean variable to track if input has been clicked
let isFirstClick = true;

// Add event listener for click event
emailInput.addEventListener('click', function () {
    // Check if it's the first click
    if (isFirstClick) {
        // Clear the input value
        emailInput.value = '';
        // Update isFirstClick to false
        isFirstClick = false;
    }
});

