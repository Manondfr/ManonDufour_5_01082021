// AJOUT D'UN ARTICLE AU PANIER
function addToCart(articlesId, articlesColor) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(articlesId.concat("-", articlesColor));
    saveCart(shoppingCartItems);
}

// SAUVEGARDE DES PRODUITS AJOUTES AU PANIER
function saveCart(shoppingCartItems) {
    localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems));
}

// RECUPERATION DES PRODUITS STOCKES DANS LE LOCAL STORAGE
function getShoppingCartItems(){
    let shoppingCartItems = localStorage.getItem("shoppingCartItems");
    if(shoppingCartItems == null) {
        return [];
    } else {
        return JSON.parse(shoppingCartItems);
    }
}

// RECHERCHE DE CORRESPONDANCE ENTRE LES PRODUITS DU BACKEND ET LES PRODUITS STOCKES DANS LE LOCAL STORAGE
function searchMatch(article, arrayUniqueIds) {
    let shoppingCartItems = getShoppingCartItems();
    for (shoppingCartItem of shoppingCartItems) {
        let shoppingCartItemId = shoppingCartItem.split("-")[0];
        if (shoppingCartItemId == article._id) {
            arrayUniqueIds.push(shoppingCartItem);
        }
    }
    return arrayUniqueIds;
}

// COMPTAGE DE LA QUANTITE D'UN ARTICLE DONNE DANS LE LOCAL STORAGE
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


// SUPPRESSION TOTALE D'UN ARTICLE DEPUIS LE PANIER
// Fonction générale
function removeAll(binButton) {
    removeOfLocalStorage(binButton.dataset.id);
    updateTotalPriceCart(binButton);
    binButton.parentElement.parentElement.innerHTML = ``;
    displayCartQuantity();
}

// Suppression de l'article du Local Storage
function removeOfLocalStorage(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems = shoppingCartItems.filter(shoppingCartItem => shoppingCartItem !== arrayUniqueId);
    saveCart(shoppingCartItems);

}

// Mise à jour du prix total du panier
function updateTotalPriceCart(binButton) {
    let totalPriceOfItems = Number(document.querySelector("#totalPriceCart").textContent.replace(/[^\d]/g, ""));
    let totalPriceOfItem = Number(binButton.parentElement.parentElement.lastChild.previousSibling.textContent.replace(/[^\d]/g, ""));
    document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= totalPriceOfItem} €`;    
}


// RETRANCHEMENT D'UN ARTICLE DEPUIS LE PANIER (via les + et - de la colonne Quantité)
// Fonction générale
function removeOne(arrayUniqueId, changeQuantityItem) {
    removeOneOfLocalStorage(arrayUniqueId);
    updatePriceOfItems(changeQuantityItem);
    displayCartQuantity();
}

// Retranchement de l'article dans le Local Storage
function removeOneOfLocalStorage(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.splice(shoppingCartItems.indexOf(shoppingCartItems.find(shoppingCartItem => shoppingCartItem == arrayUniqueId)), 1);
    saveCart(shoppingCartItems);
}

// Mise à jour des prix du panier (prix total de l'item + prix total du panier)
function updatePriceOfItems(changeQuantityItem) {
    let totalPriceOfItems = Number(document.querySelector("#totalPriceCart").textContent.replace(/[^\d]/g, ""));
    let totalPrice = changeQuantityItem.parentElement.parentElement.lastChild.previousSibling;
    totalPrice.innerHTML = `${(totalPrice.dataset.price * (countOccurences(changeQuantityItem.dataset.id)))/100} €`;
    if (changeQuantityItem.classList.contains("minusSign")) {        
        document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= (totalPrice.dataset.price)/100} €`;
    } else {
        totalPrice.innerHTML = `${(totalPrice.dataset.price * (countOccurences(changeQuantityItem.dataset.id)))/100} €`;
        document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems += (totalPrice.dataset.price)/100} €`;
    }
}


// PASSAGE DE COMMANDE
// Sauvegarde des informations de commande (contact et produits) lors du passage de celle-ci
function saveOrder(postResult) {
    localStorage.setItem("postResult", JSON.stringify(postResult));
}

// Récupération des informations de commande
function getOrder() {
    let postResult = localStorage.getItem("postResult");
    return JSON.parse(postResult);
}


// FONCTIONS GENERALES
// Affichage du nombre d'articles au panier dans le header
function displayCartQuantity() {
    let cartIcon = document.querySelector(".cartIcon");
    shoppingCartItems = getShoppingCartItems();
    let cartQuantity = shoppingCartItems.length;
    if(cartQuantity === 0) {
        cartIcon.classList.add("noDisplay");
        document.querySelector("span").classList.add("noDisplay");
        if (!!document.querySelector("#orderForm")) {
            document.querySelector("#cartSection__items").innerHTML = `<p>Votre panier est vide !</p><br>`
            document.querySelector("#orderForm").classList.add("noDisplay");
            document.querySelector("h2").classList.add("noDisplay");
        }
    } else {
        document.querySelector("span").textContent = `${cartQuantity}`;
        if (cartIcon.classList.contains("noDisplay")) {
            cartIcon.classList.remove("noDisplay");
            document.querySelector("span").classList.remove("noDisplay");
        };
        if (cartQuantity > 9) {
            document.querySelector("span").style.right = "25px";
        } else {
            document.querySelector("span").style.right = "30px";
        }
    }
}

// Ouverture et fermeture du menu mobile
function interactWithHamburgerMenu() {
    let hamburgerMenu = document.querySelector("#mobileOnly");
    let dropDownMenu = document.querySelector(".dropdownMenu");
    hamburgerMenu.addEventListener("click", function() {
        if(dropDownMenu.classList.contains ("inactive")) {
            dropDownMenu.classList.replace("inactive", "active");
            hamburgerMenu.classList.add("opened");
            document.querySelector("svg").setAttribute("viewBox", "0 0 352 512");
            document.querySelector("svg").setAttribute("width", "23");
            document.querySelector("svg").setAttribute("height", "23");
            document.querySelector("path").setAttribute("d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z");
        } else {
            dropDownMenu.classList.replace("active", "inactive");
            hamburgerMenu.classList.remove("opened")
            document.querySelector("svg").setAttribute("viewBox", "0 0 448 512");
            document.querySelector("svg").setAttribute("width", "20");
            document.querySelector("svg").setAttribute("height", "20");
            document.querySelector("path").setAttribute("d", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z");
    };
})
}

// Création d'un paragraphe pour message d'erreur .catch()
function createErrorSentence(parentElement) {
    let errorSentence = document.createElement("p");
    errorSentence.style.paddingBottom = "15px";
    document.querySelector(parentElement).appendChild(errorSentence);
}