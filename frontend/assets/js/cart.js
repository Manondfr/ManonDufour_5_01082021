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
                let lineConcat = shoppingCartItemsId.splice(indexOfElement, 1).concat(shoppingCartItemsColor.splice(indexOfElement, 1)).join("-");
                array.push(lineConcat);
                arrayUniqueIds = Array.from(new Set(array))
            };
            for (arrayUniqueId of arrayUniqueIds) {
                document.querySelector("tbody").innerHTML += `  <tr>
                                                                    <td class="imageColumn" ><img src="${article.imageUrl}" alt="Photo de l'article ${article.name}"></td>
                                                                    <td>${article.name}</td>
                                                                    <td>${arrayUniqueId.split("-")[1]}</td>
                                                                    <td id="price" >${article.price/100} €</td>
                                                                    <td class="quantityCell">
                                                                        <svg class="changeQuantity__item minusSign" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"/></svg>    
                                                                        <label for id="quantity">Quantité</label>
                                                                        <input id="quantity" size="1" type="number" value="${countOccurencesOfColor(arrayUniqueId, array)}"/>
                                                                        <svg class="changeQuantity__item plusSign" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/></svg>                                                                       
                                                                    </td>
                                                                    <td><svg class="binSvg" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
                                                                    </td>
                                                                    <td data-price="${article.price}">${(countOccurencesOfColor(arrayUniqueId, array) * article.price)/100} €</td>
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
        let array = new Array();
        let shoppingCartItems = getShoppingCartItems();
        let shoppingCartItemsId = shoppingCartItems[0];
        let shoppingCartItemsColor = shoppingCartItems[1];
        let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
        totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
        let totalPriceOfItems = document.querySelector("#totalPriceCart").textContent;
        totalPriceOfItems = Number(totalPriceOfItems.replace(/[^\d]/g, ""));
        for(let i = 0; i < shoppingCartItemsId.length ; i++) {
            array.push(shoppingCartItemsId[i].concat("-", shoppingCartItemsColor[i]));
        }
        if (countOccurencesOfColor(this.dataset.id, array) == 1) {            
            removeOfCart(this.dataset.id);
            let priceOfItem = (totalPriceOfItem / countOccurencesOfColor(this.dataset.id, array));
            document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= priceOfItem} €`;
            this.parentElement.parentElement.innerHTML = ``;
            let cartIcon = document.querySelector("#cartIcon");
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
            array.splice(array.indexOf(this.dataset.id), 1);
            let newOccurence = countOccurencesOfColor(this.dataset.id, array);
            this.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute("value", newOccurence);
            let totalPrice = this.parentElement.parentElement.lastChild.previousSibling;
            totalPrice.innerHTML = `${(totalPrice.dataset.price * newOccurence)/100} €`;
            document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= (totalPrice.dataset.price)/100} €`;
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
            };
        })
    }) 
    
    document.querySelectorAll(".plusSign").forEach(plusSign => {
        plusSign.addEventListener("click", function() {
            let array = new Array();
            let shoppingCartItems = getShoppingCartItems();
            let shoppingCartItemsId = shoppingCartItems[0];
            let shoppingCartItemsColor = shoppingCartItems[1];
            for(let i = 0; i < shoppingCartItemsId.length ; i++) {
                array.push(shoppingCartItemsId[i].concat("-", shoppingCartItemsColor[i]));
            }
            let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
            totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
            let totalPriceOfItems = document.querySelector("#totalPriceCart").textContent;
            totalPriceOfItems = Number(totalPriceOfItems.replace(/[^\d]/g, ""));
            addOne(this.dataset.id);
            array.push(this.dataset.id);
            let newOcurrence = countOccurencesOfColor(this.dataset.id, array);
            this.previousSibling.previousSibling.setAttribute("value", newOcurrence);
            let totalPrice = this.parentElement.parentElement.lastChild.previousSibling;
            totalPrice.textContent = `${(totalPrice.dataset.price * newOcurrence)/100} €`;
            document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems += (totalPrice.dataset.price/100)} €`;
            let cartIcon = document.querySelector("#cartIcon");
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
    }});
})



document.querySelector("#orderButton").addEventListener("click", function(e) {
    e.preventDefault();
    for(let input of document.querySelectorAll("form")){
        if(input.reportValidity() === false) {
            break;
        } else {
            let firstName = document.querySelector("#firstName").value;
            let lastName = document.querySelector("#lastName").value;
            let address = document.querySelector("#address").value;
            let city = document.querySelector("#city").value;
            let email = document.querySelector("#email").value;
            let contact = new Contact(firstName, lastName, address, city, email);
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
                .then(function(res) {
                    if (res.ok) {
                      return res.json();
                    }
                  })
                  .then(postResult => saveOrder(postResult))
                  .then(window.location.href = "confirm_commande.html")
                }
            }    
    });

