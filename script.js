document.addEventListener("DOMContentLoaded", () => {
    const mainMenu = document.getElementById('main-menu');
    const difficultyMenu = document.getElementById('difficulty-menu');
    const game = document.getElementById('game');
    const playerVsPlayerButton = document.getElementById('playerVsPlayer');
    const playerVsComputerButton = document.getElementById('playerVsComputer');
    const easyButton = document.getElementById('easy');
    const hardButton = document.getElementById('hard');
    const backToMainButton = document.getElementById('backToMain');
    const backToMenuButton = document.getElementById('backToMenu');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const playerTurnElement = document.getElementById('player-turn');
    const xWinsElement = document.getElementById('x-wins');
    const oWinsElement = document.getElementById('o-wins');

    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let xWins = 0;
    let oWins = 0;
    let isPlayerVsComputer = false;
    let difficulty = 'hard';
    let isPlayerTurn = true;

    playerVsPlayerButton.addEventListener('click', () => {
        isPlayerVsComputer = false;
        startGame();
    });

    playerVsComputerButton.addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        difficultyMenu.classList.remove('hidden');
    });

    easyButton.addEventListener('click', () => {
        difficulty = 'easy';
        isPlayerVsComputer = true;
        startGame();
    });

    hardButton.addEventListener('click', () => {
        difficulty = 'hard';
        isPlayerVsComputer = true;
        startGame();
    });

    backToMainButton.addEventListener('click', () => {
        difficultyMenu.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    });

    backToMenuButton.addEventListener('click', () => {
        game.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        resetScoreboard();
    });

    function startGame() {
        mainMenu.classList.add('hidden');
        difficultyMenu.classList.add('hidden');
        game.classList.remove('hidden');
        resetGame();
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        currentPlayer = 'X';
        playerTurnElement.textContent = currentPlayer;
        isPlayerTurn = true;
    }

    function resetScoreboard() {
        xWins = 0;
        oWins = 0;
        xWinsElement.textContent = xWins;
        oWinsElement.textContent = oWins;
    }

    function handleCellClick(event) {
        if (!isPlayerTurn && isPlayerVsComputer) return;

        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] || checkWin()) return;

        makeMove(cell, index);

        if (checkWin()) {
            endGame(false);
        } else if (boardState.every(cell => cell)) {
            endGame(true);
        } else {
            switchPlayer();
            if (isPlayerVsComputer && currentPlayer === 'O') {
                isPlayerTurn = false;
                setTimeout(computerMove, 500);
            }
        }
    }

    function makeMove(cell, index) {
        cell.textContent = currentPlayer;
        boardState[index] = currentPlayer;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnElement.textContent = currentPlayer;
        isPlayerTurn = !isPlayerTurn;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const isWin = winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                pattern.forEach(index => cells[index].classList.add('win'));
                return true;
            }
            return false;
        });

        return isWin;
    }

    function endGame(isDraw) {
        if (isDraw) {
            alert("¡Es un empate!");
        } else {
            alert(`¡${currentPlayer} gana!`);
            if (currentPlayer === 'X') {
                xWins++;
                xWinsElement.textContent = xWins;
            } else {
                oWins++;
                oWinsElement.textContent = oWins;
            }
        }
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        setTimeout(resetGame, 2000); // Reiniciar el juego después de 2 segundos
    }

    function computerMove() {
        const bestMove = difficulty === 'easy' ? getRandomMove() : findBestMove();
        const cell = document.querySelector(`.cell[data-index="${bestMove}"]`);

        makeMove(cell, bestMove);

        if (checkWin()) {
            endGame(false);
        } else if (boardState.every(cell => cell)) {
            endGame(true);
        } else {
            switchPlayer();
            isPlayerTurn = true;
        }
    }

    function getRandomMove() {
        const availableMoves = boardState.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function findBestMove() {
        let bestVal = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < boardState.length; i++) {
            if (!boardState[i]) {
                boardState[i] = currentPlayer;
                let moveVal = minimax(boardState, 0, false);
                boardState[i] = null;
                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }

        return bestMove;
    }

    function minimax(board, depth, isMax) {
        const score = evaluate(board);

        if (score === 10) return score - depth;
        if (score === -10) return score + depth;
        if (board.every(cell => cell)) return 0;

        if (isMax) {
            let best = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = 'O';
                    best = Math.max(best, minimax(board, depth + 1, !isMax));
                    board[i] = null;
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = 'X';
                    best = Math.min(best, minimax(board, depth + 1, !isMax));
                    board[i] = null;
                }
            }
            return best;
        }
    }

    function evaluate(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a] === 'O' ? 10 : -10;
            }
        }

        return 0;
    }
});
