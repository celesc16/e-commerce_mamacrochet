
const containerTrolleyEmpty = document.querySelector("#trolley-empty");
const containerTrolleyProducts = document.querySelector("#trolley-products");
const containerTrolleyActions = document.querySelector("#trolley-actions");
const containerTrolleyBuy = document.querySelector("#trolley-buy");
let buttonsEliminated = document.querySelectorAll(".button-product-eliminar")
const buttonBuyTrolley = document.querySelector("#button-buy-trolley")

let productsInTrolley = localStorage.getItem("products-in-trolley")
productsInTrolley = JSON.parse(productsInTrolley)

function carryTrolleyProducts() {
    if(productsInTrolley && productsInTrolley.length > 0 ) {
        containerTrolleyEmpty.classList.add("disabled");
        containerTrolleyProducts.classList.remove("disabled");
        containerTrolleyActions.classList.remove("disabled");
        containerTrolleyBuy.classList.add("disabled");

        containerTrolleyProducts.innerHTML = "";
        productsInTrolley.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("carrito-product");
            div.innerHTML = `
                <img class="carrito-product-img" src="${product.imagen}" alt="${product.titulo}">
                <div class="carrito-product-title">
                    <small>Titulo</small>
                    <h3>${product.titulo}</h3>
                </div>
                    
                <div class="carrito-product-amount">
                    <small>Cantidad</small>
                    <p>${product.cantidad}</p>
                </div>
                    
                <div class="carrito-product-price">
                    <small>Precio</small>
                    <p>${product.precio}</p>
                </div>
                    
                <div class="carrito-product-subotal">
                    <small>Subtotal</small>
                    <p>${product.precio * product.cantidad}</p>
                </div>

                <button class="button-product-eliminar" id= "${product.id}"><i class="fa-regular fa-trash-can"></i></button>
            `;

            containerTrolleyProducts.append(div)
            
        });

    updateButtonEmpty()
        
    } else{

        containerTrolleyEmpty.classList.remove("disabled");
        containerTrolleyProducts.classList.add("disabled");
        containerTrolleyActions.classList.add("disabled");
        containerTrolleyBuy.classList.add("disabled");


    }

}
carryTrolleyProducts()

function updateButtonEmpty(){
    buttonsEliminated = document.querySelectorAll(".button-product-eliminar")

    buttonsEliminated.forEach(button => {
        button.addEventListener("click",eliminatedOfTrolley)
    })
}

function eliminatedOfTrolley(e){ 
    const idButtom = e.currentTarget.id;
    const index = productsInTrolley.findIndex(product => product.id ===idButtom);

    productsInTrolley.splice(index,1);
    carryTrolleyProducts()

    localStorage.setItem("products-in-trolley",JSON.stringify(productsInTrolley));

}