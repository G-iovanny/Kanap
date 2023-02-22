fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(products => {

    //Je récupère mon panier dans le localstorage
    let panier = JSON.parse(localStorage.getItem('panier'));

    // J'initialise mon panier qui sera sous forme HTML
    let cartItems = '';
    let totalPrice = 0;
    let totalQuantity = 0;
    
    // Je crée une boucle pour chaque produit du panier en récupérant les valeurs dont j'ai besoin
    for (let i = 0; i < panier.length; i++) {
      let productId = panier[i].id;
      // Je cherche l'objet correspondant à l'ID du panier et je le met dans la variable product
      let product = products.find(p => p._id === productId);
      let imgUrl = product.imageUrl;
      let price = product.price;
      let color = panier[i].option;
      let quantity = panier[i].quantity;
      let fileName = imgUrl.split('/').pop();

      totalPrice += price * quantity;
      totalQuantity += quantity;

      // À chaque tour de boucle je rajoute mon produit dans le HTML avec ses propriétés
      cartItems += `
        <article class="cart__item" data-id="${productId}" data-color="${color}">
          <div class="cart__item__img">
            <img src="../../back/images/${fileName}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${color}</p>
              <p>${price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
    };

    // J'ajoute mon HTML à la section
    const section = document.getElementById('cart__items');
    section.innerHTML = cartItems;

    document.getElementById('totalPrice').innerText = totalPrice;
    document.getElementById('totalQuantity').innerText = totalQuantity;

    inputQuantity = document.querySelectorAll('.itemQuantity')

    inputQuantity = document.querySelectorAll('.itemQuantity')

    inputQuantity.forEach(input => {
    input.addEventListener('change', function() {
  })
})


    console.log(totalPrice);
  })
  .catch(error => console.log(error));