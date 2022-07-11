// validation

let form = document.getElementById("btn-action");
let nom = document.getElementById("name");
let email = document.getElementById("email");
let div_nom = document.querySelector(".error_message");
let error;

form.addEventListener("click", function (e) {
  e.preventDefault();

  if (nom?.value === "") {
    alert("kkkkk");
  }
  if (email?.value === "") {
    alert("kkkkk");
  }

  let message = document.getElementById("error_message");

  message.innerText = error;
});
