fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
            let article = new Article(jsonArticle);
            let arrayUniqueIds = new Array();
            let shoppingCartItems = getShoppingCartItems();
            for (shoppingCartItem of shoppingCartItems) {
                let shoppingCartItemId = shoppingCartItem.split("-")[0];
                    if (shoppingCartItemId == article._id) {
                        arrayUniqueIds.push(shoppingCartItem);
                    }
                }
            arrayUniqueIds = Array.from(new Set(arrayUniqueIds));
            for (arrayUniqueId of arrayUniqueIds) {
                document.querySelector("tbody").innerHTML += `  <tr>
                                                                    <td class="imageColumn" ><img src="${article.imageUrl}" alt="Photo de l'article ${article.name}"></td>
                                                                    <td>${article.name}</td>
                                                                    <td>${arrayUniqueId.split("-")[1]}</td>
                                                                    <td id="price" >${article.price/100} €</td>
                                                                    <td class="quantityCell">
                                                                        <svg class="changeQuantity__item minusSign" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"/></svg>    
                                                                        <label for id="quantity">Quantité</label>
                                                                        <input id="quantity" size="1" type="number" value="${countOccurences(arrayUniqueId)}"/>
                                                                        <svg class="changeQuantity__item plusSign" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/></svg>                                                                       
                                                                    </td>
                                                                    <td><svg class="binSvg" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
                                                                    </td>
                                                                    <td data-price="${article.price}">${(countOccurences(arrayUniqueId) * article.price)/100} €</td>
                                                                </tr>
                                                            `;      
        
    }};
    
    // Affichage du nombre d'articles au panier dans le header
    displayCartQuantity();

    // Calcul du prix total de l'ensemble des articles
    let lines = document.querySelectorAll("tbody tr");
    let totalPriceOfItems = 0;
    for(let line of lines) {
        let totalPriceOfItem = line.lastChild.previousSibling.textContent;
        totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
        totalPriceOfItems += totalPriceOfItem;
    }
    document.querySelector("#totalPriceCart").textContent += `${totalPriceOfItems} €`;

    // Menu hamburger mobile
    interactWithHamburgerMenu();

    // Mise à la corbeille de tous les articles de l'ID sélectionné
    document.querySelectorAll(".binSvg").forEach(binButton => {
        binButton.addEventListener("click", function() {
            let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
            totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
            document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= totalPriceOfItem} €`;
            removeOfCart(this.dataset.id);
            this.parentElement.parentElement.innerHTML = ``;
            displayCartQuantity();
        })
    });

    // Suppression de l'un des articles de l'ID sélectionné
    document.querySelectorAll(".minusSign").forEach(minusSign => {
        minusSign.addEventListener("click", function() {
            let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
            totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
            if (countOccurences(this.dataset.id) == 1) {            
                removeOfCart(this.dataset.id);
                document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= totalPriceOfItem} €`;
                this.parentElement.parentElement.innerHTML = ``;
                displayCartQuantity();
            } else {
                removeOne(this.dataset.id);
                let newOccurence = countOccurences(this.dataset.id);
                this.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute("value", newOccurence);
                let totalPrice = this.parentElement.parentElement.lastChild.previousSibling;
                totalPrice.innerHTML = `${(totalPrice.dataset.price * newOccurence)/100} €`;
                document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems -= (totalPrice.dataset.price)/100} €`;
                displayCartQuantity();
            };
        })
    })

    // Ajout d'un article à l'ID sélectionné
    document.querySelectorAll(".plusSign").forEach(plusSign => {
        plusSign.addEventListener("click", function() {
            let totalPriceOfItem = this.parentElement.parentElement.lastChild.previousSibling.textContent;
            totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
            addOne(this.dataset.id);
            let newOcurrence = countOccurences(this.dataset.id);
            this.previousSibling.previousSibling.setAttribute("value", newOcurrence);
            let totalPrice = this.parentElement.parentElement.lastChild.previousSibling;
            totalPrice.textContent = `${(totalPrice.dataset.price * newOcurrence)/100} €`;
            document.querySelector("#totalPriceCart").textContent = `Montant total TTC : ${totalPriceOfItems += (totalPrice.dataset.price/100)} €`;
            displayCartQuantity();
        })
    })
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
            let products = new Array();
            for (shoppingCartItem of shoppingCartItems) {
                products.push(shoppingCartItem.split("-")[0])
            }
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
})
             
