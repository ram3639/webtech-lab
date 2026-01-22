// 1. Product Data
const products = [
    { id: 1, name: "Laptop", price: 1000, category: "electronics" },
    { id: 2, name: "Headphones", price: 200, category: "electronics" },
    { id: 3, name: "Coffee Maker", price: 80, category: "home" },
    { id: 4, name: "Yoga Mat", price: 30, category: "fitness" },
    { id: 5, name: "Desk Lamp", price: 45, category: "home" }
];

let cart = [];
let appliedCoupon = null;

// 2. Initial Render
function init() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(p => `
        <div class="item-card">
            <div>
                <strong>${p.name}</strong> <span class="category">(${p.category})</span><br>
                <span class="price">$${p.price}</span>
            </div>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// 3. Cart Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
    }
    renderCart();
}

// 4. Discount Engine
function calculateTotals() {
    let subtotal = 0;
    let discount = 0;
    const now = new Date();
    const isNightSale = now.getHours() >= 20 || now.getHours() < 6; // 8PM to 6AM

    cart.forEach(item => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        // Rule A: Bulk Discount (Buy 3+ of any item, get 10% off that item)
        if (item.quantity >= 3) {
            discount += lineTotal * 0.10;
        }

        // Rule B: Night Owl Sale (Additional 5% off Electronics at night)
        if (isNightSale && item.category === 'electronics') {
            discount += lineTotal * 0.05;
        }
    });

    // Rule C: Coupon Parsing (Format: SAVE[Amount]-[Category])
    // Example: SAVE10-ELEC
    if (appliedCoupon) {
        const parts = appliedCoupon.split('-'); // ["SAVE10", "ELEC"]
        const amountStr = parts[0].replace('SAVE', ''); // "10"
        const amount = parseFloat(amountStr);
        const categoryConstraint = parts[1];

        if (!isNaN(amount)) {
            cart.forEach(item => {
                if (item.category.toUpperCase().includes(categoryConstraint)) {
                    discount += (item.price * item.quantity) * (amount / 100);
                }
            });
        }
    }

    return { subtotal, discount, total: Math.max(0, subtotal - discount) };
}

// 5. Coupon Validation
function applyCoupon() {
    const input = document.getElementById('couponInput').value.trim().toUpperCase();
    const feedback = document.getElementById('couponFeedback');

    // String Method Validation
    if (input.startsWith("SAVE") && input.includes("-")) {
        appliedCoupon = input;
        feedback.innerText = "Coupon Applied!";
        feedback.style.color = "green";
    } else {
        appliedCoupon = null;
        feedback.innerText = "Invalid Format (Use SAVE10-HOME)";
        feedback.style.color = "red";
    }
    renderCart();
}

// 6. UI Update
function renderCart() {
    const cartDiv = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p class="empty-msg">Cart is empty</p>';
    } else {
        cartDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <div>
                    <button onclick="updateQty(${item.id}, -1)">-</button>
                    <button onclick="updateQty(${item.id}, 1)">+</button>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `).join('');
    }

    const res = calculateTotals();
    document.getElementById('subtotal').innerText = res.subtotal.toFixed(2);
    document.getElementById('discountTotal').innerText = res.discount.toFixed(2);
    document.getElementById('grandTotal').innerText = res.total.toFixed(2);
}

init();