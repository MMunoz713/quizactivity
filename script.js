const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What color does the sky turn at night',
    answers: [
      { text: 'night there is a lack of light therefore there is no color refracted', correct: true },
      { text: 'blue', correct: false },
      { text: 'white', correct: false },
      { text: 'black', correct: false }
    ]
  },
  {
    question: 'Which breed of dog is the best',
    answers: [
      { text: 'Huskies', correct: true },
      { text: 'German Shepards', correct: true },
      { text: 'Golden Retrievers', correct: true },
      { text: 'Labs', correct: true }
    ]
  },
  {
    question: 'Will I survive this class?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'Yes', correct: true },
      { text: 'Um no', correct: false },
      { text: 'Maybe', correct: false }
    ]
  },
  {
    question: 'If you played World of Warcraft, what faction would you pick?',
    answers: [
      { text: 'Alliance', correct: true },
      { text: 'Horde', correct: false }
    ]
  },
  {
      question: 'Who was the first president of the United States',
      answers: [
          {text: 'George Washington', correct: true},
          {text: 'Abraham Lincoln', correct: false},
          {text: 'William Howard Taft', correct: false},
          {text: 'Donald Trump', correct: false},
      ]
  }
  
]