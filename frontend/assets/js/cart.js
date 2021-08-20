// Récupération des articles du backend 
fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    // Pour chaque article du backend, recherche d'une correspondance avec les produits enregistrés dans le localStorage
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);
        let arrayUniqueIds = new Array();
        arrayUniqueIds = searchMatch(article, arrayUniqueIds);

        // Création d'un tableau arrayUniqueIds qui supprime les correspondances en double et permet donc de n'afficher qu'une seule ligne par typologie de produit
        arrayUniqueIds = Array.from(new Set(arrayUniqueIds)); 
        for (arrayUniqueId of arrayUniqueIds) {
            if ("content" in document.querySelector("template")) {
                let template = document.querySelector("template");
                let clone = template.content.cloneNode(true);
                let line = clone.querySelectorAll("td");
                clone.querySelector("td img").setAttribute("src", `${article.imageUrl}`);
                clone.querySelector("td img").setAttribute("alt", `Photo de l'article ${article.name}`);
                line[1].textContent = `${article.name}`;
                line[2].textContent = `${arrayUniqueId.split("-")[1]}`;
                line[3].textContent = `${article.price/100} €`;
                let svgs = clone.querySelectorAll("td svg");
                for (svg of svgs) {
                    svg.setAttribute("data-id", `${arrayUniqueId}`);
                }
                clone.querySelector("td label").setAttribute("for", `quantity${article.name}`);
                clone.querySelector("td input").classList.add("quantity");
                clone.querySelector("td input").setAttribute("id", `quantity${article.name}`);
                clone.querySelector("td input").setAttribute("value", `${countOccurences(arrayUniqueId)}`);
                line[6].setAttribute("data-price", `${article.price}`);
                line[6].textContent = `${(countOccurences(arrayUniqueId) * article.price)/100} €`;
                document.querySelector("tbody").appendChild(clone);
            } else {
                document.querySelector("tbody").innerHTML +=    `   <tr>
                                                                        <td class="imageColumn" ><img src="${article.imageUrl}" alt="Photo de l'article ${article.name}"></td>
                                                                        <td>${article.name}</td>
                                                                        <td>${arrayUniqueId.split("-")[1]}</td>
                                                                        <td>${article.price/100} €</td>
                                                                        <td class="quantityCell">
                                                                            <svg class="changeQuantity__item minusSign" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"/></svg>    
                                                                            <label for="quantity${article.name}">Quantité</label>
                                                                            <input class="quantity" id="quantity${article.name}" size="1" type="number" value="${countOccurences(arrayUniqueId)}"/>
                                                                            <svg class="changeQuantity__item plusSign" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/></svg>                                                                       
                                                                        </td>
                                                                        <td><svg class="binSvg" data-id="${arrayUniqueId}" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
                                                                        </td>
                                                                        <td data-price="${article.price}">${(countOccurences(arrayUniqueId) * article.price)/100} €</td>
                                                                    </tr>
                                                                `;     
            };
        }
    };
    // Calcul du prix total de l'ensemble des articles
    let lines = document.querySelectorAll("tbody tr");
    let totalPriceOfItems = 0;
    for(let line of lines) {
        let totalPriceOfItem = line.lastChild.previousSibling.textContent;
        totalPriceOfItem = Number(totalPriceOfItem.replace(/[^\d]/g, ""));
        totalPriceOfItems += totalPriceOfItem;
    }
    document.querySelector("#totalPriceCart").textContent += `${totalPriceOfItems} €`;

    // Mise à la corbeille de tous les articles de l'ID sélectionné
    document.querySelectorAll(".binSvg").forEach(binButton => {
        binButton.addEventListener("click", function() {
            removeAll(this);
        })
    });

    // Suppression de l'un des articles de l'ID sélectionné
    document.querySelectorAll(".minusSign").forEach(minusSign => {
        minusSign.addEventListener("click", function() {
            if (countOccurences(this.dataset.id) == 1) {            
                removeAll(this);
            } else {
                removeOne(this.dataset.id, this);
                this.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute("value", countOccurences(this.dataset.id));           
            };
        })
    })

    // Ajout d'un article à l'ID sélectionné
    document.querySelectorAll(".plusSign").forEach(plusSign => {
        plusSign.addEventListener("click", function() {
            addToCart(this.dataset.id.split("-")[0], this.dataset.id.split("-")[1]);
            this.previousSibling.previousSibling.setAttribute("value", countOccurences(this.dataset.id));
            updatePriceOfItems(this);
            displayCartQuantity();
        })
    })
})
.catch(function() {
    createErrorSentence("#cartSection__items");
    document.querySelector("table").classList.add("noDisplay");
    document.querySelector("form").classList.add("noDisplay");
    document.querySelector("h2").classList.add("noDisplay");
    document.querySelector("#cartSection__items p").textContent = `Oups ! Nous n'avons pas réussi à récupérer votre panier. Veuillez actualiser la page.`;
})

// Affichage du nombre d'articles au panier dans le header
displayCartQuantity();

// Ouverture et fermeture du menu mobile
interactWithHamburgerMenu();

// Au clic sur le bouton de commande, vérification des données saisies par l'utilisateur, récupération et enregistrement de celles-ci si valides, renvoi vers la page de confirmation de commande
document.querySelector("#orderButton").addEventListener("click", function(e) {
    e.preventDefault();
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
        document.querySelector("h2").textContent = `${body.contact.firstName}`;
    for(let input of document.querySelectorAll("form")){
        if(input.reportValidity() === false) {
            break;
        } else {
            fetch("http://localhost:3000/api/teddies/order", {
                "method" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                "body" : JSON.stringify(body),
            })
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(postResult => saveOrder(postResult))
            .then(window.location.href = "confirm_commande.html")
            .catch(function() {                
                alert("Une erreur est survenue lors de l'envoi des données");                
            })
        }
    }
})