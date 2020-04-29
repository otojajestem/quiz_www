
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

type Quiz = {
	questions: Question[]
};

let quiz: Quiz
let container: HTMLElement
let questions: HTMLCollection
let currentQuestion: number = 0
let maxQuestion: number

function render_question(acc: string, q: Question, i: number) {
	return acc + `<div class='question hidden'><h1 class='question-number'>Pytanie ` + (i + 1) + `</h1>
		<p>Kara za błędną odpowiedź: `+ q.penalty + `s</p>
		<label class='question-content'>`+ q.content + `=</label><input type="number"></div>`
}

function prepare_quiz() {
	quiz = JSON.parse(JSONString);
	container = document.getElementById('questions')
	container.innerHTML = quiz.questions.reduce(render_question, ``)
	maxQuestion = quiz.questions.length - 1
	questions = document.getElementsByClassName('question')
}

function next_question() {
	if (currentQuestion === maxQuestion)
		return

	questions[currentQuestion].classList.add('hidden')
	currentQuestion++
	questions[currentQuestion].classList.remove('hidden')

}

function prvs_question() {
	if (currentQuestion === 0)
		return

	questions[currentQuestion].classList.add('hidden')
	currentQuestion--
	questions[currentQuestion].classList.remove('hidden')

}

function start_quiz() {
	currentQuestion = 0
	questions[0].classList.remove('hidden')
}


