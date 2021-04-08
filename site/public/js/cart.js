//let host =  "http://192.168.0.5:3000";
<<<<<<< HEAD
let host = "http://localhost:3000"
=======
let host = "http://localhost:3000";
>>>>>>> 418687bc1be611bf547bfddd211e8825e1a817b6

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
        cartItems.forEach(item =>{
            fieldQuantity = 'quantitySku=' + item.product_id;
            fieldQuantityItem = document.getElementById(fieldQuantity);
            fieldQuantityItem.innerHTML = item.quantity;
        })
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
        cartElements = document.getElementById("cart-elements");
        cartElements.innerHTML = err;
        cartAmount = document.getElementById("cart-amount");
        cartAmount.innerHTML = err;
    })
};

window.addEventListener('load', (event) => {
/*     init();
doSomethingElse(); */
    amountElementsCartRefresher();
    quantityProductsRefresher();
})


function addSubtractRemoveQuantity(sku, operation){
    fetch(`${host}/api/cart/${sku}/${operation}` ,{
        method: 'POST',
        //body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        let fieldQuantity = 'quantitySku=' + sku;
        fieldQuantityItem = parseInt(document.getElementById(fieldQuantity).innerHTML);
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
                } else{
                document.getElementById(fieldQuantity).innerHTML = parseInt(fieldQuantityItem) - 1;
                }
                break;
            case 'remove':
                document.getElementById(fieldQuantity).innerHTML = 0;
                break;
        }
    })
    .then( () => amountElementsCartRefresher());
}