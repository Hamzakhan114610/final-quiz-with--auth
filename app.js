import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKZ9usjdA2l5U4q47y4hts2AdsTAtAzSs",
    authDomain: "sec-auth-1f048.firebaseapp.com",
    databaseURL: "https://sec-auth-1f048-default-rtdb.firebaseio.com",
    projectId: "sec-auth-1f048",
    storageBucket: "sec-auth-1f048.firebasestorage.app",
    messagingSenderId: "360719497179",
    appId: "1:360719497179:web:c412d72187f2e1eed499fe"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const quizData = [
    { question: "JavaScript kis liye use hoti hai?", a: "Sirf Styling ke liye", b: "Webpages ko interactive banane ke liye", c: "Database management ke liye", d: "Sirf Layout banane ke liye", correct: "b" },
    { question: "CSS ka full form kya hai?", a: "Central Style Sheets", b: "Cascading Style Sheets", c: "Cascading Simple Sheets", d: "Cars SUVs Sailboats", correct: "b" },
    { question: "JavaScript mein variable banane ke liye kaunsa keyword use hota hai?", a: "var", b: "let", c: "const", d: "Upar diye gaye tamam (All of the above)", correct: "d" },
    { question: "Bootstrap kya hai?", a: "Programming Language", b: "CSS Framework", c: "Browser ka naam", d: "Operating System", correct: "b" },
    { question: "JavaScript mein alert box dikhane ke liye sahi syntax kya hai?", a: "msg('Hello')", b: "alert('Hello')", c: "alertBox('Hello')", d: "display('Hello')", correct: "b" }
];

const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit');

// Sare questions ek hi page par load karne ke liye
function renderQuiz() {
    let html = "";
    quizData.forEach((item, index) => {
        html += `
            <div class="question-card">
                <h3>${index + 1}. ${item.question}</h3>
                <div class="options">
                    <label><input type="radio" name="q${index}" value="a"> ${item.a}</label><br>
                    <label><input type="radio" name="q${index}" value="b"> ${item.b}</label><br>
                    <label><input type="radio" name="q${index}" value="c"> ${item.c}</label><br>
                    <label><input type="radio" name="q${index}" value="d"> ${item.d}</label>
                </div>
            </div>
        `;
    });
    quizForm.innerHTML = html;
}

async function saveToFirebase(correct, wrong) {
    const user = auth.currentUser;
    if (user) {
        await set(ref(db, 'quiz_results/' + user.uid), {
            correct: correct,
            wrong: wrong,
            email: user.email,
            time: new Date().toLocaleString()
        });
    }
}

submitBtn.addEventListener('click', () => {
    let score = 0;
    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === item.correct) {
            score++;
        }
    });

    let wrong = quizData.length - score;
    saveToFirebase(score, wrong);

    document.querySelector('.quiz-container').innerHTML = `
        <div style="text-align:center; padding: 40px;">
            <h1 style="color:#673ab7">Response Submitted!</h1>
            <p>Sahi Jawab: ${score} | Galat: ${wrong}</p>
            <button onclick="location.reload()">Dobara Quiz Den</button>
        </div>
    `;
});

renderQuiz();