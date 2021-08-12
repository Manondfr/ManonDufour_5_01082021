class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    } 
}

class Contact {
    constructor(firstName, lastName, address, city, email) {
       this.firstName = firstName;
       this.lastName = lastName;
       this.address = address;
       this.city = city;
       this.email = email;
    } 
}



fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);
        let cart = getShoppingCartItems();
        let shoppingCartItemsId = cart[0];
        let shoppingCartItemsColor = cart[1];
        if (shoppingCartItemsId.includes(article._id)) {          
            let array = new Array();
            let arrayUniqueIds = new Array();
            while(shoppingCartItemsId.includes(article._id)) {
                let indexOfElement = shoppingCartItemsId.indexOf(article._id);
                let lineConcat = shoppingCartItemsId.splice(indexOfElement, 1).concat(shoppingCartItemsColor.splice(indexOfElement, 1)).join(" ");
                array.push(lineConcat);
                arrayUniqueIds = Array.from(new Set(array))
            };
            for (arrayUniqueId of arrayUniqueIds) {
                console.log(arrayUniqueId);
                console.log(array);
                document.querySelector("tbody").innerHTML += `  <tr>
                                                                    <td><img src="${article.imageUrl}" alt="Photo de l'article ${article.name}"></td>
                                                                    <td>${article.name}</td>
                                                                    <td>${arrayUniqueId.replace(article._id, "")}</td>
                                                                    <td id="price" >${article.price/100} €</td>
                                                                    <td class="quantityCell">
                                                                        <svg class="changeQuantity__item minusSign" data-id="${article._id}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"/></svg>    
                                                                        <label for id="quantity">Quantité</label>
                                                                        <input id="quantity" size="1" type="number" value="${countOccurencesOfColor(arrayUniqueId, array)}"/>
                                                                        <svg class="changeQuantity__item plusSign" data-id="${article._id}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/></svg>                                                                       
                                                                    </td>
                                                                    <td><svg class="binSvg" data-id="${article._id}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
                                                                    </td>
                                                                    <td data-price="${article.price}">${((countOccurences(article._id))*article.price)/100} €</td>
                                                                </tr>
                                                            `;      
        
    }}
    };
    let cartIcon = document.querySelector("#cartIcon");
    let shoppingCartItems = getShoppingCartItems();
    let cartQuantity = shoppingCartItems[0].length;
    if(cartQuantity === 0) {
        cartIcon.style.display = "none";
        document.querySelector("span").style.display = "none";
    } else {
        cartIcon.style.display = "initial";
        document.querySelector("span").textContent = `${cartQuantity}`;
        document.querySelector("span").style.display = "initial";
    };

    document.querySelectorAll(".binSvg").forEach(binButton => {
    binButton.addEventListener("click", function() {
        let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
        totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
        let totalPriceOfItems = document.querySelector("#totalPriceCart").textContent;
        totalPriceOfItems = Number(totalPriceOfItems.replace(/[^\d]/g, ""));
        document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= totalPriceOfItem} €`;
        removeOfCart(this.dataset.id);
        this.parentElement.parentElement.innerHTML = ``;
        let cartIcon = document.querySelector("#cartIcon");
        let shoppingCartItems = getShoppingCartItems();
        let cartQuantity = shoppingCartItems[0].length;
        if(cartQuantity === 0) {
            cartIcon.style.display = "none";
            document.querySelector("span").style.display = "none";
        } else {
            cartIcon.style.display = "initial";
            document.querySelector("span").textContent = `${cartQuantity}`;
            document.querySelector("span").style.display = "initial";
        };
    })
})
    document.querySelectorAll(".minusSign").forEach(minusSign => {
    minusSign.addEventListener("click", function() {
        let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
        totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
        let totalPriceOfItems = document.querySelector("#totalPriceCart").textContent;
        totalPriceOfItems = Number(totalPriceOfItems.replace(/[^\d]/g, ""));
        let priceOfItem = (totalPriceOfItem / countOccurences(this.dataset.id));
        document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= priceOfItem} €`;
        if (countOccurences(this.dataset.id) == 1) {
            
            removeOfCart(this.dataset.id);
            this.parentElement.parentElement.innerHTML = ``;
            let cartIcon = document.querySelector("#cartIcon");
            let shoppingCartItems = getShoppingCartItems();
            let cartQuantity = shoppingCartItems[0].length;
            if(cartQuantity === 0) {
                cartIcon.style.display = "none";
                document.querySelector("span").style.display = "none";
            } else {
                cartIcon.style.display = "initial";
                document.querySelector("span").textContent = `${cartQuantity}`;
                document.querySelector("span").style.display = "initial";
            };
        } else {
            removeOne(this.dataset.id);
            let newOccurence = countOccurences(this.dataset.id);
            this.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute("value", newOccurence);
            let totalPrice = this.parentElement.parentElement.lastChild.previousSibling;
            totalPrice.innerHTML = `${(totalPrice.dataset.price * newOccurence)/100} €`;
            let cartIcon = document.querySelector("#cartIcon");
            let shoppingCartItems = getShoppingCartItems();
            let cartQuantity = shoppingCartItems[0].length;
            if(cartQuantity === 0) {
                cartIcon.style.display = "none";
                document.querySelector("span").style.display = "none";
            } else {
                cartIcon.style.display = "initial";
                document.querySelector("span").textContent = `${cartQuantity}`;
                document.querySelector("span").style.display = "initial";
            };
            }
        })
    }) 
    
    document.querySelectorAll(".plusSign").forEach(plusSign => {
        plusSign.addEventListener("click", function() {
            let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
            totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
            let totalPriceOfItems = document.querySelector("#totalPriceCart").textContent;
            totalPriceOfItems = Number(totalPriceOfItems.replace(/[^\d]/g, ""));
            let priceOfItem = (totalPriceOfItem / countOccurences(this.dataset.id));
            document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems += priceOfItem} €`;
            addOne(this.dataset.id);
            let newOcurrence = countOccurences(this.dataset.id);
            this.previousSibling.previousSibling.setAttribute("value", newOcurrence);
            let totalPrice = this.parentElement.parentElement.lastChild.previousSibling;
            totalPrice.innerHTML = `${(totalPrice.dataset.price * newOcurrence)/100} €`;
            let cartIcon = document.querySelector("#cartIcon");
            let shoppingCartItems = getShoppingCartItems();
            let cartQuantity = shoppingCartItems[0].length;
            if(cartQuantity === 0) {
                cartIcon.style.display = "none";
                document.querySelector("span").style.display = "none";
            } else {
                cartIcon.style.display = "initial";
                document.querySelector("span").textContent = `${cartQuantity}`;
                document.querySelector("span").style.display = "initial";
            };
        })
    })
    let lines = document.querySelectorAll("tbody tr");
    let totalPriceOfItems = 0;
    for(let line of lines) {
        let totalPriceOfItem = line.lastChild.previousSibling.textContent;
        totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
        totalPriceOfItems += totalPriceOfItem;
    };
    document.querySelector("#totalPriceCart").textContent += `${totalPriceOfItems} €`;
})



document.querySelector("#orderButton").addEventListener("click", function() {
    for(let input of document.querySelectorAll(".formInputs__input")){
        if(input.reportValidity() === false) {
            break;
        } else {
            let firstName = document.querySelector("#firstName").value;
            let lastName = document.querySelector("#lastName").value;
            let address = document.querySelector("#address").value;
            let city = document.querySelector("#city").value;
            let email = document.querySelector("#email").value;
            let contact = new Contact(firstName, lastName, address, city, email);
            /*let products = getShoppingCartItems();*/
            let shoppingCartItems = getShoppingCartItems();
            let products = shoppingCartItems[0];
            let body = {
                "contact" : {
                    "firstName" : contact.firstName,
                    "lastName" : contact.lastName,
                    "address" : contact.address,
                    "city" : contact.city,
                    "email" : contact.email,                
                    },
                    "products" : products,
                };
                fetch("http://localhost:3000/api/teddies/order", {
                "method" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body : JSON.stringify(body),
                })
                .then( response => response.json()); /* à terminer */
            } 
        }        
    });




    /*document.querySelectorAll("#quantity").forEach(input =>
        input.addEventListener("input", function() {
            event.target.setAttribute("value", event.target.value);            
            console.log(event.target);
            
        })) */
