 let timer;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            alert("Time for a break, QAU Scholar!");
        }
    }, 1000);
});

// Reset Logic
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateDisplay();
});