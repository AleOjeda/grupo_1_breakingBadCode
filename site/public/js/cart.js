//let host =  "http://192.168.0.5:3000";

let host = "http://localhost:3000";
//let host = "http://192.168.0.8:3000";

function showNotShowButtons(sku){
    //Botones
    ///////// - Cantidad + //
    fieldAddOneSku = 'addOneSku=' + sku;
    fieldAddOneSku = document.getElementById(fieldAddOneSku);
    fieldSubtractOneSku = 'subtractOneSku=' + sku;
    fieldSubtractOneSku = document.getElementById(fieldSubtractOneSku);
    fieldQuantity = 'quantitySku=' + sku;
    fieldQuantity = document.getElementById(fieldQuantity);
    fieldBotonesSUP = 'botones-superiorSKU=' + sku;
    fieldBotonesSUP = document.getElementById(fieldBotonesSUP);
    fieldBotonesINF = 'botones-inferiorSKU=' + sku;
    fieldBotonesINF = document.getElementById(fieldBotonesINF);


    itemQuantity = fieldQuantity.innerHTML;
    ///////// Agregar //
    fieldAddCartSku = 'addCartSku=' + sku;
    fieldAddCartSku = document.getElementById(fieldAddCartSku);

    if(itemQuantity > 0){
        if(fieldBotonesSUP){fieldBotonesSUP.classList.add("mostrar");}
        if(fieldBotonesINF){
        fieldBotonesINF.classList.remove("mostrar");
        fieldBotonesINF.classList.add("ocultar");
        }
    } else{
        if(fieldBotonesSUP){fieldBotonesSUP.classList.remove("mostrar");}
        if(fieldBotonesINF){fieldBotonesINF.classList.remove("ocultar");}
    }

}

function subtotalRefresher(productsInCart) {
    productsInCart.forEach(item => {
        fieldSubtotal = 'subtotalSku=' + item.product.id;
        if(document.getElementById(fieldSubtotal)){
            fieldSubtotalItem = document.getElementById(fieldSubtotal).innerHTML
        // }
        // if(fieldSubtotal){
            fieldSubtotal = 'subtotalSku=' + item.product.id;
            document.getElementById(fieldSubtotal).innerHTML = item.subtotal ;
        }
    }
    )
}


function quantityProductsRefresher() {
    //Actualiza las cantidades
    //fetch('https://restcountries.eu/rest/v2/all')
    fetch(`${host}/api/cart`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }})
    .then(response => response.json())
    .then(cart=>{
        let cartItems = cart.data;
        //console.log(cartItems);
        cartItems.forEach(item =>{
            fieldQuantity = 'quantitySku=' + item.product_id;
            fieldQuantityItem = document.getElementById(fieldQuantity);
            if(fieldQuantityItem){
                fieldQuantityItem.innerHTML = item.quantity;
                showNotShowButtons(item.product_id);
            }
        })
        subtotalRefresher(cartItems);
        /////////////////////////////////////////////////
        let fieldSubtotalCart = 'subtotalAabonar';
        let fieldSubtotalCartItem;
        if(document.getElementById(fieldSubtotalCart)){
            fieldSubtotalCartItem = document.getElementById(fieldSubtotalCart).innerHTML;
        }
        if ((fieldSubtotalCartItem)){
            document.getElementById(fieldSubtotalCart).innerHTML = cart.totalAmountCart;
            document.getElementById(fieldSubtotalCart+1).innerHTML = cart.totalAmountCart;
            document.getElementById(fieldSubtotalCart+2).innerHTML = cart.totalAmountCart;
//                item.innerHTML = cart.totalAmountCart;
//            document.getElementById(fieldSubtotalCart).innerHTML = cart.totalAmountCart
        }
    })
    .catch( (err) =>{
        console.log(err)
    })
};


function amountElementsCartRefresher () {
    const db = fetch(`${host}/api/cart`)
    .then( (response) =>{ 
        return response.json()
    })
    .then( (ElementsInCart) =>{
        cartElements = document.getElementById("cart-elements");
        cartElements.innerHTML = ElementsInCart.totalSku;
        cartAmount = document.getElementById("cart-amount");
        cartAmount.innerHTML = ElementsInCart.totalAmountCart;
    })
    .catch( (err)=> {
        console.log(err);
    })
};

window.addEventListener('load', (event) => {
    amountElementsCartRefresher();
    quantityProductsRefresher();
})


function addSubtractRemoveQuantity(sku, operation){
    fetch(`${host}/api/cart/${sku}/${operation}` ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( () => amountElementsCartRefresher())
    .then(() => {
        let fieldQuantity = 'quantitySku=' + sku;
        let fieldSubtotal = 'subtotalSku=' + sku;
        fieldQuantityItem = parseInt(document.getElementById(fieldQuantity).innerHTML);
        let fieldSubtotalItem;
        if(document.getElementById(fieldSubtotal)){
            fieldSubtotalItem = document.getElementById(fieldSubtotal).innerHTML;
        }
        switch(operation){
            case 'create':
                document.getElementById(fieldQuantity).innerHTML = 1;
                break;
            case 'add':
                document.getElementById(fieldQuantity).innerHTML = fieldQuantityItem + 1;
                break;
            case 'subtract':
                if (fieldQuantityItem == 0){
                    document.getElementById(fieldQuantity).innerHTML = 0
                    console.log("hola");
                } else{
                document.getElementById(fieldQuantity).innerHTML = parseInt(fieldQuantityItem) - 1;
                }
                if ((fieldQuantityItem == 1) && (fieldSubtotalItem)){
                    document.getElementById(fieldSubtotal).innerHTML ="$ 0"
                }
                break;
            case 'remove':
                document.getElementById(fieldQuantity).innerHTML = 0;
                break;
        }
        showNotShowButtons(sku);
        quantityProductsRefresher();
        
    })
    
}

