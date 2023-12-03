//----constants----//
let animalsArray = ['images/cat.jpg', 'images/dog.jpg', 'images/rabbit.jpg', 'images/chicken.jpg', 'images/cow.jpg', 'images/horse.jpg', 'images/sheep.jpg', 'images/pig.jpg'];

//----state variables----//
let gameActive = false;
let flippedCards = [];
let matchedPairs = 0;

//----cached elements----//
const playAgainBtn = document.querySelector('#play-again-btn')

//----event listeners----//
playAgainBtn.addEventListener('click', () => {
    initializeGame();
})

//----functions----//
initializeGame();

function initializeGame() {
    matchedPairs = 0;
    document.querySelector('#play-again-btn').style.display = 'none';
    renderBoard();
}

function duplicateArrayToMatchingPairs() {
    animalsArray = [...animalsArray, ...animalsArray];
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.replaceChildren();
    createHTMLCards(gameBoard);
}

// this function generates a set of html elements representing the cards on my gameboard
function createHTMLCards(gameBoard) {
    //this line creates a new duplicated array of animalsArray - using ... spreads the elements of the array
    let distroBoard = [...animalsArray, ...animalsArray];
    //this section uses the Fisher-Yates algorithm to shuffle the 'distroboard' so cards are distributed randomly on the board
    for (let a = distroBoard.length - 1; a > 0; a--) {
        const j = Math.floor(Math.random() * (a + 1));
        [distroBoard[a], distroBoard[j]] = [distroBoard[j], distroBoard[a]];
    }
    // this section creates the cards - the code enters a loop to create HTML elements for each card. It used the document.createElement method to create a div element and set its class name to 'card'
    for (let i = 0; i < distroBoard.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
    // this code adds an event listener to each card and listens for a 'click' event, then calls the handleCardClick' function when a card is clicked
        card.addEventListener('click', (event) => handleCardClick(event));
    // creates card element and appends to the game board
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        const cardImage = document.createElement('img');
        cardImage.className = 'card-image flipped';
        cardImage.alt = 'Hidden';
        cardImage.src = distroBoard[i]
        cardContent.appendChild(cardImage);
        card.appendChild(cardContent);
        gameBoard.appendChild(card);
    }
}

// start the game
function startGame() {
    gameActive = true;
}

// Handle Card Click
function handleCardClick(event) {
    const card = event.target;
    if (!card.classList.contains('flipped')) {
        return;
    }
    if (!gameActive) {
        gameActive = true;
    }
    flipCard(card);
    if (flippedCards.length === 2) {
        compareCards(flippedCards[0], flippedCards[1]);
        flippedCards = [];
    }
}

function flipCard(card) {
    card.classList.toggle('flipped');
    flippedCards.push(card);
}

// Compare Cards and Check Game Completion
function compareCards(firstCard, secondCard) {
    if (firstCard.src === secondCard.src) {
        matchedPairs++;
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.add('flipped')
            secondCard.classList.add('flipped')
        }, 1000);
    }
}

function checkWin() {
    if (matchedPairs >= 8) {
        console.log('you win!')
    document.querySelector('#play-again-btn').style.display = 'block';
    } else {
        return;
    }
}






