//on selectionne les element du html
const prixproduits = document.getElementsByClassName('price'); 
const descriptions = document.getElementsByClassName('description'); 
const nomproduits = document.getElementsByClassName('title');
const currencyEl_one = document.getElementById('colors');
const images=document.querySelectorAll('.imagee');
const quantity = document.getElementById('quantity');

let n =[];
//on recupere l'id stocker dans le lien
const idproduit_url = window.location.search;
console.log(idproduit_url);

const urlParam = new URLSearchParams(idproduit_url);
console.log(urlParam);

const idproduit = urlParam.get("id");  
console.log(idproduit);

//id est le nom utiliser dans l'url
//fetch sur l'api 
main();

function main() {
  getArticles();
}

function getArticles() {
fetch("http://localhost:3000/api/products/"+idproduit)
  .then(function (response){
     return response.json();
    
   }).catch((error) => {   
    console.log('Error');
    alert("Error. Veuillez lancé le serveur local (Port 3000) ? Si le problème persiste, contactez-nous.");
    document.location.href = "index.html";
    })
     .then (function (data){
    
    console.log(data);

    n = [data];
    console.log(n[0]);

    // on affiche les couleurs du produit

    for(i=0; i<n[0].colors.length; i++)
    {
      //console.log(color);
      // elt.options[i].label = n[a].colors[i];
      var option4 = new Option(n[0].colors[i], n[0].colors[i]);
      var elt = document.querySelector('select');
      elt.options[elt.options.length] = option4;
    }
   
    console.log(currencyEl_one.value);
    prixproduits[0].innerText =  n[0].price;
    descriptions[0].innerText = n[0].description;
    nomproduits[0].innerText = n[0].name;

    images.forEach((imagee,i)=>{
      const imag = document.createElement('img')
      imag.src=n[0].imageUrl;
      imagee.appendChild(imag)
    });
    

  
  }) 
  
  // console.log(x)
}

    // // fonction pour ajouter le produit dans le paniet

function panier(){
  
      const currency_one = currencyEl_one.value;
      
      //  currency_one = color du produit
      //  quantity.value = qte du produit
      if(quantity.value<=0){
        alert('Veuiller choisir une valeur superieur a zero')
      }else{ 
    
        let detailproduit = {
        nomp: n[0].name,
        prixp: n[0].price,
        qte: quantity.value,
        colorp: currency_one,
        lien: n[0].imageUrl,
        }
    
        console.log(detailproduit);
    
        let produitpanier = JSON.parse(sessionStorage.getItem('produit'));
    
        if(produitpanier){
        produitpanier.push(detailproduit);
        sessionStorage.setItem('produit', JSON.stringify(produitpanier));
        alert('Ce produit a ete ajoute dans votre panier');
        
        }else{
        produitpanier = [];
        produitpanier.push(detailproduit);
        sessionStorage.setItem('produit', JSON.stringify(produitpanier));
        console.log(produitpanier);
        alert('Ce produit a ete ajoute dans votre panier');
        }
      };
}

//on recupere la valeur stocker dans le stockage

// let a = sessionStorage.getItem('vali');



// //console.log(n[1].colors[1]);




                       

                       