
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
let cseconds: HTMLElement
let seconds: HTMLElement
let minutes: HTMLElement
let questions: HTMLCollection
let currentQuestion: number = 0
let maxQuestion: number
let interval: number
let startTime: number

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


function set_interval_and_execute(fn: () => void, intervalValue: number) {
	return setInterval(fn, intervalValue)
}

function start_quiz() {
	currentQuestion = 0
	document.getElementById('image-board-container').classList.add('hidden')
	document.getElementById('start-container').classList.add('hidden')

	prepare_quiz()

	questions[0].classList.remove('hidden')
	document.getElementById('button-container').classList.remove('hidden')

	cseconds = document.getElementById('cseconds')
	minutes = document.getElementById('minutes')
	seconds = document.getElementById('seconds')
	const date = new Date()
	startTime = date.getTime()
	interval = set_interval_and_execute(tick, 10)
}



function tick() {
	const date = new Date()
	displayTime(date.getTime() - startTime)
}


function displayTime(ctime) {
	ctime = Math.floor(ctime / 10)

	const min = Math.floor(ctime / 6000)
	ctime -= min * 6000
	const sec = Math.floor(ctime / 100)
	ctime -= sec * 100
	if (min < 10)
		minutes.innerText = `0` + min
	else
		minutes.innerText = `` + min

	if (sec < 10)
		seconds.innerText = `0` + sec
	else
		seconds.innerText = `` + sec

	if (ctime < 10)
		cseconds.innerText = `0` + ctime
	else
		cseconds.innerText = ctime + ``
}