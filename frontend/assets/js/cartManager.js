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
    saveCart(shoppingCartItems);
}


function removeOfCart(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    let shoppingCartItemsId = shoppingCartItems [0];
    let shoppingCartItemsColor = shoppingCartItems [1];
    let array = new Array();
    while(shoppingCartItemsId.length > 0) {
        let lineConcat = shoppingCartItemsId.splice(0, 1).concat(shoppingCartItemsColor.splice(0, 1)).join("-");
        array.push(lineConcat);
    }
    array = array.filter(shoppingCartItem => shoppingCartItem !== arrayUniqueId);
    for (arr of array) {
        arr = arr.split("-");
        shoppingCartItemsId.push(arr[0]);
        shoppingCartItemsColor.push(arr[1]);
    }
    saveCart(shoppingCartItems);
}

function removeOne(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    let shoppingCartItemsId = shoppingCartItems[0];
    let shoppingCartItemsColor = shoppingCartItems[1];
    let array = new Array();
    while(shoppingCartItemsId.length > 0) {
        array.push(shoppingCartItemsId.splice(0, 1).concat(shoppingCartItemsColor.splice(0, 1)).join("-"));
    }
    let elementToRemove = array.indexOf(array.find(article => article == arrayUniqueId));
    array.splice(elementToRemove, 1);
    for (arr of array) {
        shoppingCartItemsId.push(arr.split("-")[0]);
        shoppingCartItemsColor.push(arr.split("-")[1]);
    }
    saveCart(shoppingCartItems);
}

function addOne(arrayUniqueId) {
    let shoppingCartItems = getShoppingCartItems();
    let shoppingCartItemsId = shoppingCartItems[0];
    let shoppingCartItemsColor = shoppingCartItems[1];
    let array = new Array();   
    while(shoppingCartItemsId.length > 0) {
        let lineConcat = shoppingCartItemsId.splice(0, 1).concat(shoppingCartItemsColor.splice(0, 1)).join("-");
        array.push(lineConcat);
    }
    array.push(arrayUniqueId);
    for (arr of array) {
        shoppingCartItemsId.push(arr.split("-")[0]);
        shoppingCartItemsColor.push(arr.split("-")[1]);
    }
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
    for (let i = 0; i < array.length; i++) {
        if (array[i] == arrayUniqueId) {
            occurences ++;
        }
    }
    return occurences;
}



