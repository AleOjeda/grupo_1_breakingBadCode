//formularios
const form = document.querySelector('#form-register');
const email = document.querySelector("#email");
const fullName = document.querySelector("#fullName");
const password = document.querySelector("#password");

const errorEmail = document.querySelector(".error-email");
const errorFullName = document.querySelector(".error-fullName");
const errorPassword = document.querySelector(".error-password");
const errorMessages = document.querySelectorAll(".error-message");


// recorriendo todos los mensajes de error y los ocultamos
 function resetFormErrors() {
    errorMessages.forEach(errorMessage => {
        errorMessage.style.display = "none"
    })
}

email.addEventListener("focus",resetFormErrors);
fullName.addEventListener("focus",resetFormErrors);
password.addEventListener("focus",resetFormErrors);


form.addEventListener("submit", function (e){

    let errors = false;
    //llamamos a la función que oculta los mensajes de error
     resetFormErrors();
 
    //validamos FullName

    if(fullName.value.length < 2) {
        //mostrar mensaje del error
        errorFullName.innerHTML = "Por favor, complete su nombre";
        errorFullName.style.display = "block";
        errors = true
    }

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
    /* e.preventDefault(); */
    
    if(password.value.length < 8) {
        //mostrar mensaje del error
        errorPassword.innerHTML = "Por favor, la contraseña debe tener mínimo 8 caracteres";
        errorPassword.style.display = "block";
        errors = true
    }

    fetch(`${host}/api/user/${email.value}`)
    .then (response => response.json())
    .then((userDetails) => {
        if (userDetails.data !== null){
            errorEmail.innerHTML = "Por favor, utilice un email no registrado";
            errorEmail.style.display = "block";
            errors = true
        }
    })
    if (errors) {
        e.preventDefault()
    }
})

                /*     userInDb =>{
                    if(userInDb) {
                        errorEmail.innerHTML = "Por favor, utilice un email no registrado";
                        errorEmail.style.display = "block";
                        errors = true
                        console.log('llegue aca');
                    }}) */