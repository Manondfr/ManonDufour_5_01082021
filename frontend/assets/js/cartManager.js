function addToCart(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(articlesId);
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

/*
function getCartItemsId(){
    return getShoppingCartItems().map(cartItems => cartItems._id);
}
*/
