let userName, totalRounds, scores, choices, userChoice, computerChoice, isPlaying = false;

const newForm = document.getElementById("newForm");
const totalRoundsInput = document.getElementById("totalRounds");
const totalRoundsElement = document.getElementById("totalRoundsValue");
const userTitleElement = document.getElementById("user-title");
const buttonElements = document.getElementById("buttons");
const resultElement = document.getElementById("result");
const userScoreElement = document.querySelector(".user-score");
const computerScoreElement = document.querySelector(".computer-score");

const init = () => {
  isPlaying = true;
  scores = [0, 0];
  choices = ["rock", "paper", "scissors"];
  userScoreElement.textContent = 0;
  computerScoreElement.textContent = 0;
};

const reset = () => {
  isPlaying = false;
  newForm.classList.remove("hidden");
  totalRoundsElement.textContent = "";
};

const updateScore = () => {
  userScoreElement.textContent = scores[0];
  computerScoreElement.textContent = scores[1];
};

// display rounds event
totalRoundsInput.addEventListener("input", () => {
  totalRoundsElement.textContent = totalRoundsInput.value;
});

// form event
newForm.addEventListener("submit", e => {
  e.preventDefault();

  totalRounds = +newForm.totalRounds.value;
  userName = newForm.userName.value;

  userTitleElement.textContent = userName;

  init();

  newForm.reset();
  newForm.classList.add("hidden");
  resultElement.className = "";
  resultElement.textContent = "";
});

const displayResult = message => {
  if(message.includes("Win"))
    resultElement.className = "winner";
  else if(message.includes("Lose"))
    resultElement.className = "loser";
  resultElement.textContent = message;
  setTimeout(() => {
    resultElement.className = "";
    resultElement.textContent = "";
  }, 200)
};

buttonElements.addEventListener("click", e => {
  if(isPlaying) {
    if (e.target.classList.contains("far")) {
      userChoice = e.target.classList[0];
      computerChoice = choices[Math.floor(Math.random() * 3)];
      let msg;

      if(userChoice === computerChoice)
        msg = "Tie!";
      
      if(userChoice === "rock")
        if(computerChoice === "scissors") {
          msg = "You Win!";
          scores[0]++;
        }
        else if(computerChoice === "paper") {
          msg = "You Lose!";
          scores[1]++;
        }

        if(userChoice === "scissors")
        if(computerChoice === "paper") {
          msg = "You Win!";
          scores[0]++;
        }
        else if(computerChoice === "rock") {
          msg = "You Lose!";
          scores[1]++;
        }

        if(userChoice === "paper")
        if(computerChoice === "rock") {
          msg = "You Win!";
          scores[0]++;
        }
        else if(computerChoice === "scissors") {
          msg = "You Lose!";
          scores[1]++;
        }

        if(scores[0] === totalRounds || scores[1] === totalRounds) {
          updateScore();
          msg = scores[0] === totalRounds ? "WINNER!" : "LOSER!";
          msg === "WINNER!" ? resultElement.classList.add("winner") : resultElement.classList.add("loser");
          resultElement.textContent = msg;
          reset();
        } else {
          updateScore();
          displayResult(msg);
        }
    }
  }
})