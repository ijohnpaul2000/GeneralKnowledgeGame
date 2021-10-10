
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const timeCount = document.querySelector(".time-left");
const nextBtn = document.querySelector(".next-question-btn");

const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers =0;
let attempt = 0;
let counter;
let timeValue = 5;
var myInterval;

// push the question into availableQuestions array

function setavailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i = 0; i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
    
}

function getNewQuestion(){
    questionNumber.innerHTML = "Question "+(questionCounter + 1) + " of " + quiz.length;

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //index of question in question.js
    //get position of questionIndex from availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove questionIndex from the availableQuestion Array, so it doesnt repeat
    availableQuestions.splice(index1,1);
    questionCounter++;

    const optionLen = currentQuestion.options.length

    for(let i=0; i < optionLen;i++){
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.2;

    for(let i=0;i<optionLen;i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.05;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }

}

//get result of the questions
function getResult(element){
    const id = parseInt(element.id);

    //get answer if correct
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");

        nextBtn.classList.remove("hide");

        correctAnswers++;

        clearInterval(myInterval);
    }else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        nextBtn.classList.remove("hide");

        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
        clearInterval(myInterval);

    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }else{
        clearInterval(myInterval);
        nextBtn.classList.add("hide");
        timer();
        getNewQuestion();

    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    
    const percentage = (correctAnswers/quiz.length) * 100;
    
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers =0;
    attempt = 0;
}
function tryAgainQuiz(){
    resultBox.classList.add("hide");

    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}


function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}
function  answerIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;

    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

// function goToHome(){
//     resultBox.classList.add("hide");
//     homeBox.classList.remove("hide");
    
// }

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    nextBtn.classList.add("hide");

    timer();
    setavailableQuestions();
    getNewQuestion();
    answerIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-questions").innerHTML = quiz.length;
}



function timer(){
    var timeCounter = 16;

    myInterval = setInterval(() => {
        timeCounter--;
    
        if(timeCounter != 0 ){
            timeCount.innerHTML = "Time Left : " + timeCounter;
            console.log(timeCounter);
        }
        
        if(timeCounter === 0){
            timeCount.innerHTML = "Time's Up!";
            clearInterval(myInterval);
            quizOver();
            quizBox.classList.add("hide");
        }
        
    }, 1000);
}

