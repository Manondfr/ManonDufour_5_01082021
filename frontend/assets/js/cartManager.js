function addToCart(articlesId, articlesColor) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(articlesId.concat("-", articlesColor));
    saveCart(shoppingCartItems);
}


function removeOfCart(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems = shoppingCartItems.filter(shoppingCartItem => shoppingCartItem !== arrayUniqueId);
    saveCart(shoppingCartItems);
}

function removeOne(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.splice(shoppingCartItems.indexOf(shoppingCartItems.find(shoppingCartItem => shoppingCartItem == arrayUniqueId)), 1);
    saveCart(shoppingCartItems);
}

function addOne(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(arrayUniqueId);
    saveCart(shoppingCartItems);
}

function getShoppingCartItems(){
    let shoppingCartItems = localStorage.getItem("shoppingCartItems");
    if(shoppingCartItems == null) {
        return [];
    } else {
        return JSON.parse(shoppingCartItems);
    }
}

function getOrder() {
    let postResult = localStorage.getItem("postResult");
    return JSON.parse(postResult);
}

function saveCart(shoppingCartItems) {
    localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems));
}

function saveOrder(postResult) {
    localStorage.setItem("postResult", JSON.stringify(postResult));
}

function countOccurences(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    let occurences = 0;
    for(shoppingCartItem of shoppingCartItems) {
        if (shoppingCartItem == arrayUniqueId) {
            occurences ++;
        }       
    }
    return occurences;
}


function displayCartQuantity() {
    let cartIcon = document.querySelector("#cartIcon");
    shoppingCartItems = getShoppingCartItems();
    let cartQuantity = shoppingCartItems.length;
    if(cartQuantity === 0) {
        cartIcon.style.display = "none";
        document.querySelector("span").style.display = "none";
        if (!!document.querySelector("#orderForm")) {
            document.querySelector("#cartSection__items").innerHTML = `<p>Votre panier est vide !</p><br>`
            document.querySelector("#orderForm").style.display = "none";
            document.querySelector("h2").style.display = "none";
        }
    } else {
        cartIcon.style.display = "initial";
        document.querySelector("span").textContent = `${cartQuantity}`;
        document.querySelector("span").style.display = "initial";
    }
}

function interactWithHamburgerMenu() {
    let hamburgerMenu = document.querySelector("#mobileOnly");
    let dropDownMenu = document.querySelector(".trymenu");
    hamburgerMenu.addEventListener("click", function() {
        if(dropDownMenu.classList.contains ("inactive")) {
            dropDownMenu.classList.replace("inactive", "active");
            hamburgerMenu.style.backgroundColor = "#392934e0";
            document.querySelector("svg").setAttribute("viewBox", "0 0 352 512");
            document.querySelector("svg").setAttribute("width", "23");
            document.querySelector("svg").setAttribute("height", "23");
            document.querySelector("path").setAttribute("d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z");
        } else {
            dropDownMenu.classList.replace("active", "inactive");
            hamburgerMenu.style.backgroundColor = "transparent";
            document.querySelector("svg").setAttribute("viewBox", "0 0 448 512");
            document.querySelector("svg").setAttribute("width", "20");
            document.querySelector("svg").setAttribute("height", "20");
            document.querySelector("path").setAttribute("d", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z");
    };
})
}

function createErrorSentence(parentElement) {
    let errorSentence = document.createElement("p");
    errorSentence.style.paddingBottom = "15px";
    document.querySelector(parentElement).appendChild(errorSentence);
}


