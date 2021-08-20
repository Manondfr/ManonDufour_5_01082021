// Récupération des articles du backend et remplissage du template HTML pour chacun d'eux
fetch("http://localhost:3000/api/teddies/")
.then( data => data.json())
.then( jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);
        if ("content" in document.querySelector("template")) {
            let template = document.querySelector("template");
            let clone = template.content.cloneNode(true);
            clone.querySelector("a").setAttribute("href", `produit.html?&_id=${article._id}`);
            clone.querySelector("img").setAttribute("src", `${article.imageUrl}`);
            clone.querySelector("img").setAttribute("alt", `Photo de l'article ${article.name}`);
            clone.querySelector("h3").textContent = `${article.name}`;
            clone.querySelector(".nameSection p").textContent = `${article.price/100} €`;
            clone.querySelector(".nameSection + p").textContent = `${article.description}`;
            clone.querySelector("button").textContent = `Découvrir ${article.name}`;
            document.querySelector(".mainSection__items").appendChild(clone);
        } else { 
            document.querySelector(".mainSection__items").innerHTML +=  `<a href="produit.html?&_id=${article._id}">
                                                                            <article class="itemCard">
                                                                                <img src="${article.imageUrl}" alt="Photo de l'article ${article.name}">
                                                                                <div class="nameSection">
                                                                                    <h3>${article.name}</h3>
                                                                                    <p>${article.price/100} €</p>
                                                                                </div>
                                                                                <p>${article.description}</p>
                                                                                <button class="discoverButton">
                                                                                    Découvrir ${article.name}
                                                                                </button>
                                                                            </article>
                                                                        </a>
                                                                        `;
        }
    };
})
.catch(function() {
    createErrorSentence(".mainSection__items");
    document.querySelector(".mainSection__items p").textContent = "Oups ! Nous n'avons pas retrouvé nos oursons. Rafraîchissez la page pendant que nous les cherchons.";
});

// Affichage du nombre d'articles au panier dans le header
displayCartQuantity();

// Ouverture et fermeture du menu mobile
interactWithHamburgerMenu(); 