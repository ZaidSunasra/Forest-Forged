const cartButton = document.querySelector(".cart-button");
const cartExit = document.querySelector(".cart-close");
const cartArea = document.querySelector("#cart");
const productArea = document.querySelector("#products");
const navbar = document.querySelector("nav");
const addToCart = document.getElementsByName("addToCart");
const search = document.querySelector(".search-products")

cartButton.addEventListener("click", function(e){
    e.preventDefault();
    cartArea.classList.add("cart-width");
    productArea.classList.add("other-width");
    navbar.classList.add("other-width");
});

cartExit.addEventListener("click", function(){
    cartArea.classList.remove("cart-width");
    productArea.classList.remove("other-width");
    navbar.classList.remove("other-width");
});

addToCart.forEach((action) => {
    action.addEventListener("click", addProduct)
});

function addProduct(){
    let price = this.parentElement.previousElementSibling.firstElementChild.textContent;
    let name = this.parentElement.previousElementSibling.previousElementSibling.firstElementChild.textContent;
    let img = this.parentElement.parentElement.firstElementChild.innerHTML;
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    cartRow.innerHTML = `
    <div class="remove-item">  <span class="material-symbols-rounded cart-close"> close </span> </div>
    <div class="cart-wrapper">
        <div class="cart-img">${img}</div>
        <div class="cart-name"> ${name} </div>
    </div>
    <div class="cart-wrapper">
        <div class="cart-quantity">
            <input type="number" min="1" value="1" class="quantity" name="quantity">
        </div>
        <span class="hide">${price}</span>
        <div class="cart-price"> Rs.${price}</div>
    </div>`;
    cartArea.appendChild(cartRow);
    getQuantity();
    calculatePrice();
    updatePrice();
    removeItem();
}

function removeItem(){
    let listCount = document.querySelectorAll(".cart-row").length;
    for(let i=0; i<listCount; i++){
        document.querySelectorAll(".remove-item")[i].addEventListener("click", function(){
           this.parentElement.remove();
           calculatePrice();
           getQuantity();
        });
    }  
}

function updatePrice(){
    let listCount = document.querySelectorAll(".cart-row").length;
    for(let i=0; i<listCount; i++){
        document.querySelectorAll("input.quantity")[i].addEventListener("click", function(){
            let price = this.parentElement.nextElementSibling.textContent;
            let quantity = this.value;
            let amount = price * quantity;
            this.parentElement.nextElementSibling.nextElementSibling.textContent = "Rs." + amount;
            calculatePrice();
            getQuantity();
        });
    }
}

function calculatePrice(){
    let listCount = document.querySelectorAll(".cart-row").length;
    let rowAmount = [];
    for (let i=0; i<listCount; i++){
        let quantity = document.querySelectorAll(".cart-quantity input")[i];
        let price = quantity.parentElement.nextElementSibling.textContent;
        rowAmount[i] = quantity.value * price;
    }
    let amount = 0;
    for(let i=0; i<rowAmount.length; i++){
        amount += rowAmount[i];
    }
    document.querySelector(".total-amount").textContent = "Rs." + amount;
}

function getQuantity(){
    let listCount = document.querySelectorAll(".cart-row").length;
    let countItemContainer = document.querySelector(".count-items");
    let count = [];
    for (let i=0; i<listCount; i++){
        let quantity = document.getElementsByClassName("quantity")[i].value;
        count[i] = parseInt(quantity);
    }
    let totalCount = 0;
    for(let i=0; i<count.length; i++){
        totalCount += count[i];
    }
    countItemContainer.textContent = totalCount;
}

document.addEventListener("keydown", function(key){
    if(key.code == "Enter"){
        searchProduct();
    }
});
search.addEventListener("click", searchProduct);

function searchProduct(){
    let productName = document.getElementById("product").value.toLowerCase();
    let allProducts = document.querySelectorAll(".product-card");
    let displayArea = document.querySelector("#products .wrapper");
    for(let i=0; i<allProducts.length; i++){
        let productID = allProducts[i].id;
        if( productName == productID){
            let searchResult = document.createElement("div");
            searchResult.innerHTML = allProducts[i].innerHTML;
            searchResult.classList.add("product-card");
            searchResult.classList.add("searched-products")
            displayArea.classList.remove("hide")
            displayArea.lastElementChild.appendChild(searchResult);
            addToCart.forEach((action) => {
                action.addEventListener("click", addProduct)
            });
        }
    }
    window.scrollTo(0,0);
    let searchProducts = document.querySelectorAll(".searched-products");
    document.querySelector(".close-search-section").addEventListener("click", function(){
        for(let i=0; i<searchProducts.length; i++){
           searchProducts[i].remove();
        }
        document.querySelector(".search-bar input").value = ""
        displayArea.classList.add("hide")
    })
}


// addToCart.forEach((action) => {
//     action.addEventListener("click", function(){
//         let price = this.parentElement.previousElementSibling.firstElementChild.textContent;
//         let name = this.parentElement.previousElementSibling.previousElementSibling.firstElementChild.textContent;
//         let img = this.parentElement.parentElement.firstElementChild.innerHTML;
//         let cartRow = document.createElement("div");
//         cartRow.classList.add("cart-row");
//         cartRow.innerHTML = `
//         <div class="remove-item">  <span class="material-symbols-rounded cart-close"> close </span> </div>
//         <div class="cart-wrapper">
//             <div class="cart-img">${img}</div>
//             <div class="cart-name"> ${name} </div>
//         </div>
//         <div class="cart-wrapper">
//             <div class="cart-quantity">
//                 <input type="number" min="1" value="1" class="quantity" name="quantity">
//             </div>
//             <span class="hide">${price}</span>
//             <div class="cart-price"> Rs.${price}</div>
//         </div>`;
//         cartArea.appendChild(cartRow);
//         getQuantity();
//         updatePrice();
//         calculatePrice()
//         removeItem();
//     });
// });