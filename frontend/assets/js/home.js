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
    let hamburgerMenu = document.querySelector("#mobileOnly");
    let dropDownMenu = document.querySelector(".trymenu");
    console.log(dropDownMenu);
    console.log(hamburgerMenu);
    hamburgerMenu.addEventListener("click", function() {
        if(dropDownMenu.classList.contains ("inactive")) {
            dropDownMenu.classList.replace("inactive", "active");
            hamburgerMenu.style.backgroundColor = "#392934";
            document.querySelector("svg").setAttribute("viewBox", "0 0 352 512");
            document.querySelector("svg").setAttribute("width", "23");
            document.querySelector("svg").setAttribute("height", "23");
            document.querySelector("path").setAttribute("d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z");
        } else {
            dropDownMenu.classList.replace("active", "inactive");
            hamburgerMenu.style.backgroundColor = "transparent";
            document.querySelector("svg").setAttribute("viewBox", "0 0 448 512");
            document.querySelector("svg").setAttribute("width", "20");
            document.querySelector("svg").setAttribute("height", "20");
            document.querySelector("path").setAttribute("d", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z");
    };
})
})
