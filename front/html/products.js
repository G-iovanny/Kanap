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
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

buttonAddCart.addEventListener("click", function() {
  const selectColors = document.getElementById("colors");
  const optionSelected = selectColors.options[selectColors.selectedIndex].value;
  const quantitySelected = Number(document.getElementById("quantity").value);

  if (
    optionSelected === "" ||
    quantitySelected <= 0 ||
    quantitySelected > 100 ||
    !Number.isInteger(quantitySelected)
  ) {
    alert("Vous n'avez pas correctement rempli votre panier, veuillez suivre les instructions");
    return;
  }

  let article = {
    id: articleId,
    option: optionSelected,
    quantity: quantitySelected
  };

  let articleExist = false;

  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === articleId && panier[i].option === optionSelected) {
      panier[i].quantity += quantitySelected;
      articleExist = true;
      break;
    }
  }

  if (!articleExist) {
    panier.push(article);
  }

  localStorage.setItem("panier", JSON.stringify(panier));

  console.log(panier);
});

})
  .catch(error => console.error(error));

  /* buttonAddCart.addEventListener('click', () => {

    const selectColors = document.getElementById('colors');

      // Je stock la valeur de l'index de l'option selectionnée
    const optionSelected = selectColors.options[selectColors.selectedIndex].value;

      // Je stock la quantité sélectionné en la transformant en une valeur Number
    const quantitySelected = Number(document.getElementById('quantity').value);

      if(optionSelected === "" || quantitySelected <= 0 || quantitySelected >100 ||!Number.isInteger(quantitySelected)){
        alert("Vous n'avez pas correctement rempli votre panier");
        return
      }

    // Je crée un objet pour stocker les valeurs sélectionnés
    let article = {
      id: articleId,
      option: optionSelected,
      quantity: quantitySelected
    }

    let articleExist = false;

    for(let i = 0; i < panier.length; i++){
      if(panier[i].id === articleId && panier[i].option === optionSelected){
        panier[i].quantity += quantitySelected;
        articleExist = true;
        break
      }
    }

    if(!articleExist){
       // Je push l'objet dans mon tableau panier
    panier.push(article);
    console.log(article);
    }

  }); */
  