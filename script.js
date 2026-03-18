const timerDisplay = document.getElementById('timer');
const circle = document.getElementById('progressCircle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let timerId = null;
let isMusicPlaying = false;

// Initialize SVG Circle
circle.style.strokeDasharray = `${circumference} ${circumference}`;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    const percent = (timeLeft / totalTime) * 100;
    setProgress(percent);

    if (timeLeft === 0) {
        clearInterval(timerId);
        alert("Session Complete! Take a break.");
    }
}

document.getElementById('start').onclick = () => {
    if (timerId) return;
    document.getElementById('status').textContent = "Flowing...";
    timerId = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
};

document.getElementById('pause').onclick = () => {
    clearInterval(timerId);
    timerId = null;
    document.getElementById('status').textContent = "Paused";
};

document.getElementById('reset').onclick = () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateTimer();
    setProgress(100);
    document.getElementById('status').textContent = "Ready to Work";
};

// --- Music Logic ---
document.getElementById('musicBtn').onclick = function() {
    const player = document.getElementById('lofiPlayer');
    if (!isMusicPlaying) {
        player.play();
        this.innerHTML = '<i class="fas fa-volume-up"></i> <span>Lofi On</span>';
        this.style.borderColor = "#38bdf8";
    } else {
        player.pause();
        this.innerHTML = '<i class="fas fa-volume-mute"></i> <span>Lofi Off</span>';
        this.style.borderColor = "#334155";
    }
    isMusicPlaying = !isMusicPlaying;
};

// --- Task Management (LocalStorage) ---
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.getElementById('addTask').onclick = () => {
    if (!taskInput.value) return;
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    taskList.appendChild(li);
    taskInput.value = '';
};