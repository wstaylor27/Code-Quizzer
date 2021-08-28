// Variables
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// Questions
questions = [
    {
        question: "Which bootstrap class set property and side for margin-left and right?",
        choices: ["a. lm-mr", "b. ml-rm", "c. mr", "d. mx"],
        answer: "d. mx"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. quotes", "b. camel case", "c. comma", "d. question marks"],
        answer: "a. quotes"
    },

    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c. alerts"
    },
    {
        question: "How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b. function myFunction()"
    },

    {
        question: "Why is JSON used?",
        choices: ["a. To store and transfer data", "b. To clean JavaScript", "c. To multiply and divide numbers", "d. To spellcheck entire code"],
        answer: "a. To store and transfer data"
    },
    {
        question: "The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a. 0"
    },
    {
        question: "Who invented JavaScript?",
        choices: ["a. Douglas Crockford", "b. Sheryl Sandberg", "c. Brendan Eich", "d. Ben Javascript"],
        answer: "c. Brendan Eich"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
        answer: "c. if(i == 5)"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
        answer: "a. //This is a comment"
    },
    {
        question: "What is does JSON stand for?",
        choices: ["a. Just Stay On North", "b. JavaScript Object Notation", "c. Java Structure Object Notation", "d. JavaScript Omit Notation"],
        answer: "b. JavaScript Object Notation"
    }
];


// Timer
var totalTime = 60;
function newQuiz() {
    questionIndex = 0;
    totalTime = 60;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function () {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);

    showQuiz();
};


// Show question after hitting start
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// Show wrong or correct
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // 1 point added if correct
        correctAns++;
        // console.log(correctAns);
        answerCheck.textContent = "Correct!";
    } else {
        // 10 seconds deduct if wrong
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // Next Question
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // Game over
        gameOver();
    }
}

function chooseA() {
    checkAnswer(0);
}

function chooseB() {
    checkAnswer(1);
}

function chooseC() {
    checkAnswer(2);
}

function chooseD() {
    checkAnswer(3);
}

// Game Over screen
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // Final Score
    finalScore.textContent = correctAns;
}

// Enter Initials 
function storeHighScores(event) {
    event.preventDefault();

    // Repeat function if blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    }

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    // Store scores
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // Stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    // Show current highscores
    showHighScores();
}

// High Scores Page
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

// Event Listeners

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function (event) {
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
    showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});