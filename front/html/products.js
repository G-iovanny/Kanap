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

  const select = document.getElementById('colors');
  const ajouterPanier = document.getElementById('addToCart');
  const quantite = document.getElementById('quantity');  

  let articleId = params.get("id");

  ajouterPanier.addEventListener('click', () => {
    let panier = [];

    // je récupère l'index de la sélection et je stock sa valeur dans une variable
    const optionIndex = select.options[select.selectedIndex];
    const optionSelected = optionIndex.value;

    // je stock la valeur de la quantitié dans une variable
    const quantity = document.getElementById('quantity');
    const quantitySelected = quantity.value;

    let article = {
      id: articleId,
      option: optionSelected,
      quantity: quantitySelected
    }

    panier.push(article);
    console.log(article);

  });

})
  .catch(error => console.error(error));