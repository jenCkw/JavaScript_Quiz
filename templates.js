export function question_template(question, questionlength) {
  var choix_text = "";

  question.choix.map((choix, index) => {
    choix_text += `
      <div class="form_input-question">
              <div>
                <input type="radio" name="radio" id="choix_${index}" data-response="${choix}" />
              </div>
              <div>
                <label for="choix_${index}">${choix}</label>
              </div>
        </div>
    `;
  });

  return `
    <div class="form_question_text">
      <p>${question.question}</p>
    </div>
    <div class="question-container">
      <div class="questions">
        <span>question 1/${questionlength} </span>
        <span>30</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fil"></div>
      </div>
    </div>
    <div class="">
      <form action="">
        ${choix_text}
        <div class="form_action">
          <button id="form_sub_btn-quitter" class="form-action-button">
            Quitter
          </button>
          <button disabled id="form_sub_btn-suivant" class="form-action-button">
            Suivant
          </button>
        </div>
      </form>
    </div>
  `;
}

export function resultat_template(user) {
  return `
    <div class="container-result">
      <h2>${user.nom}</h2>
      <p>${user.mail}</p>
      <div class="result-icon"></div>
      <p>14/15</p>
      <a href="/">
        <button class="action-validation">Acueuil</button>
      </a>
    </div>
  `;
}
