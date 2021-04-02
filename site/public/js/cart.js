window.onload = function() {
/*     init();
    doSomethingElse(); */

    const db = fetch('http://localhost:3000/api/carrito/1234'/* ,{
        method: 'POST',
        //No hace falta que envie ningun dato para que lea la cookie. Solamente tiene que viajar por post
        //body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        } 
    }*/)
    .then( (response) =>{ 
        return response.json()
    })
/*     .then ( carrito => {
        return carrito.data;
    }) */
    .then( (ElementsInCart) =>{
        cartElements = document.getElementById("cart-elements");
        cartElements.innerHTML = ElementsInCart.totalSku;
        cartAmount = document.getElementById("cart-amount");
        cartAmount.innerHTML = ElementsInCart.totalAmountCart;
    })

/*     console.log(user); */
};
/* 
const db = fetch('http://localhost:3000/src/database/config/config.js').then(function(response){console.log(response)})
 */
