
// Clothing products
const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        category: "Women",
        price: 1299,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600"
    },
    {
        id: 2,
        name: "Casual White Shirt",
        category: "Men",
        price: 899,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"
    },
    {
        id: 3,
        name: "Classic Denim Jacket",
        category: "Women",
        price: 1599,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600"
    },
    {
        id: 4,
        name: "Men's Casual T-Shirt",
        category: "Men",
        price: 699,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 5,
        name: "Elegant Handbag",
        category: "Accessories",
        price: 1199,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    },
    {
        id: 6,
        name: "Women's Casual Outfit",
        category: "Women",
        price: 1499,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
    },
    {
        id: 7,
        name: "Men's Formal Shirt",
        category: "Men",
        price: 1099,
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=600"
    },
    {
        id: 8,
        name: "Fashion Sunglasses",
        category: "Accessories",
        price: 499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    }
];

// HTML elements
const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartOverlay = document.getElementById("cartOverlay");
const searchInput = document.getElementById("searchInput");

let cart = [];
let selectedCategory = "All";

// Display products
function displayProducts(productList) {
    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productGrid.innerHTML =
            '<p class="no-products">No products found.</p>';
        return;
    }

    productList.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = "₹" + product.price.toLocaleString("en-IN");

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function() {
            addToCart(product.id);
        });

        info.appendChild(name);
        info.appendChild(category);
        info.appendChild(price);
        info.appendChild(button);

        card.appendChild(image);
        card.appendChild(info);

        productGrid.appendChild(card);
    });
}

// Filter products
function filterProducts() {
    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}

// Category button events
const categoryButtons =
    document.querySelectorAll(".category-btn");

categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedCategory = button.dataset.category;

        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();
    });
});

// Search products
searchInput.addEventListener("input", filterProducts);

// Add product to cart
function addToCart(productId) {
    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    updateCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    updateCart();
}

// Update shopping cart
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-message">Your cart is empty.</p>';
    }

    cart.forEach(function(item) {
        const product = products.find(function(product) {
            return product.id === item.id;
        });

        const itemTotal = product.price * item.quantity;

        total += itemTotal;
        totalItems += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = product.name;

        const quantity = document.createElement("small");
        quantity.textContent =
            "Quantity: " + item.quantity +
            " | ₹" + itemTotal.toLocaleString("en-IN");

        details.appendChild(name);
        details.appendChild(quantity);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            removeFromCart(item.id);
        });

        cartItem.appendChild(details);
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = total.toLocaleString("en-IN");
}

// Open shopping cart
document.getElementById("cartButton")
    .addEventListener("click", function() {
        cartOverlay.classList.add("show");
    });

// Close shopping cart
document.getElementById("closeCart")
    .addEventListener("click", function() {
        cartOverlay.classList.remove("show");
    });

// Close cart when clicking outside the panel
cartOverlay.addEventListener("click", function(event) {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("show");
    }
});

// Demo checkout
document.getElementById("checkoutButton")
    .addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your shopping cart is empty!");
            return;
        }

        alert(
            "Thank you for shopping with StyleNest! " +
            "This is a demo checkout. No payment has been made."
        );
    });

// Display all products when website opens
displayProducts(products);
updateCart();
