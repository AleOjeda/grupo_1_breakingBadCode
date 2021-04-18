//formularios
const formRegister = document.querySelector('#form-login');
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const errorEmail = document.querySelector(".error-email");
const errorPassword = document.querySelector(".error-password");
const errorMessages = document.querySelectorAll(".error-message");


// recorriendo todos los mensajes de error y los ocultamos
 function resetFormErrors() {
    errorMessages.forEach(errorMessage => {
        errorMessage.style.display = "none"
    })
}

email.addEventListener("focus",resetFormErrors);
password.addEventListener("focus",resetFormErrors);


formRegister.addEventListener("submit", function (e){

    let errors = false;
    //llamamos a la función que oculta los mensajes de error
     resetFormErrors();
 

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    
    if(!validateEmail(email.value)) {
        //mostrar mensaje del error
        errorEmail.innerHTML = "Por favor, complete un email válido";
        errorEmail.style.display = "block";
        errors = true
    }

    if(password.value.length == 0) {
        //mostrar mensaje del error
        errorPassword.innerHTML = "Por favor, complete su contraseña";
        errorPassword.style.display = "block";
        errors = true
    }

    if (errors) {
        e.preventDefault()
    }
})

