let basePrice;
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

