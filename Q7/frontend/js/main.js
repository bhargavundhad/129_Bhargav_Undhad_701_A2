let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user') || '{}');

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    if (token) {
        showLoggedInState();
        loadProducts();
    }
});

// Since login/register forms are now on separate pages, remove these handlers

// Show logged in state
function showLoggedInState() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('products-section').classList.remove('hidden');
    document.getElementById('logout-btn').classList.remove('hidden');
    
    if (user.isAdmin) {
        document.getElementById('admin-link').classList.remove('hidden');
    }
}

// Logout function
function logout() {
    token = null;
    user = {};
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('products-section').classList.add('hidden');
    document.getElementById('logout-btn').classList.add('hidden');
    document.getElementById('admin-link').classList.add('hidden');
    
    showToast('Logged out successfully');
}

// Load products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        showToast('Failed to load products');
    }
}

// Render products
function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description || 'No description'}</p>
            <p><strong>₹${product.price}</strong></p>
            <button class="btn" onclick="addToCart('${product._id}')">Add to Cart</button>
        </div>
    `).join('');
}

// Add to cart
async function addToCart(productId) {
    if (!token) {
        showToast('Please login first');
        return;
    }

    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: 1
            })
        });

        if (response.ok) {
            showToast('Product added to cart!');
        } else {
            showToast('Failed to add to cart');
        }
    } catch (error) {
        showToast('Network error occurred');
    }
}

// Toast notification function
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    
    // Add animation keyframes
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
