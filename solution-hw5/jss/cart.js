const cartRolls = new Set([
    new Roll("Original", "Sugar Milk", "1", 2.49),
    new Roll("Walnut", "Vanilla Milk", "12", 3.49),
    new Roll("Raisin", "Sugar Milk", "3", 2.99),
    new Roll("Apple", "Original", "3", 3.49),
]);

function updateCartTotal() {
    const totalElement = document.querySelector('.total-price');
    let total = 0;

    for (const item of cartRolls) {
        total += item.totalPrice;
    }
    totalElement.innerText = "$ " + total.toFixed(2);
}

function populateCart(item) {
    const template = document.querySelector('#cart-item-template');
    const clone = template.content.cloneNode(true);

    // update image
    clone.querySelector('.cart-product-image').src = './assets/products/' + rolls[item.type].imageFile;

    // // update description
    clone.querySelector('.item-description').innerHTML =
        item.type + " Cinnamon Roll<br>" +
        "Glazing: " + item.glazing + "<br>" +
        "Pack size: " + item.size;

    // // update price
    clone.querySelector('.cart-price').innerText = "$ " + item.totalPrice.toFixed(2);

    // remove button function
    item.element = clone.querySelector('.cart-product');
    const removeBtn = clone.querySelector('.remove');
    removeBtn.addEventListener('click', () => {
        removeRoll(item);
    })

    // add to cart list
    const cartList = document.querySelector('.cart-sublist');
    cartList.appendChild(clone);
}

function removeRoll(item) {
    item.element.remove();
    cartRolls.delete(item);
    updateCartTotal();
}

window.onload = function () {
    for (const item of cartRolls) {
        populateCart(item);
    }
    updateCartTotal();
}
