
var header=document.getElementById("hs")
var timeContainer= document.getElementById("time")
var timeLeft= document.getElementById("timer")
var initialText= document.getElementById("initial-text")
var title=document.querySelector("h1")
var paragraph= document.getElementById("p1")
var questionList=document.getElementById("question-list")
var correct = document.getElementById("correct-wrong")
var labelContainer=document.getElementById("label-container")
var buttonContainer = document.getElementById("button-container")
var button1 = document.getElementById("start-quiz");

var timer=0;
var timerCount=75;

var userQuestion;
var userquestionList;
var listItem;
var qindex=0;

var element;
var score=0;

// Attach event listener to start button to call startGame function on click
button1.addEventListener("click", startGame)

// The startGame function is called when the start button is clicked
function startGame(){
  startTimer()
  displayQuiz()
}

// The setTimer function starts and stops the timer
function startTimer(){
  // Sets timer
  timer = setInterval(function(){
  timerCount--;
  timeLeft.textContent= timerCount;
  
  // Tests if time has run out
  if (timerCount <= 0) {
  //ends game
  endofGame();
  timeContainer.textContent= "Time end";
 }
},1000)
}

//Displays quiz question and choices
function displayQuiz(qIndex){
  // Clears existing data 
  title.innerHTML="";
  paragraph.innerHTML="";
  buttonContainer.innerHTML="";
  // For loops to loop through all info in array
  for (var i=0;i<questions.length;i++){
    userQuestion = questions[qindex].question;
    userquestionList=questions[qindex].questionList;
    //display question
    title.textContent=userQuestion;
  }
  //display choices
  userquestionList.forEach(function(newItem) {
    listItem=document.createElement("li");
    listItem.textContent= newItem;
    questionList.appendChild(listItem);
    listItem.addEventListener("click",compare)
  });
}

//Compare choice with correct answer if the user clicked on one of the choices
function compare(event){
  element = event.target;
  if (element.matches("li")){
    //correct answer
    if(element.textContent==questions[qindex].answer){
      score++;
      correct.textContent = "Correct Answer "
    }
    //wrong answer
    else {
      timerCount = timerCount-10;
      correct.textContent = "Wrong Answer "
    }
   
  }
  questionList.innerHTML=""
  qindex++;
  next()
}

//Either displays next question or ends game
function next(){
  if(qindex>=questions.length){
    endofGame()
  }
  else{
    displayQuiz(qindex)
  }
}
var questions = [

    { question: "Which of the following is not a type of computer code related to Program Execution?",
        
        questionList: ["Source code", "Bytecode", "Machine Code", "Hex Code"],
       
        answer: "Hex Code"},

    { question: "Which of the following includes Chromes V8 JavaScript Engine?",
        choices: ["jQuery", "Java", "npm", "Node.js"],
        answer: "Node.js"},

    { question: "Python is _____ programming language.",
        choices: ["high-level", "mid-level", "Low-level", "none of the above"],
        answer: "high-level"},

    { question: "Which of the following is not a programming language?",
        choices: ["TypeScript", "Python", "Anaconda", "Java"],
        answer: "Anacoda"},

      { question: "WhatsApp concurrent model is implemented using _____ programming language",
        choices: ["Java", "Node.js", "Erlang", "C"],
        answer: "C" },
]
//displays score and label
function endofGame(){
  clearInterval(timer);
  questionList.setAttribute("style","display:none")
  correct.textContent="End of quiz, your score is: "+ score+"/"+ questions.length;
  timeContainer.innerHTML=""
  header.innerHTML=""
  title.innerHTML="Your final score is: "+ timerCount; 
  
  //create Label
  var newLabel = document.createElement('label')
  newLabel.textContent="Enter yout initials "
  labelContainer.appendChild(newLabel)
  //create input for initials
  var newInput=document.createElement('input')
  newInput.textContent=""
  labelContainer.appendChild(newInput)
  //create submit button
  var submit=document.createElement('button')
  submit.textContent="Submit"
  buttonContainer.appendChild(submit)
  
 //When the user clicks submit
  submit.addEventListener("click",function(event){
    event.preventDefault();
    var initials = newInput.value.trim();
  //If the user didn't enter any initials, a prompt will appear
        if (initials === "") {
            alert("Please enter your initials");
        }
        //If the user enters his initials, highscores will appear
         else {
          window.location.replace("./HighScores.html");
            var finalScore = {
                initials: initials,
                score: timerCount
            }
          console.log(finalScore);

           var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            localStorage.setItem("allScores", JSON.stringify(allScores));
         }
    
})

}

var clear=document.getElementById("clear");
var goBack=document.getElementById("go-back")
var HighScores=document.getElementById("highscores")

//Clear scores
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})

//goes back to game
goBack.addEventListener("click",function(){
    window.location.replace("./index.html")
})

//retrieves local storage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {
        //create a list of highscores
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        HighScores.appendChild(createLi);

    }
}