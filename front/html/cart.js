fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(products => {

    // Je récupère le panier dans le localStorage
    const panier = JSON.parse(localStorage.getItem('panier'));

    // Fonction pour avoir nos élements du panier
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
  
      return elementsArray; // cette fonction retourne un tableau de tous mes éléments panier avec leur propriétés
    }
    const elements = getElementsOnStorage(); // on stock la valeur dans une constante

// Récupération des données du localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    // On initialise la variable article en dehors d'une fonction pour la réutiliser où on veut
    let article = "";

    // Fonction pour créer les articles
    function createArticles(elements){ 
      for(let i = 0; i < elements.length; i++){ // On boucle sur la taille du tableau
        article += // et pour chaque boucle (chaque article du panier) on crée un article HTML avec les propriétés
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
    // Ma variable article est maintenant un bloc HTML des articles du panier, on la place dans le HTML
    document.getElementById('cart__items').innerHTML = article;
    
    function addTotal() {
      let quantity = 0;
      let totalPrice = 0;
      const panier = JSON.parse(localStorage.getItem('panier'));
    
      for (let i = 0; i < panier.length; i++) {
        const id = panier[i].id;
        const element = elements.find(item => item.productId === id);
        if (element) {
          const quantityElement = panier[i].quantity;
          quantity += quantityElement;
          const priceElement = element.price * panier[i].quantity;
          totalPrice += priceElement;
        }
      }
      document.querySelector('#totalQuantity').innerText = quantity;
      document.querySelector('#totalPrice').innerText = totalPrice;
    }
    addTotal();
    
    function updateLocalStorageQuantity() {
      const quantityInputs = document.querySelectorAll('.itemQuantity');
    
      // Pour chaque item
      quantityInputs.forEach(input => {
        input.addEventListener('change', () => { // J'écoute le "change" de la valeur
          const id = input.closest('.cart__item').dataset.id; // Je récupère l'id de l'item le plus proche de la class
          const color = input.closest('.cart__item').dataset.color; // Je récupère la couleur de l'item le plus proche de la class
          const panier = JSON.parse(localStorage.getItem('panier'));
          const item = panier.find(item => item.id === id && item.option === color); // je trouve le bon objet dans le panier qui correspond à cet ID et cette couleur
    
          // Vérification de la valeur de quantité
          let quantity = parseInt(input.value); // on parseInt la value pour être sûr de renvoyer un number
          if (isNaN(quantity) || quantity < 1 || quantity > 100) { // On vérifie que la valeur reste corectes avec nos conditions
            alert('Veuillez entrer une quantité valide (entre 1 et 100)'); // Sinon on renvoie une erreur
            input.value = item.quantity; // On remet la valeur précedent
            return; // et on ne va pas plus loin dans la fonction
          }
          // sinon, cette quantité devient la nouvelle quantité du panier
          item.quantity = quantity;    
          localStorage.setItem('panier', JSON.stringify(panier));
          addTotal(); // On met à jour le prix et le nombre d'articles
        });
      });
    
    }
    
    updateLocalStorageQuantity();
    


  // Fonction pour supprimer un item
  function deleteItem(event) {
    const item = event.target.closest('.cart__item'); // On prend la class demandée la plus proche
    const id = item.dataset.id; // on récupère le dataset.id
    const option = item.dataset.color; // et l'option
    const index = panier.findIndex(item => item.id === id && item.option === option); // on cherche l'objet correspond à l'ID du panier
    if (index !== -1) {
      panier.splice(index, 1);
      localStorage.setItem('panier', JSON.stringify(panier));
      item.remove();
      addTotal();
    }
  }
  // J'appelle la fonction à chaque clique sur le bouton "supprimer" d'un item
  document.querySelectorAll('.deleteItem').forEach(button => {
    button.addEventListener('click', deleteItem);
  });
  
  // Fonction pour vérifier les input du formulaire
  function validateField(value, pattern, errorMsgId) { // trois paramètres, la value, le 
    const valid = pattern.test(value.trim()); // Si le pattern est bon = renvoie true, sinon renvoie false
    const errorMsg = valid ? "" : "Champ mal rempli"; // si true : "", si false "champ mal rempli"
    document.getElementById(errorMsgId).innerText = errorMsg; // on innerText la réponse
    return valid; 
  }
  
  document.getElementById('order').addEventListener('click', function(event){
    const firstName = document.getElementById("firstName").value; // On stock chaque valeur des inputs
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const mail = document.getElementById("email").value;

    // on initialise une variable valide à true
    let isValid = true;
    // On appel la fonction pour chaque input avec les paramètres correspondants
    // 1: value, 2: le pattern, 3: le message d'erreur
    isValid = validateField(firstName, /^[a-zA-ZÀ-ÿ'-]+$/, 'firstNameErrorMsg') && isValid; // On ajoute && isValide pour être sûr que le champ est à true
    isValid = validateField(lastName, /^[a-zA-ZÀ-ÿ'-]+$/, 'lastNameErrorMsg') && isValid;
    isValid = validateField(address, /^[a-zA-Z0-9\s,'-]+$/, 'addressErrorMsg') && isValid;
    isValid = validateField(city, /^[a-zA-ZÀ-ÿ'-]+$/, 'cityErrorMsg') && isValid;
    isValid = validateField(mail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'emailErrorMsg') && isValid;
    // une seule erreur suffit à renvoyer false
    // si la fonction renvoie false, on enlève le rechargement de la page (comportement par défaut du submit)
    if (!isValid) {
      event.preventDefault();
    } else if(isValid){
      
// Récupération des données du formulaire
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const address = document.getElementById("address").value;
const city = document.getElementById("city").value;
const email = document.getElementById("email").value;

// Création de l'objet contact à envoyer à l'API
const contact = {
  "firstName" : firstName,
  "lastName" : lastName,
  "address" : address,
  "city" : city,
  "email" : email
};

// Creation du tableau contact à envoyer à l'API
let products = [];
for (let i = 0; i < panier.length; i++) {
  products.push(panier[i].id);
}

const data = {contact, products}; // L'objet demandé par l'API
console.log(data)

// On requête l'API pour envoyer les donnés
fetch("http://localhost:3000/api/products/order", {
  method: "POST", // Méthode POST pour envoyer et non recevoir
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data) // on envoie data
})
.then(response => response.json())
.then(response => {
  const orderId = response.orderId;
  console.log(orderId);
  window.location.href = `confirmation.html?id=${orderId}`;

  // Tout est envoyé pour la confirmation, on peut supprimer le panier
  localStorage.removeItem('panier');

})
.catch(error => console.error(error));
}
      
});

  })
  .catch(error => console.log(error));
