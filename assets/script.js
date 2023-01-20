let startBtn = document.querySelector("#start-btn");
let mainPage = document.querySelector("#main-page")
let submitPage = document.querySelector("#save-score");
let multipleChoice = document.querySelector("#multiple-choice");
let submitBtn = document.querySelector("#submit");
let scoreTimer = document.querySelector("#score-timer")
let position = 0;
let questionNum = 1;

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

submitPage.setAttribute("style", "display:none");
scoreTimer.setAttribute("style", "display:none")
multipleChoice.setAttribute("style", "display:none")

startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    multipleChoice.setAttribute("style", "display:flex");
    scoreTimer.setAttribute("style", "display:flex")
    mainPage.setAttribute("style", "display:none");
    getQuestions();
}


function getQuestions() {
    let questionPosition = quizQA[position];
    let myQuestion = document.createElement("h2");
    myQuestion.setAttribute("style", "font-size: 40px")
    myQuestion.innerText = questionNum + ". " + questionPosition.question;
    multipleChoice.appendChild(myQuestion);

    let btnID = 1;
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
    }
    else if (answerVal.value !== quizQA[position].correct) {
        nextQuestion("red", "Incorrect!");
    }
    
}

function nextQuestion(color, answer) {
    let myValue = document.createElement("p");
    myValue.style.color = color;
    myValue.style.fontSize = "75px"
    myValue.innerText = answer;
    submitBtn.appendChild(myValue);

    position++;
    multipleChoice.innerHTML = "";
    let nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.setAttribute("id", "nextBtn");
    submitBtn.appendChild(nextBtn);

    nextBtn.addEventListener("click", ()=>{
        submitBtn.innerHTML = "";
        startQuiz();  
    })
}

multipleChoice.addEventListener("click", selectAnswer);
