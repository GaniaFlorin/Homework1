const Mario = document.getElementById("Mario");
const Goomba = document.getElementById("Goomba");
const scoreDisplay = document.getElementById("score");
const playButton = document.getElementById("playButton");

let isGameRunning = false;
let score = 0;
let isAlive;

function jump() {
    if (!isGameRunning || Mario.classList.contains("jump")) {
        return;
    }

    Mario.classList.add("jump");

    setTimeout(function () {
        Mario.classList.remove("jump");
    }, 300);

    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

function gameLoop() {
    if (!isGameRunning) {
        clearInterval(isAlive);
        return;
    }

    let MarioTop = parseInt(window.getComputedStyle(Mario).getPropertyValue("top"));
    let GoombaLeft = parseInt(window.getComputedStyle(Goomba).getPropertyValue("left"));

    if (GoombaLeft < 50 && GoombaLeft > 0 && MarioTop >= 140) {
        isGameRunning = false;
        playButton.disabled = false;
        score = score -1;
        scoreDisplay.innerText = `Score: ${score}`; // Actualizarea afișajului scorului
    } else if (GoombaLeft < -20) {
        resetGoomba();
    }
}

function resetGoomba() {
    Goomba.style.animation = "none";
    Goomba.style.left = "580px";

    setTimeout(function () {
        Goomba.style.animation = "block 1s infinite linear";
    }, 100);
}

function resetGame() {
    score = score -1;
    scoreDisplay.innerText = `Score: ${score}`;
}

document.addEventListener("keydown", function (event) {
    jump();
});

playButton.addEventListener("click", function () {
    startGame();
    playButton.disabled = true;
});

function startGame() {
    isGameRunning = true;
    score = score-1;
    scoreDisplay.innerText = `Score: ${score}`;
    isAlive = setInterval(gameLoop, 10);
}

// Oprim mișcarea Goomba la început
resetGoomba();
