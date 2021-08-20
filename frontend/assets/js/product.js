
let urlToFetch = "http://localhost:3000/api/teddies/" + window.location.href.slice(window.location.href.indexOf("=") + 1);

// Récupération des informations de la peluche sélectionnée et remplissage du template HTML avec ces informations
fetch(urlToFetch)
.then( data => data.json())
.then( jsonArticle => {
    let article = new Article(jsonArticle);
    if ("content" in document.querySelector("template")) {
        let template = document.querySelector("template");
        let clone = template.content.cloneNode(true);
        clone.querySelector("h1").textContent = `${article.name}`;
        clone.querySelector("img").setAttribute("src", `${article.imageUrl}`);
        clone.querySelector("img").setAttribute("alt", `Photo de l'article ${article.name}`);
        clone.querySelector("#teddyPresentation__info p:nth-child(1)").textContent = `${article.price/100} €`;
        clone.querySelector("#teddyPresentation__info p:nth-child(2)").textContent = `${article.description}`;
        clone.querySelector("button").setAttribute("data-id", `${article._id}`);
        document.querySelector("#productSection").appendChild(clone);
    } else {
        document.querySelector("#productSection").innerHTML += `   <h1>${article.name}</h1>
                                                                    <div id="teddyPresentation">
                                                                        <img src="${article.imageUrl}" alt="Photo de l'article ${article.name}">
                                                                        <div id="teddyPresentation__info">
                                                                            <p>${article.price/100} €</p>
                                                                            <p>${article.description}</p>
                                                                        </div>
                                                                        <div>
                                                                            <form method="POST" action="#" aria-label="Choix de la couleur de l'article">
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
                                                            `
    }
    // Création des différentes options pour la personnalisation du produit
    for (let i = 0; i < article.colors.length ; i++) {
        let parentElement = document.getElementById("colors");
        let childElement = document.createElement("option");
        parentElement.appendChild(childElement);
        childElement.textContent= article.colors[[i]];    
    };
    // Gestion de l'ajout au panier : enregistrement localStorage du produit sélectionné, effets visuels sur le bouton d'ajout    
    document.querySelectorAll(".addToCartButton").forEach(cartButton => {
        cartButton.addEventListener("click", function() {
            let select = document.querySelector("#colors");
            let userChoice = select.value;
            addToCart(this.dataset.id, userChoice);
            displayCartQuantity();         
            document.querySelector(".addToCartButton").textContent = " ✓";   
            setTimeout(function() {
                document.querySelector(".addToCartButton").textContent = "Ajouter au panier";             
            }, 600); 
        }) 
    });
})
.catch(function() {
    createErrorSentence("#productSection");
    document.querySelector("#productSection p").textContent = "Oups ! Nous n'avons pas retrouvé cet ourson. Rafraîchissez la page pendant que nous le cherchons.";
});

// Affichage du nombre d'articles au panier dans le header
displayCartQuantity();

// Ouverture et fermeture du menu mobile
interactWithHamburgerMenu(); 