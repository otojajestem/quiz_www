var JSONString = "\n{\n\t\"questions\": [{\n\t\t\t\"penalty\": 5,\n\t\t\t\"content\": \"2+2\",\n\t\t\t\"answer\": 4\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 6,\n\t\t\t\"content\": \"2+2*2\",\n\t\t\t\"answer\": 6\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 7,\n\t\t\t\"content\": \"(2+2)*2\",\n\t\t\t\"answer\": 8\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 8,\n\t\t\t\"content\": \"2+2*2+2\",\n\t\t\t\"answer\": 8\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 9,\n\t\t\t\"content\": \"2+2^2*2+2\",\n\t\t\t\"answer\": 12\n\t\t}\n\t]\n\n}\n";
var quiz;
var container;
var questions;
var currentQuestion = 0;
var maxQuestion;
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
function start_quiz() {
    currentQuestion = 0;
    questions[0].classList.remove('hidden');
}
