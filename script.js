// Step 1: Initialize Game
let animalsArray = ['cat', 'dog', 'rabbit', 'chicken', 'cow', 'horse', 'sheep', 'pig'];
let gameActive = false;
let flippedCards = [];
let matchedPairs = 0;

function initializeGame() {
    // duplicateArrayToMatchingPairs();
    // shuffleArray(animalsArray);
    renderBoard();
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
    for (let i = 0; i < animalsArray.length * 2; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', handleCardClick);

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.textContent = '?'; //initial hidden content

        const cardImage = document.createElement('img') ;
        cardImage.src = 'images/dog.jpg'; // dog is currently linked to test
        cardImage.alt = 'Hidden';

        cardContent.appendChild(cardImage);
        // card.appendChild(cardContent);
        gameBoard.appendChild(card);
    }
}

function assignUniqueIDs() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((cards, index) => {
        // card.id = `card-${index}`;
    });
}

function displayBackOfCards() {

}

function startGame() {

}

// Step 3: Handle Card Click
function handleCardClick(card) {
    if (!gameActive || card.classList.contains('flipped')) {
        return; //do nothing if game is not active or card is already flipped
    }

    // check if this is the first click, and if so, start the game
    if (!gameActive) {
        startGame
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


// Step 5: If player chooses to 'play again'

initializeGame(); //this is my last line of code