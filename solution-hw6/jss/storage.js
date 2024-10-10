let cartRolls = new Set();
let rollsArray = [];

function saveToLocalStorage() {
    const rollsArray = Array.from(cartRolls);
    const rollsArrayString = JSON.stringify(rollsArray);

    localStorage.setItem('storedRolls', rollsArrayString);

    console.log(cartRolls);
}

if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
  }

function retrieveFromLocalStorage() {
    const rollsArrayString2 = localStorage.getItem('storedRolls');
    rollsArray = JSON.parse(rollsArrayString2);
    cartRolls = new Set(rollsArray);
    console.log(rollsArray);
}