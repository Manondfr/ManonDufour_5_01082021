class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }
}

let urlToFetch = "http://localhost:3000/api/teddies/" + window.location.href.slice(window.location.href.indexOf("=") + 1);

console.log(urlToFetch);

fetch(urlToFetch)
.then( data => data.json())
.then( jsonArticle => {
    let article = new Article(jsonArticle);
    document.querySelector("#cartSection").innerHTML += `   <h1>${article.name}</h1>
                                                            <div id="teddyPresentation">
                                                                <img src="${article.imageUrl}" alt="Photo du teddy">
                                                                <div id="teddyPresentation__info">
                                                                    <p>${article.price/100} €</p>
                                                                    <p>${article.description}</p>
                                                                <div id="teddyPresentation__infoCart">
                                                                    <form method="POST" action="#">
                                                                        <p>
                                                                            <label for="colors">Quelle couleur préférez-vous pour votre nouveau compagnon ?</label>
                                                                            <select name="colors" id="colors">
                                                                            </select>
                                                                        </p>
                                                                    </form>
                                                                    <button class="addToCartButton" data-id="${article._id}">
                                                                        Ajouter au panier
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        `;
    for (let i = 0; i < article.colors.length ; i++) {
        let parentElement = document.getElementById("colors");
        let childElement = document.createElement("option");
        parentElement.appendChild(childElement);
        childElement.textContent= article.colors[[i]];    
    };
    document.querySelectorAll(".addToCartButton").forEach(cartButton => {
        cartButton.addEventListener("click", function() {
            addToCart(this.dataset.id);
        })
    })
})
