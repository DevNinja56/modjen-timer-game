document.addEventListener("DOMContentLoaded", function () {
  let startTime = 0;
  let elapsedTime = 0;
  let timerRunning = false;
  let speed = 1.005;
  let timerInterval;
  let spaceKeyPressCount = 0;

  const timerElement = document.getElementById("timer");
  const resetBtn = document.getElementById("resetBtn");
  const winnerSound = new Audio("./assets/audio/winner-sound.mp3");
  const loseSound = new Audio("./assets/audio/lose-sound.mp3");

  const handleKeyPressStart = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (spaceKeyPressCount < 2) {
        toggleTimer();
        spaceKeyPressCount++;
      }
    }
  };

  const handleKeyPressReset = (event) => {
    if (event.code === "KeyR") {
      event.preventDefault();
      resetTimer();
    }
  };

  const toggleTimer = () => {
    timerRunning = !timerRunning;
    if (timerRunning) {
      speed = getRandomSpeed();
      startTime = Date.now() - elapsedTime;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      checkWinningCondition();
    }
  };

  const resetTimer = () => {
    timerRunning = false;
    updateTimer();
    startTime = Date.now();
    elapsedTime = 0;
    spaceKeyPressCount = 0;
  };

  const updateTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timerRunning) {
        const currentTime = Date.now();
        elapsedTime = (currentTime - startTime) * speed;
        const totalMilliseconds = Math.floor(elapsedTime);
        const seconds = Math.floor((totalMilliseconds / 1000) % 60);
        const milliseconds = totalMilliseconds % 1000;

        timerElement.textContent = `${String(seconds).padStart(
          2,
          "0"
        )}:${String(Math.floor(milliseconds / 10)).padStart(2, "0")}`;
      } else {
        timerElement.textContent = `${String(0).padStart(2, "0")}:${String(
          0
        ).padStart(2, "0")}`;
      }
    }, 160);
  };

  const getRandomSpeed = () => {
    return Math.random() * 1.5;
  };

  const checkWinningCondition = () => {
    const totalMilliseconds = Math.floor(elapsedTime);
    if (totalMilliseconds === 10000) {
      winnerSound.play();
    } else {
      loseSound.play();
    }
  };

  resetBtn.addEventListener("click", resetTimer);
  document.addEventListener("keydown", handleKeyPressStart);
  document.addEventListener("keydown", handleKeyPressReset);
});
