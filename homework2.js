const readline = require('readline');

let isLoggedIn = true;

let products = [
    { name: "banana", price: 0.99 },
    { name: "apple", price: 0.99 },
    { name: "chicken", price: 9.99 },
    { name: "pasta", price: 4.99 },
    { name: "coffee", price: 8.99 },
    { name: "milk", price: 5.99 },
    { name: "eggs", price: 3.99 },
    { name: "yogurt", price: 7.99 }
];

let shoppingCart = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayProducts() {
    if (isLoggedIn) {
        console.log("Available Products:");
        for (let i = 0; i < products.length; i++) {
            console.log(`${i + 1}. ${products[i].name} - $${products[i].price(2)}`);
        }
        promptUser();
    } else {
        console.log("Please log in to view products.");
    }
}

function promptUser() {
    rl.question('Enter the number of the product you want to add to your cart (or type "done" to finish): ', (input) => {
        if (input.toLowerCase() === 'done') {
            console.log("Your cart:");
            shoppingCart.forEach(item => console.log(`${item.name} - $${item.price(2)}`));
            let total = shoppingCart.reduce((sum, item) => sum + item.price, 0);
            console.log(`Total cost: $${total(2)}`);
            rl.close();
            return;
        }

        let index = parseInt(input) - 1;
        if (index >= 0 && index < products.length) {
            shoppingCart.push(products[index]);
            console.log(`${products[index].name} has been added to your cart.`);
        } else {
            console.log("Invalid input. Please enter a valid product number.");
        }

        promptUser();
    });
}

displayProducts();
