/* function addToCart(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(articlesId);
    saveCart(shoppingCartItems);
}*/

function addToCart(articlesId, articlesColor) {
    let shoppingCartItems = getShoppingCartItems();
    let shoppingCartItemsId = shoppingCartItems[0];
    let shoppingCartItemsColor = shoppingCartItems[1];
    shoppingCartItemsId.push(articlesId);
    shoppingCartItemsColor.push(articlesColor);
    console.log(shoppingCartItems);
    saveCart(shoppingCartItems);
}




function removeOfCart(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    let shoppingCartItemsId = shoppingCartItems[0];
    let shoppingCartItemsColor = shoppingCartItems[1];
    while (shoppingCartItemsId.includes(articlesId)) {
        let elementtoRemoveIndex = shoppingCartItemsId.indexOf(articlesId);
        console.log(elementtoRemoveIndex);
        shoppingCartItemsId.splice(elementtoRemoveIndex, 1);
        shoppingCartItemsColor.splice(elementtoRemoveIndex, 1);
        shoppingCartItemUniqueIndex.splice(elementtoRemoveIndex, 1);
        saveCart(shoppingCartItems);
        console.log(shoppingCartItems);
    }
}

function removeOne(articlesId) {
    let array = getShoppingCartItems();
    let elementToRemove = array.find(article => article == articlesId);
    let elementtoRemoveIndex = array.indexOf(elementToRemove);
    array.splice(elementtoRemoveIndex, 1);
    let shoppingCartItems = array;
    saveCart(shoppingCartItems);
}

function addOne(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    shoppingCartItems.push(articlesId);
    saveCart(shoppingCartItems);
}

function getShoppingCartItems(){
    let shoppingCartItems = localStorage.getItem("shoppingCartItems");
    if(shoppingCartItems == null) {
        let shoppingCartItems= new Array();
        shoppingCartItems[0] = new Array();
        shoppingCartItems[1] = new Array();
        return shoppingCartItems;
    } else {
        return JSON.parse(shoppingCartItems);
    }
}

function saveCart(shoppingCartItems) {
    localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems));
}

function countOccurences(articlesId) {
    let shoppingCartItems = getShoppingCartItems();
    let items = shoppingCartItems[0];
    let occurences = 0;
    for(item of items) {
        if (item == articlesId) {
            occurences ++;
        }       
    }
    return occurences;
}

function countOccurencesOfColor(arrayUniqueId, array) {
    let occurences = 0;
    for (let i = 0; i< array.length; i++) {
        if (array[i] == arrayUniqueId) {
            occurences ++;
        }
    }
    return occurences;
}



