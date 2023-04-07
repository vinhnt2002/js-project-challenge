

// obj array
const quizData = [
    {
        question: 'The day VietNam was have peacefull',
        a: '1979',
        b: '2002',
        c: '2023',
        d: '1900',
        correct: 'a'
    },
    {
        question: 'What is the most used programming languuage in 2023?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'JavaScript',
        correct: 'd'
    },
    {
        question: 'What is the President of US in 2023',
        a: 'Biden',
        b: 'Donald Trump',
        c: 'Ronaldo',
        d: 'SonTung-MTP',
        correct: 'a'
    },
    {
        question: 'What does HTLM stand for?',
        a: 'Hypertext Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Jason Object Notation',
        d: 'Lamborginis',
        correct: 'a'
    },
    {
        question: 'Who is the best player in FootBall',
        a: 'Messi',
        b: 'Neymar',
        c: 'Beckham',
        d: 'Mppabe',
        correct: 'a'
    }

]

// declare info from html
const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBTN = document.getElementById("submit");

// the element in array
let currentQuiz = 0;

// the scoce to show total of each answer
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    // let the number ele in array by currentQuiz[0,1,2,3,4...]
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerHTML = currentQuizData.question;

    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

// to check answerEls when select answer == > let it = answer
function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEls) => {
        if (answerEls.checked) {
            answer = answerEls.id
        }
    });
    return answer;
}
// delete the answer of you choose after each question
function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}


// submit event
submitBTN.addEventListener("click", () => {
    
    // check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            // to do show result
            loadQuiz();
        } else {
            // show by DOM
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                <button onclick="location.reload()">Reload</button>
                `;
        }
    }
});


