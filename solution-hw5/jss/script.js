let basePrice;
let cart = [];

let newRoll;
let rollType;

let allSizes = [
    {size: "1", multiplyBy: 1},
    {size: "3", multiplyBy: 3},
    {size: "6", multiplyBy: 5}, 
    {size: "12", multiplyBy: 10}
];

let allGlazing = [
    {glazeType: "Original", add: 0},
    {glazeType: "Sugar Milk", add: 0},
    {glazeType: "Vanilla Milk", add: 0.5}, 
    {glazeType: "Double Chocolate", add: 1.5}
];

function updatePrice(){
    // get elements
    let glazeChoice = document.querySelector('#glazingOptions').value;
    let packChoice = document.querySelector('#packOptions').value;

    // update roll details
    newRoll = new Roll(rollType, glazeChoice, packChoice, basePrice);

    // get price from function inside class Roll
    let totalPrice = newRoll.calcTotalPrice();

    // live update total price as selections change
    let displayPrice = document.querySelector('#detail-price');
    displayPrice.innerText = "$ " + totalPrice.toFixed(2);
}

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.totalPrice = this.calcTotalPrice(); // accessing this in the cart
        this.element = null;
    }

    calcTotalPrice() {
        // get respective price if selection is found in glaze or pack class
        let glazingPrice = allGlazing.find(i => i.glazeType === this.glazing).add;
        let packPrice = allSizes.find(i => i.size === this.size).multiplyBy;

        // calculate total price based on pack size and glazing choice 
        return ((this.basePrice + glazingPrice) * packPrice);
    }
}

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

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    rollType = params.get('roll'); // grabs value inside of roll

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

