const quizData = [
    {
        question: "JavaScript kis liye use hoti hai?",
        a: "Sirf Styling ke liye",
        b: "Webpages ko interactive banane ke liye",
        c: "Database management ke liye",
        d: "Sirf Layout banane ke liye",
        correct: "b",
    },
    {
        question: "CSS ka full form kya hai?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "HTML mein sab se bari heading kaunsi hoti hai?",
        a: "<h6>",
        b: "<head>",
        c: "<h1>",
        d: " <heading>",
        correct: "c",
    },
    {
        question: "JavaScript mein variable banane ke liye kaunsa keyword use hota hai?",
        a: "var",
        b: "let",
        c: "const",
        d: "Upar diye gaye tamam (All of the above)",
        correct: "d",
    },
    {
        question: "Bootstrap kya hai?",
        a: "Programming Language",
        b: "CSS Framework",
        c: "Browser ka naam",
        d: "Operating System",
        correct: "b",
    },
    {
        question: "JavaScript mein alert box dikhane ke liye sahi syntax kya hai?",
        a: "msg('Hello')",
        b: "alert('Hello')",
        c: "alertBox('Hello')",
        d: "display('Hello')",
        correct: "b",
    },
    {
        question: "Variable 'name' ko declare karne ka sahi tariqa kya hai?",
        a: "var name;",
        b: "variable name;",
        c: "v name;",
        d: "str name;",
        correct: "a",
    },
    {
        question: "Variable name mein konsa special character allow hai?",
        a: "Space ( )",
        b: "Hyphen (-)",
        c: "Underscore (_)",
        d: "Asterisk (*)",
        correct: "c",
    },
    {
        question: "2 + 2 ka result agar string ho ('2' + 2), toh output kya hoga?",
        a: "4",
        b: "22",
        c: "Error",
        d: "NaN",
        correct: "b",
    },
    {
        question: "Prompt box se milne wali value by default kis type ki hoti hai?",
        a: "Number",
        b: "Boolean",
        c: "String",
        d: "Object",
        correct: "c",
    },
    {
        question: "Modulo operator (%) kya return karta hai?",
        a: "Percentage",
        b: "Division result",
        c: "Remainder",
        d: "Power",
        correct: "c",
    },
    {
        question: "If statement mein 'not equal' ke liye konsa symbol use hota hai?",
        a: "!=",
        b: "==",
        c: "=",
        d: "><",
        correct: "a",
    },
    {
        question: "Array ke aakhri element ko remove karne ke liye kya use hota hai?",
        a: "shift()",
        b: "push()",
        c: "pop()",
        d: "slice()",
        correct: "c",
    },
    {
        question: "Array ke shuru mein naya element add karne ke liye kya use karte hain?",
        a: "push()",
        b: "unshift()",
        c: "pop()",
        d: "splice()",
        correct: "b",
    },
    {
        question: "For loop mein 'i++' ka kya matlab hai?",
        a: "i = i + 1",
        b: "i = i - 1",
        c: "i is positive",
        d: "i multiply by 2",
        correct: "a",
    },
    {
        question: "Bootstrap kya hai?",
        a: "Programming Language",
        b: "CSS Framework",
        c: "Browser ka naam",
        d: "Operating System",
        correct: "b",
    },
    {
        question: "HTML file ki extension kya hoti hai?",
        a: ".js",
        b: ".css",
        c: ".html",
        d: ".txt",
        correct: "c",
    },
    {
        question: "JavaScript mein function banane ka sahi tarika kya hai?",
        a: "function:myFunction()",
        b: "function myFunction()",
        c: "method myFunction()",
        d: "create.myFunction()",
        correct: "b",
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2 style="padding: 2rem;">Aapne ${quizData.length} mein se ${score} sahi jawab diye!</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});