//formularios
const formProduct = document.querySelector('#form-product');
const brand = document.querySelector("#brand");
const description = document.querySelector("#description");
const image = document.querySelector("#image");


const errorBrand = document.querySelector(".error-brand");
const errorDescription = document.querySelector(".error-description");
const errorImage = document.querySelector(".error-image");
const errorMessages = document.querySelectorAll(".error-message");


// recorriendo todos los mensajes de error y los ocultamos
 function resetFormErrors() {
    errorMessages.forEach(errorMessage => {
        errorMessage.style.display = "none"
    })
}

brand.addEventListener("focus",resetFormErrors);
description.addEventListener("focus",resetFormErrors);
image.addEventListener("focus",resetFormErrors);

formProduct.addEventListener("submit", function (e){

    let errors = false;
    //llamamos a la función que oculta los mensajes de error
     resetFormErrors();
 

    if(brand.value.length == 0) {
        //mostrar mensaje del error
        errorBrand.innerHTML = "Por favor, complete la Marca, mínimo 5 caracteres";
        errorBrand.style.display = "block";
        errors = true
    }

    if(description.value.length < 20) {
        //mostrar mensaje del error
        errorDescription.innerHTML = "Por favor, la descripción debe tener mínimo 20 caracteres";
        errorDescription.style.display = "block";
        errors = true
    }

    //validar imagen.
    //obtener extensión del archivo
    extension = image.value.substring(image.value.lastIndexOf('.'),image.value.length);
    extension = extension.toLowerCase();
    //Si la extensión obtenieda no esta incluida en la lista de valores del arributo "accept", muestra error
    if(image.getAttribute('accept').split(',').indexOf(extension) < 0){
        errorImage.innerHTML = `La extensión ${extension} no es permitida. Utilizar .PNG .JPG .JPEG .GIF`;
        errorImage.style.display = "block";
        errors = true
    }



    if (errors) {
        e.preventDefault()
    }
})

