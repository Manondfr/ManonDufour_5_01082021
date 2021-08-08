function addToCart(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(articlesId);
    saveCart(shoppingCartItems);
}


function removeOfCart(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems = shoppingCartItems.filter(shoppingCartItem => shoppingCartItem !== articlesId);
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

function saveCart(shoppingCartItems) {
    localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems));
}

function countOccurences(articlesId) {
    let items = getShoppingCartItems();
    let occurences = 0;
    for(item of items) {
        if (item == articlesId) {
            occurences ++;
        }       
    }
    return occurences;
}



