// JavaScript for Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample cart data - in a real app, this would come from a database or localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [
        {
            id: 1,
            title: "The Witcher 3: Wild Hunt",
            price: 29.99,
            quantity: 1,
            image: "https://via.placeholder.com/80x60?text=Witcher+3"
        },
        {
            id: 2,
            title: "Cyberpunk 2077",
            price: 49.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x60?text=Cyberpunk"
        },
        {
            id: 3,
            title: "Red Dead Redemption 2",
            price: 39.99,
            quantity: 1,
            image: "https://via.placeholder.com/80x60?text=RDR2"
        }
    ];

    // Save cart to localStorage (for demo purposes)
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Render cart items
    renderCart();

    function renderCart() {
        const cartContent = document.getElementById('cart-content');
        
        if (cartItems.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is currently empty.</p>
                    <a href="games.html" class="empty-cart-btn">Browse Games</a>
                </div>
            `;
            return;
        }

        let cartHTML = `
            <table class="cart-items">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let total = 0;

        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            cartHTML += `
                <tr>
                    <td data-label="Product">
                        <div style="display: flex; align-items: center;">
                            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                            <span class="cart-item-title" style="margin-left: 10px;">${item.title}</span>
                        </div>
                    </td>
                    <td data-label="Price" class="cart-item-price">$${item.price.toFixed(2)}</td>
                    <td data-label="Quantity">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td data-label="Subtotal">$${subtotal.toFixed(2)}</td>
                    <td data-label="Action">
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </td>
                </tr>
            `;
        });

        cartHTML += `
                </tbody>
            </table>
            <div class="cart-summary">
                <div class="summary-box">
                    <h3 class="summary-title">Order Summary</h3>
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-row summary-total">
                        <span>Total:</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        `;

        cartContent.innerHTML = cartHTML;

        // Add event listeners
        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });

        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });

        document.querySelector('.checkout-btn')?.addEventListener('click', proceedToCheckout);
    }

    function decreaseQuantity(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const item = cartItems.find(item => item.id === id);
        
        if (item.quantity > 1) {
            item.quantity--;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        }
    }

    function increaseQuantity(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const item = cartItems.find(item => item.id === id);
        
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    }

    function updateQuantity(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const newQuantity = parseInt(e.target.value);
        
        if (newQuantity >= 1) {
            const item = cartItems.find(item => item.id === id);
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        } else {
            renderCart(); // Reset to previous value
        }
    }

    function removeItem(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        cartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    }

    function proceedToCheckout() {
        alert('Proceeding to checkout! In a real application, this would redirect to a checkout page.');
        // window.location.href = 'checkout.html';
    }
});