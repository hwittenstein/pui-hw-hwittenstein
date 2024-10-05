//store basic price
let basePrice;
let cart = [];
let newRoll;
let rollType;

//store glazes specs
let allGlazes = [
    { type: 'Original', add: 0 },
    { type: 'Sugar Milk', add: 0 },
    { type: 'Vanilla Milk', add: 0.50 },
    { type: 'Double Chocolate', add: 1.50 },
];

//store pack specs
let allPacks = [
    { size: '1', multiply: 1 },
    { size: '3', multiply: 3 },
    { size: '6', multiply: 5 },
    { size: '12', multiply: 10 },
];

function updatePrice() {
    //grab elements
    let chosenGlaze = document.querySelector('#glazingOptions').value;
    let chosenPack = document.querySelector('#packOptions').value;

    newRoll = new Roll(rollType, chosenGlaze, chosenPack, basePrice);

    //get price from function inside class roll
    let totalPrice = newRoll.calculatePrice();

    //update the price by the add the cart button
    let showPrice = document.querySelector('#totalPrice');
    showPrice.innerText = "$ " + totalPrice;
}

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.totalPrice = this.calculatePrice(); //to access in the cart
    }

    calculatePrice() {
        //see if selection exists in class of glazes or pack, get associated price adaptation
        //for .find: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
        let glazePrice = allGlazes.find(glaze => glaze.type === this.glazing).add;
        let packPrice = allPacks.find(pack => pack.size === this.size).multiply;
        //calc total price based on price adaptation
        return ((this.basePrice + glazePrice) * packPrice).toFixed(2);
    }
}

window.onload = function () {

    let glazes = document.querySelector('#glazingOptions');
    let packs = document.querySelector('#packOptions');

    for (let i = 0; i < allGlazes.length; i++) {
        var option = document.createElement('option');
        option.text = allGlazes[i].type;
        option.value = allGlazes[i].type;
        glazes.add(option);
    }

    for (let i = 0; i < allPacks.length; i++) {
        var option = document.createElement('option');
        option.text = allPacks[i].size;
        option.value = allPacks[i].size;
        packs.add(option);
    }

    //relates to passed parameters from the detail links
    const queryString = window.location.search; //get stuff after ?
    const params = new URLSearchParams(queryString); //set up roll variable
    rollType = params.get('roll'); //grab value inside of roll

    // Update the header text
    const headerElement = document.querySelector('#roll-header-text');
    headerElement.innerText = rollType + " Cinnamon Roll";

    // Update the image
    const rollImage = document.querySelector('#roll-img');
    rollImage.src = '../assets/products/' + rolls[rollType].imageFile;

    // Update the base price
    basePrice = rolls[rollType].basePrice;

    updatePrice();

    document.querySelector('#cartBtn').addEventListener('click', function () {
        cart.push(newRoll);
        console.log(cart);
    });
}









//HW5 Testing instances ---------------------------------------------------------------------------------------

let rollCart = [
    new Roll("Original", "Sugar Milk", "1", 2.49),
    new Roll("Walnut", "Vanilla Milk", "12", 3.49),
    new Roll("Raisin", "Sugar Milk", "3", 2.99),
    new Roll("Apple", "Original", "3", 3.49),
]

function loadCart() {
    const template = document.querySelector('#cart-item-template');
    const cartList = document.querySelector('#loadCart');

    for (let i = 0; i < rollCart.length; i++) {
        const roll = rollCart[i];

        let clone = document.importNode(template.content, true);

        // Updating image
        clone.querySelector('.preview img').src = '../assets/products/' + rolls[roll.type].imageFile; // Use familiar pattern for image source

        // Updating description
        clone.querySelector('.item-description').innerHTML =
            roll.type + " Cinnamon Roll<br>" +
            "Glazing: " + roll.glazing + "<br>" +
            "Pack size: " + roll.size;
        ;

        // Updating price
        clone.querySelector('.item-price').innerText = "$ " + roll.totalPrice;

        // Add to the cart list
        cartList.appendChild(clone);
    }

    // Update master total
    updateTotal();
}

function updateTotal() {
    const totalElement = document.querySelector('#masterTotal');
    let total = 0;

    // Sum the total price of all rolls in the cart
    for (let i = 0; i < rollCart.length; i++) {
        total += parseFloat(rollCart[i].totalPrice);
    }

    totalElement.innerText = "$ " + total;
}

window.onload = function () {
    loadCart();
}


