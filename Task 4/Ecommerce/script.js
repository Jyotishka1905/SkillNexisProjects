// =========================
// PRODUCT DATA
// =========================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "High-quality wireless headphones with comfortable ear cushions and clear sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 3499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "Modern smartwatch with fitness tracking, notifications and stylish design."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description: "Comfortable running shoes suitable for everyday activities and exercise."
    },

    {
        id: 4,
        name: "Backpack",
        category: "Fashion",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        description: "Durable backpack with multiple compartments for school, college and travel."
    },

    {
        id: 5,
        name: "Coffee Maker",
        category: "Home",
        price: 2899,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
        description: "Easy-to-use coffee maker designed for delicious coffee at home."
    },

    {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 899,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
        description: "Minimal desk lamp perfect for studying, reading and working."
    },

    {
        id: 7,
        name: "Sunglasses",
        category: "Accessories",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "Stylish sunglasses with a modern frame for everyday use."
    },

    {
        id: 8,
        name: "Leather Wallet",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        description: "Compact wallet with multiple card slots and a classic design."
    }

];


// =========================
// GET HTML ELEMENTS
// =========================

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const noProducts =
    document.getElementById("noProducts");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartSidebar =
    document.getElementById("cartSidebar");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const overlay =
    document.getElementById("overlay");

const productModal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("closeModal");


// =========================
// LOAD CART FROM LOCAL STORAGE
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts() {

    productGrid.innerHTML = "";


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categoryFilter.value;


    const filteredProducts =
        products.filter(function(product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";

        return;

    }


    noProducts.style.display = "none";


    filteredProducts.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                onclick="showProduct(${product.id})"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="description">
                    ${product.description}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="product-buttons">

                    <button
                        class="view-btn"
                        onclick="showProduct(${product.id})"
                    >
                        View Details
                    </button>

                    <button
                        class="card-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


// =========================
// SHOW PRODUCT DETAILS
// =========================

function showProduct(id) {

    const product =
        products.find(function(product) {

            return product.id === id;

        });


    if (!product) {
        return;
    }


    document.getElementById(
        "modalImage"
    ).src = product.image;


    document.getElementById(
        "modalTitle"
    ).textContent = product.name;


    document.getElementById(
        "modalCategory"
    ).textContent = product.category;


    document.getElementById(
        "modalDescription"
    ).textContent = product.description;


    document.getElementById(
        "modalPrice"
    ).textContent =
        `₹${product.price.toLocaleString("en-IN")}`;


    document.getElementById(
        "modalCartBtn"
    ).onclick = function() {

        addToCart(product.id);

        closeProductModal();

    };


    productModal.classList.add("active");

}


// =========================
// CLOSE PRODUCT MODAL
// =========================

function closeProductModal() {

    productModal.classList.remove("active");

}


closeModal.addEventListener(
    "click",
    closeProductModal
);


// =========================
// ADD TO CART
// =========================

function addToCart(id) {

    const existingItem =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            id: id,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    alert("Product added to cart!");

}


// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products to get started.
                </p>

            </div>

        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;

    }


    let total = 0;

    let totalQuantity = 0;


    cart.forEach(function(item) {

        const product =
            products.find(function(product) {

                return product.id === item.id;

            });


        if (!product) {
            return;
        }


        total +=
            product.price *
            item.quantity;


        totalQuantity +=
            item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p class="cart-item-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(
                            ${product.id},
                            -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${product.id},
                            1
                        )"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${product.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(id, amount) {

    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== id;

            });

    }


    saveCart();

    updateCart();

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    saveCart();

    updateCart();

}


// =========================
// OPEN CART
// =========================

cartButton.addEventListener(
    "click",
    function() {

        cartSidebar.classList.add("active");

        overlay.classList.add("active");

    }
);


// =========================
// CLOSE CART
// =========================

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


overlay.addEventListener(
    "click",
    function() {

        closeCartSidebar();

        closeProductModal();

    }
);


// =========================
// SEARCH
// =========================

searchInput.addEventListener(
    "input",
    displayProducts
);


// =========================
// CATEGORY FILTER
// =========================

categoryFilter.addEventListener(
    "change",
    displayProducts
);


// =========================
// SCROLL TO PRODUCTS
// =========================

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =========================
// CHECKOUT
// =========================

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Checkout feature coming soon!"
            );

        }
    );


// =========================
// INITIAL LOAD
// =========================

displayProducts();

updateCart();