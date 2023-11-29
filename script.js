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
    createHTMLCards();
    assignUniqueIDs();
    displayBackOfCards();
    document.getElementById('start-game-btn').addEventListener('click', () => playerClickPlay());
}