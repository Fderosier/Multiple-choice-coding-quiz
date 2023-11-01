//questions and answers
const questions = [
  {
      question: "What is the capital of France?",
      options: ["Madrid", "Berlin", "Paris", "Rome"],
      answer: "Paris"
  },
  {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
  }
  // can add more questions here
];

// elements
const startButton = document.getElementById("start-button");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const endScreen = document.getElementById("end-screen");
const scoreText = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-button");

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 60; // Set your time limit in seconds
let timerInterval;


// Function to start the game
function startGame() {
  startButton.style.display = "none";
  questionScreen.style.display = "block";
  timer = timeLimit;
  displayNextQuestion();
  startTimer();
}

// Function to display the next question
function displayNextQuestion() {
  if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      questionText.textContent = question.question;
      optionsContainer.innerHTML = "";
      question.options.forEach((option, index) => {
          const optionButton = document.createElement("button");
          optionButton.textContent = option;
          optionButton.addEventListener("click", () => checkAnswer(option, question.answer));
          optionsContainer.appendChild(optionButton);
      });
  } else {
      endGame();
  }
}

// Function to check the answer
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
      score++;
  } else {
      // Penalty for wrong answers 
      timer -= 10;
  }
  currentQuestionIndex++;
  displayNextQuestion();
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time: ${timeLimit} s`;
  timer = timeLimit;
  timerInterval = setInterval(() => {
      timer--;
      timerElement.textContent = `Time: ${timer} s`;
      if (timer <= 0) {
          clearInterval(timerInterval);
          endGame();
      }
  }, 1000);
}

// Function to end the game
function endGame() {
  questionScreen.style.display = "none";
  endScreen.style.display = "block";
  scoreText.textContent = `Your score: ${score}`;
}

// Function to save the score 
function saveScore() {
  const initials = initialsInput.value;
  // Save the score and initials to a database or storage
  console.log(`Saved score: ${score}, Initials: ${initials}`);
  // implement saving to a server or local storage here
}

// Event listeners
startButton.addEventListener("click", startGame);
saveButton.addEventListener("click", saveScore);