//on selectionne les element du html
const prixproduits = document.getElementsByClassName('price'); 
const descriptions = document.getElementsByClassName('description'); 
const nomproduits = document.getElementsByClassName('title');
const images=document.querySelectorAll('.imagee');
const quantity = document.getElementById('quantity');

//on recupere l'id stocker dans le lien
const idproduit_url = window.location.search;
console.log(idproduit_url);

const urlParam = new URLSearchParams(idproduit_url);
console.log(urlParam);

const idproduit = urlParam.get("id");  
console.log(idproduit);

//id est le nom utiliser dans l'url


//on recupere la valeur stocker dans le stockage

let a = sessionStorage.getItem('vali');

let n = sessionStorage.getItem('tableau');
n = JSON.parse(n);

//console.log(n[1].colors[1]);
// on affiche les couleurs du produit

for(i=0; i<n[a].colors.length; i++)
{
  //console.log(color);
  // elt.options[i].label = n[a].colors[i];
  var option4 = new Option(n[a].colors[i], n[a].colors[i]);
  var elt = document.querySelector('select');
  elt.options[elt.options.length] = option4;
}

const currencyEl_one = document.getElementById('colors');

prixproduits[0].innerText =  n[a].price;
descriptions[0].innerText = n[a].description;
nomproduits[0].innerText = n[a].name;

images.forEach((imagee,i)=>{
  const imag = document.createElement('img')
  imag.src=n[a].imageUrl;
  imagee.appendChild(imag)
});                        

// fonction pour ajouter le produit dans le paniet

function panier(){
 
 const currency_one = currencyEl_one.value;
 //  currency_one = color du produit
 //  quantity.value = ate du produit
  if(quantity.value<=0){
   alert('Veuiller choisir une valeur superieur a zero')
  }else{ 

   let detailproduit = {
    nomp: n[a].name,
    prixp: n[a].price,
    qte: quantity.value,
    colorp: currency_one,
    lien: n[a].imageUrl,
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