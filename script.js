let timer;
let isRunning = false;
let timeLeft = 25 * 60; // Pomodoro timer set for 25 minutes (work time)
let sessionCount = 0;
let isWorkSession = true; // Boolean to track whether it's work or break time

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const sessionCountDisplay = document.getElementById('session-count');
const sessionTypeDisplay = document.getElementById('session-type');
const container = document.querySelector('.container');

// Update the timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start the timer
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startButton.disabled = true;
  pauseButton.disabled = false;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft === 0) {
      clearInterval(timer);
      isRunning = false;
      startButton.disabled = false;
      pauseButton.disabled = true;
      sessionCount++;
      sessionCountDisplay.textContent = sessionCount;

      // Switch between work and break sessions
      if (isWorkSession) {
        // Start Break Time (5 minutes)
        timeLeft = 5 * 60; // Break time
        sessionTypeDisplay.textContent = 'Break Session';
        container.style.backgroundColor = '#ffcccb'; // Light red for break
      } else {
        // Start Work Time (25 minutes)
        timeLeft = 25 * 60; // Work time
        sessionTypeDisplay.textContent = 'Work Session';
        container.style.backgroundColor = '#d3ffd3'; // Light green for work
      }

      isWorkSession = !isWorkSession; // Toggle session type
      updateDisplay();
      alert(isWorkSession ? 'Pomodoro session complete!' : 'Work time is over!');
    }
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

// Reset the timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  timeLeft = 25 * 60; // Reset to initial Pomodoro time (25 minutes)
  sessionTypeDisplay.textContent = 'Work Session';
  container.style.backgroundColor = '#d3ffd3'; // Default background color (Work)
  updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();
