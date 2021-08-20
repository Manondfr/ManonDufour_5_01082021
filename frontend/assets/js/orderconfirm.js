// Remplissage du template HTML en utilisant les données saisies par l'utilisateur lors du passage de la commande
if ("content" in document.querySelector("template")) {
    let template = document.querySelector("template");
    let clone = template.content.cloneNode(true);
    clone.querySelector("h1").textContent = `Merci ${getOrder().contact.firstName} !`;
    clone.querySelector("p:nth-child(2)").textContent = `Votre commande n°${getOrder().orderId} a bien été enregistrée.`;
    clone.querySelector("#mailSentence").textContent = `Un email de confirmation vous a été envoyé à l'adresse mail ${getOrder().contact.email}`;
    document.querySelector("#confirmSection").appendChild(clone);
} else {
    document.querySelector("#confirmSection").innerHTML = `     <h1>Merci ${getOrder().contact.firstName} !</h1>
                                                                    <p> Votre commande n°${getOrder().orderId} a bien été enregistrée.</p>
                                                                    <h2>Récapitulatif de la commande</h2>
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Libellé produit</th>
                                                                                <th>Couleur</th>
                                                                                <th>Quantité</th>
                                                                                <th>Prix TTC</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        </tbody>
                                                                        <tfoot>
                                                                            <tr>
                                                                                <td colspan="3">Montant total TTC</td>
                                                                                <td id="totalPrice"></td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                    <p>Un email de confirmation vous a été envoyé à l'adresse mail ${getOrder().contact.email}</p>
                                                                    <p>Des questions ? Pour toute demande, contactez-nous au 01.02.03.04.05.</p>`;
}

// Récupération des informations des articles du backend ; pour chaque article du backend, recherche d'une correspondance avec les produits enregistrés dans le localStorage
fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    let totalPrice = Number(document.querySelector("#totalPrice").textContent.replace(/[^\d]/g, ""));    
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
        // Création d'un tableau arrayUniqueIds qui supprime les correspondances en double et permet donc de n'afficher qu'une seule ligne par typologie de produit
        arrayUniqueIds = Array.from(new Set(arrayUniqueIds));
            for (arrayUniqueId of arrayUniqueIds) {
                document.querySelector("tbody").innerHTML += `  <tr>
                                                                <td>${article.name}</td>
                                                                <td>${arrayUniqueId.split("-")[1]}</td>
                                                                <td>${countOccurences(arrayUniqueId)}</td>
                                                                <td>${article.price * ((countOccurences(arrayUniqueId))/100)} €</td>`; 
            document.querySelector("#totalPrice").textContent = `${totalPrice += (article.price * ((countOccurences(arrayUniqueId))/100))} €`;
        };
    }
})
.catch(function() {
    document.querySelector("#confirmSection").innerHTML = "";
    createErrorSentence("#confirmSection");
    document.querySelector("#confirmSection p").textContent = `Une erreur est survenue. Veuillez essayer à nouveau.`;
})

// Affichage du nombre d'articles au panier dans le header
displayCartQuantity();

// Ouverture et fermeture du menu mobile
interactWithHamburgerMenu(); 