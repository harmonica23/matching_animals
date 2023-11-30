// Step 1: Initialize Game
function initializeGame() {
    let animalsArray = ['cat', 'dog', 'rabbit', 'chicken', 'cow', 'horse', 'sheep', 'pig'];
    duplicateArrayToMatchingPairs();
    shuffleArray(animalsArray);
    renderBoard();
}

// Step 2: Render Board
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    createHTMLCards(gameBoard);
    assignUniqueIDs();
    displayBackOfCards();
    document.getElementById('start-game-btn').addEventListener('click', () => playerClickPlay());
}

function createHTMLCards(gameBoard) {
    for (let i = 0; i < animalsArray.length * 2; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-animal', animalsArray[Math.floor(i / 2)])
        card.addEventListener('click', () => handleCardClick(card));

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.textContent = '?'; //initial hidden content

        card.appendChild(cardContent);
        gameBoard.appendChild(card);
    }
}