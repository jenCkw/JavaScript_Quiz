//3 fonctions qui retourne que du html
import {
  question_template,
  resultat_template,
  // result_fail,
} from "./templates.js";
//INDEX.HTML=>VALIDATION FORM ET INITIALISATION DU QUIZ

const nom = document.getElementById("name");
const email = document.getElementById("email");
const nomErrorMsg = document.querySelector("#error_message");
const emailErrorMsg = document.getElementById("error_msg-email");
const btnSubmit = document.getElementById("btn-action");
var mail_format =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const form_container = document.querySelector(".form_container");
//GÈRE LA SOUMISSION DU FORMULAIRE
function onSubmit(e) {
  e.preventDefault();
  //console.log("okd");

  let form_bolean = true;

  if (nom?.value === "") {
    form_bolean = false;
    nomErrorMsg.style.display = "block";
    nomErrorMsg.innerHTML =
      "*N'oubliez pas de renseigner votre nom avant de commencer";
  } else if (nom?.value.length < 2) {
    form_bolean = false;
    nomErrorMsg.style.display = "block";
    nomErrorMsg.innerHTML = "* Taille inferieur à 2";
  } else {
    nomErrorMsg.style.display = "none";
  }

  if (email?.value === "") {
    form_bolean = false;
    nomErrorMsg.style.display = "block";
    emailErrorMsg.style.display = "block";
    emailErrorMsg.innerHTML =
      "*N'oubliez pas de renseigner votre mail avant de commencer";
  } else if (email.value.match(mail_format) === null) {
    form_bolean = false;
    nomErrorMsg.style.display = "block";
    emailErrorMsg.style.display = "block";
    emailErrorMsg.innerHTML = "*Votre email n'est pas valide";
  } else {
    emailErrorMsg.style.display = "none";
  }

  if (form_bolean === false) return;

  let userdata = {
    nom: nom.value,
    mail: email.value,
  };
  localStorage.setItem("userdata", JSON.stringify(userdata));
  // console.log(userdata);

  //console.log(nomErrorMsg);

  // ICI ON SUPPOSE QUE LE FORM EST VALIDE

  let quiz = new QUIZ(questions);
  quiz.showQuestion();
}
btnSubmit.addEventListener("click", onSubmit);

class QUIZ {
  /**
   * tableau des questions contenant des objets de la classe Question
   * @param {Array} questions
   */
  constructor(questions) {
    //indice de la question actuellement affiché  dans le quiz
    //(la question provient du tableau passé au constructeur)
    this.questionIndex = 0;
    this.questions = questions.sort(() => Math.random() - 0.5); //recuperer les questions d'une maniere aleatoire.
    this.score = 0;
    this.form_container = document.querySelector(".form_container");
    this.timer = 60;
  }

  /**
   * Rétourne un Objet de type Question en fonction de l'index qui est actuellement affiché
   * @returns {Question}
   */
  getQuestionbyIndex() {
    return this.questions[this.questionIndex];
  }

  isBeforeLast() {
    if (this.questionIndex === this.questions.length - 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Rétourne true ou false selon que le quiz est à la fin ou pas
   * @returns {Boolean}
   */
  isEnd() {
    return this.questionIndex == this.questions.length;
  }
  /**
   * Affiche une question
   */
  showQuestion() {
    if (this.isEnd()) {
      //console.log("ok");
      this.showResult();
    } else {
      this.form_container.innerHTML = question_template(
        this.getQuestionbyIndex(),
        this.questions.length + 1,
        this.questionIndex + 1
      );
      this.clearAllInterval();
      this.startTimer();
      // récupère les elts après leurs insertion dans le dom
      this.radio_btns = document.querySelectorAll(".form_input-question");
      this.next_btn = document.querySelector("#form_sub_btn-suivant");
      this.cancel_btn = document.querySelector("#form_sub_btn-quitter");
      //formulaire d'affichage des question
      this.questionFormElt = document.querySelector("#form_question");
      this.progress_bar = document.querySelector(".progress-bar-fil");
      //lance la methode du timer
      // this.startTimer();
      this.events();

      if (this.isBeforeLast()) {
        document.querySelector("#form_sub_btn-suivant").textContent =
          "Terminer";
      }
    }

    // vérifier si le quiz ne pas à la fin
    // si c pas la fin on affiche le template de la question
    // sinon on affiche le résultat
  }

  //progress bar
  startTimer() {
    let timeleft = 60;
    let totaltime = 60;
    let timerInt = document.querySelector("#timerInt");
    setInterval(() => {
      let progresswidth = Math.ceil((timeleft * 100) / totaltime); //arrondit le resultat des calcls ici
      this.progress_bar.style.width = progresswidth + "%"; //la ligne qui fait bouger le progessbar
      timeleft--; //decremente de 1 sur chauque seconde qui bouge
      timerInt.innerHTML = timeleft;

      //si l'index est egal à 0, on passe à la question suivante, on efface la question qui etait en cours d'affichage et on passe à la question suivante
      if (timeleft === 0) {
        this.questionIndex = this.questionIndex + 1;
        timerInt.innerHTML = "";
        this.clearAllInterval();
        this.showQuestion();
      }
    }, 1000);
  }

  /**
   * à créer une méthode qui va gérer le clique sur l'une des réponses
   */
  events() {
    this.radio_btns.forEach((radio) => {
      radio.addEventListener("click", (e) => {
        document
          .querySelector(".form_input-question.selected")
          ?.classList.remove("selected"); // enleve le comportement(colorier en vert) aux input non-selectionnés

        radio.classList.add("selected"); // applique le le comportement(colorier en vert) à l'input selectionné
        radio.querySelector("input").checked = true;
        //removeattribute pour reactiver le boutton vert quand on clique sur la reponse
        this.next_btn.removeAttribute("disabled");
      });
    });
    // this.next_btn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   let selectedRadio = document.querySelector('input[name="radio"]');
    //   console.log(selectedRadio.checked);
    // });
    this.questionFormElt.addEventListener("submit", (e) => {
      e.preventDefault();
      let choix = e.target.radio.value;

      //compare le choix de la reponse et incremente le score quand la reponse est correcte
      if (this.getQuestionbyIndex().reponse === choix) {
        this.score++;
      }

      //incremente l'index des question
      this.questionIndex = this.questionIndex + 1;
      this.showQuestion();
    });

    //
    this.cancel_btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.showResult();
    });
  }

  showResult() {
    let userdata = JSON.parse(localStorage.getItem("userdata"));
    let halfquest = Math.ceil(this.questions.length / 2); //divise la taille des questions et arrondit
    form_container.innerHTML = resultat_template(
      userdata,
      this.score,
      this.score > halfquest
    );
  }

  /**
   * Supprime le timer en cours
   */
  clearAllInterval() {
    const interval_id = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    this._maxTime = 60;
  }
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
  {
    question:
      "Which of the following keywords is used to define a variable in Javscript ?",
    choix: ["var", "let", "Both A and B", "None of the above"],
    reponse: "Both A and B",
  },

  {
    question: "How do we write a comment in javscript?",
    choix: ["/**/", "//", "#", "$$"],
    reponse: "//",
  },

  {
    question:
      "What will be the output of the following code snippet: print(typeof(NaN); ?",
    choix: ["object", "Number", "String", "None of the above"],
    reponse: "Number",
  },

  {
    question: "JSON stands for what?",
    choix: [
      "Javascript Object Notation",
      "Java Script Number",
      "JavaScript Script Notice",
      "JavaScript Script Note",
    ],
    reponse: "Javascript Object Notation",
  },

  {
    question: "How to declare a variable in js ?",
    choix: ["let", "echo", "print", "console.log()"],
    reponse: "let",
  },

  {
    question:
      "which of the following methods is used to access HTML elements using JavaScript ?",
    choix: [
      "getElementbyId()",
      "getElementbyClassName()",
      "Both A and B",
      "None of the above",
    ],
    reponse: "Both A and B",
  },
  {
    question:
      "What keywords is used to chek whether a given property is valid or not ?",
    choix: ["in", "is in", "xists", "lies"],
    reponse: "in",
  },
  {
    question: "How can a datatype be declared to be a constant type ?",
    choix: ["const", "var", "let", "constant"],
    reponse: "const",
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript ?",
    choix: [
      "document.writer()",
      "console.log()",
      "window.alert()",
      "all of the above",
    ],
    reponse: "all of the above",
  },
  {
    question: "What does the 'toLocateString() method do in JS ?",
    choix: [
      "Returns a localised object representation",
      "Returns a parsed string",
      "Returns a localised string representation of an object",
      "Non of the above",
    ],
    reponse: "Returns a localised string representation of an object",
  },
  {
    question: "What does the Javascript 'debugger' statement do ?",
    choix: [
      "it will debug all the errors in the programm at runtime",
      "it acts as a beakpoint in a program",
      "it will debug error in the curennt statement if any",
      "all of tquestion_templatehe above",
    ],
    reponse: "it acts as a beakpoint in a program",
  },
  {
    question:
      "Upon encountering empty statements, what does the Javascript interpreter do?",
    choix: [
      "Throws an error",
      "Ignores the statements",
      "Gives a warning",
      "None of the above",
    ],
    reponse: "Ignores the statements",
  },
  {
    question: "What is the use of the noscript tag in Javscrpt ?",
    choix: [
      "The contents are displayed by non-JS-based browsers",
      "Clears all the cookies and cache",
      "Both A and B",
      "None of the above",
    ],
    reponse: "The contents are displayed by non-JS-based browsers",
  },

  {
    question: "Hows to stop an interval timer in javascript ?",
    choix: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
    reponse: "clearInterval",
  },
];
