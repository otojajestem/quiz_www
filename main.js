var JSONQuiz = {
    "questions": [{
            "penalty": 5,
            "content": "2+2",
            "answer": "4"
        },
        {
            "penalty": 6,
            "content": "2+2*2",
            "answer": "6"
        },
        {
            "penalty": 7,
            "content": "(2+2)*2",
            "answer": "8"
        },
        {
            "penalty": 8,
            "content": "2+2*2+2",
            "answer": "8"
        },
        {
            "penalty": 9,
            "content": "2+2^2*2+2",
            "answer": "12"
        },
        {
            "penalty": 69,
            "content": "400 + 20",
            "answer": "420"
        }
    ]
};
var quiz;
var container;
var questions;
var currentQuestion = 0;
var maxQuestion;
var interval;
var startTime;
var input;
var scoreboard;
function score_to_string(acc, el, i) {
    return acc + "<li>" + render_time(el) + "</li>";
}
function initiate_scores() {
    if (localStorage.getItem('scores') === null) {
        document.getElementById('score-list').innerHTML = "<li>--:--:--</li>";
        scoreboard = [];
        return;
    }
    scoreboard = JSON.parse(localStorage.getItem('scores'));
    populate_scoreboard();
}
function populate_scoreboard() {
    document.getElementById('score-list').innerHTML = scoreboard.reduce(score_to_string, "");
}
function update_and_save_scores(x) {
    scoreboard.push(x);
    scoreboard.sort(function (a, b) { return a - b; });
    populate_scoreboard();
    localStorage.setItem('scores', JSON.stringify(scoreboard));
}
function render_question(acc, q, i) {
    return acc + "<div class='question hidden'><h1 class='question-number'>Pytanie " + (i + 1) + "/" + (maxQuestion + 1) + "</h1>\n\t\t<p>Kara za b\u0142\u0119dn\u0105\u00A0odpowied\u017A: " + q.penalty + "s</p>\n\t\t<label class='question-content'>" + q.content + "=</label><input type=\"number\"></div>";
}
function next_question() {
    if (currentQuestion === maxQuestion)
        return;
    if (currentQuestion === 0)
        document.getElementById('prvs').classList.remove('invisible');
    questions[currentQuestion].classList.add('hidden');
    currentQuestion++;
    questions[currentQuestion].classList.remove('hidden');
    if (currentQuestion === maxQuestion)
        document.getElementById('next').classList.add('invisible');
}
function prvs_question() {
    if (currentQuestion === 0)
        return;
    if (currentQuestion === maxQuestion)
        document.getElementById('next').classList.remove('invisible');
    questions[currentQuestion].classList.add('hidden');
    currentQuestion--;
    questions[currentQuestion].classList.remove('hidden');
    if (currentQuestion === 0)
        document.getElementById('prvs').classList.add('invisible');
}
function set_interval_and_execute(fn, intervalValue) {
    return setInterval(fn, intervalValue);
}
function start_quiz() {
    currentQuestion = 0;
    document.getElementById('image-board-container').classList.add('hidden');
    document.getElementById('start-container').classList.add('hidden');
    quiz = JSONQuiz;
    container = document.getElementById('questions');
    maxQuestion = quiz.questions.length - 1;
    container.innerHTML = quiz.questions.reduce(render_question, "");
    questions = document.getElementsByClassName('question');
    questions[0].classList.remove('hidden');
    document.getElementById('button-container').classList.remove('hidden');
    document.getElementById('next').classList.remove('invisible');
    document.getElementById('prvs').classList.add('invisible');
    var finishButton = document.getElementById('finishButton');
    finishButton.disabled = true;
    finishButton.classList.add('invisible');
    input = document.getElementsByTagName('input');
    var date = new Date();
    startTime = date.getTime();
    interval = set_interval_and_execute(tick, 10);
}
function quick_check() {
    for (var i = 0; i < quiz.questions.length; i++) {
        if (input[i].value === "")
            return false;
    }
    return true;
}
function tick() {
    var date = new Date();
    document.getElementById('time-display').innerText = render_time(date.getTime() - startTime);
    var finishButton = document.getElementById('finishButton');
    if (quick_check()) {
        finishButton.disabled = false;
        finishButton.classList.remove('invisible');
    }
    else {
        finishButton.disabled = true;
    }
}
function try_finish() {
    var date = new Date();
    if (!quick_check())
        return;
    clearInterval(interval);
    var penalty = 0;
    var corrString = localStorage.getItem('correctAnswers');
    var wrongString = localStorage.getItem('wrongAnswers');
    var correctAnswers = [];
    var wrongAnswers = [];
    if (corrString !== null) {
        correctAnswers = JSON.parse(corrString);
    }
    else {
        quiz.questions.forEach(function (element) {
            correctAnswers.push(0);
        });
    }
    if (wrongString !== null) {
        wrongAnswers = JSON.parse(wrongString);
    }
    else {
        quiz.questions.forEach(function (element) {
            wrongAnswers.push(0);
        });
    }
    for (var i = 0; i < quiz.questions.length; i++) {
        var res = "<td>" + quiz.questions[i].content + "</td>";
        res += "<td>" + input[i].value + "</td>";
        res += "<td>" + quiz.questions[i].answer + "</td>";
        var wasCorrect = true;
        if (quiz.questions[i].answer !== input[i].value) {
            penalty += quiz.questions[i].penalty;
            res += "<td>" + quiz.questions[i].penalty + '</td>';
            wasCorrect = false;
            wrongAnswers[i]++;
        }
        else {
            res += "<td>--</td>";
            correctAnswers[i]++;
        }
        localStorage.setItem('wrongAnswers', JSON.stringify(correctAnswers));
        localStorage.setItem('correctAnswers', JSON.stringify(wrongAnswers));
        var table = document.getElementById('result-table');
        var row = table.insertRow();
        row.innerHTML = res;
        if (!wasCorrect) {
            row.classList.add('wrong-answer');
        }
    }
    document.getElementById('button-container').classList.add('hidden');
    document.getElementById('timer-container').classList.add('hidden');
    document.getElementById('questions').innerHTML = "";
    document.getElementById('after-quiz').classList.remove('hidden');
    var currSscore = (date.getTime() - startTime) + 1000 * penalty;
    document.getElementById('score-display').innerText = render_time(currSscore);
    update_and_save_scores(currSscore);
}
function render_time(score) {
    score = Math.floor(score / 10);
    var min = Math.floor(score / 60 / 100);
    score -= min * 60 * 100;
    var sec = Math.floor(score / 100);
    score -= sec * 100;
    var res = "";
    if (min < 10)
        res += "0";
    res += min + ":";
    if (sec < 10)
        res += "0";
    res += sec + ":";
    if (score < 10)
        res += "0";
    res += score + "";
    return res;
}
function reset() {
    document.getElementById('image-board-container').classList.remove('hidden');
    document.getElementById('start-container').classList.remove('hidden');
    document.getElementById('timer-container').classList.remove('hidden');
    document.getElementById('after-quiz').classList.add("hidden");
    document.getElementById('time-display').innerText = "00:00:00";
    document.getElementById('result-table').innerHTML = " <tr>\n\t<th>\n\t\tPytanie\n\t</th>\n\t<th>\n\t\tTwoja <br>odpowied\u017A\n\t</th>\n\t<th>\n\t\tPrawid\u0142owa <br>odpowied\u017A\n\t</th>\n\t<th>\n\t\tKara\n\t</th>\n</tr>";
}
function cancel() {
    clearInterval(interval);
    document.getElementById('questions').innerHTML = "";
    document.getElementById('button-container').classList.add('hidden');
    reset();
}
