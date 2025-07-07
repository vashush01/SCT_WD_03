const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
