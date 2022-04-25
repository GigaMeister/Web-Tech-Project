// Get the element with the specified id
const start = document.getElementById("begin");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeBox = document.getElementById("timeBox");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreBox");

// Questions, answers and, images for the quiz.
let questions = [
    {
        question : "What is this?",
        imgSrc : "img/eye.jpg",
        answerA : "Eye of Sauron",
        answerB : "Fortress of Sauron",
        answerC : "Tower of Sauron",
        correct : "A"
    },{
        question : "Who is this character?",
        imgSrc : "img/frodo.jpg",
        answerA : "Sam",
        answerB : "Frodo",
        answerC : "Bilbo",
        correct : "B"
    },{
        question : "is this Gandalf the Gray?",
        imgSrc : "img/gandalf.jpg",
        answerA : "Yes",
        answerB : "No, Saruman",
        answerC : "No, Gandalf the White",
        correct : "C"
    },{
        question : "Which one these caracters is an elf?",
        imgSrc : "img/members.jpg",
        answerA : "Gimli",
        answerB : "Legolas",
        answerC : "Boromir",
        correct : "B"
    },{
        question : "What city is this?",
        imgSrc : "img/minas.jpg",
        answerA : "Minas Tirith",
        answerB : "The Shire",
        answerC : "Mordor",
        correct : "A"
    }        
];

// Variables so our functions execute properly
const finalQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0;
const runningTime = 7; // 7s
const BoxWidth = 150; // 150px
const BoxUnit = BoxWidth / runningTime;
let TIMER;
let score = 0;

// function to render questions images and answers
function showQuestion(){
    let q = questions[currentQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
}

start.addEventListener("click",beginQuiz);

// function to call other functions to show questions the progress and the timer 
function beginQuiz(){
    start.style.display = "none";
    showQuestion();
    quiz.style.display = "block";
    showProgress();
    showCounter();
    TIMER = setInterval(showCounter,1000); // 1000ms = 1s
}

// function to render the progress bar 
function showProgress(){
    for(let qIndex = 0; qIndex <= finalQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// function to render the timer
function showCounter(){
    if(count <= runningTime){
        counter.innerHTML = count;
        timeBox.style.width = count * BoxUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        wrongAnswer();
        if(currentQuestion < finalQuestion){
            currentQuestion++;
            showQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            showScore();
        }
    }
}

// functions to change the progress according to the users choice and display the final score
function checkAnswer(answer){
    if( answer == questions[currentQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        correctAnswer();
    }else{
        // answer is wrong
        // change progress color to red
        wrongAnswer();
    }
    count = 0;
    if(currentQuestion < finalQuestion){
        currentQuestion++;
        showQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        showScore();
    }
}

// function to display correct answer
function correctAnswer(){
    document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
}

// function to display wrong answer
function wrongAnswer(){
    document.getElementById(currentQuestion).style.backgroundColor = "#f00";
}

// function to render the score
function showScore(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const userScore = Math.round(100 * score/questions.length);
    
    // choose the image and text based on the score
    let img = (userScore == 100) ? "img/ring.jpg" :
              (userScore >= 80) ? "img/king.jpg" :
              (userScore >= 60) ? "img/elf.jpg" :
              (userScore >= 40) ? "img/bilbo.jpg" :
              (userScore >= 20) ? "img/golum.jpg" :
              "img/orc.jpg" ;
    
    let end = (userScore == 100) ? "You are now the ring bearer!" :
              (userScore >= 80) ? "The king aproves your score!" :
              (userScore >= 60) ? "You now have a wife!" :
              (userScore >= 40) ? "" :
              (userScore == 20) ? "My precious!" :
              "Looks like meat is back on the menu boys!";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<h2>"+ end + "</h2>";
    scoreDiv.innerHTML += "<p>"+ userScore +"%</p>";
}
