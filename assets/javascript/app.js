window.onload = function () {
    $("#start").on("click", runGame);
};

var intervalId;
var count = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 10;
var timeLeft;
var isCorrect = "";
var questions = [
    "Who gave the Ring of Fire, Narya, to Gandalf?",
    "Where did Arwen and Aragorn pledge their love and accept the Doom of Men?",
    "What did Faramir give to Frodo and Sam at their parting?",
    "While Frodo, Sam and Pippin were travelling to Crickhollow, what passed them by as they slept?",
    "What did Aragorn need to secure before Elrond would give him his daughter?",
    "Who were Arod and Hasufel?",
    "Under what name did Aragorn serve Ecthelion II, steward of Gondor?",
    "What is the Elvish word for 'friend'?",
    "The name Strider was not:",
    "What do the seven stars on the banner of Gondor represent?"
];
var answers = [
    ["Elrond", "Círdan", "Gil-Galad", "Elrohir"],
    ["Cerin Amroth", "The garden of Elrond", "Caras Galadhon", "Dol Guldor"],
    ["Warm cloaks", "Walking staffs", "A map", "A flask of miruvor"],
    ["Elves", "A fox", "A rabbit", "A flask of miruvor"],
    ["Minas Tirith", "A sapling of the line of Nimroth", "The kingship of Gondor and Arnor", "The sceptre of Annuminas"],
    ["Great captains of Gondor", "The sons of Elrond", "Hobbits of the Shire", "Two horses of Rohan"],
    ["Strider", "Thengel", "Thorongil", "Estel"],
    ["Namárieë", "Noro lim", "Mallorn", "Mellon"],
    ["A name for Aragorn", "The name of King Elessar's house", "The name of Pippin's first son", "The name Frodo gave to his pony"],
    ["The stars on the banners of the ships that bore the palantíri", "The emblems of Durin (the constellation of the Plough)", "The Silmarils", "The seven walls of Minas Tirith"]
];
var answerKey = [1, 0, 1, 1, 2, 3, 2, 3, 2, 0];

function runGame() {
    intervalId = setInterval(decrement, 1000);
    $("#screen").html(
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1  id='title'>Lord of the Rings Trivia</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1 id='time-remaining'>Time Remaining: 10</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='question'>" +
        "<div class='col-md-12'>" +
        "<h1 id='question'>" + questions[count] + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='choice0'>" +
        "<div id='choice-parent' class='col-md-12'>" +
        "<h1 id='choice'>" + answers[count][0] + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='choice1'>" +
        "<div id='choice-parent' class='col-md-12'>" +
        "<h1 id='choice'>" + answers[count][1] + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='choice2'>" +
        "<div id='choice-parent' class='col-md-12'>" +
        "<h1 id='choice'>" + answers[count][2] + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='choice3'>" +
        "<div id='choice-parent' class='col-md-12'>" +
        "<h1 id='choice'>" + answers[count][3] + "</h1>" +
        "</div>" +
        "</div>"
    );
    $("#choice0").on("click", function () {
        newQuestionCheck(0);
    });
    $("#choice1").on("click", function () {
        newQuestionCheck(1);
    });
    $("#choice2").on("click", function () {
        newQuestionCheck(2);
    });
    $("#choice3").on("click", function () {
        newQuestionCheck(3);
    });
}

function newQuestionCheck(number) {
    if (answerKey[count] === number) {
        correct++;
        isCorrect = "correct!";
    }
    else {
        incorrect++;
        isCorrect = "incorrect!";
    }
    count++;
    clearInterval(intervalId);
    timeLeft = time;
    time = 10;
    questionComplete();
}

function decrement() {
    time--;
    if (time < 0 && count < questions.length - 1) {
        unanswered++;
        $("#screen").html(
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<h1 id='title'>Lord of the Rings Trivia</h1>" +
            "</div>" +
            "</div>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<h1>Time left: 0</h1>" +
            "</div>" +
            "</div>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<h1>You ran out of time!</h1>" +
            "</div>" +
            "</div>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<h1> The correct answer was: " + answers[count][answerKey[count]] + "</h1>" +
            "</div>" +
            "</div>"
        );
        clearInterval(intervalId);
        time = 10;
        var windowTimeout = setTimeout(function () {
            count++;
            runGame();
        }, 3000);
    }
    else if (time < 0 && count === questions.length - 1) {
        unanswered++;
        clearInterval(intervalId);
        endGame();
    }
    else {
        $("#time-remaining").html("Time Remaining: " + time);
    }
}

function questionComplete() {
    $("#screen").html(
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1 id='title'>Lord of the Rings Trivia</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1>Time left: " + timeLeft + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1> You are " + isCorrect + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1> The correct answer was: " + answers[count - 1][answerKey[count - 1]] + "</h1>" +
        "</div>" +
        "</div>"
    );
    var windowTimeout = setTimeout(function () {
        if (count < questions.length) {
            runGame();
        }
        else {
            endGame();
        }

    }, 4000);
}

function endGame() {
    $("#screen").html(
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1 id='title'>Lord of the Rings Trivia</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1>All done, heres how you did.</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1> Correct answers: " + correct + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1> Incorrect answers: " + incorrect + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<h1> Unanswered: " + unanswered + "</h1>" +
        "</div>" +
        "</div>"
    );
}