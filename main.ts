
let JSONString = `
{
	"questions": [{
			"penalty": 5,
			"content": "2+2",
			"answer": 4
		},
		{
			"penalty": 6,
			"content": "2+2*2",
			"answer": 6
		},
		{
			"penalty": 7,
			"content": "(2+2)*2",
			"answer": 8
		},
		{
			"penalty": 8,
			"content": "2+2*2+2",
			"answer": 8
		},
		{
			"penalty": 9,
			"content": "2+2^2*2+2",
			"answer": 12
		}
	]

}
`

type Question = {
	penalty: number;
	content: string;
	answer: number;

};

function render_question(acc: string, q: Question, i: number) {
	return acc + `<h1 class='question-number'>Pytanie ` + (i + 1) + `</h1>
		<p>Kara za błędną odpowiedź: `+ q.penalty + `s</p>
		<label class='question'>`+ q.content + `=</label><input type="number">`
}

type Quiz = {
	questions: Question[]
};

let quiz: Quiz


function prepare_quiz() {
	quiz = JSON.parse(JSONString);

	let container = document.getElementById('questions')
	container.innerHTML = quiz.questions.reduce(render_question, ``)

}

