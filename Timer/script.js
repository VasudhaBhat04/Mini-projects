const { ipcRenderer } = require('electron');

const timerDisplay = document.getElementById('timerDisplay');
const buttonGroup = document.getElementById('buttonGroup');
const catBox = document.getElementById('catBox');
const closeBtn = document.getElementById('closeBtn');
const minimizeBtn = document.getElementById('minimizeBtn');

const STATES = {
  BEFORE: 'BEFORE',
  DURING: 'DURING',
  AFTER: 'AFTER'
};

let currentState = STATES.BEFORE;
let timer = null;
let isPaused = false;
let timeLeft = 25 * 60; 

closeBtn.addEventListener('click', () => { window.close(); });
minimizeBtn.addEventListener('click', () => { ipcRenderer.send('minimize-app'); });

function renderUI() {
  buttonGroup.innerHTML = '';
  

  catBox.className = 'cat-box'; 

  switch (currentState) {
    case STATES.BEFORE:
      catBox.classList.add('before');
      timerDisplay.innerText = "START THE STUDY TIMER ^..^";
      
      const startBtn = document.createElement('button');
      startBtn.className = 'action-btn';
      startBtn.innerText = 'START';
      startBtn.onclick = startTimer;
      buttonGroup.appendChild(startBtn);
      break;

    case STATES.DURING:
      catBox.classList.add('during');
      updateTimerText();
      
      const pauseBtn = document.createElement('button');
      pauseBtn.className = 'action-btn';
      pauseBtn.innerText = isPaused ? 'RESUME' : 'PAUSE';
      pauseBtn.onclick = togglePause;
      
      const resetBtn = document.createElement('button');
      resetBtn.className = 'action-btn';
      resetBtn.innerText = 'RESET';
      resetBtn.onclick = resetTimer;
      
      buttonGroup.appendChild(pauseBtn);
      buttonGroup.appendChild(resetBtn);
      break;

    case STATES.AFTER:
      catBox.classList.add('after');
      timerDisplay.innerText = "WELL DONE ^..^ !!";
      
      const focusBtn = document.createElement('button');
      focusBtn.className = 'action-btn';
      focusBtn.innerText = 'FOCUS';
      focusBtn.onclick = backToReady;
      buttonGroup.appendChild(focusBtn);
      break;
  }
}

function updateTimerText() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  currentState = STATES.DURING;
  isPaused = false;
  timeLeft = 25 * 60;
  runInterval();
  renderUI();
}

function runInterval() {
  timer = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateTimerText();

      if (timeLeft <= 0) {
        clearInterval(timer);
        currentState = STATES.AFTER;
        renderUI();
      }
    }
  }, 1000);
}

function togglePause() {
  isPaused = !isPaused;
  renderUI();
}

function resetTimer() {
  clearInterval(timer);
  currentState = STATES.BEFORE;
  timeLeft = 25 * 60;
  renderUI();
}

function backToReady() {
  currentState = STATES.BEFORE;
  renderUI();
}

renderUI();
