//----constants----//
let animalsArray = ['images/cat.jpg', 'images/dog.jpg', 'images/rabbit.jpg', 'images/chicken.jpg', 'images/cow.jpg', 'images/horse.jpg', 'images/sheep.jpg', 'images/pig.jpg'];

//----state variables----//
let gameActive = false;
let flippedCards = [];
let matchedPairs = 0;

//----cached elements----//

//----event listeners----//

//----functions----//
initializeGame();

function initializeGame() {
    duplicateArrayToMatchingPairs();
    renderBoard();
}

function duplicateArrayToMatchingPairs() {
    animalsArray = [...animalsArray, ...animalsArray];
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    createHTMLCards(gameBoard);
}

function createHTMLCards(gameBoard) {
    // credit: Fisher-Yates shuffle algorithm shown to me by chatgpt and implemented w/ TA Glenn 
    let distroBoard = animalsArray
    for (let a = distroBoard.length - 1; a > 0; a--) {
        const j = Math.floor(Math.random() * (a + 1));
        [distroBoard[a], distroBoard[j]] = [distroBoard[j], distroBoard[a]];
    }
    console.log(distroBoard);
    for (let i = 0; i < distroBoard.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        card.addEventListener('click', (event) => handleCardClick(event)); // how do I get this out??

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        const cardImage = document.createElement('img');
        cardImage.className = 'card-image flipped';
        cardImage.alt = 'Hidden'; // hide image until click to flip
        cardImage.src = distroBoard[i]
        cardContent.appendChild(cardImage);
        card.appendChild(cardContent);
        gameBoard.appendChild(card);
    }
}

startGame();

function startGame() {
    gameActive = true;
}

// Step 3: Handle Card Click
function handleCardClick(event) {
    // console.log(event.target);

    const card = event.target;

    if (!gameActive || !card.classList.contains('flipped')) {
        return; //do nothing if game is not active or card is already flipped
    }
    // check if this is the first click, and if so, start the game
    if (!gameActive) {
        startGame();
    }

    flipCard(card);
    // console.log('bp1')
    // console.log(`flippedCards: ${flippedCards}`)
    if (flippedCards.length === 2) {
        // console.log('bp2')
        compareCards(flippedCards[0], flippedCards[1]);
        flippedCards = [];
    }
}
function flipCard(card) {
    card.classList.toggle('flipped');
    flippedCards.push(card);
    console.log(flippedCards)
}

// Step 4: Compare Cards and Check Game Completion
function compareCards(firstCard, secondCard) {

    // console.log('bp3')
    if (firstCard.src === secondCard.src) {
        console.log('match')
        matchedPairs++;
        checkWin();
        console.log(matchedPairs);
        if (allCardsMatched()) {
            displayGameCompletionMessage();
            revealPlayAgainButton();
        }
    } else {
        console.log('no match')
        setTimeout(() => {
            firstCard.classList.add('flipped')
            secondCard.classList.add('flipped')
            // flipBothCardsBack(firstCard, secondCard);
        }, 1000);
    }
}

function checkWin() {
    if (matchedPairs >= 8) {
        console.log('you win!')
    } else {
        return;
    }
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


// calling this at the end of my script with the intention of it shuffling the array upon page load - does it work?