// variables

// const start = document.querySelector("#start");
const questionRef = document.querySelector("#question");
const answersRef = Array.from(document.querySelectorAll(".answer-text"));
const answersContainerRef = Array.from(document.querySelectorAll(".answers-container"));
const nextQuestionsRef = document.querySelector('#next-question');
const finishRef = document.querySelector('#finish');
const scoreRef = document.querySelector('#score');
const incorrectScoreRef = document.querySelector('#incorrect');
const questionImageRef = document.querySelector('#fit-picture');


let answerSelected = true;
let currentQuestionIndex = -1;
let score = 0;
let availableQuestions= [];


// Constants
const QUESTIONS = [
    {
        "question": "Guess the logo?",
        "options": [ "Shell", "BP", "Exon", "Gazprom"],
        "correct": 1,
        "imgSrc": "assets/images/logo1.PNG"
    },
    {
        "question": "Guess the logo?",
        "options": [ "Samsung", "Apple", "Toshiba", "Google"],
        "correct": 2,
        "imgSrc": "assets/images/logo2.PNG"
    },
    {
        "question": "Guess the logo?",
        "options": [ "Burger King", "SuperMacs", "Subway", "McDonalds" ],
        "correct": 4,
        "imgSrc": "assets/images/logo3.PNG"
    },
    {
        "question": "Guess the logo?",
        "options": [ "Samsung", "Intel", "Xiaomi", "Dell" ],
        "correct": 1,
        "imgSrc": "assets/images/logo4.PNG"
    },
   
]

// Start quiz

startGame = () => {
    currentQuestionIndex = -1;
    score = 0;
    availableQuestions= [...QUESTIONS];
    renderNextQuestion();
}

//Quiz game

function renderNextQuestion() {
    for (let answerRef of answersRef) {
        answerRef.classList.remove("correct");
        answerRef.classList.remove("incorrect")
    }
    console.log('questionIndex', currentQuestionIndex)
    console.log('questionLength', QUESTIONS.length -1)
    if (currentQuestionIndex === QUESTIONS.length -1) {
        nextQuestionsRef.style.display = 'none'  
        finishRef.style.display = 'inline'  
    } else {
        finishRef.style.display = 'none'
        if (answerSelected) {
            currentQuestionIndex++;
            let nextQuestion = QUESTIONS[currentQuestionIndex];
    
            questionRef.innerText = nextQuestion["question"]
            for (i = 0; i<nextQuestion["options"].length; i++){
                answersRef[i].innerText = nextQuestion["options"][i];
            }
    
            questionImageRef.src=nextQuestion["imgSrc"]
            answerSelected = false;
        } 
    }
    
}

function onUserSelection(clickEvent) {
    if(!answerSelected) {
        let userSelection = clickEvent.currentTarget.children[1].dataset.number;
        let currentQuestion = QUESTIONS[currentQuestionIndex];
        let correctOption = currentQuestion["correct"];
        answerSelected = true;
        
        if (userSelection == correctOption) {
            clickEvent.currentTarget.children[1].classList.add('correct');
            incrementScore();
        } else {
            clickEvent.currentTarget.children[1].classList.add('incorrect');
            incrementWrongAnswer();
        }
    }
    
}

// scores area
function incrementScore() {
    let oldScore = parseInt(scoreRef.innerText);
    scoreRef.innerText = ++oldScore;
  }
  
  function incrementWrongAnswer() {
    let oldScore = parseInt(incorrectScoreRef.innerText);
    incorrectScoreRef.innerText = ++oldScore;
  }

  window.addEventListener('DOMContentLoaded', (event) => {
    startGame()
});

for (const answer of answersContainerRef) {
    answer.addEventListener("click", onUserSelection);
}

function saveHighScore() {
    let score = parseInt(scoreRef.innerText);
    localStorage.setItem('score', score);
    window.location.assign("highscores.html");
}



