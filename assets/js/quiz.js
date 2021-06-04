// Getting all the references to the objects and whatnot on the page
var questionText = document.querySelector("#maintitle");
var startText = document.querySelector("#starttext");
var startButton = document.querySelector("#startbutton");
var buttonDiv = document.querySelector("#buttonholder");
var quizDiv = document.querySelector("#quizblock");

var initialsBox = document.querySelector("#initialsbox");
var initialsButton = document.querySelector("#initialsbutton");
var initialsInput = document.querySelector("#initialsinput");
var initialsText = document.querySelector("#initialstext");

var hsBox = document.querySelector("#hsbox");

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
  },
  {
    q: "The condition in an if / else statement is enclosed with _____.",
    pa: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    a: "parenthesis"
  },
  {
    q: "Arrays in JavaScript can be used to store ______.",
    pa: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    a: "all of the above"
  }
];

var startQuiz = function (event) {
  startText.style.display = "none"; // hiding the text we see at the start of the quiz
  startButton.style.display = "none"; // hiding the Start Quiz button we see at the start of the quiz
  displayQuestion(counter);
};

var displayQuestion = function (qnum) {
  questionText.style.textAlign = "left"; // styling the question text to be to the left
  questionText.textContent = questions[qnum].q; // setting the question text to the header on the page
  questions[qnum].pa.forEach(function (answer, answerCount) { // this creates a button for each potential answer in the current question we're working with
    var tempButton = document.createElement("button");
    tempButton.className = "nbutton answerbutton"; // applying the styling classes
    tempButton.textContent = (answerCount + 1) + ". " + answer; // rendering the text onto the answer buttons, including a number and .
    tempButton.setAttribute("answerid", answerCount);
    buttonDiv.appendChild(tempButton);
  });
}

var bodyClicked = function (event) {

  var clicked = event.target;
  var text = clicked.textContent.substring(3); // getting our answer text
  if (clicked.hasAttribute("answerid")) // only runs if the thing we are clicking is a button with the "answerid" attribute
  {
    if (text === questions[counter].a) // if the buttons text we just clicked on matches the correct answer of the current question....
    {
      buttonDiv.innerHTML = ""; // reseting the questions, aka deleting them
      if (counter < (questions.length - 1)) {
        counter++;
        displayQuestion(counter);
        answeredStyle("Correct!");
      }
      else {
        answeredStyle("Correct!");
        quizEnding();
      }
    }
    else {
      buttonDiv.innerHTML = ""; // reseting the questions, aka deleting them
      if (counter < (questions.length - 1)) {
        counter++;
        displayQuestion(counter);
        answeredStyle("Wrong!");
      }
      else {
        answeredStyle("Wrong!");
        quizEnding();
      }
    }
  }
  if (clicked.id === "initialsbutton") // only runs if the thing we are clicking is a button with the "answerid" attribute
  {
    if (initialsinput.value === "") { // checking to see if the user inputted anything
      alert("Please enter in something.");
    }
    else if (initialsinput.value.length > 3) { // checking to see how long the initials are
      alert("Initials are too long!");
    }
    else {
      startText.style.display = "none"; // hiding the score text
      initialsBox.style.display = "none"; // hiding the intials box div
      displayHighscores(initialsinput.value);
    }
  }
};

var answeredStyle = function (result) {
  var tempDiv;
  var tempP;
  if (document.getElementById("resultDiv")) { // Does a temp result box already exist? aka does it already say correct or wrong on your screen?
    var tempDiv = document.getElementById("resultDiv");
    tempDiv.remove();
  }
  var tempDiv = document.createElement("div");
  var tempP = document.createElement("p");
  tempDiv.className = "holderanswered"; // apply the border styling after answering a question
  tempDiv.setAttribute("id", "resultDiv");

  tempP.textContent = result;
  tempP.className = "textanswered";
  tempP.setAttribute("id", "resultP");
  tempDiv.appendChild(tempP);
  quizDiv.appendChild(tempDiv);
  setTimeout(function () {
    buttonDiv.className = "";
    tempDiv.remove();
  }, 1000); // after one second we revert the styling

}


var quizEnding = function () {
  questionText.textContent = "All done!";

  startText.style.display = "block"; // displays the final score text

  initialsBox.style.display = "flex"; // displays the intial box where we get the users input

  startText.style.textAlign = "left";
  startText.textContent = "Your final score is " + score + ".";
}

var displayHighscores = function (highscore) {
  questionText.textContent = "High scores";
  hsBox.style.display = "flex"; //unhiding the highscores box
  console.log(highscore);
}

startButton.addEventListener("click", startQuiz); // runs when we click on "Start Quiz"

quizDiv.addEventListener("click", bodyClicked); // runs when we click on any of the answers in the main button holder div