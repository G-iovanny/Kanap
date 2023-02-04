const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    // Utilisez les informations sur le produit pour remplir les éléments de la page avec les détails du produit
  })
  .catch(error => console.error(error));