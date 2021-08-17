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