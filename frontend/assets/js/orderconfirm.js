class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    } 
}

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
    let shoppingCartItems = getShoppingCartItems();
    if (shoppingCartItems[0].includes(article._id)) {          
        let array = new Array();
        let arrayUniqueIds = new Array();
        while(shoppingCartItems[0].includes(article._id)) {
            let indexOfElement = shoppingCartItems[0].indexOf(article._id);
            let lineConcat = shoppingCartItems[0].splice(indexOfElement, 1).concat(shoppingCartItems[1].splice(indexOfElement, 1)).join("-");
            array.push(lineConcat);
            arrayUniqueIds = Array.from(new Set(array))
        };
        for (arrayUniqueId of arrayUniqueIds) {
            let space= arrayUniqueId.indexOf(" ");
            document.querySelector("tbody").innerHTML += `  <tr>
                                                            <td>${article.name}</td>
                                                            <td>${arrayUniqueId.split("-")[1]}</td>
                                                            <td>${countOccurencesOfColor(arrayUniqueId, array)}</td>
                                                            <td>${article.price * ((countOccurencesOfColor(arrayUniqueId, array))/100)} €</td>`; 
        document.querySelector("#totalPrice").textContent = `${totalPrice += (article.price * ((countOccurencesOfColor(arrayUniqueId, array))/100))} €`;
        };
    }
}
})
