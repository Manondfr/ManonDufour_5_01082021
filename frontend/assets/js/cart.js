class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    } 
}

fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);
        if (getShoppingCartItems().includes(article._id)) {
            document.querySelector("#cartSection__items").innerHTML += `    <div id="teddyItem">                                                                           <h1>${article.name}</h1>
                                                                            <div id="teddyPresentation">
                                                                                <!-- <img src="${article.imageUrl}" alt="Photo de l'article ${article.name}"> -->
                                                                                <div id="teddyPresentation__info">
                                                                                    <p>${article.price/100} €</p>
                                                                                    <p>${article.description}</p>
                                                                                    <p>Prix : ${((countOccurences(article._id))*article.price)/100} €</p>
                                                                                </div>
                                                                                <label for id="quantity">Quantité :</label><input id="quantity" size="1" type="number" value="${countOccurences(article._id)}"/>
                                                                                <button class="removeOfCartButton" data-id=${article._id}>
                                                                                    Supprimer
                                                                                </button>
                                                                            </div>
                                                                            </div>
                                                                        `;
        }
    };
    document.querySelectorAll(".removeOfCartButton").forEach(binButton => {
    binButton.addEventListener("click", function() {
        removeOfCart(this.dataset.id);
        this.parentElement.parentElement.innerHTML = ``;
    })
})
})


/*
let occurences = countOccurences(this.dataset.id);
if (occurences == 1) {
    
} else {
    removeOne(this.dataset.id);
    this.previousSibling.innerHTML = `<p>Quantité : ${countOccurences(this.dataset.id)}</p>`;
}
*/