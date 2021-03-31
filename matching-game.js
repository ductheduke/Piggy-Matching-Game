// Declare starting variables
let theLeftSide = document.getElementById("leftSide");
let theRightSide = document.getElementById("rightSide");
let theBody = document.getElementsByTagName("body")[0];
let topText = document.getElementById("instructions");
let reset = document.getElementById("reset");
let textContainer = document.getElementById("textContainer");
let numberOfPiggies = 5;
let level = 1;
let score = 0;


// Start the game
function generatePiggies() { 
    for (let i = 0; i < numberOfPiggies; i++) {

        // Generate the original set of images
        let piggy = document.createElement('img');
        piggy.src = 'images/piggy.png';
        piggy.height = "90";

        // Create random values for top location
        let randomTop = Math.floor(Math.random() * 400) + 1;
        piggy.style.top = randomTop + 'px';

        // Create random values for left location
        let randomLeft = Math.floor(Math.random() * 400) + 1;
        piggy.style.left = randomLeft + 'px';
        
        // Place the images in the left side box
        theLeftSide.appendChild(piggy);
    }

    // Copy the left side into the right side
    let leftSideImages = theLeftSide.cloneNode(true);

    // Remove the last image
    leftSideImages.removeChild(leftSideImages.lastChild);     

    // Append all these new leftSideImages to the Right Side
    theRightSide.appendChild(leftSideImages);                 

    // If player clicks on the correct image, move onto next level
    theLeftSide.lastChild.addEventListener('click',nextLevel); 

    // If player clicks on anything other than the correct image then game over
    theBody.addEventListener('click',gameOver);          
}

function nextLevel(event) {
    // Make sure the event does not get applied to other elements in the web page
    event.stopPropagation();

    // Increase the number of images in the next level
    numberOfPiggies += 5;             

    // After the correct image was selected, all images must be removed before a new set of images is generated 
    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }
    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }

    // Start the next level
    generatePiggies();

    // Keep track of level
    level++;

    // Keep track of current score
    score = level * 10;
    currentScore();
}

// Game over if player selects anything other than the correct image
function gameOver() {

    // Circle the correct answer
    let correctAnswer = theLeftSide.lastChild;
    correctAnswer.style.border = "3px";
    correctAnswer.style.borderStyle = "dashed";
    correctAnswer.style.borderColor = "red";
    correctAnswer.style.borderRadius = "50%";

    // Prevent future clicks from doing anything
    theBody.onclick = null;
    theLeftSide.lastChild.onclick = null;

    // Change the instructional text to display the incorrect choice condition
    topText.innerHTML = "Wrong Piggy! Game Over! The correct piggy is circled below";

    // Display the Reset button to create a new game
    let gameOver = document.createElement("button");
    gameOver.innerHTML = "Start Over!";
    gameOver.onclick = function() {
        location.reload();
    };
    reset.appendChild(gameOver);
}

// Keep track of the current level
function currentLevel() {
  document.getElementById("header").innerHTML = "You're at Level: " + level;
}

// Keep track of the current score
function currentScore() {
  document.getElementById("score").innerHTML = "Your Current Score: " + score.toLocaleString();
}