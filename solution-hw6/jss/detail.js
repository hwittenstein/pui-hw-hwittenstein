let glazeChoice;
let packChoice;

function updatePrice(){
    // get elements
    glazeChoice = document.querySelector('#glazingOptions').value;
    packChoice = document.querySelector('#packOptions').value;

    // get respective price if selection is found in glaze or pack class
    let glazingPrice = allGlazing.find(i => i.glazeType === glazeChoice).add;
    let packPrice = allSizes.find(i => i.size === packChoice).multiplyBy;

    // get price from function inside class Roll
    let totalPrice = (basePrice + glazingPrice) * packPrice;

    // live update total price as selections change
    let displayPrice = document.querySelector('#detail-price');
    displayPrice.innerText = "$ " + totalPrice.toFixed(2);
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
        cartRolls.add(new Roll(rollType, glazeChoice, packChoice, basePrice)); // update roll details;
        saveToLocalStorage();
    });
} 