// credit: Fisher-Yates shuffle algorithm shown to me by chatgpt
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// Step 1: Initialize Game
let animalsArray = ['images/cat.jpg', 'images/dog.jpg', 'images/rabbit.jpg', 'images/chicken.jpg', 'images/cow.jpg', 'images/horse.jpg', 'images/sheep.jpg', 'images/pig.jpg'];
let gameActive = false;
let flippedCards = [];
let matchedPairs = 0;

function initializeGame() {
    duplicateArrayToMatchingPairs();
    renderBoard();
}

function duplicateArrayToMatchingPairs() {
    animalsArray = [...animalsArray, ...animalsArray];
}

// Step 2: Render Board
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    createHTMLCards(gameBoard);
    // assignUniqueIDs();

    // set up event listener for first square click
    const firstSquare = document.querySelector('.card');
    firstSquare.addEventListener('click', handleCardClick(firstSquare));
}

function createHTMLCards(gameBoard) {
    let distroBoard = animalsArray
    for (let a = distroBoard.length - 1; a > 0; a--) {
        const j = Math.floor(Math.random() * (a + 1));
        [distroBoard[a], distroBoard[j]] = [distroBoard[j], distroBoard[a]];
    }
    console.log(distroBoard);
    for (let i = 0; i < distroBoard.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', handleCardClick);

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
    // let randomIndex = Math.floor(Math.random() * distroBoard.length)
        const cardImage = document.createElement('img') ;
        cardImage.classList.add('card-image');
        // cardImage.src = 'images/dog.jpg'; // dog is currently linked to test
        cardImage.alt = 'Hidden'; // hide image until click to flip
        cardImage.src = distroBoard[i]
        cardContent.appendChild(cardImage);
        card.appendChild(cardContent); 
        gameBoard.appendChild(card);
    }
}

// function assignUniqueIDs() { // stuck here 
//     const cards = document.querySelectorAll('.card');
//     cards.forEach((card, index) => {
//         card.id = `card-${index}`;
//         // console.log(card)
//     });


// }


// Step 3: Handle Card Click
function startGame() { 
    gameActive = true;
}

function handleCardClick(card) {
    console.log(card);
    if (!gameActive || card.target.classList.contains('flipped')) {
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
        card.target.classList.add('flipped');
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


initializeGame(); 
startGame();  // calling this at the end of my script with the intention of it shuffling the array upon page load - does it work?