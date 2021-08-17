fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);
        document.querySelector(".mainSection__items").innerHTML += `<a href="produit.html?&_id=${article._id}">
                                                                        <article class="itemCard">
                                                                            <img src="${article.imageUrl}" alt="Photo de l'article ${article.name}">
                                                                            <div class="nameSection">
                                                                                <h3>${article.name}</h3>
                                                                                <p>${article.price/100} €</p>
                                                                            </div>
                                                                            <p>${article.description}</p>
                                                                            <button class="addToCartButton">
                                                                                Découvrir ${article.name}
                                                                            </button>
                                                                        </article>
                                                                    </a>
                                                                    `
    
    };
    displayCartQuantity();
    interactWithHamburgerMenu();
})
