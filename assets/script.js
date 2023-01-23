
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
let time = 10;
let points = 0;

submitScorePage.setAttribute("style", "display:none");
saveScore.setAttribute("style", "display:none");
scoreTimer.setAttribute("style", "display:none");
multipleChoice.setAttribute("style", "display:none");
clearScorePge.setAttribute("style", "display:none");

var quizQA = [
    {
        question: "HTML ______ provides addtional information about an HTML element:",
        answer: ["Attributes", "Values", "Id", "incorrect"],
        correct: "Attributes"  
    },

    {
        question: "Which attribute is used to specify a unique way to identify an element?",
        answer: ["incorrect",
                 "id",
                 "incorrect",
                 "incorrect"],
        correct: "id"  
    },
    
    {
        question: "Choose the correct HTML element for the largest heading:",
        answer: ["incorrect",
                  "incorrect",
                  "<h1>",
                  "incorrect"],
        correct: "<h1>"  
    },
    {
        question: "What does CSS stand for?",
        answer: ["incorec",
                  "incorrect",
                  "incorrect",
                  "Cascading Style Sheets"],
        correct: "Cascading Style Sheets"
    },

    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answer: ["incorrect",
                 "incorrect",
                 "<style>",
                 "incorrect"], 
        correct: "<style>"  
    },

    {
        question: "How do you insert a comment in a CSS file?",
        answer: ["/* */",
                 "incorrect",
                 "incorrect",
                 "incorrect"],             
        correct: "/* */"  
    },
]

function startQuiz() {
    multipleChoice.setAttribute("style", "display:flex");
    scoreTimer.setAttribute("style", "display:flex")
    mainPage.setAttribute("style", "display:none");
    countDown();
    getQuestions();
}


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
        getQuestions();       
    })
}

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
            saveScore.setAttribute("style", "display:flex");
            grade.innerHTML = `Your score: ${points}`;
        }
    }, 1000) 
}

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


submitInit.addEventListener("click", submitInitialScore);
myScore.addEventListener("click", highScores);
startBtn.addEventListener("click", startQuiz);
multipleChoice.addEventListener("click", selectAnswer);

backBtn.addEventListener("click", ()=>{
    window.location.reload();
});

clearBtn.addEventListener("click", ()=>{
    localStorage.removeItem("score"); 
    window.location.reload(); 
})

timeUpContinueBtn.addEventListener("click", ()=>{
    clearScorePge.setAttribute("style", "display:none");
    //submitScorePage.setAttribute("style", "display:flex");
    saveScore.setAttribute("style", "display:flex");
})