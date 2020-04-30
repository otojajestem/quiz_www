
let JSONString = `
{
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
		}
	]

}
`

type Question = {
	penalty: number;
	content: string;
	answer: string;

};

type Quiz = {
	questions: Question[]
};

let quiz: Quiz
let container: HTMLElement
let questions: HTMLCollection
let currentQuestion: number = 0
let maxQuestion: number
let interval: number
let startTime: number
let input: HTMLCollection

function render_question(acc: string, q: Question, i: number) {
	return acc + `<div class='question hidden'><h1 class='question-number'>Pytanie ` + (i + 1) + `/` + (maxQuestion + 1) + `</h1>
		<p>Kara za błędną odpowiedź: `+ q.penalty + `s</p>
		<label class='question-content'>`+ q.content + `=</label><input type="number"></div>`
}


function next_question() {
	if (currentQuestion === maxQuestion)
		return

	if (currentQuestion === 0)
		document.getElementById('prvs').classList.remove('invisible')

	questions[currentQuestion].classList.add('hidden')
	currentQuestion++
	questions[currentQuestion].classList.remove('hidden')

	if (currentQuestion === maxQuestion)
		document.getElementById('next').classList.add('invisible')

}

function prvs_question() {
	if (currentQuestion === 0)
		return

	if (currentQuestion === maxQuestion)
		document.getElementById('next').classList.remove('invisible')

	questions[currentQuestion].classList.add('hidden')
	currentQuestion--
	questions[currentQuestion].classList.remove('hidden')

	if (currentQuestion === 0)
		document.getElementById('prvs').classList.add('inivisible')



}


function set_interval_and_execute(fn: () => void, intervalValue: number) {
	return setInterval(fn, intervalValue)
}

function start_quiz() {
	currentQuestion = 0
	document.getElementById('image-board-container').classList.add('hidden')
	document.getElementById('start-container').classList.add('hidden')

	quiz = JSON.parse(JSONString);
	container = document.getElementById('questions')
	maxQuestion = quiz.questions.length - 1
	container.innerHTML = quiz.questions.reduce(render_question, ``)
	questions = document.getElementsByClassName('question')

	questions[0].classList.remove('hidden')
	document.getElementById('button-container').classList.remove('hidden')

	document.getElementById('next').classList.remove('invisible')
	document.getElementById('prvs').classList.add('invisible')

	const finishButton = document.getElementById('finishButton');
	(finishButton as HTMLButtonElement).disabled = true
	finishButton.classList.add('invisible')

	input = document.getElementsByTagName('input')

	const date = new Date()
	startTime = date.getTime()
	interval = set_interval_and_execute(tick, 10)
}

function quick_check() {
	for (let i = 0; i < quiz.questions.length; i++) {
		if ((input[i] as HTMLInputElement).value === ``)
			return false
	}
	return true
}



function tick() {
	const date = new Date()
	document.getElementById('time-display').innerText = render_time(date.getTime() - startTime)

	const finishButton = document.getElementById('finishButton');
	if (quick_check()) {

		(finishButton as HTMLButtonElement).disabled = false
		finishButton.classList.remove('invisible')
	} else {
		(finishButton as HTMLButtonElement).disabled = true
	}
}


function check_answers() {
	let res = 0

	for (let i = 0; i < quiz.questions.length; i++) {
		if ((input[i] as HTMLInputElement).value === ``)
			return -1
		if ((input[i] as HTMLInputElement).value !== quiz.questions[i].answer)
			res += quiz.questions[i].penalty
		console.log((input[i] as HTMLInputElement).value + ` ` + quiz.questions[i].answer)
	}

	return res
}

function try_finish() {
	const date = new Date()

	const penalty: number = check_answers()

	if (penalty === -1)
		return


	clearInterval(interval)

	document.getElementById('after-quiz').classList.remove('hidden')
	document.getElementById('button-container').classList.add('hidden')
	document.getElementById('timer-container').classList.add('hidden')
	document.getElementById('questions').innerHTML = ``

	document.getElementById('score-display').innerText = render_time((date.getTime() - startTime) + 1000 * penalty)


}

function render_time(score: number) {
	score = Math.floor(score / 10)

	const min = Math.floor(score / 60 / 100)
	score -= min * 60 * 100
	const sec = Math.floor(score / 100)
	score -= sec * 100

	let res = ``

	if (min < 10)
		res += `0`
	res += min + `:`

	if (sec < 10)
		res += `0`
	res += sec + `:`

	if (score < 10)
		res += `0`
	res += score + ``

	return res
}


function reset() {
	document.getElementById('image-board-container').classList.remove('hidden')
	document.getElementById('start-container').classList.remove('hidden')
	document.getElementById('timer-container').classList.remove('hidden')
	document.getElementById('after-quiz').classList.add(`hidden`)
	document.getElementById('time-display').innerText = `00:00:00`

}