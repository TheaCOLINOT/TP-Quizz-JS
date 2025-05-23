// variables globales pour suivre le score et la question en cours
let score = 0;
let questionIndex = 0;

// liste des questions (la 1re réponse est toujours la bonne)
const QUESTIONS = [
    {
        question: "Quel est le plus grand océan du monde ?",
        response: {
            1: "Océan Pacifique",
            2: "Océan Atlantique",
            3: "Océan Indien"
        }
    },
    {
        question: "Quelle est la capitale de l'Australie ?",
        response: {
            1: "Canberra",
            2: "Sydney",
            3: "Melbourne"
        }
    },
    {
        question: "Quelle planète est la plus proche du soleil ?",
        response: {
            1: "Mercure",
            2: "Vénus",
            3: "Terre"
        }
    }
];

// demarrer le quiz
function start() {
    document.getElementById("accueil").hidden = true;
    document.getElementById("quizz").hidden = false;
    afficherQuestion(questionIndex);
}

// melange tableau
function melangerTableau(tableau) {
    return tableau.sort(() => Math.random() - 0.5);
}

function preparerQuestion(questionObj) {
    let reponses = Object.values(questionObj.response);
    let bonneReponse = reponses[0];
    let reponsesMelangees = melangerTableau([...reponses]);

    return {
        texte: questionObj.question,
        propositions: reponsesMelangees,
        bonne: bonneReponse
    };
}

// verifie si réponse bonne
function verifier(reponseChoisie) {
    let question = preparerQuestion(QUESTIONS[questionIndex]);
    if (reponseChoisie === question.bonne) {
        score++;
    }
    questionIndex++;
    afficherQuestion(questionIndex);
}

// afficher la question suivante ou le résultat
function afficherQuestion(index) {
    mettreAJourProgression(index);

    const quizzDiv = document.getElementById("quizz");
    quizzDiv.innerHTML = "";

    if (index >= QUESTIONS.length) {
        resultats();
        return;
    }

    let questionActuelle = preparerQuestion(QUESTIONS[index]);

    let questionTitre = document.createElement("h3");
    questionTitre.className = "mt-4";
    questionTitre.innerText = questionActuelle.texte;
    quizzDiv.appendChild(questionTitre);

    questionActuelle.propositions.forEach(function(reponse) {
        let bouton = document.createElement("button");
        bouton.className = "btn btn-outline-primary m-2 d-block";
        bouton.innerText = reponse;
        bouton.onclick = function () {
            verifier(reponse);
        };
        quizzDiv.appendChild(bouton);
    });

    let navDiv = document.createElement("div");
    navDiv.className = "mt-4";

    // Bouton retour
    let btnRetour = document.createElement("button");
    btnRetour.innerText = "⬅ Retour";
    btnRetour.className = "btn btn-secondary me-2";
    btnRetour.onclick = questionPrecedente;
    btnRetour.disabled = questionIndex === 0;
    navDiv.appendChild(btnRetour);

    // Bouton suivant
    let btnSuivant = document.createElement("button");
    btnSuivant.innerText = "Suivant ➡";
    btnSuivant.className = "btn btn-primary";
    btnSuivant.onclick = questionSuivante;
    navDiv.appendChild(btnSuivant);

    quizzDiv.appendChild(navDiv);
}

// affiche resultat
function resultats(){
    const quizzDiv = document.getElementById("quizz");
    const resultatDiv = document.getElementById("resultat");
    const scoreDiv = document.getElementById("score");

    quizzDiv.hidden = true;
    resultatDiv.hidden = false;
    scoreDiv.innerHTML = `Votre score : <strong>${score}</strong> sur <strong>${QUESTIONS.length}</strong>`;
}

// réinitialiser quiz
function rejouer() {
    score = 0;
    questionIndex = 0;
    document.getElementById("resultat").hidden = true;
    document.getElementById("quizz").hidden = false;
    mettreAJourProgression(0);
    afficherQuestion(questionIndex);
}

// naviguer vers question précédente
function questionPrecedente() {
    if (questionIndex > 0) {
        questionIndex--;
        afficherQuestion(questionIndex);
    }
}

// naviguer vers question suivante
function questionSuivante() {
    if (questionIndex < QUESTIONS.length - 1) {
        questionIndex++;
        afficherQuestion(questionIndex);
    } else if (questionIndex === QUESTIONS.length - 1) {
        resultats();
    }
}

// mettre à jour barre progression
function mettreAJourProgression(index) {
    const barre = document.getElementById("barreProgression");
    const container = document.getElementById("barreProgressionContainer");

    let pourcentage = Math.floor((index / QUESTIONS.length) * 100);
    barre.style.width = `${pourcentage}%`;
    barre.setAttribute("aria-valuenow", pourcentage);
    barre.innerText = `${pourcentage}%`;
    container.hidden = false;

    // couleurs change
    barre.classList.remove("bg-success", "bg-warning", "bg-danger");
    if (pourcentage < 40) {
        barre.classList.add("bg-danger");
    } else if (pourcentage < 80) {
        barre.classList.add("bg-warning");
    } else {
        barre.classList.add("bg-success");
    }
}
