let numero_commande_id = sessionStorage.getItem("orderId");

function random(min, max){
    return Math.round(Math.random() * (max - min) + min)
}
var numero_commande =random(1230000000768, 9087654321009);
const orderId = document.getElementById('orderId');

orderId.innerHTML = numero_commande;