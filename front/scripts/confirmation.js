function random(min, max){
    return Math.round(Math.random() * (max - min) + min)
}
var numero_commande =random(1230000000768, 9087654321009);
console.log(numero_commande);



const orderId = document.getElementById('orderId');
console.log(orderId);
orderId.innerHTML = numero_commande;