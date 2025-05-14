// Variables globales pour suivre le score et la question en cours
let score = 0;
let questionIndex = 0;

// Liste des questions (la 1re réponse est toujours la bonne)
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

// Démarrer le quiz
function start() {
    document.getElementById("accueil").hidden = true;
    document.getElementById("quizz").hidden = false;
    afficherQuestion(questionIndex);
}

// Mélanger un tableau (utile pour les réponses)
function melangerTableau(tableau) {
    return tableau.sort(() => Math.random() - 0.5);
}

// Préparer la question courante
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

// Vérifier si la réponse choisie est correcte
function verifier(reponseChoisie) {
    let question = preparerQuestion(QUESTIONS[questionIndex]);
    if (reponseChoisie === question.bonne) {
        score++;
    }
    questionIndex++;
    afficherQuestion(questionIndex);
}

// Afficher la question suivante ou le résultat
function afficherQuestion(index) {
    const quizzDiv = document.getElementById("quizz");
    quizzDiv.innerHTML = "";

    // Si toutes les questions ont été posées
    if (index >= QUESTIONS.length) {
        resultats();
        return;
    }

    // Préparer la question
    let questionActuelle = preparerQuestion(QUESTIONS[index]);

    // Afficher le texte de la question
    let questionTitre = document.createElement("h3");
    questionTitre.className = "mt-4";
    questionTitre.innerText = questionActuelle.texte;
    quizzDiv.appendChild(questionTitre);

    // Créer les boutons de réponse
    questionActuelle.propositions.forEach(function(reponse) {
        let bouton = document.createElement("button");
        bouton.className = "btn btn-outline-primary m-2 d-block";
        bouton.innerText = reponse;
        bouton.onclick = function() {
            verifier(reponse);
        };
        quizzDiv.appendChild(bouton);
    });
}

// Affichage des resultats
function resultats(){
    const quizzDiv = document.getElementById("quizz");
    const resultatDiv = document.getElementById("resultat");
    const scoreDiv = document.getElementById("score");

    quizzDiv.hidden = true;
    resultatDiv.hidden = false;
    scoreDiv.innerHTML = `Votre score : <strong>${score}</strong> sur <strong>${QUESTIONS.length}</strong>`;
}

// Réinitialiser le quiz
function rejouer() {
    score = 0;
    questionIndex = 0;
    document.getElementById("resultat").hidden = true;
    document.getElementById("quizz").hidden = false;
    afficherQuestion(questionIndex);
}

// Naviguer vers la question précédente
function questionPrecedente() {
    if (questionIndex > 0) {
        questionIndex--;
        afficherQuestion(questionIndex);
    }
}

// Naviguer vers la question suivante sans vérifier la réponse
function questionSuivante() {
    if (questionIndex < QUESTIONS.length - 1) {
        questionIndex++;
        afficherQuestion(questionIndex);
    } else if (questionIndex === QUESTIONS.length - 1) {
        resultats();
    }
}

// MODIFIER afficherQuestion POUR AJOUTER LES BOUTONS DE NAVIGATION
function afficherQuestion(index) {
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

    // Créer une div pour les boutons de navigation
    let navDiv = document.createElement("div");
    navDiv.className = "mt-4";

    // Bouton Retour
    let btnRetour = document.createElement("button");
    btnRetour.innerText = "⬅ Retour";
    btnRetour.className = "btn btn-secondary me-2";
    btnRetour.onclick = questionPrecedente;
    btnRetour.disabled = questionIndex === 0;
    navDiv.appendChild(btnRetour);

    // Bouton Suivant
    let btnSuivant = document.createElement("button");
    btnSuivant.innerText = "Suivant ➡";
    btnSuivant.className = "btn btn-primary";
    btnSuivant.onclick = questionSuivante;
    navDiv.appendChild(btnSuivant);

    
    quizzDiv.appendChild(navDiv);
}
