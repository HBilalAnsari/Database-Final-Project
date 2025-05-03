document.addEventListener('DOMContentLoaded', function() {
// Sample cart data - in a real app, this would come from a database or localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [
{
id: 1,
title: 'Cyber Adventure 2077',
platform: 'PC',
price: 59.99,
quantity: 1,
image: 'https://via.placeholder.com/100x60?text=Game1'
},
{
id: 2,
title: 'Space Explorer',
platform: 'PlayStation 5',
price: 49.99,
quantity: 2,
image: 'https://via.placeholder.com/100x60?text=Game2'
}
];

// DOM Elements
const cartItemsContainer = document.querySelector('.cart-items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const continueShoppingBtn = document.getElementById('continue-shopping');

// Render cart items
function renderCart() {
if (cartItems.length === 0) {
cartItemsContainer.innerHTML = `
<div class="empty-cart">
<i class="fas fa-shopping-cart"></i>
<p>Your cart is empty</p>
</div>
`;
return;
}

cartItemsContainer.innerHTML = '';

cartItems.forEach(item => {
const cartItemElement = document.createElement('div');
cartItemElement.className = 'cart-item';
cartItemElement.innerHTML = `
<img src="${item.image}" alt="${item.title}" class="cart-item-img">
<div class="cart-item-details">
<h3 class="cart-item-title">${item.title}</h3>
<p class="cart-item-platform">${item.platform}</p>
<p class="cart-item-price">$${item.price.toFixed(2)}</p>
<div class="cart-item-quantity">
<button class="quantity-btn minus" data-id="${item.id}">-</button>
<input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
<button class="quantity-btn plus" data-id="${item.id}">+</button>
</div>
</div>
<button class="cart-item-remove" data-id="${item.id}">
<i class="fas fa-trash"></i>
</button>
`;
cartItemsContainer.appendChild(cartItemElement);
});

// Add event listeners to quantity buttons and remove buttons
document.querySelectorAll('.minus').forEach(btn => {
btn.addEventListener('click', decreaseQuantity);
});

document.querySelectorAll('.plus').forEach(btn => {
btn.addEventListener('click', increaseQuantity);
});

document.querySelectorAll('.quantity-input').forEach(input => {
input.addEventListener('change', updateQuantity);
});

document.querySelectorAll('.cart-item-remove').forEach(btn => {
btn.addEventListener('click', removeItem);
});

updateCartSummary();
}

// Update cart summary (subtotal, tax, total)
function updateCartSummary() {
const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const tax = subtotal * 0.10; // 10% tax
const total = subtotal + tax;

subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
taxElement.textContent = `$${tax.toFixed(2)}`;
totalElement.textContent = `$${total.toFixed(2)}`;
}

// Decrease quantity
function decreaseQuantity(e) {
const id = parseInt(e.target.getAttribute('data-id'));
const item = cartItems.find(item => item.id === id);

if (item.quantity > 1) {
item.quantity--;
saveCart();
renderCart();
}
}

// Increase quantity
function increaseQuantity(e) {
const id = parseInt(e.target.getAttribute('data-id'));
const item = cartItems.find(item => item.id === id);

item.quantity++;
saveCart();
renderCart();
}

// Update quantity via input
function updateQuantity(e) {
const id = parseInt(e.target.getAttribute('data-id'));
const newQuantity = parseInt(e.target.value);

if (newQuantity >= 1) {
const item = cartItems.find(item => item.id === id);
item.quantity = newQuantity;
saveCart();
renderCart();
} else {
renderCart(); // Reset to previous value
}
}

// Remove item from cart
function removeItem(e) {
const id = parseInt(e.target.closest('button').getAttribute('data-id'));
cartItems = cartItems.filter(item => item.id !== id);
saveCart();
renderCart();
}

// Save cart to localStorage
function saveCart() {
localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Checkout button handler
checkoutBtn.addEventListener('click', function() {
if (cartItems.length === 0) {
alert('Your cart is empty. Please add some games before checkout.');
return;
}
alert('Proceeding to checkout...');
// In a real app, this would redirect to a checkout page
});

// Continue shopping button handler
continueShoppingBtn.addEventListener('click', function() {
window.location.href = 'games.html';
});

// Initial render
renderCart();
});