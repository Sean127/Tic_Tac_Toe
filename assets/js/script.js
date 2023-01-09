const winningCombonations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X";


function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        let winCondition = winningCombonations[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        if (currentPlayer === "X"){
			winningMessage.innerHTML ="Player 1 Wins!!!";
			let oldScore = parseInt(document.getElementById("player1-win").innerText);
			document.getElementById("player1-win").innerText = ++oldScore;
		}
		else{
			winningMessage.innerHTML =" Player 2 Wins!!!";
			let oldScore = parseInt(document.getElementById("player2-win").innerText);
			document.getElementById("player2-win").innerText = ++oldScore;
		}
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        winningMessage.innerHTML ="Draw!!!";
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
	winningMessage.innerHTML ="";

}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restart').addEventListener('click', handleRestartGame);
