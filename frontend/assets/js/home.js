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
        document.querySelector(".mainSection__items").innerHTML += `<a href="produit.html?&_id=${article._id}">
                                                                        <article class="itemCard">
                                                                            <img src="${article.imageUrl}" alt="Photo de l'article ${article.name}">
                                                                            <div class="nameSection">
                                                                                <h3>${article.name}</h3>
                                                                                <p>${article.price/100} €</p>
                                                                            </div>
                                                                            <p>${article.description}</p>
                                                                            <button class="addToCartButton">
                                                                                Ajouter au panier
                                                                            </button>
                                                                        </article>
                                                                    </a>
                                                                    `
    };
    let cartIcon = document.querySelector("#cartIcon");
    let cartQuantity = getShoppingCartItems().length;
    if(cartQuantity === 0) {
        cartIcon.style.display = "none";
        document.querySelector("span").style.display = "none";
    } else {
        cartIcon.style.display = "initial";
        document.querySelector("span").textContent = `${cartQuantity}`;
        document.querySelector("span").style.display = "initial";
    };
    let hamburgerMenu = document.querySelector("#hamburgerMenu");
    let dropDownMenu = document.querySelector(".trymenu");
    console.log(dropDownMenu);
    console.log(hamburgerMenu);
    hamburgerMenu.addEventListener("click", function() {
        if(dropDownMenu.classList.contains ("inactive")) {
            dropDownMenu.classList.replace("inactive", "active");
            console.log("blabla");
        } else {
            dropDownMenu.classList.replace("active", "inactive");
            console.log("Blablou");
    };
})
})
