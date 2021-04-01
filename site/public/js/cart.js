window.onload = function() {
/*     init();
    doSomethingElse(); */

    const db = fetch("http://localhost:3000/api/carrito/1234")
    .then( (response) =>{ 
    return response.json()
    })
    .then ( carrito => {
/*         carrito.data.forEach(element =>{
            console.log(element);
        }) */
        // agregar un locals con los elementos de carrito si no esta logueado el usuario
/*         if(locals){
            userID = "<%- userLogged.id%>  res.locals.userLogged.id "
        } 
        console.log("estamos" + userID);
 */        return carrito.data;
    })
    .then( (ElementsInCart) =>{
        cartElements = document.getElementById("cart-elements");
        cartElements.innerHTML = ElementsInCart.length;
    })

/*     console.log(user); */
};
/* 
const db = fetch('http://localhost:3000/src/database/config/config.js').then(function(response){console.log(response)})
 */
