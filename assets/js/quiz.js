// Getting all the references to the objects and whatnot on the page
var questionText = document.querySelector("#maintitle");
var startText = document.querySelector("#starttext");
var startButton = document.querySelector("#startbutton");
var buttonDiv = document.querySelector("#buttonholder");
var initialsButton = document.querySelector("#initialsbutton");
var initialsInput = document.querySelector("#initialsinput");
var initialsText = document.querySelector("#initialstext");

var counter = 0;
var score = 0;

var questions = [ // giant question array that holds the question, potential answers, and the answer itself
  {
    q: "Commonly used data types DO NOT include:",
    pa: ["strings", "booleans", "alerts", "numbers"],
    a: "alerts"
  },
  {
    q: "Inside which HTML element do we put the JavaScript?",
    pa: ["<script>", "<javascript>", "<js>", "<scripting>"],
    a: "<script>"
  }
];

var startQuiz = function (event) {
  startText.style.display = "none"; // hiding the text we see at the start of the quiz
  startButton.style.display = "none"; // hiding the Start Quiz button we see at the start of the quiz
  displayQuestion(counter);
};

var displayQuestion = function (qnum) {
  questionText.textContent = questions[qnum].q; // setting the question text to the header on the page
  questions[qnum].pa.forEach(function (answer, answerCount) { // this creates a button for each potential answer in the current question we're working with
    var tempButton = document.createElement("button");
    tempButton.className = "nbutton answerbutton"; // applying the styling classes
    tempButton.textContent = (answerCount + 1) + ". " + answer; // rendering the text onto the answer buttons, including a number and .
    tempButton.setAttribute("answerid", answerCount);
    buttonDiv.appendChild(tempButton);
  });
}

var answerClicked = function (event) {

  var clicked = event.target;
  var text = clicked.textContent.substring(3); // getting our answer text
  if (clicked.hasAttribute("answerid")) // only runs if the thing we are clicking is a button with the "answerid" attribute
  {
    if (text === questions[counter].a) // if the buttons text we just clicked on matches the correct answer of the current question....
    {
      alert("correct");
      buttonDiv.innerHTML = "";
      if (counter < (questions.length - 1)) {
        counter++;
        displayQuestion(counter);
      }
      else {
        quizEnding();
      }
    }
    else {
      alert("incorrect");
      buttonDiv.innerHTML = "";
      if (counter < (questions.length - 1)) {
        counter++;
        displayQuestion(counter);
      }
      else {
        quizEnding();
      }
    }
  }
};

var quizEnding = function () {
  alert("you did it");
  questionText.textContent = "All done!";
  
  startText.style.display = "block";
  initialsButton.style.display = "block";
  initialsInput.style.display = "block";
  initialsText.style.display = "block";

  startText.textContent = "Your final score is " + score + ".";
}

startButton.addEventListener("click", startQuiz); // runs when we click on "Start Quiz"

buttonDiv.addEventListener("click", answerClicked); // runs when we click on any of the answers in the main button holder div