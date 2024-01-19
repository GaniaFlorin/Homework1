const buttonSounds = [
    '5.wav',
    '5.wav',
    '5.wav',
    '5.wav',
    '5.wav',
    '5.wav',
    '5.wav',
    '5.wav',
    '5.wav',
];

let scoreElement = document.getElementById('score');

let sequence = [];
let playerMoves = [];
let gameStarted = false;
let level = 1

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        sequence = [];
        playerMoves = [];
        addMoveToSequence();
        playSequence();
    }
}

function addMoveToSequence() {
    for (let i = 0; i < level; i++) {
        const randomIndex = Math.floor(Math.random() * 9);
        sequence.push(randomIndex);
    }
}
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        playMove(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 2000);
}

// Adaugăm o clasă pentru a marca butonul activ
function activateButton(index) {
    const button = document.getElementsByClassName('game-button')[index + 1];
    button.classList.add('button-active');
    setTimeout(() => {
        button.classList.remove('button-active');
    }, 500);
}

// Actualizăm funcția playMove pentru a activa butonul
function playMove(index) {
    const audio = new Audio(buttonSounds[index]);
    audio.play();
    activateButton(index);
    playerMoves.push(index);

    if (!checkMoves()) {
        setTimeout(() => {
            endGame();
        }, 2000);
    } else if (playerMoves.length === sequence.length) {
        setTimeout(() => {
            playerMoves = [];
            level++; // Crește nivelul după completarea tuturor butoanelor
            addMoveToSequence();
            updateScore();
            playSequence();
        }, 2000);
    }
}

function checkMoves() {
    for (let i = 0; i < playerMoves.length; i++) {
        if (playerMoves[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function endGame() {
    if (sequence.length - 1 === 10) {
        setTimeout(() => {
            alert('Felicitări! Ai atins scorul maxim de 10.');
            resetGame();
        }, 2000);
    } else {
        resetGame();
    }
}


function resetGame() {
    sequence = [];
    playerMoves = [];
    gameStarted = false;
    level = 1; // Resetează nivelul la începutul fiecărui joc
    addMoveToSequence();
    updateScore();
    setTimeout(() => {
        playSequence();
    }, 2000);
}


function updateScore() {
    document.getElementById('score').innerText = 'Scor: ' + (sequence.length - 1);
}
