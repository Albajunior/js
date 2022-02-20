
// document.querySelector('#firstName').value = "";
// document.querySelector('#lastName').value = "";
// document.querySelector('#address').value = "";
// document.querySelector('#city').value = "";
// document.querySelector('#email').value = "";

//let copyOfLS = JSON.parse(localStorage.getItem("products"));

//on recupere les produit stocker dans le storage dans produit panier
let produitpanier = JSON.parse(sessionStorage.getItem('produit'));

let classpanier = document.querySelector('#cart__items');
let classtotal = document.querySelector('#totale');
//console.log(classpanier);

let paniernonvide = [];
let total = 0;

if (produitpanier == null || produitpanier == 0) {
  //console.log('Panier vide')
  const paniervide = `
    <div class="paniervide">
        <div> Le Panier est vide ...</div>
    </div>
    `;
  classpanier.innerHTML = paniervide;
}
else {

  //on elimine les doublons du panier
  const itemQuantity = document.getElementsByClassName('itemQuantity');
  var nbr = produitpanier.length;
  for (i = 0; i < nbr; i++) {
    for (j = i + 1; j < nbr;) {
      if (produitpanier[j].nomp == produitpanier[i].nomp && produitpanier[j].colorp == produitpanier[i].colorp) {

        produitpanier[i].qte == produitpanier[i].qte + produitpanier[j].qte;
        produitpanier.splice([j], 1);
        nbr--;

      } else
        j++;
    }
  }
  //affichage du panier
  
  console.log(produitpanier);
  for (m = 0; m < produitpanier.length; m++) {
  
    
    paniernonvide = paniernonvide + `
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img class="image" src="${produitpanier[m].lien}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom : ${produitpanier[m].nomp}</h2>
            <p>Color : ${produitpanier[m].colorp}</p>
            <p>Prix : ${produitpanier[m].prixp}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitpanier[m].qte}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem"><button class="supprimer" value="${m}"> Supprimer </button> </p>
            </div>
          </div>
        </div>
      </article> `;


    classpanier.innerHTML = paniernonvide;
  }

  
  //modification de la quantite d'un produit
  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener('input', function () {
      produitpanier[i].qte = itemQuantity[i].value;

      total = 0;
      for (let i = 0; i < produitpanier.length; i++) {
        let prixtotalprduit = produitpanier[i].prixp * produitpanier[i].qte;
        total = total + prixtotalprduit;
      }
      const totale =
        `<div class="totale">
       <p>Total : ${total} €</p>
       </div>`;
      classtotal.innerHTML = totale;
      classtotal.innerHTML = totale;
      //console.log(total);
    });

  }

  //fonction du calcul du total


  // supprimer un produit
  supprimerSelection = Array.from(document.querySelectorAll('.supprimer'));

  for (let i = 0; i < supprimerSelection.length; i++) {

    supprimerSelection[i].parentElement.addEventListener('click', () => {

      sessionStorage.clear('produit');
      supprimerSelection[i].parentElement.style.display = "none";

      let tab = [];

      tab = produitpanier;

      tab.splice([i], 1);

      produitpanier = sessionStorage.setItem('produit', JSON.stringify(tab));
      document.location.href = "cart.html";

    });
  };

}

//fonction du bouton valider commande 

function validation() {

  if (produitpanier == null || produitpanier.length == 0) {
    alert('impossible de commander, Votre panier est vide');
  } else {
    let tabid = [];
    for (m = 0; m < produitpanier.length; m++) {
      tabid[m] = produitpanier[m]._id;
    }

    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let address = document.querySelector('#address').value;
    let city = document.querySelector('#city').value;
    let email = document.querySelector('#email').value;

    //Si les donnes saisis sont valides , on envoi les donnees saisi et on affiche la paage confirmation 
    controlePrenom();
    controleAdress();
    controleNom();
    controlePrenom();
    controleEmail();

    if (controlePrenom(1) && controleNom(1) && controleAdress(1) && controleVille(1) ){
       

      let productsBought = [];
      productsBought.push(tabid);
      const order = {
        contact: {
          firstName: firstName,
          lastName: lastName,
          city: city,
          address: address,
          email: email,
        },
        products: productsBought,
      };

    
  
      // // -------  Envoi de la requête POST au back-end --------
      // // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      // // Envoie de la requête avec l'en-tête. on garde orderId
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
         sessionStorage.clear('produit')
          sessionStorage.setItem("orderId", data.orderId);        
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
    }  
  }
}


function calculate() {
  for (let i = 0; i < produitpanier.length; i++) {
    let prixtotalprduit = produitpanier[i].prixp * produitpanier[i].qte;
    total = total + prixtotalprduit;
  }
  const totale =
    `<div class="totale">
  <p>Total : ${total} €</p>
  </div>`;
  classtotal.innerHTML = totale;
}

calculate();

//   //controle prenom
function controlePrenom(a) {
  var a = 0;
  let firstName = document.querySelector('#firstName').value;
  if (/^[a-zA-Z]{3,20}$/.test(firstName)) {
    firstNameErrorMsg.innerHTML = "";
    a = 1;
    return a;
  } else {
    document.querySelector('#firstName').value = "";
    firstNameErrorMsg.innerHTML = "Invalide";

  };
}

//   //controle prenom
function controleNom(b) {
  var b = 0;
  let lastName = document.querySelector('#lastName').value;
  if (/^[a-zA-Z]{3,20}$/.test(lastName)) {
    lastNameErrorMsg.innerHTML = "";
    b = 1;
    return b;
  } else {
    document.querySelector('#lastName').value = "";
    lastNameErrorMsg.innerHTML = "Nom incorrect"

  }
}

//   //controle adresse
function controleAdress(c) {
  let address = document.querySelector('#address').value;
  var c = 0;
  if (/^[0-9]{1,3}[a-zA-Z0-9 ]{10,50}$/.test(address)) {
    addressErrorMsg.innerHTML = ""
    c = 1;
    return c;
  } else {
    document.querySelector('#address').value = "";
    addressErrorMsg.innerHTML = "Adress non valide"
  }
}

//controle ville
function controleVille(d) {
  var d = 0;
  let city = document.querySelector('#city').value;
  if (/[a-zA-Z]{3,38}$/.test(city)) {
    d = 1;
    return d;
  } else {
    document.querySelector('#city').value = "";

  }
}

//   //controle email
function controleEmail(e) {
  var e = 0;
  let email = document.querySelector('#email').value;
  if (/^[A-Za-z0-9_-]+@\w+\.[a-z]+$/.test(email)) {
    e = 1;
    return e;
  } else {
    document.querySelector('#email').value = "";

  };
}


 // fetch("http://localhost:3000/api/products/order", {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(order)
      // })
      // .then(function (res) {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //   }).then(function (value) {  
      //     console.log(value);
          
      // });
