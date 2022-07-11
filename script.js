import { question_template } from "./templates.js";
//INDEX.HTML=>VALIDATION FORM ET INITIALISATION DU QUIZ

const nom = document.getElementById("name");
const email = document.getElementById("email");
const nomErrorMsg = document.querySelector("#error_message");
const emailErrorMsg = document.getElementById("error_msg-email");
const btnSubmit = document.getElementById("btn-action");
var mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
const form_container = document.querySelector(".form_container");

//GÈRE LA SOUMISSION DU FORMULAIRE
function onSubmit(e) {
  e.preventDefault();
  //console.log("okd");

  if (nom?.value === "" || email?.value === "") {
    nomErrorMsg.style.display = "block";
    emailErrorMsg.style.display = "block";
    emailErrorMsg.innerHTML = "*Please this field is required";
  } else {
    nomErrorMsg.style.display = "none";
    emailErrorMsg.style.display = "none";
    //console.log(nomErrorMsg);
    // if (email.value.match(mail_format)) {
    //   console.log(nom.value, email.value);
    // } else {
    //   emailErrorMsg.style.display = "block";
    //   emailErrorMsg.innerHTML = "*please enter a valid mail address";
    // }

    // ICI ON SUPPOSE QUE LE FORM EST VALIDE

    let quiz = new QUIZ(questions);
    quiz.showQuestion(form_container);
  }
}
btnSubmit.addEventListener("click", onSubmit);

class QUIZ {
  /**
   * tableau des questions
   * @param {*} questions
   */
  constructor(questions) {
    this.questionIndex = 0;
    this.questions = questions;
  }

  /**
   *
   * @returns {Question}
   */
  getQuestionbyIndex() {
    return this.questions[this.questionIndex];
  }

  isEnd() {
    if (this.questionIndex === this.questions.length) {
      return true;
    } else {
      false;
      // le jeu continue
    }
  }
  showQuestion(form_container) {
    if (this.isEnd()) {
      // show result
    } else {
      //console.log(form_container);
      form_container.innerHTML = question_template(this.getQuestionbyIndex());
    }

    // vérifier si le quiz ne pas à la fin
    // si c pas la fin on affiche le template de la question
    // sinon on affiche le résultat
  }
  startTimer() {
    // démarre le timer
    //si le timer atteint la fin, il incremente questionIndex
    //ensuite appel la méthode showquestion
  }
  // à créer une méthode qui va gérer le clique sur l'une des réponses
}

class Question {
  /**
   *
   * @param {String} question
   * @param {Array} choix
   * @param {String} reponse
   */
  constructor(question, choix, reponse) {
    this.question = question;
    this.reponse = reponse;
    this.choix = choix;
  }
  isValid() {}
}

let questions = [
  new Question(
    "JSON signifie quoi?",
    [
      "Javascript Object Notation",
      "Java Script Number",
      "JavaScript Script Notice",
    ],
    "Javascript Object Notation"
  ),
  new Question(
    "Comment declarer une variable en js",
    ["let", "Java Script Number", "JavaScript Script Notice"],
    "Javascript Object Notation"
  ),
];
