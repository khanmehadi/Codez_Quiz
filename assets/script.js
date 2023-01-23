
let startBtn = document.querySelector("#start-btn");
let mainPage = document.querySelector("#main-page")
let saveScore = document.querySelector("#complete-continue");
let multipleChoice = document.querySelector("#multiple-choice");
let submitContainer = document.querySelector("#submit");
let scoreTimer = document.querySelector("#score-timer")
let timer = document.querySelector("#time");
let myScore = document.querySelector("#score");
let continueBtn = document.querySelector("#continue")
let initials = document.querySelector("#initials");
let submitInit = document.querySelector("#submit-init");
let grade = document.querySelector("#grade")
let initalForm = document.querySelector("form");
let history = document.querySelector("#history");
let submitScorePage = document.querySelector("#submit-score")
let historyContainer = document.querySelector("#history-container")
let historyList = document.querySelector("#history-list");
let backBtn = document.querySelector("#back");
let clearBtn = document.querySelector("#clear")
let clearScorePge = document.querySelector("#cleard-score")
let timeUpContinueBtn = document.querySelector("#time-continue")

let pointStorage;
let btnID = 1;
let position = 0;
let questionNum = 1;
let time = 80;
let points = 0;

submitScorePage.setAttribute("style", "display:none");
saveScore.setAttribute("style", "display:none");
scoreTimer.setAttribute("style", "display:none");
multipleChoice.setAttribute("style", "display:none");
clearScorePge.setAttribute("style", "display:none");

// Create an array containing multiple question and answer objects.
var quizQA = [
    {
        question: "HTML ______ provides addtional information about an HTML element:",
        answer: ["Attributes", "Style", "Classes", "Layout"],
        correct: "Attributes"  
    },

    {
        question: "Which attribute is used to specify a unique way to identify an element?",
        answer: ["class",
                 "id",
                 "href",
                 "placeholder"],
        correct: "id"  
    },
    
    {
        question: "Choose the correct HTML element for the largest heading:",
        answer: [ "h6",
                  "h3",
                  "h1",
                  "All are the same"],
        correct: "<h1>"  
    },
    {
        question: "What does CSS stand for ?",
        answer: [ "Cross Section Style",
                  "Comma Sepperated Style",
                  "Computer Style Section",
                  "Cascading Style Sheets"],
        correct: "Cascading Style Sheets"
    },

    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answer: ["<a>",
                 "<p>",
                 "<style>",
                 "<script>"], 
        correct: "<style>"  
    },

    {
        question: "How do you insert a comment in a CSS file?",
        answer: ["/* */",
                 "//",
                 "/*",
                 "#"],             
        correct: "/* */"  
    },
]

// Inital start of the quiz. The timer and questions are generated and renddered on the screen.
function startQuiz() {
    multipleChoice.setAttribute("style", "display:flex");
    scoreTimer.setAttribute("style", "display:flex")
    mainPage.setAttribute("style", "display:none");
    countDown();
    getQuestions();
}

// Get the questions and answers from the quizQa array object and render them on the screen dynamically.
function getQuestions() {
    let questionPosition = quizQA[position];
    let myQuestion = document.createElement("h2");
    myQuestion.setAttribute("style", "font-size: 40px")
    myQuestion.innerText = position+1 + ") " + questionPosition.question;
    multipleChoice.appendChild(myQuestion);

    for (let a in questionPosition.answer) {
        let myAnswer = document.createElement("button");
        myAnswer.setAttribute("id", btnID);
        myAnswer.setAttribute("class", "btn-answers")
        myAnswer.setAttribute
        ("style", "width:500px; background-color:purple; border-color:purple; margin:2px; font-size:30px; border:10px")
        myAnswer.innerText = questionPosition.answer[a];
        myAnswer.value = questionPosition.answer[a];
        multipleChoice.appendChild(myAnswer);
        btnID++;
    };

    
}

// When an answer is correct 5 points are added to the score. Incorrect answer deducts 10 seconds.
function selectAnswer(e) {
    let answerVal = e.target;
    console.log(answerVal.value);
    if (answerVal.getAttribute("class") !== "btn-answers") {
        console.log(answerVal.getAttribute("class"));
        return;
    }

    if (answerVal.value == quizQA[position].correct){
        nextQuestion("green", "Correct!");
        points += 5;     
    }
    else if (answerVal.value !== quizQA[position].correct) {
        nextQuestion("red", "Incorrect!");
        time = time - 10;
    }
}

// A new page is rendered on the screen after choosing an answer. Wrong answer is displayed incorrect in red
// Correct answers are displayed correct! in green. A button is provided to move to the next set of questions and answers.
function nextQuestion(color, answer) {
    let myValue = document.createElement("p");
    myValue.style.color = color;
    myValue.style.fontSize = "75px"
    myValue.innerText = answer;
    submitContainer.appendChild(myValue);

    position++;
    multipleChoice.innerHTML = "";
    let nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.setAttribute("id", "nextBtn");
    submitContainer.appendChild(nextBtn);

    nextBtn.addEventListener("click", ()=>{
        submitContainer.innerHTML = "";
        if (position >= quizQA.length) {
            saveScore.setAttribute("style", "display:flex");
            grade.setAttribute("style", "color:green;");
            grade.innerHTML = `Your score: ${points}`;
        }
        getQuestions();       
    })
}

// Create countdown by using setInterval function of 1 second. The timer varable is deducted by 1 every second.
function countDown() {
    let timeRemainder = setInterval(() => {
        timer.innerHTML = `Time: ${time}`;
        time--;

        if (time < 0 ) {
            clearInterval(timeRemainder);
            saveScore.setAttribute("style", "display:none");
            multipleChoice.setAttribute("style", "display:none");
            scoreTimer.setAttribute("style", "display:none");
            clearScorePge.setAttribute("style", "display:flex");

        }else if (position >= quizQA.length) {
            clearInterval(timeRemainder);
            // saveScore.setAttribute("style", "display:flex");
            // grade.innerHTML = `Your score: ${points}`;
        }
    }, 1000) 
}

// Rendering the scores of each end user on the page. Score data is retrived from localStorage.
function highScores() {
    saveScore.setAttribute("style", "display:none");
    multipleChoice.setAttribute("style", "display:none");
    scoreTimer.setAttribute("style", "display:none");
    let userScore = JSON.parse(localStorage.getItem("score")) || [];
    
    for (let i = 0; i < userScore.length; i++) {
        submitScorePage.setAttribute("style", "display:flex");
        let players = document.createElement("p");
        players.setAttribute("class", "history");
        players.innerHTML = `Player: ${userScore[i].initial}  ---  Score: ${userScore[i].points}`;
        historyContainer.appendChild(players);
    }   
}

// Setting and getting data from local storage. A userInfo object is created to store the data within the application.
function submitInitialScore(e) {
    e.preventDefault();
    multipleChoice.setAttribute("style", "display:none");
    let userInit = initials.value;

    if (userInit !== "") {
        let userData = JSON.parse(localStorage.getItem("score")) || [];
        let userInfo = {
            points: points,
            initial: userInit
        };
        userData.push(userInfo);
        localStorage.setItem("score", JSON.stringify(userData));
    }
    highScores();
}

// Various event listners to be able to click and interact with the elements.
submitInit.addEventListener("click", submitInitialScore);
myScore.addEventListener("click", highScores);
startBtn.addEventListener("click", startQuiz);
multipleChoice.addEventListener("click", selectAnswer);

// After submitting score, clicking on the backBtn button reloads the page and the user is navigated to the main page.
backBtn.addEventListener("click", ()=>{
    window.location.reload();
});

// Click the button to remove all the score history from local storage.
clearBtn.addEventListener("click", ()=>{
    localStorage.removeItem("score"); 
    window.location.reload(); 
})

// If the Quiz ends due to timeup, the system will end the quiz.
timeUpContinueBtn.addEventListener("click", ()=>{
    clearScorePge.setAttribute("style", "display:none");
    saveScore.setAttribute("style", "display:flex");
})