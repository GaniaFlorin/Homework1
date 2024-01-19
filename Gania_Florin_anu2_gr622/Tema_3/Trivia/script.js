const questions = [
    {
        question: 'Care este capitala Franței?',
        options: ['Berlin', 'Paris', 'Londra', 'Madrid'],
        correct: 2
    },
    {
        question: 'Câte luni au 28 de zile?',
        options: ['1', '6', '12', 'Toate'],
        correct: 4
    },
    {
        question: 'Care este cel mai mare ocean?',
        options: ['Atlanticul', 'Indianul', 'Arcticul', 'Pacificul'],
        correct: 4
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;

    optionsElement.innerHTML = '';
    current.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => checkAnswer(index + 1));
        optionsElement.appendChild(li);
    });

    nextBtn.style.display = 'none';
}

function checkAnswer(userAnswer) {
    const current = questions[currentQuestion];
    if (userAnswer === current.correct) {
        score++;
    }

    optionsElement.classList.add('disabled');
    resultElement.textContent = `Răspunsul corect este: ${current.options[current.correct - 1]}`;
    resultElement.style.display = 'block';
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        optionsElement.classList.remove('disabled');
        resultElement.style.display = 'none';
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    resultElement.textContent = `Jocul s-a încheiat. Scorul tău este: ${score}/${questions.length}.`;
    nextBtn.style.display = 'none';
    resultElement.style.display = 'block';
}

loadQuestion();
