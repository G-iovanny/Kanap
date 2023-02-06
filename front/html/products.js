const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    
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






  })
  .catch(error => console.error(error));