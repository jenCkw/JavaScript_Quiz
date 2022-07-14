export function question_template(question, questionlength, questionIdx) {
  var choix_text = "";

  question.choix.map((choix, index) => {
    choix_text += `
      <div class="form_input-question">
        <input
          type="radio"
          name="radio"
          id="choix_${index}"
          value="${choix}"
          data-response="${choix}"
        />

        <label for="choix_${index}">${choix}</label>
      </div>
    `;
  });

  return `
    <div class="form_question_text">
      <p>${question.question}</p>
    </div>
    <div class="question-container">
      <div class="questions">
        <span>question ${questionIdx}/${questionlength} </span>
        <span>30</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fil"></div>
      </div>
    </div>
    <div class="">
      <form action="" id="form_question">
        ${choix_text}
        <div class="form_action">
          <button id="form_sub_btn-quitter" class="form-action-button">
            Quitter
          </button>
          <button type="submit" disabled id="form_sub_btn-suivant" class="form-action-button">
            Suivant
          </button>
        </div>
      </form>
    </div>
  `;
}

export function resultat_template(user, score) {
  return `
    <div class="container-result">
      <h2>${user.nom}</h2>
      <p>${user.mail}</p>
      <div class="result-icon">
      <i class="fa-solid fa-check"></i>
      </div>
      <p>${score}/15</p>
      <a href="/">
        <button class="action-validation">Acueuil</button>
      </a>
    </div>
  `;
}

export function result_fail(user, score) {
  return `
    <div class="container-result">
      <h2>${user.nom}</h2>
      <p>${user.mail}</p>
      <div class="result-icon error_result">
        <i class="fa-solid fa-xmark"></i> 
      </div>
      <p>${score}/15</p>
      <a href="/">
        <button class="action-validation">Acueuil</button>
      </a>
    </div>
  `;
}
