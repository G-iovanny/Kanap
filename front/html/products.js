const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(product => {

    // je modifie le nom du document par le nom du produit
    document.title = product.name;

    // je crée l'image grâce à l'objet et je la met dans le DOM rattaché à la div item__img
    const imageProduit = document.createElement("img");
    imageProduit.setAttribute('src', product.imageUrl);
    imageProduit.setAttribute('alt', product.altTxt)
    document.querySelector('.item__img').appendChild(imageProduit);

    // Je récupère le H1 pour y insérer le nom du produit
    document.getElementById('title').innerText = product.name;

    // Pareil pour le prix dans le span et la description dans le paragraphe
    document.getElementById('price').innerText = product.price;
    document.getElementById('description').innerText = product.description;

    // Je boucle chaque couleur dans le tableau de la clé "colors" pour y crée une option de plus dans la liste
    product.colors.forEach(function(color) {
      const newOption = document.createElement('option');
      newOption.setAttribute('value', color);
      newOption.innerText = color;

      // Je rajoute le ou les options dans l'élements select du document
      document.getElementById('colors').appendChild(newOption);  
  });


const buttonAddCart = document.getElementById('addToCart'); 

let articleId = params.get("id");

// Je vérifie si il y a déjà un panier dans le localstoarge : si oui, je le transforme en objet JS, sinon je le crée en tableau vide
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];


buttonAddCart.addEventListener("click", function() {
  
  const selectColors = document.getElementById("colors");
  
  // Je prends la valeur de l'index de la sélection de couleur et la valeur de la quantité en la transformant en Number
  const optionSelected = selectColors.options[selectColors.selectedIndex].value;
  const quantitySelected = Number(document.getElementById("quantity").value);

  // si l'utilisateur a fait au moins une de ces erreurs, le panier est invalidé et on bloque la suite :
  if (
    optionSelected === "" || // si la couleur a été sélectionné
    quantitySelected <= 0 || // si la quantité est inférieur ou égal à 0
    quantitySelected > 100 || // si la quantité est supérieur à 100
    !Number.isInteger(quantitySelected) // si la quantité est un nombre entier
  ) {
    alert("Vous n'avez pas correctement rempli votre panier, veuillez suivre les instructions");
    return;
  }

  // je crée mon article qui sera un objet avec les proprités de cet article
  let article = {
    id: articleId,
    option: optionSelected,
    quantity: quantitySelected
  };

  // J'initalise une variable pour savoir si l'article existe, on part du principe que de base l'article n'existe pas
  let articleExist = false;


  // Je fais une boucle pour vérifier si l'article existe, si il existe la valeur de articleExist passe à true et sa quantité augmente
  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === articleId && panier[i].option === optionSelected) {
      panier[i].quantity += quantitySelected;
      articleExist = true;
      break;
    }
  }

  // si l'article n'existe pas, on le push dans le tableau panier
  if (!articleExist) {
    panier.push(article);
  }

  localStorage.setItem("panier", JSON.stringify(panier));

  console.log(panier);
});

})
  .catch(error => console.error(error));
  