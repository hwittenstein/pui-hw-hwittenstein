let cart = [];
let basePrice;

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll'); // grabs value inside of roll

let newRoll;

window.onload = function(){
    
    let glazes = document.querySelector('#glazingOptions');
    let packs = document.querySelector('#packOptions');

    // add new options to glazes
    for (let i = 0; i < allGlazing.length; i++){
        var newOption = document.createElement('option');
        newOption.text = allGlazing[i].glazeType;
        newOption.value = allGlazing[i].glazeType;
        glazes.add(newOption);
    }

    // add new options to pack sizes
    for (let i = 0; i < allSizes.length; i++){
        var newOption = document.createElement('option');
        newOption.text = allSizes[i].size;
        newOption.value = allSizes[i].size;
        packs.add(newOption);
    }

    
    // update header
    const headerElement = document.querySelector('#roll-header');
    headerElement.innerText = rollType + " Cinnamon Roll";

    // update roll image
    const rollImage = document.querySelector('.detail-product-image');
    rollImage.src = './assets/products/' + rolls[rollType].imageFile;

    // update price
    basePrice = rolls[rollType].basePrice;
    updatePrice();

    document.querySelector('#add-to-cart-button').addEventListener('click', function(){
        cart.push(newRoll);
        console.log(cart);
    });

}  

let allSizes = [
    {size: "1", multiplyBy: 1},
    {size: "3", multiplyBy: 3},
    {size: "6", multiplyBy: 5}, 
    {size: "12", multiplyBy: 10}
];

let allGlazing = [
    {glazeType: "Keep original", add: 0},
    {glazeType: "Sugar milk", add: 0},
    {glazeType: "Vanilla milk", add: 0.5}, 
    {glazeType: "Double chocolate", add: 1.5}
];

function updatePrice(){
    // get elements
    let glazeChoice = document.querySelector('#glazingOptions').value;
    let packChoice = document.querySelector('#packOptions').value;

    // get respective price if selection is found in glaze or pack class
    let glazingPrice = allGlazing.find(glaze => glaze.glazeType === glazeChoice).add;
    let packPrice = allSizes.find(pack => pack.size === packChoice).multiplyBy;

    // calculate total price based on pack size and glazing choice 
    let totalPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
    let displayPrice = document.querySelector('#detail-price');

    // live update total price as selections change
    displayPrice.innerText = "$ " + totalPrice;

    // update roll details
    newRoll = new Roll(rollType, glazeChoice, packChoice, totalPrice);
}

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

