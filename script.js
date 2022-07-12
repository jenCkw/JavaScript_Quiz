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
   * tableau des questions contenant des objets de la classe Question
   * @param {Array} questions
   */
  constructor(questions) {
    //indice de la question actuellement affiché  dans le quiz
    //(la question provient du tableau passé au constructeur)
    this.questionIndex = 0;
    this.questions = questions;
  }

  /**
   * Rétourne un Objet de type Question en fonction de l'index qui est actuellement affiché
   * @returns {Question}
   */
  getQuestionbyIndex() {
    return this.questions[this.questionIndex];
  }

  /**
   * Rétourne true ou false selon que le quiz est à la fin ou pas
   * @returns {Boolean}
   */
  isEnd() {
    if (this.questionIndex === this.questions.length) {
      return true;
    } else {
      false;
      // le jeu continue
    }
  }
  /**
   * élèment dans lequel sera affiché le quiz
   * @param {HTMLDivElement} form_container
   */
  showQuestion(form_container) {
    if (this.isEnd()) {
      // show result
    } else {
      //console.log(form_container);
      form_container.innerHTML = question_template(
        this.getQuestionbyIndex(),
        this.questions.length
      );
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
    "Javascript is an ______ language ?",
    ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
    "Object-Oriented"
  ),
  new Question(
    "Which of the following keywords is used to define a variable in Javscript ?",
    [("var", "let", "Both A and B", "None of the above")],
    "Both A and B"
  ),
  new Question(
    "How do we write a comment in javscript?",
    ["/**/", "//", "#", "$$"],
    "//"
  ),
  new Question(
    "What will be the output of the following code snippet: print(typeof(NaN); ?"[
      ("object", "Number", "String", "None of the above")
    ],
    "Number"
  ),
  new Question(
    "JSON stands for what?",
    [
      "Javascript Object Notation",
      "Java Script Number",
      "JavaScript Script Notice",
      "JavaScript Script Note",
    ],
    "Javascript Object Notation"
  ),
  new Question(
    "How to declare a variable in js ?",
    ["let", "echo", "print", "console.log()"],
    "let"
  ),
  new Question(
    "which of the following methods is used to access HTML elements using JavaScript ?",
    [
      "getElementbyId()",
      "getElementbyClassName()",
      "Both A and B",
      "None of the above",
    ],
    "Both A and B"
  ),
  new Question(
    "What keywords is used to chek whether a given property is valid or not ?",
    ["in", "is in", "xists", "lies"],
    "in"
  ),
  new Question(
    "How can a datatype be declared to be a constant type ?",
    ["cont", "var", "let", "constant"],
    "const"
  ),
  new Question(
    "Which of the following methods can be used to display data in some form using Javascript ?",
    [
      "document.writer()",
      "console.log()",
      "window.alert()",
      "all of the above",
    ],
    "all of the above"
  ),
  new Question(
    "What does the 'toLocateString() method do in JS ?",
    [
      "Returns a localised object representation",
      "Returns a parsed string",
      "Returns a localised string representation of an object",
      "Non of the above",
    ],
    "Returns a localised string representation of an object"
  ),
  new Question(
    "What does the Javascript 'debugger' statement do ?",
    [
      "it will debug all the errors in the programm at runtime",
      "it acts as a beakpoint in a program",
      "it will debug error in the curennt statement if any",
      "all of the above",
    ],
    "it acts as a breakpoint in a program"
  ),
  new Question(
    "Upon encountering empty statements, what does the Javascript interpreter do?"[
      ("Throws an error",
      "Ignores the statements",
      "Gives a warning",
      "None of the above")
    ],
    "Ignores the statements"
  ),
  new Question(
    "What is the use of the <noscript> tag in Javscrpt ?"[
      ("The contents are displayed by non-JS-based browsers",
      "Clears all the cookies and cache",
      "Both A and B",
      "None of the above")
    ],
    "The contents are displayed by non-JS-based browsers"
  ),
  new Question(
    "How to stop an interval timer in javascript ?",
    ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
    "clearInterval"
  ),
];
