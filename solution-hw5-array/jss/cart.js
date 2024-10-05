let cartRolls = [
    new Roll("Original", "Sugar Milk", "1", 2.49),
    new Roll("Walnut", "Vanilla Milk", "12", 3.49),
    new Roll("Raisin", "Sugar Milk", "3", 2.99),
    new Roll("Apple", "Original", "3", 3.49), 
];

// console.log(cartRolls);
// console.log(Roll);

function populateCart() {
    const template = document.querySelector('#cart-item-template');
    const cartList = document.querySelector('.cart-sublist');

    for (let i = 0; i < cartRolls.length; i++){
        const roll = cartRolls[i];

        let clone = document.importNode(template.content, true);

        // update elements
        clone.querySelector('.cart-product-image').src = './assets/products/' + rolls[roll.type].imageFile;

        // update description
        clone.querySelector('.item-description').innerHTML = 
            roll.type + " Cinnamon Roll<br>" +
            "Glazing: " + roll.glazing + "<br>" +
            "Pack size: " + roll.size;

        // update price
        clone.querySelector('.cart-price').innerText = "$ " + roll.totalPrice;

        let removeBtn = clone.querySelector('.remove');
        removeBtn.addEventListener('click', () => {
            removeRoll(roll);
        })

        // add to cart list
        cartList.appendChild(clone);

    }

    updateCartTotal();
} 

function updateCartTotal() {
    const totalElement = document.querySelector('.total-price');
    let total = 0;

    // Sum the total price of all rolls in the cart
    for (let i = 0; i < cartRolls.length; i++) {
        total += parseFloat(cartRolls[i].totalPrice);
    }

    totalElement.innerText = "$ " + total;
}
function removeRoll(roll) {
    console.log("Removing roll:", roll);

    // Find the DOM element associated with this roll using the data attribute
    const elementToRemove = document.querySelector(`[data-roll-type="${roll.type}"]`);

    // Remove the corresponding DOM element from the UI
    if (elementToRemove) {
        elementToRemove.remove();
    }

    // Remove the roll from the cartRolls array
    cartRolls = cartRolls.filter(cartRoll => cartRoll !== roll);

    // Update the cart total after removing the roll
    populateCart();
    updateCartTotal();
}

window.onload = function () {
    populateCart();
};



    
