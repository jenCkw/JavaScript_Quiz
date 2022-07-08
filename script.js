// class UserConnexion
// {
//     _email;
//     _name;

//     constructor(email,name){
//         this._email = email;
//         this._name = name;
//     }

//     get email(){

//         return this._email;
//     }

//     get name(){
//         return this._name;
//     }
//     save(){

//     }
// }

// validation

let form = document.getElementById("form");
let error;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name");
  let email = document.getElementById("email");

  if (name.value === "") {
    error.push("Veuillez renseigner votre nom");
  }
  if (email.value === "") {
    error.push("Veuillez renseigner votre nom");
  }

  let message = document.getElementById("error_message");

  message.innerText = error;
});
