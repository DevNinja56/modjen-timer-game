document.addEventListener("DOMContentLoaded", function () {
  let startTime = 0;
  let elapsedTime = 0;
  let timerRunning = false;
  let speed = 1.005;
  let timerInterval;

  const timerElement = document.getElementById("timer");
  const resetBtn = document.getElementById("resetBtn");

  const handleKeyPressStart = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      toggleTimer();
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
      startTime = Date.now() - elapsedTime;
      updateTimer();
    } else {
      clearInterval(timerInterval);
    }
  };

  const resetTimer = () => {
    timerRunning = false;
    updateTimer();
    startTime = Date.now();
    elapsedTime = 0;
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
          3,
          "0"
        )}:${String(milliseconds).padStart(3, "0")}`;
      } else {
        timerElement.textContent = `${String(0).padStart(3, "0")}:${String(
          0
        ).padStart(3, "0")}`;
      }
    }, 100);
  };

  resetBtn.addEventListener("click", resetTimer);
  document.addEventListener("keydown", handleKeyPressStart);
  document.addEventListener("keydown", handleKeyPressReset);
});
