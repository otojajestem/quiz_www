var JSONString = "\n{\n\t\"questions\": [{\n\t\t\t\"penalty\": 5,\n\t\t\t\"content\": \"2+2\",\n\t\t\t\"answer\": 4\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 6,\n\t\t\t\"content\": \"2+2*2\",\n\t\t\t\"answer\": 6\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 7,\n\t\t\t\"content\": \"(2+2)*2\",\n\t\t\t\"answer\": 8\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 8,\n\t\t\t\"content\": \"2+2*2+2\",\n\t\t\t\"answer\": 8\n\t\t},\n\t\t{\n\t\t\t\"penalty\": 9,\n\t\t\t\"content\": \"2+2^2*2+2\",\n\t\t\t\"answer\": 12\n\t\t}\n\t]\n\n}\n";
function render_question(acc, q, i) {
    return acc + "<h1 class='question-number'>Pytanie " + (i + 1) + "</h1>\n\t\t<p>Kara za b\u0142\u0119dn\u0105\u00A0odpowied\u017A: " + q.penalty + "s</p>\n\t\t<label class='question'>" + q.content + "=</label><input type=\"number\">";
}
var quiz;
function prepare_quiz() {
    quiz = JSON.parse(JSONString);
    var container = document.getElementById('questions');
    container.innerHTML = quiz.questions.reduce(render_question, "");
}
