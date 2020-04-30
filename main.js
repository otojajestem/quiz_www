var JSONString = "\n{\n\t\"questions\": [{\n\t\t\t\"penalty\": 5,\n\t\t\t\"content\": \"2+2\",\n\t\t\t\"answer\": 4\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 6,\n\t\t\t\"content\": \"2+2*2\",\n\t\t\t\"answer\": 6\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 7,\n\t\t\t\"content\": \"(2+2)*2\",\n\t\t\t\"answer\": 8\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 8,\n\t\t\t\"content\": \"2+2*2+2\",\n\t\t\t\"answer\": 8\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 9,\n\t\t\t\"content\": \"2+2^2*2+2\",\n\t\t\t\"answer\": 12\n\t\t}\n\t]\n\n}\n";
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
    return acc + "<div class='question hidden'><h1 class='question-number'>Pytanie " + (i + 1) + "</h1>\n\t\t<p>Kara za b\u0142\u0119dn\u0105\u00A0odpowied\u017A: " + q.penalty + "s</p>\n\t\t<label class='question-content'>" + q.content + "=</label><input type=\"number\"></div>";
}
function prepare_quiz() {
    quiz = JSON.parse(JSONString);
    container = document.getElementById('questions');
    container.innerHTML = quiz.questions.reduce(render_question, "");
    maxQuestion = quiz.questions.length - 1;
    questions = document.getElementsByClassName('question');
}
function next_question() {
    if (currentQuestion === maxQuestion)
        return;
    questions[currentQuestion].classList.add('hidden');
    currentQuestion++;
    questions[currentQuestion].classList.remove('hidden');
}
function prvs_question() {
    if (currentQuestion === 0)
        return;
    questions[currentQuestion].classList.add('hidden');
    currentQuestion--;
    questions[currentQuestion].classList.remove('hidden');
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
    cseconds = document.getElementById('cseconds');
    minutes = document.getElementById('minutes');
    seconds = document.getElementById('seconds');
    var date = new Date();
    startTime = date.getTime();
    interval = set_interval_and_execute(tick, 10);
}
function tick() {
    var date = new Date();
    displayTime(date.getTime() - startTime);
}
function displayTime(ctime) {
    ctime = Math.floor(ctime / 10);
    var min = Math.floor(ctime / 6000);
    ctime -= min * 6000;
    var sec = Math.floor(ctime / 100);
    ctime -= sec * 100;
    if (min < 10)
        minutes.innerText = "0" + min;
    else
        minutes.innerText = "" + min;
    if (sec < 10)
        seconds.innerText = "0" + sec;
    else
        seconds.innerText = "" + sec;
    if (ctime < 10)
        cseconds.innerText = "0" + ctime;
    else
        cseconds.innerText = ctime + "";
}
