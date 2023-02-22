const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
   .then(response => response.json())
   .then(product => {

      function updatePage(product) {

         document.title = product.name; // je modifie le nom du document par le nom du produit

         // Je crée l'image dynamiquement avec les informations dans l'API
         const imageProduit = document.createElement("img");
         imageProduit.setAttribute('src', product.imageUrl);
         imageProduit.setAttribute('alt', product.altTxt)
         document.querySelector('.item__img').appendChild(imageProduit);
         // Je remplace dynamiquement le nom, le prix et la description du produit
         document.getElementById('title').innerText = product.name;
         document.getElementById('price').innerText = product.price;
         document.getElementById('description').innerText = product.description;

         // Je boucle chaque couleur dans le tableau de la clé "colors" pour y crée une option de plus dans la liste
         product.colors.forEach(function (color) {
            const newOption = document.createElement('option');
            newOption.setAttribute('value', color);
            newOption.innerText = color;
            // Je rajoute le ou les options dans l'élements select du document
            document.getElementById('colors').appendChild(newOption);
         });
      }
      updatePage(product)

      document.getElementById('addToCart').addEventListener("click", function () {
         const selectColors = document.getElementById("colors");
         // Je prends la valeur de l'index de la sélection de couleur et la valeur de la quantité en la transformant en Number
         const optionSelected = selectColors.options[selectColors.selectedIndex].value;
         const quantitySelected = Number(document.getElementById("quantity").value);

         function validateCartInput() {

            // si l'utilisateur a fait au moins une de ces erreurs, le panier est invalidé et on bloque la suite :
            if (
               optionSelected === "" || // si aucune couleur n'a été sélectionnée
               quantitySelected <= 0 || // si la quantité est inférieur ou égal à 0
               quantitySelected > 100 || // si la quantité est supérieur à 100
               !Number.isInteger(quantitySelected) // si la quantité est un nombre entier
            ) {
               alert("Vous n'avez pas correctement rempli votre panier, veuillez suivre les instructions");
               return false; // la fonction renvoie "false" si une erreur est détectée 

            } else {
               return true;
            }
         }


         if (!validateCartInput()) { // si validateCartInput retourne false, on arrête le script
            return;
          }


         // je crée mon article qui sera un objet avec les proprités de cet article
         let article = {
            id: productId,
            option: optionSelected,
            quantity: quantitySelected
         };

         let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

         function isArticleExist(productId, optionSelected, quantitySelected, article) {
            // J'initalise une variable pour savoir si l'article existe, on part du principe que de base l'article n'existe pas
            let articleExist = false;
            

            // Je fais une boucle pour vérifier si l'article existe, si oui : la valeur de articleExist passe à true et sa quantité augmente
            for (let i = 0; i < panier.length; i++) {
               if (panier[i].id === productId && panier[i].option === optionSelected) {
                  panier[i].quantity += quantitySelected;
                  articleExist = true;
                  alert(`Article et option déjà existante, la quantité de cet article a été ajoutée au panier !`);
                  break; // On arrête la boucle dès qu'on a trouvé l'article dans le panier, car il ne peut y en avoir qu'un seul identique
               }
            }

            // si l'article n'existe pas, on le push dans le tableau panier
            if (!articleExist) {
               panier.push(article)
               alert('Nouvel article ajouté au panier !');
            }
         }

         isArticleExist(productId, optionSelected, quantitySelected, article);
         localStorage.setItem("panier", JSON.stringify(panier));

         console.log(panier);
      });

   })
   .catch(error => console.error(error));