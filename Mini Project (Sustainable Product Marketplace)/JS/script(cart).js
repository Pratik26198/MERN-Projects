// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input" style="width: 60px;">
            </td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Update Quantity and Total Price
document.addEventListener("change", function(event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = event.target.getAttribute("data-index");
        const newQuantity = parseInt(event.target.value);

        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            updateCart();
        }
    }
});

// Remove Item from Cart with Confirmation
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");

        if (confirm(`Are you sure you want to remove "${cart[index].name}" from your cart?`)) {
            cart.splice(index, 1);
            updateCart();
        }
    }
});

// Update Cart and Save to localStorage
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Checkout Function with Confirmation
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before checking out.");
        return;
    }

    if (confirm("Proceed to checkout?")) {
        alert("Thank you for your purchase!");
        cart = [];
        updateCart(); // Clear the cart after checkout
    }
}

// Initial display of cart items
displayCartItems();
