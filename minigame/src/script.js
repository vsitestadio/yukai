const useCustomBuilding = true; // set true to use your building image

// Then wrap the old floor creation:
if (!useCustomBuilding) {
  // old code that creates #floors, .floor-line, #ground-platform
}
const elevator = document.getElementById("elevator");
const stopButton = document.getElementById("stop-button");
const restartButton = document.getElementById("restart-button");
const resultDiv = document.getElementById("result");
const floorsDiv = document.getElementById("floors");
const timerDisplay = document.getElementById("timer");
const difficultySelect = document.getElementById("difficulty");
const dangerLabel = document.getElementById("danger-label");
const crashSound = document.getElementById("crash-sound");
const alertSound = document.getElementById("alert-sound");
const crashFlash = document.getElementById("crash-flash");

const nameEntry = document.getElementById("name-entry");
const playerNameInput = document.getElementById("player-name");
const submitScoreBtn = document.getElementById("submit-score");
const tickSound = document.getElementById("tick-sound");

const buildingHeight = 600;
const floorCount = 12;
const floorHeight = buildingHeight / floorCount;
const elevatorHeight = floorHeight;

let elevatorTop = 0;
let falling = true;
let fallSpeed = 5;
let fallMultiplier = 1;
let startTime, timerInterval, tickInterval;
let maxTime = 10;
let timeRemaining = maxTime;
let difficulty = "Normal";
let currentDistance = 0;
let resultText = "";
let frameCount = 0;
let newestEntryIndex = -1;

const effectLayer = document.createElement("div");
effectLayer.classList.add("effect-layer");
document.getElementById("building").appendChild(effectLayer);

function createEffect(type, x, y) {
  const el = document.createElement("div");
  el.classList.add(type);
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  if (type === "spark") {
    const dx = (Math.random() - 0.5) * 60 + "px";
    const dy = 40 + Math.random() * 30 + "px";
    el.style.setProperty("--dx", dx);
    el.style.setProperty("--dy", dy);
    setTimeout(() => el.remove(), 1000);
  } else if (type === "smoke") {
    setTimeout(() => el.remove(), 1500);
  } else if (type === "fire") {
    setTimeout(() => el.remove(), 1000);
  }

  effectLayer.appendChild(el);
}

function createFloors() {
  floorsDiv.innerHTML = "";
  if (useCustomBuilding) return; // DO NOT create floors if using custom building

  for (let i = 0; i <= floorCount; i++) {
    const y = i * floorHeight;
    const floor = document.createElement("div");
    floor.classList.add("floor-line");
    floor.style.top = `${y - 1}px`;
    floor.textContent = `Floor ${floorCount - i}`;
    floorsDiv.appendChild(floor);
  }
}

function updateTimerDisplay() {
  timerDisplay.textContent = `⏱️ 残り時間: ${Math.max(0, timeRemaining.toFixed(1))}秒`;
}

function startTimer() {
  clearInterval(timerInterval);
  startTime = performance.now();
  timerInterval = setInterval(() => {
    const now = performance.now();
    timeRemaining = maxTime - (now - startTime) / 1000;

    if (timeRemaining <= 0) {
      timeRemaining = 0;
      clearInterval(timerInterval);
      updateTimerDisplay();
      stopElevator(true);
    } else {
      updateTimerDisplay();
    }
  }, 100);
}

function startTicking(rate) {
  clearInterval(tickInterval);
  tickInterval = setInterval(() => {
    tickSound.currentTime = 0;
    tickSound.play();
  }, 1000 / rate);
}

function stopTicking() {
  clearInterval(tickInterval);
}

function fall() {
  if (!falling) return;

  elevatorTop += fallSpeed;
  const distance = buildingHeight - (elevatorTop + elevatorHeight);

  if (distance <= 100) {
    if (dangerLabel.style.display === "none") {
      alertSound.currentTime = 0;
      alertSound.play();
    }
    dangerLabel.style.display = "block";
  } else {
    dangerLabel.style.display = "none";
  }

  if (elevatorTop + elevatorHeight >= buildingHeight) {
    elevatorTop = buildingHeight - elevatorHeight;
    falling = false;
    stopElevator(true);
    return;
  }

  elevator.style.top = elevatorTop + "px";

  frameCount++;
  if (frameCount % 5 === 0) {
    const ex = 10 + Math.random() * 100;
    const ey = elevatorTop + Math.random() * 50;
    createEffect("spark", ex, ey);
    createEffect("smoke", ex, ey + 20);
    if (Math.random() < 0.3) {
      createEffect("fire", ex, ey);
    }
  }

  requestAnimationFrame(fall);
}

function updateLeaderboard(name, distance) {
  let scores = JSON.parse(localStorage.getItem("elevatorScores") || "[]");

  if (name && typeof distance === "number") {
    scores.push({ name, distance, mode: difficulty });
  }

  scores = scores.filter(s => s && s.name && typeof s.distance === "number");
  scores.sort((a, b) => a.distance - b.distance);
  scores = scores.slice(0, 5);
  localStorage.setItem("elevatorScores", JSON.stringify(scores));
  newestEntryIndex = scores.findIndex(s => s.name === name && s.distance === distance);
  return scores;
}

function displayLeaderboardHTML(scores) {
  return `
    <div class="leaderboard fade-in">
      <div class="leaderboard-title">トップスコアラー</div>
      ${scores
        .map((s, i) => {
          let rankClass = "";
          if (i === 0) rankClass = "gold";
          else if (i === 1) rankClass = "silver";
          else if (i === 2) rankClass = "bronze";

          const highlightClass = (i === newestEntryIndex) ? "newest-entry" : "";

          return `<div class="leaderboard-entry ${highlightClass}">
            <span class="rank ${rankClass}">${i + 1}.</span>
            <span class="name">${s.name}</span>
            <span class="score">(${s.distance}m - ${s.mode})</span>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function stopElevator(crashed = false) {
  clearInterval(timerInterval);
  stopTicking();
  timeRemaining = 0;
  updateTimerDisplay();
  stopButton.disabled = true;
  falling = false;

  const distance = Math.round(buildingHeight - (elevatorTop + elevatorHeight));
  const floor = Math.max(0, Math.floor((buildingHeight - elevatorTop - elevatorHeight) / floorHeight));
  currentDistance = crashed ? null : distance;

  if (crashed) {
    crashSound.currentTime = 0;
    crashSound.play();
    crashFlash.style.opacity = 1;
    setTimeout(() => crashFlash.style.opacity = 0, 300);
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 600);
  }
  const floorLabel = floor === 0 ? "地下" : `${floor}階`;
resultText = crashed
  ? `制限時間内に止められませんでした。\nスコア: 失格`
  : `${floorLabel}で停止（地面から ${distance}m）`;
  resultDiv.innerHTML = `<p>${resultText.replace(/\n/g, "<br>")}</p>`;

  if (!crashed) {
    nameEntry.style.display = "block";
    playerNameInput.focus();
  } else {
    const scores = JSON.parse(localStorage.getItem("elevatorScores") || "[]");
    resultDiv.innerHTML += displayLeaderboardHTML(scores);
  }

  dangerLabel.style.display = "none";
}

submitScoreBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim() || "名無し";
  const scores = updateLeaderboard(name, currentDistance);
  resultDiv.innerHTML = `<p>${resultText.replace(/\n/g, "<br>")}</p>${displayLeaderboardHTML(scores)}`;
  nameEntry.style.display = "none";
  playerNameInput.value = "";
});

stopButton.addEventListener("click", () => {
  if (falling) stopElevator(false);
});

restartButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  stopTicking();
  elevatorTop = 0;
  falling = true;
  frameCount = 0;
  elevator.style.top = "0px";
  resultDiv.textContent = "";
  stopButton.disabled = false;
  timeRemaining = maxTime;
  fallSpeed = (buildingHeight / (maxTime * 60)) * fallMultiplier;
  effectLayer.innerHTML = "";

  if (difficulty === "Easy") startTicking(1);
  if (difficulty === "Normal") startTicking(2);
  if (difficulty === "Hard") startTicking(3);

  updateTimerDisplay();
  dangerLabel.style.display = "none";
  crashFlash.style.opacity = 0;
  nameEntry.style.display = "none";
  document.body.classList.remove("shake");
  startTimer();
  fall();
});

difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  switch (difficulty) {
    case "Easy":
      maxTime = 8;
      fallMultiplier = 1;
      break;
    case "Normal":
      maxTime = 5;
      fallMultiplier = 1.3;
      break;
    case "Hard":
      maxTime = 3;
      fallMultiplier = 1.8;
      break;
  }

  fallSpeed = (buildingHeight / (maxTime * 60)) * fallMultiplier;
  updateTimerDisplay();
});

// Init
createFloors();
fallSpeed = (buildingHeight / (maxTime * 60)) * fallMultiplier;
updateTimerDisplay();
startTicking(2);
startTimer();
fall();
