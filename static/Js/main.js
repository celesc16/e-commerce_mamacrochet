let products = []

//Todos los productos 
fetch("/Json/products.json")
    .then(response => response.json())
    .then(data => {
        products = data
        carryProducts(products)
    })

const containerProducts = document.querySelector("#container-products-popular");
const containerProductsOfertas = document.querySelector("#container-products-ofertas");
let buttonTrolley = document.querySelectorAll(".product-trolley");
const number = document.querySelector("#number");

function carryProducts(){
    
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("products")
        div.innerHTML = `
            <img class="product-img" src="${product.imagen}" alt="${product.titulo}" >
            <div class="product-details">
                <h3 class="product-title">${product.titulo}</h3>
                <p class="product-price" >${product.precio}</p>
                <button class="product-trolley" id="${product.id}" >Agregar al Carrito</button>
            </div>
        `;

        if(product.categoria.clase === "MasPopulares"){
            containerProducts.appendChild(div);
        }
        else if(product.categoria.clase === "Ofertas"){
            containerProductsOfertas.appendChild(div);
        }

    
    })

    updateButtonAdd();
}

carryProducts(products);

//Las categorias 

//carritoagregar

function updateButtonAdd(){
    buttonTrolley = document.querySelectorAll(".product-trolley");

    buttonTrolley.forEach(button => {
        button.addEventListener("click" , addtrolley)
    });
}

let productsInTrolley;

let productsInTrolleyLS = localStorage.getItem("products-in-trolley");

if (productsInTrolleyLS) {
    productsInTrolley = JSON.parse(productsInTrolleyLS);
    updateNumber();
} else {
    productsInTrolley = [];
}

function addtrolley(e){
    const idBottom = e.currentTarget.id
    const productAdd = products.find(product => product.id === idBottom)

    if (productsInTrolley.some( product => product.id === idBottom)){
        const index = productsInTrolley.findIndex(product => product.id === idBottom)
        productsInTrolley[index].cantidad++;

    } else{
        productAdd.cantidad = 1 
        productsInTrolley.push(productAdd) 
    }

    updateNumber()

    localStorage.setItem("products-in-trolley", JSON.stringify(productsInTrolley))
}

function updateNumber(){
    let newNumber = productsInTrolley.reduce((acc,product) => acc + product.cantidad, 0);
    number.innerText = newNumber
}


