// Function to create a timer element
let timerElement;

function createTimer() {
    timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.style.fontSize = '8vh';
    timerElement.style.fontWeight = 'bold';
    timerElement.style.textAlign = 'center';
    timerElement.style.position = 'fixed';
    timerElement.style.bottom = '0';
    timerElement.style.left = '50%';
    timerElement.style.transform = 'translateX(-50%)';
    document.body.appendChild(timerElement);
    return timerElement;
}

// Set the initial time in seconds
let timeInSeconds = 0;

// Function to update the timer
function updateTimer() {
    const imgGameOver = document.getElementById('game-over');

    // Check if imgGameOver is visible
    if (imgGameOver.style.display === 'block') {
        // Stop the timer and set the timer to the center
        clearInterval(timerInterval);
        gameTimer.style.position = 'fixed';
        gameTimer.style.bottom = '50%';
        gameTimer.style.transform = 'translate(-50%, 50%)';
        return;
    }

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update the timer display
    gameTimer.innerText = formattedTime;
}

// Function to start the timer
function startTimer() {
    return setInterval(function () {
        timeInSeconds++;
        updateTimer();
    }, 1000);
}

// Create the timer element
const gameTimer = createTimer();
let timerInterval;

// Add event listener to imgPlayNow element
const imgPlayNow = document.getElementById('imgPlayNow');

let timerStarted = false;

imgPlayNow.addEventListener('click', function () {
    if (!timerStarted) {
        timerInterval = startTimer();
        timerStarted = true;
    }
});
