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
    // assignUniqueIDs();
    // displayBackOfCards();
    document.getElementById('start-game-btn').addEventListener('click', () => startGame());
}

function createHTMLCards(gameBoard) {
    for (let i = 0; i < animalsArray.length * 2; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', handleCardClick);

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.textContent = '?'; //initial hidden content

        card.appendChild(cardContent);
        gameBoard.appendChild(card);
    }
}

function assignUniqueIDs() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((cards, index)=> {
        card.id = `card-${index}`;
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

    flipCard(card);

    if (flippedCards.length === 2) {
        compareCards(flippedCards[0], flippedCards[1]);
        flippedCards = [];
    }

function flipCard(card) {
    card.classList.add('flipped');
    const cardContent = card.querySelector('.card-content');
    const animalIndex = parseInt(card.id.split('-')[1]) / 2;
    cardContent.textContent = animalsArray[animalIndex];
    flippedCards.push(card);
    }
}

// Step 4: Compare Cards and Check Game Completion


// Step 5: If player chooses to 'play again'

initializeGame(); //this is my last line of code