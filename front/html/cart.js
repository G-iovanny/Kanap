fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(products => {

    // Je récupère le panier dans le localStorage
    const panier = JSON.parse(localStorage.getItem('panier'));

    function getElementsOnStorage() {
      const elementsArray = []; // Tableau pour stocker les éléments du panier
      
      // Boucle sur chaque item du panier
      for (let item of panier) {
        const product = products.find(p => p._id === item.id); // Chercher l'objet correspondant à l'ID du panier
        // Création d'un objet avec toutes les propriétés nécessaires pour chaque élement
        const element = {
          productId: item.id,
          name: product.name,
          color: item.option,
          price: product.price,
          image: product.imageUrl.split('/').pop(),
          quantity: item.quantity,
          txtAlt : product.altTxt
        };
        elementsArray.push(element);
      }
    
      return elementsArray;
    }
    const elements = getElementsOnStorage();

    // On initialise la variable article en dehors d'une fonction pour la réutiliser où on veut
    let article = "";

    function createArticles(elements){
      for(let i = 0; i < elements.length; i++){
        article +=
        `<article class="cart__item" data-id="${elements[i].productId}" data-color="${elements[i].color}">
          <div class="cart__item__img">
            <img src="../../back/images/${elements[i].image}" alt="${elements[i].txtAlt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${elements[i].name}</h2>
              <p>${elements[i].color}</p>
              <p>${elements[i].price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${elements[i].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
      }
    }
    createArticles(elements);
    document.getElementById('cart__items').innerHTML = article;

    function updateLocalStorageQuantity() {
      const quantityInputs = document.querySelectorAll('.itemQuantity');
    
      quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
          const id = input.closest('.cart__item').dataset.id;
          const panier = JSON.parse(localStorage.getItem('panier'));
          const item = panier.find(item => item.id === id);
          
          // Vérification de la valeur de quantité
          let quantity = parseInt(input.value);
          if (isNaN(quantity) || quantity < 1 || quantity > 100) {
            alert('Veuillez entrer une quantité valide (entre 1 et 100)');
            input.value = item.quantity;
            return;
          }
          
          item.quantity = quantity;
          localStorage.setItem('panier', JSON.stringify(panier));
        });
      });
    }
  updateLocalStorageQuantity()   

  function deleteItem(event) {
    const item = event.target.closest('.cart__item');
    const id = item.dataset.id;
    const option = item.dataset.color;
    const index = panier.findIndex(item => item.id === id && item.option === option);
    if (index !== -1) {
      panier.splice(index, 1);
      localStorage.setItem('panier', JSON.stringify(panier));
      item.remove();
    }
  }
  
  document.querySelectorAll('.deleteItem').forEach(button => {
    button.addEventListener('click', deleteItem);
  });
  
  function validateNamesCity(e) {
    const namePattern = /^[a-zA-ZÀ-ÿ'-]+$/;
    return namePattern.test(e.trim());
  }
  
  function validateAddress(address) {
    const addressPattern = /^[a-zA-Z0-9\s,'-]+$/;
    return addressPattern.test(address.trim());
  }

  function validateMail(mail){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(mail.trim())
  }
  
  document.getElementById('order').addEventListener('click', function(event){

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const mail = document.getElementById("email").value;


    
    if (!validateNamesCity(firstName)) {
      event.preventDefault();
      console.log("Erreur dans le prénom");
      document.getElementById('firstNameErrorMsg').innerText = "Champ mal rempli";
    }
    
    if (!validateNamesCity(lastName)) {
      event.preventDefault();
      console.log("Erreur dans le nom");
      document.getElementById('lastNameErrorMsg').innerText = "Champ mal rempli";
    }
    
    
    if (!validateAddress(address)) {
      event.preventDefault();
      console.log("Erreur dans l'adresse");
      document.getElementById('addressErrorMsg').innerText = "Champ mal rempli";
    }

    if (!validateNamesCity(city)) {
      event.preventDefault();
      console.log("Erreur dans la ville");
      document.getElementById('cityErrorMsg').innerText = "Champ mal rempli";
    }
    if (!validateMail(mail)) {
      event.preventDefault();
      console.log("Erreur dans l'email");
      document.getElementById('emailErrorMsg').innerText = "Champ mal rempli";
    }
  });
  
  
  


   
  
  })
  .catch(error => console.log(error));
