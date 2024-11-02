// Product data with 20 items across multiple categories
const products = [
    { id: 1, name: "Organic Cotton T-Shirt", description: "Soft, sustainable cotton T-shirt.", price: 299, category: "Apparel", image: "Images/product1.jpg" },
    { id: 2, name: "Bamboo Toothbrush Set", description: "Eco-friendly toothbrushes for a sustainable oral care routine.", price: 99, category: "Personal Care", image: "Images/product2.png" },
    { id: 3, name: "Reusable Grocery Bags", description: "Durable and reusable bags to replace single-use plastic.", price: 49, category: "Household", image: "Images/product3.png" },
    { id: 4, name: "Stainless Steel Water Bottle", description: "Reusable water bottle to stay hydrated on the go.", price: 199, category: "Personal Care", image: "Images/product4.jpg" },
    { id: 5, name: "Eco-Friendly Notebook", description: "Recycled paper notebook for jotting down ideas.", price: 49, category: "Stationery", image: "Images/product5.jpg" },
    { id: 6, name: "Biodegradable Phone Case", description: "Compostable phone case made from eco-friendly materials.", price: 149, category: "Personal Care", image: "Images/product6.jpg" },
    { id: 7, name: "Reusable Stainless Steel Straw Set", description: "Set of straws with a cleaning brush, perfect for on-the-go.", price: 99, category: "Personal Care", image: "Images/product7.jpg" },
    { id: 8, name: "Bamboo Cutlery Set", description: "Reusable cutlery for eco-friendly dining.", price: 499, category: "Household", image: "Images/product8.jpg" },
    { id: 9, name: "Compostable Trash Bags", description: "100% compostable trash bags for waste disposal.", price: 69, category: "Household", image: "Images/product9.jpg" },
    { id: 10, name: "Recycled Paper Pencils", description: "Pencils made from recycled paper for sustainable writing.", price: 99, category: "Stationery", image: "Images/product10.jpg" },
    { id: 11, name: "Hemp Backpack", description: "Durable, eco-friendly backpack made from hemp.", price: 1499, category: "Apparel", image: "Images/product11.jpg" },
    { id: 12, name: "Organic Cotton Socks", description: "Comfortable socks made from organic cotton.", price: 99, category: "Apparel", image: "Images/product12.jpg" },
    { id: 13, name: "Recycled Plastic Sunglasses", description: "Stylish sunglasses made from recycled plastic.", price: 999, category: "Accessories", image: "Images/product13.jpg" },
    { id: 14, name: "Biodegradable Dental Floss", description: "Eco-friendly dental floss made from natural materials.", price: 499, category: "Personal Care", image: "Images/product14.jpg" },
    { id: 15, name: "Reusable Makeup Remover Pads", description: "Soft and washable pads for makeup removal.", price: 599, category: "Personal Care", image: "Images/product15.jpg" },
    { id: 16, name: "Solar-Powered Charger", description: "Portable solar-powered phone charger for sustainable energy.", price: 1299, category: "Electronics", image: "Images/product16.jpg" },
    { id: 17, name: "Natural Fiber Dish Brush", description: "Eco-friendly brush for dish cleaning.", price: 89, category: "Household", image: "Images/product17.jpg" },
    { id: 18, name: "Compostable Coffee Cups", description: "Cups made from compostable materials for your hot beverages.", price: 49, category: "Household", image: "Images/product18.jpg" },
    { id: 19, name: "Recycled Plastic Tote Bag", description: "Stylish tote made from recycled plastic.", price: 499, category: "Apparel", image: "Images/product19.jpg" },
    { id: 20, name: "Organic Lip Balm", description: "Natural, organic lip balm for moisturizing lips.", price: 79, category: "Personal Care", image: "Images/product20.jpg" }
];

// Display products in grid
const productGrid = document.getElementById("productGrid");

function displayProducts(filteredProducts = products) {
    productGrid.innerHTML = ""; // Clear the grid
    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-4");

        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Price: ₹${product.price.toFixed(2)}</strong></p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Call displayProducts initially to load products
displayProducts();

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}

// Sort functionality
function sortProducts() {
    const sortValue = document.getElementById("sortDropdown").value;
    let sortedProducts = [...products];

    if (sortValue === "asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(sortedProducts);
}

// Filter by category functionality
function filterByCategory() {
    const categoryValue = document.getElementById("categoryDropdown").value;
    const filteredProducts = categoryValue
        ? products.filter(product => product.category === categoryValue)
        : products;
    displayProducts(filteredProducts);
}

// Cart functionality
let cart = [];

// Handle "Add to Cart" button clicks
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        addToCart(productId);
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to your cart!`);
    }
}
