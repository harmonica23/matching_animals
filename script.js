//----constants----//
let animalsArray = ['images/cat.jpg', 'images/dog.jpg', 'images/rabbit.jpg', 'images/chicken.jpg', 'images/cow.jpg', 'images/horse.jpg', 'images/sheep.jpg', 'images/pig.jpg'];

//----state variables----//
let gameActive = false;
let flippedCards = [];
let matchedPairs = 0;
let loading = false;

//----cached elements----//
const playAgainBtn = document.querySelector('#play-again-btn');
const gameBoard = document.getElementById('game-board');
const subheader = document.getElementById('subheader');
const fiddleAudio = document.getElementById('fiddle-audio');
const cardFlipAudio = document.getElementById('card-flip-audio');
document.getElementById("copyright").innerHTML = `&copy; ${new Date().getFullYear()} Matching Animals Memory Game`

//----event listeners----//
playAgainBtn.addEventListener('click', () => {
    initializeGame();
})

gameBoard.addEventListener('click', handleCardClick);

//----functions----//
initializeGame();

function initializeGame() {
    matchedPairs = 0;
    document.querySelector('#play-again-btn').style.display = 'none';
    renderBoard();
    fiddleAudio.pause();
    fiddleAudio.currentTime = 0;
}

function duplicateArrayToMatchingPairs() {
    animalsArray = [...animalsArray, ...animalsArray];
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.replaceChildren();
    createHTMLCards(gameBoard);
}

function createHTMLCards(gameBoard) {
    let distroBoard = [...animalsArray, ...animalsArray];
    for (let a = distroBoard.length - 1; a > 0; a--) {
        const j = Math.floor(Math.random() * (a + 1));
        [distroBoard[a], distroBoard[j]] = [distroBoard[j], distroBoard[a]];
    }
    for (let i = 0; i < distroBoard.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
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

function startGame() {
    gameActive = true;
}

function handleCardClick(event) {
    if (loading) return;
    const card = event.target;
    if (!card.classList.contains('flipped')) {
        return;
    }
    if (!gameActive) {
        gameActive = true;
        subheader.innerText = ' ';
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

function compareCards(firstCard, secondCard) {
    loading = true;
    if (firstCard.src === secondCard.src) {
        matchedPairs++;
        loading = false;
        checkWin();
    } else {
        setTimeout(() => {
            cardFlipAudio.play()
            cardFlipAudio.volume = 0.3;
            firstCard.classList.add('flipped')
            secondCard.classList.add('flipped')
            loading = false;
        }, 500);
    }
}

function checkWin() {
    if (matchedPairs >= 8) {
    document.querySelector('#play-again-btn').style.display = 'block';
    fiddleAudio.play();
    fiddleAudio.volume = 0.08;
    } else {
        return;
    }
}



