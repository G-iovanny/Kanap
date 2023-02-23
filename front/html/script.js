fetch('http://localhost:3000/api/products')
  .then(response =>
    response.json())   
  .then(data => {

    for(const item of data){
      constructItems(item._id, item.imageUrl, item.altTxt, item.name, item.description);
    }
    
  })
  .catch(error => console.log(error));


  // fonction pour construire nos éléments
  function constructItems(_id, imageUrl, altTxt, name, description){
    // Création du lien
    const newlink = document.createElement("a");
    newlink.setAttribute("href", `./product.html?id=${_id}`);
  
    // Création de l'article
    const newArticle = document.createElement('article');
    
    // Création de l'image avec la source et le texte alternatif dynamiques
    const newImg = document.createElement('img');
    newImg.setAttribute('src', imageUrl);
    newImg.setAttribute('alt', altTxt);
    // On met la nouvelle image en enfant de l'article
    newArticle.appendChild(newImg);
  
    // Création du titre, on injecte dynamiquement son contenu selon le nom du canapé
    const newH3 = document.createElement('h3');
    newH3.innerText = name;
    // On ajoute le titre en tant qu'enfant de l'article
    newArticle.appendChild(newH3);
  
    // Pareil que le haut, on crée un paragraphe, on le rempli dynamiquement et on l'inject au nouvel Article
    newP = document.createElement('p');
    newP.innerText = description;
    newArticle.appendChild(newP);
  
    // On ajoute l'article en tant qu'enfant du lien
    newlink.appendChild(newArticle);
  
    // On ajoute le lien au document
    document.getElementById('items').appendChild(newlink);
  }  
  
  
  
