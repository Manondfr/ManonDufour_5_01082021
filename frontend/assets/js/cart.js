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
            document.querySelector("#cartSection__items").innerHTML += `    <h1>${article.name}</h1>
                                                                            <div id="teddyPresentation">
                                                                                <!-- <img src="${article.imageUrl}" alt="Photo de l'article ${article.name}"> -->
                                                                                <div id="teddyPresentation__info">
                                                                                    <p>${article.price/100} €</p>
                                                                                    <p>${article.description}</p>
                                                                                    <p>Quantité : ${countOccurences(article._id)}</p>
                                                                                    <p>Prix : ${((countOccurences(article._id))*article.price)/100} €</p>
                                                                                </div>
                                                                                <button class="removeOfCartButton" data-id=${article._id}>
                                                                                    Supprimer
                                                                                </button>
                                                                            </div>
                                                                        `;
        }
    };
    document.querySelectorAll(".removeOfCartButton").forEach(binButton => {
    binButton.addEventListener("click", function() {
    removeOfCart(this.dataset.id);
        })
    })
})


