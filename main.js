var JSONString = "\n{\n\t\"questions\": [{\n\t\t\t\"penalty\": 5,\n\t\t\t\"content\": \"2+2\",\n\t\t\t\"answer\": \"4\"\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 6,\n\t\t\t\"content\": \"2+2*2\",\n\t\t\t\"answer\": \"6\"\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 7,\n\t\t\t\"content\": \"(2+2)*2\",\n\t\t\t\"answer\": \"8\"\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 8,\n\t\t\t\"content\": \"2+2*2+2\",\n\t\t\t\"answer\": \"8\"\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 9,\n\t\t\t\"content\": \"2+2^2*2+2\",\n\t\t\t\"answer\": \"12\"\n\t\t}\n\t]\n\n}\n";
var quiz;
var container;
var cseconds;
var seconds;
var minutes;
var questions;
var currentQuestion = 0;
var maxQuestion;
var interval;
var startTime;
function render_question(acc, q, i) {
    return acc + "<div class='question hidden'><h1 class='question-number'>Pytanie " + (i + 1) + "/" + (maxQuestion + 1) + "</h1>\n\t\t<p>Kara za b\u0142\u0119dn\u0105\u00A0odpowied\u017A: " + q.penalty + "s</p>\n\t\t<label class='question-content'>" + q.content + "=</label><input type=\"number\"></div>";
}
function prepare_quiz() {
    quiz = JSON.parse(JSONString);
    container = document.getElementById('questions');
    maxQuestion = quiz.questions.length - 1;
    container.innerHTML = quiz.questions.reduce(render_question, "");
    questions = document.getElementsByClassName('question');
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
        document.getElementById('prvs').classList.add('inivisible');
}
function set_interval_and_execute(fn, intervalValue) {
    return setInterval(fn, intervalValue);
}
function start_quiz() {
    currentQuestion = 0;
    document.getElementById('image-board-container').classList.add('hidden');
    document.getElementById('start-container').classList.add('hidden');
    prepare_quiz();
    questions[0].classList.remove('hidden');
    document.getElementById('button-container').classList.remove('hidden');
    document.getElementById('next').classList.remove('invisible');
    document.getElementById('prvs').classList.add('invisible');
    cseconds = document.getElementById('cseconds');
    minutes = document.getElementById('minutes');
    seconds = document.getElementById('seconds');
    var date = new Date();
    startTime = date.getTime();
    interval = set_interval_and_execute(tick, 10);
}
function tick() {
    var date = new Date();
    document.getElementById('time-display').innerText = render_time(date.getTime() - startTime);
}
function check_answers() {
    var input = document.getElementsByTagName('input');
    var res = 0;
    for (var i = 0; i < quiz.questions.length; i++) {
        if (input[i].value === "")
            return -1;
        if (input[i].value !== quiz.questions[i].answer)
            res += quiz.questions[i].penalty;
        console.log(input[i].value + " " + quiz.questions[i].answer);
    }
    return res;
}
function try_finish() {
    var date = new Date();
    var penalty = check_answers();
    if (penalty === -1)
        return;
    clearInterval(interval);
    document.getElementById('after-quiz').classList.remove('hidden');
    document.getElementById('button-container').classList.add('hidden');
    document.getElementById('timer-container').classList.add('hidden');
    document.getElementById('questions').innerHTML = "";
    document.getElementById('score-display').innerText = render_time((date.getTime() - startTime) + 1000 * penalty);
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
}
