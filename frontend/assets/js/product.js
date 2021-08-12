class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }
}

let urlToFetch = "http://localhost:3000/api/teddies/" + window.location.href.slice(window.location.href.indexOf("=") + 1);

fetch(urlToFetch)
.then( data => data.json())
.then( jsonArticle => {
    let article = new Article(jsonArticle);
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
                                                        `;
    for (let i = 0; i < article.colors.length ; i++) {
        let parentElement = document.getElementById("colors");
        let childElement = document.createElement("option");
        parentElement.appendChild(childElement);
        childElement.textContent= article.colors[[i]];    
    };
    let cartIcon = document.querySelector("#cartIcon");
    let shoppingCartItems = getShoppingCartItems();
    let cartQuantity = shoppingCartItems[0].length;
    if(cartQuantity === 0) {
        cartIcon.style.display = "none";
        document.querySelector("span").style.display = "none";
    } else {
        cartIcon.style.display = "initial";
        document.querySelector("span").textContent = `${cartQuantity}`;
        document.querySelector("span").style.display = "initial";
    };
    document.querySelectorAll(".addToCartButton").forEach(cartButton => {
        cartButton.addEventListener("click", function() {
            let select = document.querySelector("#colors");
            let userChoice = select.value;
            addToCart(this.dataset.id, userChoice);
            document.querySelector(".addToCartButton").textContent = " ✓";
            document.querySelector(".addToCartButton").style.fontSize = "1.5em";
            document.querySelector("#cartIcon").style.display = "initial";
            let shoppingCartItems = getShoppingCartItems();
            let cartQuantity = shoppingCartItems[0].length;
            document.querySelector("span").textContent = `${cartQuantity}`;
            document.querySelector("span").style.display = "initial";
            document.querySelector("span").style.color = "black";
            setTimeout(function() {
                document.querySelector(".addToCartButton").textContent = "Ajouter au panier";
                document.querySelector(".addToCartButton").style.fontSize = "1.2em";
                document.querySelector(".addToCartButton").style.backgroundColor = "#936884";                
            }, 600);
        })
    })
})
