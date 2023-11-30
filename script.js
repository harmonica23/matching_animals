// Step 1: Initialize Game
let animalsArray = ['cat', 'dog', 'rabbit', 'chicken', 'cow', 'horse', 'sheep', 'pig'];
let gameActive = false;
let flippedCards = [];
let matchedPairs = 0;

// credit: I did not write this function - it is the Fisher-Yates shuffle algorithm shown to me by chatgpt
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeGame() {
    duplicateArrayToMatchingPairs();
    shuffleArray(animalsArray);
    renderBoard();
}

function duplicateArrayToMatchingPairs() {
    animalsArray = [...animalsArray, ...animalsArray];
}

// Step 2: Render Board
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    createHTMLCards(gameBoard);
    assignUniqueIDs();
    displayBackOfCards();
    // set up event listener for first square click
    const firstSquare = document.querySelector('.card');
    firstSquare.addEventListener('click', handleCardClick(firstSquare));
}

function createHTMLCards(gameBoard) {
    const shuffledAnimals = shuffleArray([...animalsArray, ...animalsArray]);

    for (let i = 0; i < animalsArray.length * 2; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', handleCardClick(card));

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const cardImage = document.createElement('img') ;
        cardImage.src = 'images/dog.jpg'; // dog is currently linked to test
        cardImage.alt = 'Hidden'; // hide image until click to flip

        cardContent.appendChild(cardImage);
        // card.appendChild(cardContent);      <---- if I comment this line in, my dog takes up the entire page
        gameBoard.appendChild(card);
    }
}

function assignUniqueIDs() { // stuck here 
    const cards = document.querySelectorAll('.card');
    cards.forEach((cards, index) => {
        // card.id = `card-${index}`;
    });
}

function displayBackOfCards() {
    // want to keep solid color squares here - not sure what to do
}


// Step 3: Handle Card Click
function startGame() {  // how do I shuffle the array upon page load BEFORE click?
    gameActive = true;
    shuffleArray(animalsArray);
}

function handleCardClick(card) {
    if (!gameActive || card.classList.contains('flipped')) {
        return; //do nothing if game is not active or card is already flipped
    }    
    // check if this is the first click, and if so, start the game
    if (!gameActive) {
        startGame();
    }

    flipCard(card);

    if (flippedCards.length === 2) {
        compareCards(flippedCards[0], flippedCards[1]);
        flippedCards = [];
    }
}
    function flipCard(card) {
        card.classList.add('flipped');
        const cardImage = card.querySelector('.card-content img');
        const animalIndex = parseInt(card.id.split('-')[1]) / 2;
        cardImage.src = 'images/' + animalsArray[animalIndex] + '.jpg';
        cardImage.alt = animalsArray[animalIndex];
        flippedCards.push(card);
}

// Step 4: Compare Cards and Check Game Completion
function compareCards(firstCard, secondCard) {
    const firstAnimal = firstCard.querySelector('.card-content img').alt;
    const secondAnimal = secondCard.querySelector('.card-content img').alt;

    if (firstAnimal === secondAnimal) {
        keepCardsOpen(firstCard, secondCard);
        matchedPairs++;

        if(allCardsMatched()) {
            displayGameCompletionMessage();
            revealPlayAgainButton();
        }
    } else {
        setTimeout(() => {
            flipBothCardsBack(firstCard, secondCard);
        }, 1000);
    }
}

function keepCardsOpen() {

}

function allCardsMatched() {

}

function displayGameCompletionMessage() {

}

function revealPlayAgainButton() {

}

// Step 5: If player chooses to 'play again'
function playAgain() {

}

function resetGameBoard() {

}


initializeGame(); //this is my last line of code